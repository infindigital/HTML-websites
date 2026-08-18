# Test 3D Website

A small static test site with a live WebGL scene rendered by [Three.js](https://threejs.org/).

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Page markup, import map for Three.js |
| `css/styles.css` | Layout, typography, overlay panels |
| `js/main.js` | Scene, lights, instanced cube field, scroll/pointer camera |
| `js/vendor/three.module.js` | Vendored Three.js r170 (MIT) |

## Running it

No build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000 --directory test-3d-website
# then visit http://localhost:8000
```

Three.js r170 is vendored under `js/vendor/`, so the site is fully self-contained and
needs no internet access. If the module ever fails to load, the page falls back to a
plain gradient background and stays readable.

## Interaction

- **Scroll** — flies the camera in past the torus knot.
- **Pointer move** — eases the camera left/right and up/down.
- `prefers-reduced-motion` freezes the animation while keeping the scene rendered.

## Tweaking

Colours live in the `:root` block of `css/styles.css`; geometry, light colours and the
`CUBES` count live at the top of `js/main.js`.
