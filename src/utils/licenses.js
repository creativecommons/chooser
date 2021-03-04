/** @typedef {{ATTRIBUTES: LicenseAttributes, SLUG: string, FULL: string, URL: string, SHORT: string}} LicenseProperties */

/**
 *
 * @type {{CC0: LicenseProperties, CC_BY: LicenseProperties, CC_BY_NC:LicenseProperties, CC_BY_NC_SA: LicenseProperties, CC_BY_ND: LicenseProperties, CC_BY_SA: LicenseProperties, CC_BY_NC_ND: LicenseProperties}}
 */
export const LICENSES = {
  CC0: {
    ATTRIBUTES: {
      BY: false,
      SA: false,
      NC: false,
      ND: false,
    },
    FULL: 'CC0 1.0 Universal',
    SHORT: 'CC0 1.0',
    SLUG: 'cc0',
    URL: 'http://creativecommons.org/publicdomain/zero/1.0',
    ICONS: ['cc', 'zero'],
  },
  CC_BY: {
    ATTRIBUTES: {
      BY: true,
      SA: false,
      NC: false,
      ND: false,
    },
    FULL: 'Attribution 4.0 International',
    SHORT: 'CC BY 4.0',
    SLUG: 'cc-by',
    URL: 'http://creativecommons.org/licenses/by/4.0/',
    ICONS: ['cc', 'by'],
  },
  CC_BY_SA: {
    ATTRIBUTES: {
      BY: true,
      SA: true,
      NC: false,
      ND: false,
    },
    FULL: 'Attribution-ShareAlike 4.0 International',
    SHORT: 'CC BY-SA 4.0',
    SLUG: 'cc-by-sa',
    URL: 'http://creativecommons.org/licenses/by-sa/4.0/',
    ICONS: ['cc', 'by', 'sa'],
  },
  CC_BY_NC: {
    ATTRIBUTES: {
      BY: true,
      SA: false,
      NC: true,
      ND: false,
    },
    FULL: 'Attribution-NonCommercial 4.0 International',
    SHORT: 'CC BY-NC 4.0',
    SLUG: 'cc-by-nc',
    URL: 'http://creativecommons.org/licenses/by-nc/4.0/',
    ICONS: ['cc', 'by', 'nc'],
  },
  CC_BY_NC_SA: {
    ATTRIBUTES: {
      BY: true,
      SA: true,
      NC: true,
      ND: false,
    },
    FULL: 'Attribution-NonCommercial-ShareAlike 4.0 International',
    SHORT: 'CC BY-NC-SA 4.0',
    SLUG: 'cc-by-nc-sa',
    URL: 'http://creativecommons.org/licenses/by-nc-sa/4.0/',
    ICONS: ['cc', 'by', 'nc', 'sa'],
  },
  CC_BY_NC_ND: {
    ATTRIBUTES: {
      BY: true,
      SA: false,
      NC: true,
      ND: true,
    },
    FULL: 'Attribution-NonCommercial-NoDerivatives 4.0 International',
    SHORT: 'CC BY-NC-ND 4.0',
    SLUG: 'cc-by-nc-nd',
    URL: 'http://creativecommons.org/licenses/by-nc-nd/4.0/',
    ICONS: ['cc', 'by', 'nc', 'nd'],
  },
  CC_BY_ND: {
    ATTRIBUTES: {
      BY: true,
      SA: false,
      NC: false,
      ND: true,
    },
    FULL: 'Attribution-NoDerivatives 4.0 International',
    SHORT: 'CC BY-ND 4.0',
    SLUG: 'cc-by-nd',
    URL: 'http://creativecommons.org/licenses/by-nd/4.0/',
    ICONS: ['cc', 'by', 'nd'],
  },
}
