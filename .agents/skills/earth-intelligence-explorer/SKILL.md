---
name: earth-intelligence-explorer
description: Guides the architecture, mathematical principles, and implementation patterns for Curios (Civilens) 3D planetary exploration, including off-axis lens shift framing, geodetic conversions, vector horizon occlusion, and in-memory spatial proximity indexing.
---

# Earth Intelligence Explorer Skill

This skill documents the reformed exploration architecture of **Curios (Civilens)**, designed for interactive humanistic and anthropological planetary navigation.

## Core Architecture Overview

```
User Pointer / Touch
       │
       ▼
[Gesture Slop Recognition] ──(>5px or >500ms)──► Orbit Inertia / Coasting
       │
  (<=5px & <=500ms)
       │
       ▼
[Surface Raycast (pickSurface)]
       │
       ├──► Hits Marker (Country / Event / City) ──► Activate Entity
       │
       └──► Hits Earth Sphere ──► [In-Memory Proximity Indexer]
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
         Match < 250 km                                No Match (Wilderness / Sea)
   Select Nearest Historical Site                Display Geodetic Coordinates Locus
```

---

## 1. Off-Axis Optical Lens Shift Framing

When a side inspection drawer (such as `CountryPanel` [480px] or `EventDetailPanel` [520px]) opens on desktop, centering the globe at $(0, 0)$ in normalized device coordinates (NDC) causes the selected site to be obscured behind the panel.

Instead of translating the Three.js camera in world space (which warps perspective and complicates orbital math), Curios applies an **optical lens shift** to the camera's projection matrix.

### Mathematical Formulation

In Three.js `PerspectiveCamera`, the projection matrix is stored in column-major order:
- `projectionMatrix.elements[8]` is $m_{13}$ (horizontal shear / optical center offset).
- `projectionMatrix.elements[9]` is $m_{23}$ (vertical shear / optical center offset).

When a panel of width $W_{panel}$ opens on a container of width $W_{screen}$:
$$shiftX = \frac{W_{panel}}{W_{screen}} \times 0.95$$

```typescript
export function applyLensShift(
  camera: THREE.PerspectiveCamera,
  shiftX: number,
  shiftY: number,
): void {
  camera.projectionMatrix.elements[8] = shiftX;
  camera.projectionMatrix.elements[9] = shiftY;
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}
```

Updating `camera.projectionMatrixInverse` ensures that Three.js raycasting (`raycaster.setFromCamera(mouse, camera)`) remains 100% pixel-accurate without requiring any coordinate compensation.

In the render loop, the shift is smoothed exponentially:
```typescript
const shiftSmoothing = 1 - Math.exp(-dt / 0.18);
currentShiftX += (targetShiftX - currentShiftX) * shiftSmoothing;
currentShiftY += (targetShiftY - currentShiftY) * shiftSmoothing;
applyLensShift(camera, currentShiftX, currentShiftY);
```

---

## 2. Geodetic & Spherical Coordinates

All conversions between geodetic latitude/longitude and Cartesian world coordinates follow the equirectangular alignment convention in `src/lib/geoMath.ts`:

- $(lat: 0°, lon: 0°) \rightarrow (+R, 0, 0)$
- $(lat: +90°, lon: any) \rightarrow (0, +R, 0)$ (North Pole)
- $(lat: 0°, lon: 90° E) \rightarrow (0, 0, -R)$
- $(lat: 0°, lon: 90° W) \rightarrow (0, 0, +R)$

```typescript
export function latLonToWorld(
  latDeg: number,
  lonDeg: number,
  radius = 60,
  out = new THREE.Vector3(),
): THREE.Vector3 {
  const lat = latDeg * (Math.PI / 180);
  const lon = lonDeg * (Math.PI / 180);
  const c = Math.cos(lat);
  return out.set(
    radius * c * Math.cos(lon),
    radius * Math.sin(lat),
    -radius * c * Math.sin(lon),
  );
}
```

---

## 3. Vector Horizon Occlusion

Screen-space DOM labels, pins, and the Astrolabe Locus Ring on the far side of the Earth must be hidden before they project through the sphere.

Given camera position $\vec{c}$, target position $\vec{p}$, and globe radius $R$:
1. Form ray direction $\vec{d} = \vec{p} - \vec{c}$.
2. Compute the parameter of closest approach to the Earth's center on the line segment:
   $$t_{min} = -\frac{\vec{c} \cdot \vec{d}}{|\vec{d}|^2}$$
3. If $0 < t_{min} < 1$, the closest point lies strictly on the line segment between the camera and the target. The squared distance to the globe center is:
   $$d_{min}^2 = |\vec{c}|^2 - \frac{(\vec{c} \cdot \vec{d})^2}{|\vec{d}|^2}$$
   If $d_{min}^2 < R^2$, the line of sight penetrates the Earth and the point is occluded.
4. For surface points near the horizon ($t_{min} \ge 1$), a surface normal dot product test $\vec{p} \cdot (\vec{c} - \vec{p}) \le 0$ determines visibility.
5. In `GlobeOverlay.tsx`, occlusion is tested against the surface anchor ($R = 60$) rather than elevated visual offsets to prevent horizon clipping delay.

```typescript
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

  _occP.copy(worldPos);
  return _occP.dot(_occD.copy(camPos).sub(worldPos)) <= 0;
}
```

---

## 4. Screen-Space DOM Overlay & Zero-React-Re-Render Telemetry

Rendering 2D text via Three.js `CanvasTexture` sprites causes GPU texture bloat and blur at high DPI.

Curios solves this with two decoupled presentation systems:
- **Screen-Space DOM Overlay (`GlobeOverlay.tsx`)**:
  - HTML text elements are styled with Tailwind, drop-shadows, and crisp typography.
  - Multi-tier LOD declutters hierarchically (civilizational cradles globally, metropolises $\le 14,000\text{ km}$, 45px collision spacing guard).
  - Positions are mutated directly on DOM nodes using `style.transform = translate3d(px, py, 0)`.
  - Visibility is toggled via `style.display = 'none' | 'flex'`.
- **Imperative Telemetry Handle (`CoordinateTelemetry.tsx`)**:
  - Live coordinates and camera altitude mutate DOM text spans directly via `CoordinateTelemetryHandle` without triggering React component tree re-renders.
  - The React component tree experiences **zero re-renders** during 60 FPS camera motion, mousemove survey, or zoom.

---

## 5. Gesture Slop Filtering

To distinguish between a click selection and an orbit drag gesture:
- Pointer down records $(x_0, y_0, t_0)$.
- Pointer move tracks total displacement $\Delta = \sqrt{(x - x_0)^2 + (y - y_0)^2}$.
- If $\Delta > 5\text{px}$ or duration $> 500\text{ms}$, the gesture is marked as an orbit drag.
- On pointer up: only fire selection if $\Delta \le 5\text{px}$ and duration $\le 500\text{ms}$.
- A capture-phase click listener cancels and stops propagation of native browser click events if the threshold was exceeded, eliminating accidental selection upon drag release.

---

## 6. In-Memory Geohistorical Proximity Indexer

When clicking any point on the globe:
- `findNearestEntity(lat, lon, maxDistanceKm = 250)` searches across `countriesData`, `historicalCities`, and `historicalEvents`.
- Uses Haversine spherical distance.
- Pre-indexes targets on first access for $< 0.1\text{ms}$ query latency.
- If no entity is within 250 km (wilderness or ocean), displays raw geodetic coordinates and dismisses open detail panels.
