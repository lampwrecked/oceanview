# OCEAN VIEW
Live surf/beach cams shattered into glitch confetti, weighted by live wave height (Open-Meteo Marine), with a GPU fluid overlay. Recomposes every 30 min.

## Deploy
Upload this folder to Vercel (or `vercel deploy` inside it). No build step â€” static index.html + one serverless function.

## Files
- index.html â€” the app. Cam roster is the CAMS array at the top.
- api/cam.js â€” HLS CORS proxy (server-side fetch, playlist URI rewrite, open CORS).
- surfcams.json â€” reference copy of the roster (app reads CAMS in index.html).

## Behaviour
- Boot: loading screen orders every cam by live wave height, tries them in that order (progress bar), and locks the first 10 that load. The set does not change until the recompose timer fires (SET tab) or you change rank/ocean/daylight.
- Not mouse-driven: the pointer never stirs the fluid. Tap/click a block to identify its cam.
- WAVES tab: each feed's swell is a travelling wave train (direction, wavelength from period, amplitude from height). Their interference continuously warps, tears, colour-splits, snaps and whitens the whole frame; pulse ripples and a slow whole-frame surge sit on top; the sustained swell force also stirs the fluid across the entire plane.
- Northeast US cams (Long Island / NYC / NJ) come from Coastal Camera Network. No public Connecticut stream was found.

## Studio (/studio)
Second version for making a video without depending on live streams. Open `/studio` (or `?studio`), let the 10 cams lock, pick a resolution, press RECORD 60s + RENDER 60s. It records every cam for 60s, swaps the live streams for those local clips, then renders 60s of the synthesizer offline on a fixed 30fps timeline (WebCodecs to MP4, WebM fallback) and downloads it. If the machine can't keep up it renders slower instead of dropping frames. Keep the tab in front and use current Chrome/Edge. Current TUNE/WAVES/FREEFORM settings are what get rendered. Rendering uses the settings as they are when you press the button.

## Keys
H hide HUD Â· F fullscreen Â· W toggle fluid Â· R record 4K webm Â· S save PNG

## Tuning (top of index.html)
CELL (block size at 1080p), MAX_ACTIVE, GLITCH_RATE, DYE_INJECT (how much fresh video per frame), CURL_STRENGTH, VEL_DISSIPATE, MAX_LIVE_W (live render cap)

## Notes
- Export is WebM. MP4: ffmpeg -i in.webm -c:v libx264 -crf 18 out.mp4
- Proxied video uses your Vercel bandwidth.
- Boot may test more than MAX_ACTIVE cams: a feed that passes then dies gets its slot backfilled.
- Fluid rule: each feed pushes its own blocks once per wave period, force from wave height, direction = swell travel direction in compass space (screen-up = north). Touch also stirs.

