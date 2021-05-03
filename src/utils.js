import unescape from './unescape.js';


function absoluteUrl(base, path)
{
  if (!path)
    return undefined;

  if (path.match(/^[a-z-]{2,16}:\/\//i) || !base)
    return path;
  return (base + path);
}

function getFromTag(tags, key, value, propToGet)
{
  const propValue = (
    tags.find(
      (tag) =>
        (tag[key] === value.toLowerCase()),
    ) || {}
  )[propToGet];

  return (propValue && unescape(propValue));
}

function getBestIcon(linkTags)
{
  return (
    (linkTags.filter(
      (tag) =>
        (tag.rel === 'icon'),
    ).map(
      ({sizes, href}) =>
        ({
          size: ((sizes)
            ? parseInt(sizes.split('x')[0])
            : 0),
          href,
        }),
    ).sort(
      (first, second) =>
        (second.size - first.size),
    )[0] || {}).href
  );
}

function uniformizeSize(size)
{
  if (!size)
    return undefined;

  return (parseInt(size) || undefined);
}

function uniformizeLang(lang)
{
  if (!lang)
    return undefined;

  return lang.split('-')[0].split('_')[0].toUpperCase();
}

function uniformizeKeywords(keywords)
{
  if (!keywords)
    return undefined;

  return keywords.split(',').map(
    (keyword) =>
      keyword.trim(),
  );
}

export {
  absoluteUrl,
  getFromTag,
  getBestIcon,
  uniformizeSize,
  uniformizeLang,
  uniformizeKeywords,
};
