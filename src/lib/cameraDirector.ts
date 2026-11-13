import * as THREE from "three";
import { DEG, latLonToWorld } from "./geoMath";

export interface ControlInput {
  panX: number;
  panY: number;
  turnX: number;
  turnY: number;
  zoom: number;
  dragging: boolean;
  lastInputAt: number;
  gestureId: number;
}

export function createControlInput(): ControlInput {
  return {
    panX: 0,
    panY: 0,
    turnX: 0,
    turnY: 0,
    zoom: 0,
    dragging: false,
    lastInputAt: -Infinity,
    gestureId: 0,
  };
}

export interface ControlState {
  spin: THREE.Vector2; // angular velocity for inertia (x = yaw, y = pitch)
  zoomTarget: number | null; // target range in log space
  isFlying: boolean;
  flightProgress: number;
  flightDuration: number;
  flightStartRotation: THREE.Euler;
  flightTargetRotation: THREE.Euler;
}

export function createControlState(): ControlState {
  return {
    spin: new THREE.Vector2(0, 0),
    zoomTarget: null,
    isFlying: false,
    flightProgress: 0,
    flightDuration: 1.2,
    flightStartRotation: new THREE.Euler(),
    flightTargetRotation: new THREE.Euler(),
  };
}

export const MIN_CAMERA_RANGE = 80;
export const MAX_CAMERA_RANGE = 350;
export const DEFAULT_CAMERA_RANGE = 220;

/**
 * Attaches pointer and wheel event listeners to the canvas container.
 * Returns a cleanup unsubscribe function.
 */
export function attachOrbitControls(
  el: HTMLElement,
  input: ControlInput,
  onInterruptFlight?: () => void,
): () => void {
  const pointers = new Map<number, { x: number; y: number }>();
  let mode: "pan" | "turn" = "pan";
  let pinchDist = 0;

  const mark = () => {
    input.lastInputAt = performance.now();
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0 && e.button !== 2) return;
    el.setPointerCapture?.(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    mode = e.button === 2 || e.shiftKey || e.ctrlKey || e.metaKey ? "turn" : "pan";

    if (pointers.size === 2) {
      const pts = Array.from(pointers.values());
      pinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    }

    input.dragging = true;
    input.gestureId++;
    onInterruptFlight?.();
    mark();
  };

  const onPointerMove = (e: PointerEvent) => {
    const p = pointers.get(e.pointerId);
    if (!p) return;

    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    p.x = e.clientX;
    p.y = e.clientY;

    if (pointers.size >= 2) {
      const pts = Array.from(pointers.values());
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (pinchDist > 0 && d > 0) {
        input.zoom += Math.log(pinchDist / d) * 1.5;
      }
      pinchDist = d;
      input.panX += dx * 0.6;
      input.panY += dy * 0.6;
    } else if (mode === "turn") {
      input.turnX += dx;
      input.turnY += dy;
    } else {
      input.panX += dx;
      input.panY += dy;
    }
    mark();
  };

  const onPointerUp = (e: PointerEvent) => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchDist = 0;
    if (pointers.size === 0) {
      input.dragging = false;
    }
    mark();
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
    const delta = Math.max(-120, Math.min(120, e.deltaY * unit));
    input.zoom += delta * 0.0016;
    input.gestureId++;
    onInterruptFlight?.();
    mark();
  };

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  el.addEventListener("pointerdown", onPointerDown);
  el.addEventListener("pointermove", onPointerMove);
  el.addEventListener("pointerup", onPointerUp);
  el.addEventListener("pointercancel", onPointerUp);
  el.addEventListener("wheel", onWheel, { passive: false });
  el.addEventListener("contextmenu", onContextMenu);

  return () => {
    el.removeEventListener("pointerdown", onPointerDown);
    el.removeEventListener("pointermove", onPointerMove);
    el.removeEventListener("pointerup", onPointerUp);
    el.removeEventListener("pointercancel", onPointerUp);
    el.removeEventListener("wheel", onWheel);
    el.removeEventListener("contextmenu", onContextMenu);
  };
}

/** Smooth cubic ease in-out */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/**
 * Advances camera and globe rotation using input, inertia, smooth zoom, and fly-to flights.
 */
export function updateCameraAndGlobe(
  globeGroup: THREE.Group,
  camera: THREE.PerspectiveCamera,
  input: ControlInput,
  state: ControlState,
  dt: number,
  containerHeight: number,
): void {
  const safeDt = Math.max(0.001, Math.min(dt, 0.1));

  // 1. Camera Fly-To Animation (Great-Circle flight via spherical interpolation)
  if (state.isFlying) {
    state.flightProgress += safeDt / state.flightDuration;
    if (state.flightProgress >= 1) {
      state.flightProgress = 1;
      state.isFlying = false;
      globeGroup.rotation.y = state.flightTargetRotation.y;
      globeGroup.rotation.x = state.flightTargetRotation.x;
      state.spin.set(0, 0);
    } else {
      const t = easeInOutCubic(state.flightProgress);
      // Smoothly interpolate angles with shortest arc
      let diffY = state.flightTargetRotation.y - state.flightStartRotation.y;
      while (diffY > Math.PI) diffY -= Math.PI * 2;
      while (diffY < -Math.PI) diffY += Math.PI * 2;

      let diffX = state.flightTargetRotation.x - state.flightStartRotation.x;
      while (diffX > Math.PI) diffX -= Math.PI * 2;
      while (diffX < -Math.PI) diffX += Math.PI * 2;

      globeGroup.rotation.y = state.flightStartRotation.y + diffY * t;
      globeGroup.rotation.x = state.flightStartRotation.x + diffX * t;
      return;
    }
  }

  // 2. Direct Pan & Inertia
  // Compute radians of arc per pixel at current zoom
  const currentZ = camera.position.z;
  const fovRad = camera.fov * DEG;
  const radiansPerPx =
    (2 * currentZ * Math.tan(fovRad / 2)) / Math.max(1, containerHeight) / 60;

  if (input.panX !== 0 || input.panY !== 0) {
    const dYaw = input.panX * radiansPerPx * 0.85;
    const dPitch = input.panY * radiansPerPx * 0.85;

    globeGroup.rotation.y += dYaw;
    globeGroup.rotation.x = Math.max(
      -Math.PI / 2 + 0.05,
      Math.min(Math.PI / 2 - 0.05, globeGroup.rotation.x + dPitch),
    );

    // Track spin velocity for release inertia
    const weight = Math.min(1, safeDt / 0.04);
    state.spin.x = state.spin.x * (1 - weight) + (dYaw / safeDt) * weight;
    state.spin.y = state.spin.y * (1 - weight) + (dPitch / safeDt) * weight;

    input.panX = 0;
    input.panY = 0;
  } else if (!input.dragging && (Math.abs(state.spin.x) > 1e-5 || Math.abs(state.spin.y) > 1e-5)) {
    // Coasting inertia on release
    globeGroup.rotation.y += state.spin.x * safeDt;
    globeGroup.rotation.x = Math.max(
      -Math.PI / 2 + 0.05,
      Math.min(Math.PI / 2 - 0.05, globeGroup.rotation.x + state.spin.y * safeDt),
    );

    // Exponential damping
    const decay = Math.exp(-safeDt / 0.38);
    state.spin.multiplyScalar(decay);
  } else if (input.dragging) {
    // Dampen spin while holding still
    state.spin.multiplyScalar(Math.exp(-safeDt / 0.06));
  }

  // 3. Smooth Logarithmic Zoom
  if (input.zoom !== 0) {
    const curTarget = state.zoomTarget ?? Math.log(camera.position.z);
    state.zoomTarget = Math.max(
      Math.log(MIN_CAMERA_RANGE),
      Math.min(Math.log(MAX_CAMERA_RANGE), curTarget + input.zoom),
    );
    input.zoom = 0;
  }

  if (state.zoomTarget !== null) {
    const curLog = Math.log(camera.position.z);
    const nextLog = curLog + (state.zoomTarget - curLog) * (1 - Math.exp(-safeDt / 0.14));
    camera.position.z = Math.exp(nextLog);

    if (Math.abs(state.zoomTarget - nextLog) < 0.002) {
      camera.position.z = Math.exp(state.zoomTarget);
      state.zoomTarget = null;
    }
  }
}

/**
 * Initiates a smooth cinematic flight to target coordinates (lat, lon).
 */
export function startFlightTo(
  globeGroup: THREE.Group,
  camera: THREE.PerspectiveCamera,
  targetLat: number,
  targetLon: number,
  state: ControlState,
  duration = 1.3,
  targetZoomRange?: number,
): void {
  state.isFlying = true;
  state.flightProgress = 0;
  state.flightDuration = duration;
  state.flightStartRotation.copy(globeGroup.rotation);

  // Calculate target rotation so that (targetLat, targetLon) faces directly at camera (+Z)
  // Under latLonToWorld convention:
  //   latLonToWorld(lat, lon, r) -> x = r*cos(lat)*cos(lon), y = r*sin(lat), z = -r*cos(lat)*sin(lon)
  // To rotate that vector to face the camera at (0, 0, +Z):
  //   Yaw (rotation.y) aligns longitude: targetLon = 0 faces +X; to face +Z (+90° lon) requires:
  const targetYaw = -(targetLon * DEG + Math.PI / 2);
  const targetPitch = targetLat * DEG;

  state.flightTargetRotation.set(targetPitch, targetYaw, 0, "YXZ");
  state.spin.set(0, 0);

  if (targetZoomRange) {
    state.zoomTarget = Math.log(
      Math.max(MIN_CAMERA_RANGE, Math.min(MAX_CAMERA_RANGE, targetZoomRange)),
    );
  }
}

