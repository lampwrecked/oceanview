// HLS CORS proxy — place at  api/cam.js  in a Vercel project.
// Streams segments straight through (no buffering, so no 4.5 MB response cap),
// rewrites playlist URIs to route back through itself, and adds open CORS.
// Also rescues http:// sources by fetching them server-side.

export const config = { maxDuration: 30 };

const CORS = { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' };

export async function GET(request) {
  const target = new URL(request.url).searchParams.get('u');
  if (!target || !/^https?:\/\//i.test(target)) {
    return new Response('missing or invalid ?u=', { status: 400, headers: CORS });
  }
  try {
    const upstream = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SwellCollage/1.0)',
        'Referer': new URL(target).origin + '/'
      },
      signal: AbortSignal.timeout(25000)
    });
    if (!upstream.ok) return new Response('upstream ' + upstream.status, { status: upstream.status, headers: CORS });

    const ct = upstream.headers.get('content-type') || '';
    const isPlaylist = /\.m3u8(\?|$)/i.test(target) || /mpegurl/i.test(ct);

    if (isPlaylist) {
      const text = await upstream.text();
      const base = new URL(upstream.url || target);
      const wrap = (uri) => '/api/cam?u=' + encodeURIComponent(new URL(uri, base).href);
      const rewritten = text.split('\n').map((line) => {
        const t = line.trim();
        if (!t) return line;
        if (t.startsWith('#')) return line.replace(/URI="([^"]+)"/g, (_, uri) => `URI="${wrap(uri)}"`);
        return wrap(t);
      }).join('\n');
      return new Response(rewritten, { status: 200, headers: { ...CORS, 'Content-Type': 'application/vnd.apple.mpegurl' } });
    }

    // segment: pipe the body through without buffering
    return new Response(upstream.body, { status: 200, headers: { ...CORS, 'Content-Type': ct || 'video/mp2t' } });
  } catch (e) {
    return new Response('proxy fetch failed', { status: 502, headers: CORS });
  }
}
