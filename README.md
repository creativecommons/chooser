![GitHub contributors](https://img.shields.io/github/contributors/creativecommons/chooser)
![GitHub Sponsors](https://img.shields.io/github/sponsors/creativecommons)
![GitHub](https://img.shields.io/github/license/creativecommons/chooser)
![GitHub issues](https://img.shields.io/github/issues-raw/creativecommons/chooser)
![GitHub Repo stars](https://img.shields.io/github/stars/creativecommons/chooser?style=social)
![GitHub forks](https://img.shields.io/github/forks/creativecommons/chooser?style=social)

# Chooser - v1.0


The Creative Commons License Chooser is meant to help people learn about CC licenses, and select the license that best fits their needs. The new version in this repo places greater importance on usability, and an educational experience of the six CC licenses.


## About

Repository containing the source code for the new Creative Commons License Chooser.

This site is built using HTML, CSS, and JS.


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


## Development

All necessary files to bundle or run the Chooser are located within the `/src` directory.

* `/src/index.html`: relevant HTML markup.
* `/src/style.css`: localized styles, built on top of [Vocabulary][vocabulary].
* `/src/scripts.js`: relevant JavaScript logic.

The Chooser exists bundled within the [`vocabulary-theme`][vocabulary-theme] repository for production purposes. This repository is for isolated development purposes, similar to the setup followed by [`cc-legal-tools-app`][cc-legal-tools-app] + [`cc-legal-tools-data`][cc-legal-tools-data], and [`index-prototype`][index-prototype].

Once changes are implemented here, they need to be updated within the `/chooser` directory within `vocabulary-theme`. 

Final production changes are deployed within vocabulary-theme Releases, updated within [`index-dev-env`][index-dev-env], and finally deployed to `index__stage` and then `index__prod` environments; going LIVE at `https://creativecommons.org/chooser`.

[cc-legal-tools-app]: https://github.com/creativecommons/cc-legal-tools-app 
[cc-legal-tools-data]: https://github.com/creativecommons/cc-legal-tools-data
[index-dev-env]: https://github.com/creativecommons/index-dev-env
[index-prototype]: https://github.com/creativecommons/index-prototype
[vocabulary]: https://github.com/creativecommons/vocabulary
[vocabulary-theme]: https://github.com/creativecommons/vocabulary-theme


### Setting up the Project

For information on learning and installing the prerequisite technologies for this project, please see [Foundational technologies — Creative Commons Open Source][found-tech].

[found-tech]: https://opensource.creativecommons.org/contributing-code/foundational-tech/

### Docker Compose Setup

Use the following instructions to start the Project with docker compose.

1. Navigate to the creativecommons/chooser Project that you have cloned
2. **Run the containers**

   ```shell
   docker compose up
   ```

3. After running the above command, Docker will use the [`docker-compose.yml`](docker-compose.yml) file and build a local environment for you
4. Navigate to http://localhost:8080 in your browser and the app would be running.
5. **stop the containers**

   To stop the app from running, simply open an another instance of terminal and type:

   ```shell
   docker compose down
   ```

   or

   You can simply revisit the existing terminal which is running the container
   and type <kbd>CTRL</kbd> + <kbd>C</kbd>


### Format with Prettier

Run the following command to format files with Prettier:

```shell
docker compose exec node prettier --write src/
```

## Structure

The initial markup is rendered via the `index.html` file. Visual display is derived from the `style.css` rules. Styles extend from `src/vocabulary`.

On initialization the `scripts.js` functions set the correct fieldsets to default display; based on user provided actions through the stepper fieldsets will display or hide, exposing the relevant pathways to getting a `tool` recommendation. Correct pathways are located within the `rawStatePathRoutes` array. When a correct pathway matches the current `state`, the appropriate `tool` is matched and recommended, if the current state is not a known pathway the `tool` is set to `unknown` until the required input is given.

The main `tool` recommendation content is pulled via the appropriate `<template>` markup located within HTML. Additional information for the marking formats is also sourced from these `<template>` elements and the contents of the `Attribution Details` fields.

Marking formats are pulled from a combination of HTML markup and JS string interpolation found within the `scripts.js` file within the `renderMarkingFormats` function.
