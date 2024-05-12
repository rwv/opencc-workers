# opencc-workers

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/rwv/opencc-workers/deploy.yml)


[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rwv/opencc-workers)

This is a Cloudflare Workers project that provides a simple API to translate text between Traditional Chinese and Simplified Chinese using OpenCC.

## Usage

```
https://opencc-workers.example.workers.dev/translate?text=漢語&from=tw&to=cn
```

## Development

```
$ pnpm run dev
```

## License

MIT
