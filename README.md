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


## Getting Started


## Using Docker

Before proceeding, ensure you have Docker installed on your local machine. If
not, download and install Docker Desktop by visiting [Docker's official
website](https://www.docker.com/products/docker-desktop) and follow the
installation instructions.

To deploy the Creative Commons Chooser application using Docker, follow these
steps:


### Step 1: Install Docker Desktop

First, ensure you have Docker Desktop installed on your local machine. Open
Docker Desktop app on your local machine and follow the installation
instructions.


### Step 2: Clone the Repository

Clone the Creative Commons Chooser repository to your local machine:

```shell
git clone https://github.com/creativecommons/chooser.git
```


### Step 3: Navigate to the Project Directory

Navigate into the project directory:

```shell
cd chooser
```


### Step 4: Build and Run the Docker Container

In order to have the code up and running on your machine, build the Docker
container using docker-compose:

```shell
docker compose up
```

If there is `node_modules` directory, it will perform a clean install from
`package-lock.json`.


### Step 5: Access the Application

Once the container is running, you can access the Creative Commons Chooser application by navigating to the following URL in your web browser:

```
http://localhost:8080
```


### Building as web component

To build the project as a web component, run:
```shell
docker compose exec web npm run build-component
```

This will create a file in the `dist` folder named `license-chooser.min.js`. It
can be used to load the web-component in any JS project. There is also a sample
`demo.html` created.

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

If the web component is intended to be built without header and footer, run
```shell
docker compose exec web VUE_APP_CC_OUTPUT=embedded npm run build-component
```


## Running Tests

You can run tests by executing:
```shell
docker compose exec web npm run test
```

For running tests on a web-component build, run:
```shell
docker compose exec npm run test-component
```

It starts a server with the `dist/demo.html` on which tests can be run.


## CSS Build

The Chooser uses PostCSS plugin for PurgeCSS to make CSS bundle size smaller.
It automatically removes unused CSS based on the classes found in the final
built bundle. Some styles for dynamic components or dynamically-imported files
can also be removed. If you find that the built site misses some styles, you
can manually add the necessary classes or Regex expressions to the `safelist`
array in the `postcss.config.js` file.


## Deployment

The chooser is deployed to GitHub Pages. The source files for the beta
deployment are contained in the `./docs/` dir, and are live. Any changes to
this directory's contents will be automatically deployed, so please take care
when making modifications to this location.

To update the dist bundle, run:
```shell
docker compose exec npm run build
```
This will also automatically copy the generated files from `./dist/` to
`./docs/`.


## Output Modes

The site can be built in two different modes: `embedded` and `standalone`.
`Embedded` mode removes the header and footer from the application, resulting
in the following appearance:

<img src="static/embedded-screenshot.png" alt="Application built in embedded mode">

To build into embedded mode, set the environment variable
`VUE_APP_CC_OUTPUT=embedded` on your server before building. If
`VUE_APP_CC_OUTPUT` is unset or set to a different value, the app will build in
the default `standalone` mode, with its own header and footer.
