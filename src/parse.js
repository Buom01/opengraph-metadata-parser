function isspace(c)
{
  return (/\s/.test(c));
}

function isnot(c, tab)
{
  return (
    tab.findIndex(
      (val) =>
        (val === c),
    ) === -1
  );
}

function parseTagAttributes(str)
{
  const l = str.length;
  let anchor;
  let i = 5;
  const keypair = {};
  let key;

  while (isnot(str[i], ['/', '>']) && i < l)
  {
    while (isspace(str[i]) && i < l)
      ++i;
    anchor = i;
    while (isnot(str[i], ['=', '/', '>']) && i < l)
      ++i;
    if (i - anchor === 0)
      break;
    key = str.substring(anchor, i).toLowerCase();
    if (str[i] !== '=')
      keypair[key] = true;
    else
    {
      ++i;
      if (str[i] === '"' && i < l)
      {
        ++i;
        anchor = i;
        while (str[i] !== '"' && i < l)
          ++i;
        keypair[key] = str.substring(anchor, i);
        ++i;
      }
      else
      {
        anchor = i;
        while (!isspace(str[i]) && isnot(str[i], ['/', '>']) && i < l)
          ++i;
        keypair[key] = str.substring(anchor, i);
      }
    }
    ++i;
  }

  return keypair;
}

export default parseTagAttributes;
