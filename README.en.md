<p align="right"><a href="README.md">中文</a> | <b>English</b></p>

# QIEZI X1 · Interactive 3D Demos

> ### A ten-thousand-yuan-class embodied emotional-interaction robot — free to claim, worldwide.
> **OpenClaw grew hands and feet in the virtual world; we grew a head and hands in the physical world.**
> **Jensen Huang says Physical AI's ChatGPT moment has arrived — it's us.**

> **Global Offline Delivery Centers · Rolling out nationwide (coming soon)**
>
> Our offline smart-robot delivery stores are being established and fitted out across the country. City-by-city store addresses will be published progressively — domestic visitors are welcome to drop by in person for an immersive, full-dimension experience of an embodied emotional-interaction robot.
>
> On-site live experience, real human interaction testing, full-feature live demos — stay tuned.

> Website: [CoreXbot.ai](https://CoreXbot.ai)
>
> Field demos: [TikTok](https://www.tiktok.com/@alankwok516/video/7660736349024029959?is_from_webapp=1&sender_device=pc) ｜ [YouTube Shorts](https://youtube.com/shorts/mXssJ0xu4No?feature=share)
>
> Live demo & sign-up page: <https://corefusionbot.github.io/qiezi-x1-3d-demos/> (3D demo entry + in-page sign-up form)
>
> Free-robot guide: [online page-by-page preview (bilingual, 5 pages)](#free-robot-guide-bilingual-page-by-page-preview) ｜ [download original PDF](https://raw.githubusercontent.com/corefusionbot/qiezi-x1-3d-demos/main/docs/free-robot-guide-bilingual.pdf)

<p align="center">
  <a href="https://forms.gle/UL3ojft8bHjyTcW58" target="_blank" rel="noopener"><img src="assets/apply-badge.svg" alt="Apply Now · 立即申领登记" width="300" /></a>
</p>
<p align="center"><sub>Free-robot sign-up: Name · Country/Region · Email · Phone (click the button above to open the form; accessing Google from mainland China may require your own network)</sub></p>

<p align="center">
  <img src="assets/showcase-3.jpg" width="30%" alt="QIEZI X1 structural shell prototype" />
  <img src="assets/showcase-2.jpg" width="30%" alt="QIEZI X1 bionic head-and-neck prototype" />
  <img src="assets/showcase-1.jpg" width="30%" alt="QIEZI X1 concept render" />
</p>

## Contact

**Overseas:** AlanKwok@coreXbot.ai

**Mainland China:** AlanKwok@corefusion.cn ｜ AlanKwok@corefusionbot.com

Two offline-capable interactive demos (algorithm/UI need no network; the 3D avatar model is bring-your-own, see below). Open the landing page `index.html` first:

| Page | Content |
|---|---|
| `index.html` | **Landing page**: entry cards for the two demos + honesty-boundary notes (zh/EN toggle) |
| `servo18-console.html` | **18-Servo Face Control Console**: real-time expressions on a 3D female head, 7+10 emotion presets, expression variants / naturalness / mood layer / dialogue transitions / telemetry health / three trajectory profiles, protocol-v2 frame-byte preview, full e-stop-hold semantics |
| `arm-console.html` | **Dual-Arm 8-Servo Console**: same 3D character driven by skeletal bones, 7 gestures (wave / point / open-arms / raise-hand / applaud / salute / home), coordination layer (synced stepping / anticipation-follow / neck-expression cueing), pose interlock, mirror / e-stop, protocol-v2 frame preview |

## 3D Model (bring your own — not bundled in this repo)

The `models/` directory **does not include** `avatar.glb` (a third-party CC0 female head model, ~35 MB, not distributed with the repo).
Place a compatible GLB at `models/avatar.glb` per [`models/README.md`](models/README.md) to see the 3D character —
without a model, `servo18-console.html` shows a "head model not bundled" notice and leaves the 3D area empty, while `arm-console.html` automatically falls back to a 2D stick figure. The sliders / emotions / protocol frames / gestures and other **algorithm demos on both pages are unaffected**.

## Run (Windows, zero dependencies)

**Double-click `start-demo.bat`** — it starts a local server (port 8092) and opens the browser (landing page).
The top-left of each console links back to the landing page. To stop: close the black console window.

- Port busy? `powershell -ExecutionPolicy Bypass -File serve.ps1 8093`, then open `http://127.0.0.1:8093/` manually.
- With Python installed: `python -m http.server 8092`, then open the same address.
- You cannot open the HTML files directly by double-clicking (browsers block ES modules and model loading over `file://`; a local http server is required).

## Package Contents & License

- `vendor/` — a local copy of three.js 0.160.0 (MIT license) with its loaders/transcoders, for offline 3D rendering.
- `realism.js` — a shared render-level realism module (skin physics / wet cornea / procedural pore normals).
- `servo18-console.html` / `arm-console.html` are offline copies of the identically named pages in the original project's `avatar_sim/` (CDN references switched to the local `vendor/`, the network-dependent fallback head model removed; algorithm constants match the original project value-for-value, snapshot date below). `index.html` is a landing page exclusive to this repo (source file `avatar_sim/demos-landing.html`, renamed to `index.html` at packaging time).

The original parts of this repo (`index.html` / `servo18-console.html` / `arm-console.html` / `realism.js` / `serve.ps1`, etc.) are open-sourced under the [Apache License 2.0](LICENSE); `vendor/` (three.js, MIT) retains its upstream license and is not affected by this repo's LICENSE.

## Free Robot Guide (Bilingual Page-by-Page Preview)

> Page-by-page image preview (viewable directly by any visitor / on mobile, without relying on GitHub's PDF viewer); for the original file see [download original PDF](https://raw.githubusercontent.com/corefusionbot/qiezi-x1-3d-demos/main/docs/free-robot-guide-bilingual.pdf).

<p align="center">
  <img src="docs/pages/guide-01.png" width="80%" alt="Free robot guide page 1" />
  <img src="docs/pages/guide-02.png" width="80%" alt="Free robot guide page 2" />
  <img src="docs/pages/guide-03.png" width="80%" alt="Free robot guide page 3" />
  <img src="docs/pages/guide-04.png" width="80%" alt="Free robot guide page 4" />
  <img src="docs/pages/guide-05.png" width="80%" alt="Free robot guide page 5" />
</p>

## Honesty Boundary

- Everything here is a **software simulation**: no real hardware attached — servo angles / protocol frames / telemetry are same-formula software mirrors; the 3D character uses schematic-level bone driving (swing/twist alignment, no collision bodies or forearm-twist control).
- **The 3D head model file is not bundled** (see the section above); the rest is a **snapshot** of the original project repo at a point in time (2026-07-08), and later updates to the original project do not sync automatically into this repo.

—— QIEZI X1 project · 3D demo subset (generation method: see the original project repo `docs/X1整机开发方案.md` §4)
