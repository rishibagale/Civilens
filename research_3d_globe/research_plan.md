# Research Plan: Building a Proper 3D Interactive Earth Globe with Three.js

## Main Goal
Build a production-quality 3D Earth globe using Three.js that replaces MapLibre, with:
- Smooth rotation (stops when not interacted with)
- CSS-based labels that are crisp and always visible
- Proper filled polygon overlays (climate, biodiversity etc.)
- Camera fly-to animation when events/countries are selected
- Good-looking continent outlines with more detail

## Subtopics

### Subtopic 1: Three.js CSS2DRenderer for Labels
How to use Three.js CSS2DRenderer to render HTML labels that float above the globe. CSS2DRenderer renders DOM elements that overlay the 3D scene — they're crisp at any zoom, support Tailwind, and always face camera.

### Subtopic 2: Three.js ShapeGeometry for Polygon Overlays
How to properly render filled polygons on a sphere surface by projecting lat/lng circles onto 3D positions and using ShapeGeometry (or indexed BufferGeometry) so they render as filled semi-transparent shapes rather than disconnected lines.

### Subtopic 3: Smooth Camera Fly-To Animation
How to implement smooth camera orbit animation in Three.js to fly to a specific lat/lng on the globe — using quaternion slerp or manual tweening of camera position while keeping it looking at the globe center.

### Subtopic 4: High-Quality Continent/Terrain Data
Sources for more detailed GeoJSON coastline data (Natural Earth, etc.) that can be converted into Three.js line geometries, and how to use TopoJSON client to simplify shapes for performance.

### Subtopic 5: Event Selection Visual Effects
How to implement a pulse ring animation and camera fly-to when a user clicks an event on the timeline — animated marker glow, expanding rings, and coordinated camera movement.

## Expected Output
After research, I will produce a detailed implementation plan with:
- Code patterns for each fix
- npm packages needed (if any)
- Data sources for continent outlines
- Implementation order (what depends on what)