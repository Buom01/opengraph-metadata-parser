import {
  absoluteUrl,
  getFromTag,
  getBestIcon,
  uniformizeSize,
  uniformizeLang,
  uniformizeKeywords,
} from './utils.js';
import unescape from './unescape.js';
import parseTagAttributes from './parse.js';


function parsePage(html, baseUrl)
{
  const metaTags = (html.match(/<meta[^>]+>/gmi) || [])
    .map(parseTagAttributes);
  const linkTags = (html.match(/<link[^>]+>/gmi) || [])
    .map(parseTagAttributes);
  const htmlTag = (html.match(/<html[^>]*>/gmi) || [])
    .map(parseTagAttributes)[0];
  const [, rawTitle] = /<title[^>]*>([^<]+)<\/title>/gmi.exec(html)
    || [undefined, undefined];
  const title = rawTitle ? unescape(rawTitle) : undefined;

  return ({
    title: (
      getFromTag(metaTags, 'property', 'og:title', 'content')
      || getFromTag(metaTags, 'name', 'twitter:title', 'content')
      || title
    ),
    type: (
      getFromTag(metaTags, 'property', 'og:type', 'content')
    ),
    url: absoluteUrl(baseUrl, (
      getFromTag(metaTags, 'property', 'og:url', 'content')
      || getFromTag(linkTags, 'rel', 'shortlink', 'href')
      || getFromTag(linkTags, 'rel', 'canonical', 'href')
      || getFromTag(metaTags, 'name', 'url', 'content')
    )),
    description: (
      getFromTag(metaTags, 'property', 'og:description', 'content')
      || getFromTag(metaTags, 'name', 'twitter:description', 'content')
      || getFromTag(metaTags, 'name', 'description', 'content')
    ),
    determiner: (
      getFromTag(metaTags, 'property', 'og:determiner', 'content')
    ),
    locale: uniformizeLang(
      getFromTag(metaTags, 'property', 'og:locale', 'content')
      || getFromTag(metaTags, 'name', 'language', 'content')
		|| (htmlTag && htmlTag.lang),
    ),
    sitename: (
      getFromTag(metaTags, 'property', 'og:site_name', 'content')
    ),
    keywords: uniformizeKeywords(
      getFromTag(metaTags, 'name', 'keywords', 'content'),
    ),
    icon: absoluteUrl(baseUrl, (
      getBestIcon(linkTags)
    )),
    image: absoluteUrl(baseUrl, (
      getFromTag(metaTags, 'property', 'og:image:secure_url', 'content')
      || getFromTag(metaTags, 'property', 'og:image:url', 'content')
      || getFromTag(metaTags, 'property', 'og:image', 'content')
      || getFromTag(metaTags, 'name', 'twitter:image', 'content')
      || getFromTag(metaTags, 'name', 'image', 'content')
      || getFromTag(metaTags, 'name', 'thumbnail', 'content')
    )),
    image_type: (
      getFromTag(metaTags, 'property', 'og:image:type', 'content')
      || getFromTag(metaTags, 'name', 'twitter:image:type', 'content')
    ),
    image_width: uniformizeSize(
      getFromTag(metaTags, 'property', 'og:image:width', 'content')
      || getFromTag(metaTags, 'name', 'twitter:image:width', 'content'),
    ),
    image_height: uniformizeSize(
      getFromTag(metaTags, 'property', 'og:image:height', 'content')
      || getFromTag(metaTags, 'name', 'twitter:image:height', 'content'),
    ),
    image_alt: (
      getFromTag(metaTags, 'property', 'og:image:alt', 'content')
      || getFromTag(metaTags, 'name', 'twitter:image:alt', 'content')
    ),
    video: absoluteUrl(baseUrl, (
      getFromTag(metaTags, 'property', 'og:video:secure_url', 'content')
      || getFromTag(metaTags, 'property', 'og:video:url', 'content')
      || getFromTag(metaTags, 'property', 'og:video', 'content')
      || getFromTag(metaTags, 'name', 'twitter:player:stream', 'content')
    )),
    video_type: (
      getFromTag(metaTags, 'property', 'og:video:type', 'content')
      || getFromTag(metaTags, 'name', 'twitter:player:type', 'content')
    ),
    video_width: uniformizeSize(
      getFromTag(metaTags, 'property', 'og:video:width', 'content')
      || getFromTag(metaTags, 'name', 'twitter:player:width', 'content'),
    ),
    video_height: uniformizeSize(
      getFromTag(metaTags, 'property', 'og:video:height', 'content')
      || getFromTag(metaTags, 'name', 'twitter:player:height', 'content'),
    ),
    video_alt: (
      getFromTag(metaTags, 'property', 'og:video:alt', 'content')
      || getFromTag(metaTags, 'name', 'twitter:player:alt', 'content')
    ),
    audio: absoluteUrl(baseUrl, (
      getFromTag(metaTags, 'property', 'og:audio:secure_url', 'content')
      || getFromTag(metaTags, 'property', 'og:audio:url', 'content')
      || getFromTag(metaTags, 'property', 'og:audio', 'content')
    )),
    audio_title: (
      getFromTag(metaTags, 'property', 'og:audio:title', 'content')
    ),
    audio_type: (
      getFromTag(metaTags, 'property', 'og:audio:type', 'content')
    ),
  });
}

export default parsePage;
