# url-shortening-app

REST API for url shortening via Express

## Setup

Installing dependencies and devDependencies

```sh
npm install
```

Starting the server

```sh
npm start
```

Starting the server (development)

```sh
npm run dev
```

Running unit tests

```sh
npm test
```

## API Endpoints

### POST /encode

body:
| name | required | type | description |
|------|----------|--------|-------------|
| url | yes | string or array of strings | A valid URL format (starting with 'http:' or 'https:') |

e.g.:

```sh
{ "url": "http://google.com" }
```

or

```sh
{ "url": ["http://google.com", "http://facebook.com"] }
```

response:

```sh
{ "url": <encoded_url> }
```

or

```sh
{ "url": [<encoded_url>, <encoded_url>] }
```

e.g.:

```sh
{ "url": "https://tpx.com/abcdefgh" }
```

or

```sh
{ "url": ["https://tpx.com/abcdefgh", "https://tpx.com/ijklmnop"] }
```

### POST /decode

body:
| name | required | type | description |
|------|----------|--------|-------------|
| url | yes | string or array of strings | A valid URL format (starting with 'http:' or 'https:') |

e.g.:

```sh
{ "url": "https://tpx.com/abcdefgh" }
```

or

```sh
{ "url": ["https://tpx.com/abcdefgh", "https://tpx.com/ijklmnop"] }
```

response:

```sh
{ "url": <decoded_url> }
```

or

```sh
{ "url": [<decoded_url>, <decoded_url>] }
```

e.g.:

```sh
{ "url": "http://google.com" }
```

or

```sh
{ "url": ["http://google.com", "http://facebook.com"] }
```

N.B.: A url can be decoded only if exists (was encoded previously by POST /encode)
