# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Setup

- Add .env file containing (if it does not exist)

```text
TAX_API_BASE_URL=http://localhost:5000
```

NOTE: This is the base url of the Tax Api

- Install dependencies

```sh
npm i
```

- Start off Tax Api

```bash
docker pull ptsdocker16/interview-test-server
docker run --init -p 5000:5000 -it ptsdocker16/interview-test-server
```

## Run Development

```sh
npm run dev
```

NOTE: This starts your app in development mode, rebuilding assets on file changes.

### Debugger

Attach debugger by:

- Going to VS code debug configuration options
- Pick "Remix dev debug" configuration (specified on launch.json)
- Hit Start Debugging (Green play icon)

## Test

First, build your app for production:

```sh
npm run test
```
