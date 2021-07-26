# typescript-cliutil-starter

## About

Starter kit to create a CLI utility with TypeScript.

🔋 Batteries included: 
* Linting with [ESLint](https://eslint.org/)
* Tests with [Jest](https://jestjs.io/)
* Compilation and binary packaging [pkg](https://github.com/vercel/pkg)

## Usage
### Setup

Clone this repo

```shell
git clone git@github.com:fkurz/typescript-cliutil-starter.git
```

Then add, modify, delete the source code in _src/_.

### Running in development mode

To run the CLI in development mode, run 

```shell
npm run dev [-- <parameter>]
```

Parameters can be passed after the -- delimiter. 

**Example**: 
```shell
$ npm run dev -- -g

> @fkurz/typescript-cliutil-starter@1.0.0 dev
> ts-node src/main.ts "-g"

Hello!
```

### Linting and tests

To lint the source code run `npm run lint`.

Tests are run by jest on the transpiled TypeScript code.
To transpile and run tests, use the _build_ and _test_ scripts.

```shell
$ npm run build && npm run test

> @fkurz/typescript-cliutil-starter@1.0.0 build
> tsc --build


> @fkurz/typescript-cliutil-starter@1.0.0 test
> jest

...

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.52 s, estimated 1 s
Ran all test suites.
```

### Packaging

Use `npm run package` to build a binary and put it into the _bin/_ directory.

```shell
$ npm run package

> @fkurz/typescript-cliutil-starter@1.0.0 package
> pkg dist/main.js --no-bytecode --public-packages '*' --public --target host --output bin/main

> pkg@5.3.1

$ ./bin/main -g
Hello!
  ```

