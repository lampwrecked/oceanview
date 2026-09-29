# OCEAN VIEW
Live surf/beach cams shattered into glitch confetti, weighted by live wave height (Open-Meteo Marine), with a GPU fluid overlay. Recomposes every 30 min.

## Deploy
Upload this folder to Vercel (or `vercel deploy` inside it). No build step — static index.html + one serverless function.

## Files
- index.html — the app. Cam roster is the CAMS array at the top.
- api/cam.js — HLS CORS proxy (server-side fetch, playlist URI rewrite, open CORS).
- surfcams.json — reference copy of the roster (app reads CAMS in index.html).

## Behaviour
- Boot: loading screen orders every cam by live wave height, tries them in that order (progress bar), and locks the first 10 that load. The set does not change until the recompose timer fires (SET tab) or you change rank/ocean/daylight.
- Not mouse-driven: the pointer never stirs the fluid. Tap/click a block to identify its cam.
- WAVES tab: each feed's swell is a travelling wave train (direction, wavelength from period, amplitude from height). Their interference continuously warps, tears, colour-splits, snaps and whitens the whole frame; pulse ripples and a slow whole-frame surge sit on top; the sustained swell force also stirs the fluid across the entire plane.
- Northeast US cams (Long Island / NYC / NJ) come from Coastal Camera Network. No public Connecticut stream was found.

## Keys
H hide HUD · F fullscreen · W toggle fluid · R record 4K webm · S save PNG

## Tuning (top of index.html)
CELL (block size at 1080p), MAX_ACTIVE, GLITCH_RATE, DYE_INJECT (how much fresh video per frame), CURL_STRENGTH, VEL_DISSIPATE, MAX_LIVE_W (live render cap)

## Notes
- Export is WebM. MP4: ffmpeg -i in.webm -c:v libx264 -crf 18 out.mp4
- Proxied video uses your Vercel bandwidth.
- Boot may test more than MAX_ACTIVE cams: a feed that passes then dies gets its slot backfilled.
- Fluid rule: each feed pushes its own blocks once per wave period, force from wave height, direction = swell travel direction in compass space (screen-up = north). Touch also stirs.
