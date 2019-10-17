# cc-chooser

## About
Repository containing the source code for the new Creative Commons License Chooser. The new chooser is still in beta, and a beta deployment can be found [here](https://chooser-beta.creativecommons.org/).

This site is built using [Vue.js](https://vuejs.org/), [Bulma](https://bulma.io/), [Buefy](https://buefy.org/), and [Webpack](https://webpack.js.org/).

## Getting Started
Run the following commands in order to have the code up and running on your machine:

``` bash
# installs dependencies
$ npm install

# Builds and serves assets with hot-reload
$ npm run dev
```
You should now have the application running and accessible at http://localhost:8080 (note: will run on a different port if 8080 is occupied, most common alternative port is 8081).

## Contributing
Before getting started on an issue, please comment on the issue you would like to work on to indicate that you are interested. Issues marked with the yellow `in progress` tag are already claimed, and are not up for grabs. 

If you create a PR for your work, but you are not finished yet, please include `WIP:` in the beginning of your PR title. When your work on your PR is completed and you are ready for a final review, please remove the `WIP:` prefix from the title to indicate that your work is done.

## Running Tests
You can run tests by executing:

```bash
$ npm run test
```
To run e2e tests, you must have Java installed. [[download Java here](https://java.com/download/)]


## Deployment
The source files for the beta deployment are contained in the `./docs/` dir, and are live. Any changes to this dir's contents will be automatically deployed, so please take care when making modifications to this location. 

To update the dist bundle, run ```$ npm run build```, and copy the generated files from `./dist/` to `./docs/`, taking care to not delete the CNAME file in `./docs/`.
