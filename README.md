# url-shortening-app

REST API for url shortening via Express

## Terminal commands

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

parameters:
| name | required | type | description |
|------|----------|--------|-------------|
| url | yes | string | A valid URL format (starting with 'http:' or 'https:' |

e.g.:

```sh
{ url: "http://google.com" }
```

response:

```sh
{ url: <encoded_url> }
```

e.g.:

```sh
{ url: "https://tpx.com/abcdefgh" }
```

### POST /decode

parameters:
| name | required | type | description |
|------|----------|--------|-------------|
| url | yes | string | A valid URL format (starting with 'http:' or 'https:' |

e.g.:

```sh
{ url: "https://tpx.com/abcdefgh" }
```

response:

```sh
{ url: <decoded_url> }
```

e.g.:

```sh
{ url: "http://google.com" }
```

N.B.: A url can be decoded only if exists (was encoded previously by POST /encode)
