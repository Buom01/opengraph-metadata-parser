# OpenGraph and MetaData parser
Parse HTML metadata (including OpenGraph and TwitterCard) in NodeJS and Browser compatible JavaScript. It's about 12.7 kB gzipped and support a large HTML encoded entities.

## Installation
```shell
$ npm i --save opengraph-metadata-parser
```
## API
### parsePage (exported as default)

Arguments: (html, baseUrl)

Return value: Object

Description:
> Take `html` source-code of a page along its `baseUrl` which is the website main URL with the proto (as https://) but without the trailing slash.
> It return an Object with key that are independant and may be `undefined`, `String`, and sometime `Integer`, `Array` of `String`.

Possible returned keys are:
- `title`
- `type` (from "og:type")
- `url` (page URL in a convenient format)
- `description`
- `determinent` (from "og:determinet")
- `locale` (as "EN", "FR", ...)
- `sitename` (from "og:site_name")
- `keywords` (Array of String)
- `icon` (URL, the highest resolution one)
- `image` (URL)
- `image_type` (mime types)
- `image_width` (Integer)
- `image_height` (Integer)
- `image_alt`
- `video` (URL) / `video_type` / `video_width` / `video_height` / `video_alt`
- `audio` (URL) / `audio_title` / `audio_type`

See `src/index.js` for more informations

## Usage example

```javascript
import parsePage from 'opengraph-metadata-parser';

const {locale} = parsePage("<html lang="FR_fr"></html>", "https://mainsite.fr");

console.log(locale);
// print: FR
```


## Efficiency
- It may detect tag in most cases without any issue. It also decode HTML5 chars.
- It may parse tag that must not be parsed as commented one. It shouldn't be problematic as no serious website use comments in production code.
- As it DO NOT use any (virtual) DOM, it may be a lot faster that other similar project.
- For furthere information, read source code.

## Tests
I did some basic test to ensure a minimum quality. They are not so much enforced but may be enough for the most cases. See `test` folder for further informations.

