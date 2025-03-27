![GitHub contributors](https://img.shields.io/github/contributors/creativecommons/chooser)
![GitHub Sponsors](https://img.shields.io/github/sponsors/creativecommons)
![GitHub](https://img.shields.io/github/license/creativecommons/chooser)
![GitHub issues](https://img.shields.io/github/issues-raw/creativecommons/chooser)
![GitHub Repo stars](https://img.shields.io/github/stars/creativecommons/chooser?style=social)
![GitHub forks](https://img.shields.io/github/forks/creativecommons/chooser?style=social)

# Chooser

The Creative Commons License Chooser is meant to help people learn about CC licenses, and select the license that best fits their needs. The new version in this repo places greater importance on usability, and an educational experience of the six CC licenses.


## About

Repository containing the source code for the new Creative Commons License Chooser. The new chooser is still in beta, and a beta deployment can be found [here](https://chooser-beta.creativecommons.org/).

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

* `/src/index.html`: relevant markup, and makes use of the `template` element to load the main tool recommendation content via JavaScript.
* `/src/style.css`: localized styles, built on to of [Vocabulary][vocabulary].
* `/src/scripts.js`: relevant JavaScript logic.


## Setup
1. open the `src/index.html` file within a browser to view the Chooser.

[vocabulary]: https://github.com/creativecommons/vocabulary
