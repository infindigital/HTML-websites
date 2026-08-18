# Design Reference — ORYZO AI

Inspiration/style reference for this site. Not wired into the build — it documents
the visual direction to draw from.

**Direction:** Darkroom product editorial — a lone object floating in warm darkness,
cream typography as the only decoration, one vivid orange used sparingly.

| File | What it is |
| --- | --- |
| `DESIGN.md` | Full style spec — palette rationale, type scale, layout modes |
| `tokens.json` | Design tokens (source of truth) |
| `variables.css` | Tokens as CSS custom properties (`:root`) |
| `theme.css` | Same tokens in a Tailwind `@theme` block |

To adopt it, pull the palette and type tokens from `variables.css` into
`../css/styles.css`.
