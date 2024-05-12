# UoA Discords / Server <!-- omit in toc -->

[![Server CI](https://github.com/NachoToast/UoA-Discords/actions/workflows/ci.server.yml/badge.svg)](https://github.com/NachoToast/UoA-Discords/actions/workflows/ci.server.yml)
[![Server CD](https://github.com/NachoToast/UoA-Discords/actions/workflows/cd.server.yml/badge.svg)](https://github.com/NachoToast/UoA-Discords/actions/workflows/cd.server.yml)

## Table of Contents <!-- omit in toc -->

- [Technologies](#technologies)
- [Installation](#installation)
- [Deployment](#deployment)
- [Script Reference](#script-reference)
- [Dependency Reference](#dependency-reference)
  - [Normal Dependencies](#normal-dependencies)
  - [Development Dependencies](#development-dependencies)


### Technologies

[![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/ "Swagger logo")
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org "Node.js logo")
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com "MongoDB logo")
[![Vitest](https://img.shields.io/static/v1?style=for-the-badge&message=Vitest&color=6E9F18&logo=Vitest&logoColor=FFFFFF&label=)](https://vitest.dev/ "Vitest logo")
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/ "Express.js logo")
[![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)](https://pnpm.io/ "pnpm logo")
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/ "Docker logo")
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/ "TypeScript logo")
[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/ "Discord logo")
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/ "ESLint logo")


### Installation

1. Install Requirements

 - [Node.JS](https://nodejs.org/en) v20
   - Versions above 20 will probably work, but haven't been tested.
   - Versions below 20.12.0 may have problems.
   - Versions below 20.6.0 will **definitely not work**.
 - [git](https://git-scm.com/)
   - Or just download the [ZIP](https://github.com/NachoToast/UoA-Discords/archive/refs/heads/main.zip), I'm not your boss ¯\\\_(ツ)_/¯

2. Clone the Repository

```sh
git clone https://github.com/NachoToast/UoA-Discords.git
cd server
```

3. Install Dependencies

```sh
corepack enable
pnpm install
```

4. Setup Secrets

```sh
cp .env.example .env
```

### Deployment

Using [Docker](https://www.docker.com/):

```sh
docker compose up --build --detach
```

### Script Reference

> Documentation for scripts defined in [package.json](package.json).

- build
  - Transpiles source code into a production-ready version of the server.
- typecheck
  - Does type checking on source code.
- lint
  - Does [linting](https://en.wikipedia.org/wiki/Lint_(software)) on source code.
- test
  - Runs tests for source code.
- coverage
  - Runs tests for source code, outputting coverage results.
- check-all
  - Does type checking, linting, and testing.
  - You must be using pnpm to run this, as it uses pnpm internally to call other scripts.
- start
  - Starts the server in production mode, this requires the build script to have been run beforehand.
- dev
  - Starts the server in development mode, which has [hot reloading](https://en.wikipedia.org/wiki/Hot_swapping#Software) enabled.

### Dependency Reference

#### Normal Dependencies

> These dependencies are required for development and in production.

- [cors](https://www.npmjs.com/package/cors)
  - Server middleware for handling CORS mechanisms.
- [express](https://www.npmjs.com/package/express)
  - Underlying HTTP server framework.

#### Development Dependencies

> These dependencies are used for development purposes only, and not required for production.

- [@eslint/js](https://www.npmjs.com/package/@eslint/js)
  - Contains base ESLint configuration for JavaScript (and TypeScript) projects.
  - Not part of the eslint package because they want to separate out JavaScript-specific functionality from it.
- [@vitest/coverage-v8](https://www.npmjs.com/package/@vitest/coverage-v8)
  - Provides code coverage reports from tests.
- [eslint](https://www.npmjs.com/package/eslint)
  - Code linting tool.
- [supertest](https://www.npmjs.com/package/supertest)
  - Allows for easy integration testing of HTTP requests to the server.
- [tsx](https://www.npmjs.com/package/tsx)
  - Executes TypeScript in Node.js (since Node cannot run TypeScript natively), which is useful for development since it skips the build step.
  - Usually I use [ts-node](https://www.npmjs.com/package/ts-node) instead, but it has issues when [using it with ESM](https://www.npmjs.com/package/ts-node#err_unknown_file_extension) and [new Node APIs](https://nodejs.org/docs/v20.12.1/api/cli.html#--env-fileconfig) that tsx does not.
- [typescript](https://www.npmjs.com/package/typescript) 
  - Static and strongly-typed JavaScript.
- [typescript-eslint](https://www.npmjs.com/package/typescript-eslint)
  - TypeScript-related ESLint functionality and rules.
  - Enables type-conscious linting.
- [vitest](https://www.npmjs.com/package/vitest)
  - Testing framework.
