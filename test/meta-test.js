
import assert from 'assert';
import parsePage from '../dist/index.js';

describe('Sample input', function()
{
  it('should parse most popular non OG and non TC metas', function()
  {
    assert.equal(
      JSON.stringify(parsePage(`
<!DOCTYPE html>
<html lang="LANG-failed">
<head>
<title>TITLE</title>
<link rel="canonical" href="https://CANONICAL/">
<meta name="description" content="desc">
<meta name="keywords" content="keyword1, keyword2">
<link rel="icon" href="/favicon.png">
<link rel="icon" sizes="256x256" href="/favicon-256.png">
<link rel="icon" sizes="16x16" href="/favicon-16.png">
<link rel="icon" sizes="512x512" href="/favicon-512.png">
<link rel="icon" sizes="64x64" href="/favicon-64.png">
</head>
<body>
</body>
</html>`)),
      '{"title":"TITLE","url":"https://CANONICAL/","description":"desc","locale":"LANG","keywords":["keyword1","keyword2"],"icon":"/favicon-512.png"}',
    );
  });

  it('should parse less popular non OG and non TC metas', function()
  {
    assert.equal(
      JSON.stringify(parsePage(`
<!DOCTYPE html>
<html>
<head>
<title>TITLE</title>
<meta name="url" content="https://URL/">
<meta name="language" content="LANG_failed">
<link rel="icon" href="/favicon.ico">
</head>
<body>
</body>
</html>`, 'https://baseurl')),
      '{"title":"TITLE","url":"https://URL/","locale":"LANG","icon":"https://baseurl/favicon.ico"}',
    );
  });

  it('should work with a complex website (Libre LGBT)', function()
  {
    assert.equal(
      JSON.stringify(parsePage(`
<!doctype html><html lang="fr" prefix="og: http://ogp.me/ns#"><head><meta charset="utf-8"><title>Libre LGBT - Réseau social pour LGBT+</title><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=6"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><link rel="manifest" href="/manifest.json"><meta name="description" content="Bienvenue sur Libre LGBT, le réseau social de la libre expression entre LGBT+. C'est totalement gratuit, avec forum, chat et carte interactive. C'est ouvert à tous !"><link type="text/plain" rel="author" href="https://www.libre-lgbt.fr/humans.txt"><meta name="image" content="/assets/brand/cover-centred.png"><link rel="preconnect dns-prefetch" href="https://backend.libre-lgbt.fr/"><link rel="preconnect dns-prefetch" href="https://piwik.libre-lgbt.fr/"><link rel="dns-prefetch" href="https://blog.libre-lgbt.fr/"><link rel="icon" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" sizes="194x194" href="/favicon-194x194.png"><link rel="icon" sizes="192x192" href="/android-chrome-192x192.png"><link rel="icon" sizes="16x16" href="/favicon-16x16.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2185d0"><meta name="apple-mobile-web-app-title" content="Libre LGBT"><meta name="apple-mobile-web-app-status-bar-style" content="black"><meta name="msapplication-TileColor" content="#2185D0"><meta name="msapplication-TileImage" content="/mstile-144x144.png"><meta name="msapplication-tooltip" content="Lancer Libre LGBT"><meta name="twitter:site" content="@LibreLGBT"><meta property="fb:pages" content="LibreLGBTRencontres"><meta property="fb:app_id" content="248822152392810"><meta property="og:title" content="Libre LGBT - Réseau social pour LGBT+"><meta property="og:description" content="Bienvenue sur Libre LGBT, le réseau social de la libre expression entre LGBT+. C'est totalement gratuit, avec forum, chat et carte interactive. C'est ouvert à tous !"><meta property="og:type" content="website"><meta property="og:site_name" content="Libre LGBT"><meta property="og:url" content="https://www.libre-lgbt.fr/"><meta property="og:locale" content="fr_FR"><meta property="og:image" content="https://www.libre-lgbt.fr/assets/brand/cover-centered.png"><meta name="twitter:card" content="summary"><meta name="twitter:text:title" content="Libre LGBT - Réseau social pour LGBT+"><meta name="twitter:title" content="Bienvenue sur Libre LGBT, le réseau social de la libre expression entre LGBT+. C'est totalement gratuit, avec forum, chat et carte interactive. C'est ouvert à tous !"><meta name="twitter:site" content="@LibreLGBT"><meta name="twitter:card" content="app"><meta name="twitter:description" content="Bienvenue sur Libre LGBT, le réseau social de la libre expression entre LGBT+. C'est totalement gratuit, avec forum, chat et carte interactive. C'est ouvert à tous !"><meta name="twitter:image" content="https://www.libre-lgbt.fr/assets/brand/cover-centered.png"><meta name="theme-color" content="#2185d0"><meta name="robots" content="index,follow"><link rel="canonical" href="https://www.libre-lgbt.fr/"><link href="/app.27e6a3b6af2cebfb1efb.css" rel="stylesheet"><link rel="preload" href="/app.27e6a3b6af2cebfb1efb.bundle.js" as="script"><link rel="prefetch" href="/app.27e6a3b6af2cebfb1efb.bundle.js"></head><body></body></html>
`, 'https://www.libre-lgbt.fr')),
      '{"title":"Libre LGBT - Réseau social pour LGBT+","type":"website","url":"https://www.libre-lgbt.fr/","description":"Bienvenue sur Libre LGBT, le réseau social de la libre expression entre LGBT+. C\'est totalement gratuit, avec forum, chat et carte interactive. C\'est ouvert à tous !","locale":"FR","sitename":"Libre LGBT","icon":"https://www.libre-lgbt.fr/favicon-194x194.png","image":"https://www.libre-lgbt.fr/assets/brand/cover-centered.png"}',
    );
  });
});

