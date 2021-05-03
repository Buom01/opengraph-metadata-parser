import {characterEntities} from 'character-entities';

function convertBaseTen(_, nb)
{
  return (String.fromCharCode(parseInt(nb)));
}

function convertBaseHex(_, nb)
{
  return (String.fromCharCode(parseInt(nb, 16)));
}

function convertName(_, name)
{
  return (characterEntities[name] || name);
}

function unescape(str)
{
  // Replace &amp; would be catch by nextly regex
  return (
    str
      .replace(/&#x([0-9a-z]{1,16});/gi, convertBaseTen)
      .replace(/&#([0-9]{1,16});/gi, convertBaseHex)
      .replace(/&([a-z0-9]{1,16});?/gi, convertName)
  );
}

export default unescape;
