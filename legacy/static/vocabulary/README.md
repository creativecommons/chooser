# vocabulary-theme

WordPress Theme implementation of the Vocabulary design system
([creativecommons/vocabulary](https://github.com/creativecommons/vocabulary)).


## Development

The theme development work should be done within the `src/` directory.


### Setup

1. Create the `.env` file:
    ```shell
    cp .env.example .env
    ```
2. Update `.env` to set desired values for variables (`WP_VERSION`,
   `WP_MOD_TYPE`, `WP_MOD_NAME`, etc.)
3. Build/start Docker:
    ```shell
    docker compose up
    ```
4. Wait for build and initialization to complete
5. Install WordPress initially through the GUI
   ([localhost:8080](http://localhost:8080/))
   - TODO: automate this step


### Docker containers

The [`docker-compose.yml`](docker-comose.yml) file defines the following
containers:

1. vocabtheme-wordpress-web ([localhost:8080](http://localhost:8080/))
2. vocabtheme-wordpress-db
3. vocabtheme-composer
4. vocabtheme-phpmyadmin ([localhost:8003](http://localhost:8003/))
5. vocabtheme-wpcli


### Releases

See [scripts/README.md](scripts/README.md).


## Cache warning

:warning: **WARNING: This theme does not currently contain any _dynamic_
content (any user-specific content). The addition of _dynamic_ content must be
coordinated with the content delivery network (CDN) page rules that govern what
is cached.**

Currently, the theme's output of pages is completely deterministic. Any given
page rendered now, will be identical to the same page rendered 30 minutes later
(assuming the theme is the same version). This allows for very simple CDN page
rules (ex. [Caching Static HTML with WordPressWooCommerce · Cloudflare Support
docs][cloudflare-caching-wp]).

[cloudflare-caching-wp]: https://developers.cloudflare.com/support/third-party-software/content-management-system-cms/caching-static-html-with-wordpresswoocommerce/


## Copyright and trademarks


### CC Badge, Icons, Images, and Logos

- The badges, icons, images, and logos contained within this repository are
  for use under the Creative Commons Trademark Policy (see [Policies - Creative
  Commons][ccpolicies]).
- **The icons, images, and logos are not licensed under a Creative Commons
  license** (also see [Could I use a CC license to share my logo or
  trademark? - Frequently Asked Questions - Creative Commons][tmfaq]).

[ccpolicies]: https://creativecommons.org/policies
[tmfaq]: https://creativecommons.org/faq/#could-i-use-a-cc-license-to-share-my-logo-or-trademark


### Code

Vocabulary Theme code is licensed under the [GNU General Public License
v2.0][gpl] or later.


[gpl]: https://gnu.org/licenses/gpl-2.0.html "The GPL License"


### Vocabulary

[![CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
button][cc-zero-png]][cc-zero]

[`COPYING`](COPYING): All the code within Vocabulary is dedicated to
the public domain under the [CC0 1.0 Universal (CC0 1.0) Public Domain
Dedication][cc-zero].

[cc-zero-png]: https://licensebuttons.net/l/zero/1.0/88x31.png "CC0 1.0 Universal (CC0 1.0) Public Domain Dedication button"
[cc-zero]: https://creativecommons.org/publicdomain/zero/1.0/ "Creative Commons — CC0 1.0 Universal"


### Normalize.css

normalize.css is licensed under the Expat/[MIT][mit] License.

[mit]: https://opensource.org/license/mit/


### Fonts


#### Accidenz Commons

[Accidenz Commons][accidenzcommons] by Archetypo is licensed under the [Creative
Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
License][ccbysa40].

[accidenzcommons]: https://creativecommons.org/2019/10/28/accidenz-commons-open-licensed-font/
[ccbysa40]: https://creativecommons.org/licenses/by-sa/4.0/


#### JetBrains Mono

[JetBrains Mono][jetbrainsmono] is licensed under the [OFL-1.1 License][ofl].

[jetbrainsmono]: https://www.jetbrains.com/lp/mono/
[ofl]: https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt


#### Roboto Condensed

[Roboto Condensed][robotocondensed] by Christian Robertson is licensed under
the [Apache License, Version 2.0][apache20].

[robotocondensed]: https://fonts.google.com/specimen/Roboto+Condensed
[apache20]: http://www.apache.org/licenses/LICENSE-2.0


#### Source Sans Pro

[Source Sans Pro][sourcesanspro] by Paul D. Hunt is licensed under the [Open
Font License][oflsil].

[sourcesanspro]: https://fonts.adobe.com/fonts/source-sans
[oflsil]: https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL


#### Vocabulary Icons

Vocabulary Icons use icons from [Font Awesome][fontawesome] which are licensed
under the [Creative Commons Attribution 4.0 International (CC BY 4.0)
License][ccbysa40].

[fontawesome]: https://fontawesome.com/
[ccby40]: https://creativecommons.org/licenses/by/4.0/
