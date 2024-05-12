# opencc-workers

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/rwv/opencc-workers/deploy.yml)
![Swagger Validator](https://img.shields.io/swagger/valid/3.0?specUrl=https%3A%2F%2Fopencc-workers.rwv.workers.dev%2Fopenapi.json)


[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rwv/opencc-workers)

This is a Cloudflare Workers project that provides a simple API to translate text between Traditional Chinese and Simplified Chinese using OpenCC.

## Usage

OpenAPI Documentation: https://opencc-workers.rwv.dev/

```
https://opencc-workers.example.workers.dev/translate?text=漢語&from=tw&to=cn
```

## Development

```
$ pnpm run dev
```

## License

MIT
