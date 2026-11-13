import * as THREE from "three";

export const DEG = Math.PI / 180;
export const RAD = 180 / Math.PI;
export const EARTH_RADIUS_KM = 6371;

/**
 * Converts geodetic (lat, lon) to 3D Cartesian coordinates in Three.js world frame.
 * Equirectangular alignment:
 *   lat 0, lon 0  -> (+radius, 0, 0)
 *   lat +90       -> (0, +radius, 0) [North pole]
 *   lat 0, lon 90E -> (0, 0, -radius)
 *   lat 0, lon 90W -> (0, 0, +radius)
 */
export function latLonToWorld(
  latDeg: number,
  lonDeg: number,
  radius = 60,
  out = new THREE.Vector3(),
): THREE.Vector3 {
  const lat = latDeg * DEG;
  const lon = lonDeg * DEG;
  const c = Math.cos(lat);
  return out.set(
    radius * c * Math.cos(lon),
    radius * Math.sin(lat),
    -radius * c * Math.sin(lon),
  );
}

/**
 * Converts 3D Cartesian vector on or near the sphere back into geodetic (lat, lon).
 */
export function worldToLatLon(v: THREE.Vector3): { lat: number; lon: number } {
  const r = v.length();
  if (r < 1e-6) return { lat: 0, lon: 0 };
  const lat = Math.asin(Math.max(-1, Math.min(1, v.y / r))) * RAD;
  const lon = Math.atan2(-v.z, v.x) * RAD;
  return { lat, lon };
}

/**
 * Haversine great-circle distance between two geodetic coordinates in km.
 */
export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const phi1 = lat1 * DEG;
  const phi2 = lat2 * DEG;
  const deltaPhi = (lat2 - lat1) * DEG;
  const deltaLambda = (lon2 - lon1) * DEG;
  const a =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/**
 * Ray-sphere intersection.
 * Finds the first entry intersection of ray `o + t * d` with a sphere of `radius` at the origin.
 */
export function raySphere(
  o: THREE.Vector3,
  d: THREE.Vector3,
  radius: number,
  out = new THREE.Vector3(),
): THREE.Vector3 | null {
  const b = o.dot(d);
  const c = o.lengthSq() - radius * radius;
  const disc = b * b - c;
  if (disc < 0) return null;
  const s = Math.sqrt(disc);
  let t = -b - s;
  if (t < 0) t = -b + s;
  if (t < 0) return null;
  return out.copy(d).multiplyScalar(t).add(o);
}

const _near = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _localNear = new THREE.Vector3();
const _localFar = new THREE.Vector3();
const _localDir = new THREE.Vector3();
const _invMatrix = new THREE.Matrix4();
const _occD = new THREE.Vector3();
const _occP = new THREE.Vector3();

/**
 * Horizon occlusion test: checks if the line of sight from camera position
 * to worldPos penetrates the spherical Earth of globeRadius.
 * Returns true if the point is hidden behind the Earth's curvature.
 *
 * Mathematically:
 * 1. Finds the point of closest approach tMin on the line segment camPos -> worldPos.
 * 2. If closest approach lies on the segment (0 < tMin < 1), tests whether the distance
 *    to the globe center is strictly less than globeRadius.
 * 3. For surface points near the horizon, verifies the outward normal faces the camera.
 */
export function occludedByEarth(
  camPos: THREE.Vector3,
  worldPos: THREE.Vector3,
  globeRadius = 60,
): boolean {
  _occD.copy(worldPos).sub(camPos);
  const dLenSq = _occD.lengthSq();
  if (dLenSq < 1e-6) return false;

  const tMin = -camPos.dot(_occD) / dLenSq;
  if (tMin > 0 && tMin < 1) {
    const closestDistSq = camPos.lengthSq() - (camPos.dot(_occD) ** 2) / dLenSq;
    return closestDistSq < globeRadius * globeRadius;
  }

  // Horizon dot product test for points at or beyond closest approach
  _occP.copy(worldPos);
  return _occP.dot(_occD.copy(camPos).sub(worldPos)) <= 0;
}

/**
 * Surface picking: computes the exact (lat, lon) on the globe under NDC coordinates (x, y).
 * Works regardless of globe group rotation or camera position.
 */
export function pickSurface(
  ndcX: number,
  ndcY: number,
  camera: THREE.Camera,
  globeObject?: THREE.Object3D | null,
  radius = 60,
): { lat: number; lon: number; point: THREE.Vector3 } | null {
  _near.set(ndcX, ndcY, -1).unproject(camera);
  _dir.set(ndcX, ndcY, 1).unproject(camera);

  if (globeObject) {
    _invMatrix.copy(globeObject.matrixWorld).invert();
    _localNear.copy(_near).applyMatrix4(_invMatrix);
    _localFar.copy(_dir).applyMatrix4(_invMatrix);
    _localDir.copy(_localFar).sub(_localNear).normalize();

    const hit = raySphere(_localNear, _localDir, radius);
    if (!hit) return null;

    const { lat, lon } = worldToLatLon(hit);
    const worldPoint = hit.clone().applyMatrix4(globeObject.matrixWorld);
    return { lat, lon, point: worldPoint };
  } else {
    _dir.sub(_near).normalize();
    const hit = raySphere(_near, _dir, radius);
    if (!hit) return null;
    const { lat, lon } = worldToLatLon(hit);
    return { lat, lon, point: hit };
  }
}

/**
 * Creates circle coordinates on the globe surface for drawing rings or regions.
 */
export function createGlobeCircle(
  lat: number,
  lon: number,
  radiusKm: number,
  globeRadius = 60,
  segments = 48,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const distanceRadians = radiusKm / EARTH_RADIUS_KM;
  const latRadians = lat * DEG;
  const lonRadians = lon * DEG;

  for (let i = 0; i <= segments; i++) {
    const angle = (i * 2 * Math.PI) / segments;
    const drawLat = Math.asin(
      Math.sin(latRadians) * Math.cos(distanceRadians) +
        Math.cos(latRadians) * Math.sin(distanceRadians) * Math.cos(angle),
    );
    const drawLon =
      lonRadians +
      Math.atan2(
        Math.sin(angle) * Math.sin(distanceRadians) * Math.cos(latRadians),
        Math.cos(distanceRadians) - Math.sin(latRadians) * Math.sin(drawLat),
      );
    points.push(latLonToWorld(drawLat * RAD, drawLon * RAD, globeRadius));
  }
  return points;
}

/** Formats latitude in degrees + cardinal direction (e.g. 29.9792° N). */
export function fmtLat(lat: number, digits = 4): string {
  const dir = lat >= 0 ? "N" : "S";
  return `${Math.abs(lat).toFixed(digits)}° ${dir}`;
}

/** Formats longitude in degrees + cardinal direction (e.g. 31.1342° E). */
export function fmtLon(lon: number, digits = 4): string {
  const normalized = ((((lon + 180) % 360) + 360) % 360) - 180;
  const dir = normalized >= 0 ? "E" : "W";
  return `${Math.abs(normalized).toFixed(digits)}° ${dir}`;
}

/** Formats latitude or longitude into Degrees, Minutes, Seconds. */
export function fmtDms(deg: number, isLat: boolean): string {
  const dir = isLat ? (deg >= 0 ? "N" : "S") : (deg >= 0 ? "E" : "W");
  const abs = Math.abs(deg);
  const d = Math.floor(abs);
  const mFloat = (abs - d) * 60;
  const m = Math.floor(mFloat);
  const s = Math.round((mFloat - m) * 60);
  return `${d}° ${String(m).padStart(2, "0")}' ${String(s).padStart(2, "0")}" ${dir}`;
}

/** Formats a distance in km cleanly (e.g. 1,420 km or 450 m). */
export function fmtDistanceKm(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${Math.round(km).toLocaleString()} km`;
}

