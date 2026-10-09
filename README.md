# OCEAN VIEW
Live surf/beach cams shattered into glitch confetti, weighted by live wave height (Open-Meteo Marine), with a GPU fluid overlay. Recomposes every 30 min.

## Deploy
Upload this folder to Vercel (or `vercel deploy` inside it). No build step — static index.html + one serverless function.

## Files
- index.html — the app. Cam roster is the CAMS array at the top.
- api/cam.js — HLS CORS proxy (server-side fetch, playlist URI rewrite, open CORS).
- surfcams.json — reference copy of the roster (app reads CAMS in index.html).

## Public build
No video or image export, no studio. Starts with FLUID, SPLAT and SMEAR at maximum and pixel size 180. The loading screen warns that start-up can take several minutes.

## Behaviour
- Boot: loading screen orders every cam by live wave height, tries them in that order (progress bar), and locks the first 10 that load. The set does not change until the recompose timer fires (SET tab) or you change rank/ocean/daylight.
- Not mouse-driven: the pointer never stirs the fluid. Tap/click a block to identify its cam.
- Wave effects (swell warp, tear, chroma split, foam, rings, sustained swell force) run at fixed defaults; there is no WAVES tab in the public build.
- Northeast US cams (Long Island / NYC / NJ) come from Coastal Camera Network. No public Connecticut stream was found.

## Keys
H hide HUD · F fullscreen · W toggle fluid · X shuffle grid · tap a block to identify its cam

## Tuning (top of index.html)
CELL (block size at 1080p), MAX_ACTIVE, GLITCH_RATE, DYE_INJECT (how much fresh video per frame), CURL_STRENGTH, VEL_DISSIPATE, MAX_LIVE_W (live render cap)

## Notes
- Proxied video uses your Vercel bandwidth.
- Boot may test more than MAX_ACTIVE cams: a feed that passes then dies gets its slot backfilled.
- Fluid rule: each feed pushes its own blocks once per wave period, force from wave height, direction = swell travel direction in compass space (screen-up = north).

