![GitHub contributors](https://img.shields.io/github/contributors/creativecommons/chooser)
![GitHub Sponsors](https://img.shields.io/github/sponsors/creativecommons)
![GitHub](https://img.shields.io/github/license/creativecommons/chooser)
![npm](https://img.shields.io/npm/v/@creativecommons/chooser)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@creativecommons/chooser)
![npm](https://img.shields.io/npm/dm/@creativecommons/chooser)
![GitHub issues](https://img.shields.io/github/issues-raw/creativecommons/chooser)
![GitHub Repo stars](https://img.shields.io/github/stars/creativecommons/chooser?style=social)
![GitHub forks](https://img.shields.io/github/forks/creativecommons/chooser?style=social)

# Chooser

The Creative Commons License Chooser is meant to help people learn about CC licenses, and select the license that best fits their needs. The new version in this repo places greater importance on usability, and an educational experience of the six CC licenses.

## About

Repository containing the source code for the new Creative Commons License Chooser. The new chooser is still in beta, and a beta deployment can be found [here](https://chooser-beta.creativecommons.org/).

This site is built using [Vue.js](https://vuejs.org/) (and vue-cli).

### Roadmap

Tasks, issues, and discussion related to the release of the new chooser are tracked with the [`Launch Milestone`](https://github.com/creativecommons/chooser/milestone/1).

## Code of conduct

[`CODE_OF_CONDUCT.md`][org-coc]:

> The Creative Commons team is committed to fostering a welcoming community.
> This project and all other Creative Commons open source projects are governed
> by our [Code of Conduct][code_of_conduct]. Please report unacceptable
> behavior to [conduct@creativecommons.org](mailto:conduct@creativecommons.org)
> per our [reporting guidelines][reporting_guide].

[org-coc]: https://github.com/creativecommons/.github/blob/main/CODE_OF_CONDUCT.md
[code_of_conduct]: https://opensource.creativecommons.org/community/code-of-conduct/
[reporting_guide]: https://opensource.creativecommons.org/community/code-of-conduct/enforcement/

## Contributing

See [`CONTRIBUTING.md`][org-contrib].

[org-contrib]: https://github.com/creativecommons/.github/blob/main/CONTRIBUTING.md

## Using Docker

### Containers

The [`docker-compose.yml`](docker-compose.yml) file defines the following
containers:

1. **chooser-web** - simple NGINX container serving [`docs/`](docs)
   - [localhost:8888](http://localhost:8888/)
2. **chooser-node** - Node14 container
   - [localhost:8080](http://localhost:8080/)
     - (requires **Run Node development server**, below)

### Docker desktop required

Before proceeding, ensure you have Docker installed on your local machine. If
not, download and install Docker Desktop by visiting [Docker's official
website](https://www.docker.com/products/docker-desktop) and follow the
installation instructions.

### Startup containers

The containers can be started with:

```shell
docker compose up
```

(See [Docker Compose overview | Docker Docs](https://docs.docker.com/compose/)
for more information on managing containes with `docker compose`.)

### Initial setup

Before the chooser-node container can be used effectively, a clean install of
NPM packages from `package-lock.json` is required:

```shell
docker compose exec chooser-node npm ci
```

**This step generally only needs to be done once.**

### Run Node development server

1. Startup containers (see above)
2. Complete initial setup (see above)
3. Run Node development server
   ```shell
   docker compose exec chooser-node npm run serve
   ```
   - [localhost:8080](http://localhost:8080/)

### Create production (standalone) build

1. Startup containers (see above)
2. Complete initial setup (see above)
3. Run Node development server
   ```shell
   docker compose exec chooser-node npm run build
   ```
   - (this automatically copies the generated files from [`dist/`](dist) to
     [`docs/`](docs))

The chooser is deployed to GitHub Pages. The source files for the beta
deployment are contained in the `./docs/` dir, and are live. Any changes to
this directory's contents will be automatically deployed, so please take care
when making modifications to this location.

### Create standalone (production) build

1. Startup containers (see above)
2. Complete initial setup (see above)
3. Run Node development server
   ```shell
   docker compose exec chooser-node npm run build
   ```
   - (this automatically copies the generated files from [`dist/`](dist) to
     [`docs/`](docs))

The chooser is deployed to GitHub Pages. The source files for the beta
deployment are contained in the `./docs/` dir, and are live. Any changes to
this directory's contents will be automatically deployed, so please take care
when making modifications to this location.

For an embedded standalone build (no header nor footer), run:

```shell
docker compose exec chooser-node VUE_APP_CC_OUTPUT=embedded npm run build
```

**(please _don't_ commit embedded builds to `docs/`)**

### Create a web component build

1. Startup containers (see above)
2. Complete initial setup (see above)
3. Run Node development server
   ```shell
   docker compose exec chooser-node npm run build-component
   ```

This will create a file in the [`dist/`](dist) folder named
`license-chooser.min.js`. It can be used to load the web-component in any JS
project. There is also a sample `demo.html` created.

To be able to use the file it should either be rendered statically from the
integrater's web-app or be published on a CDN. Following code can be used to
integrate this in other apps.

Note: the Chooser component depends on Vue 2.x, as can be seen in the following
example.

```
<script src="https://cdn.jsdelivr.net/npm/vue@2.x.x"></script>
<script src="https://unpkg.com/@creativecommons/chooser/dist/license-chooser.js"></script>

<license-chooser></license-chooser>
```

For an embedded web component build (no header nor footer), run:

```shell
docker compose exec chooser-node VUE_APP_CC_OUTPUT=embedded npm run build-component
```

## Perform unit tests on standalone or embedded build

1. Startup containers (see above)
2. Complete initial setup (see above)
3. Run unit tests
   ```shell
   docker compose exec chooser-node npm run test:unit
   ```

## Perform unit tests on web-component build

1. Startup containers (see above)
2. Complete initial setup (see above)
3. Create a web component build (see above)
4. Run unit tests
   ```shell
   docker compose exec chooser-node npm run test-component
   ```
   - It starts a server with the `dist/demo.html` on which tests can be run.

## Perform Cypress tests

1. Startup containers (see above)
2. Run Cypress tests
   ```shell
   docker run -it -v $PWD:/e2e -w /e2e -e CYPRESS_baseUrl=http://host.docker.internal:8888 cypress/included:latest
   ```
   - (This will download the cypress/included image when first run)

## CSS Build

The Chooser uses PostCSS plugin for PurgeCSS to make CSS bundle size smaller.
It automatically removes unused CSS based on the classes found in the final
built bundle. Some styles for dynamic components or dynamically-imported files
can also be removed. If you find that the built site misses some styles, you
can manually add the necessary classes or Regex expressions to the `safelist`
array in the `postcss.config.js` file.

## Embedded screenshot

The site can be built in two different modes: `embedded` and `standalone`.
`Embedded` mode removes the header and footer from the application, resulting
in the following appearance:

<img src="static/embedded-screenshot.png" alt="Application built in embedded mode">

To build into _embedded_ mode, set the environment variable
`VUE_APP_CC_OUTPUT=embedded` on your server before building. If
`VUE_APP_CC_OUTPUT` is unset or set to a different value, the app will build in
the default _standalone_ mode, with its own header and footer.
