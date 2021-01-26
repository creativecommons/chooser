import {
  defaultAttributes,
  CC0Attributes,
  attrToShort,
  attrToFull,
  licenseURL,
  licenseIconsArr,
} from '../utils/license-utilities'

export const defaultState = {
  currentLicenseAttributes: { ...defaultAttributes },
  attributionDetails: {
    creatorName: '',
    creatorProfileUrl: '',
    workTitle: '',
    workUrl: '',
  },
  attributionType: 'short',
}

export const state = (state) => ({ ...defaultState, ...state })

export const getters = {
  isLicenseSelected: (state) => {
    /**
     * By default, all four license attributes are undefined
     * As soon as the first attribute(BY) is selected (true/false),
     * we can show the recommended license
     */
    return state.currentLicenseAttributes.BY !== undefined
  },
  shortName: (state) => {
    return attrToShort(state.currentLicenseAttributes)
  },
  fullName: (state) => {
    return attrToFull(state.currentLicenseAttributes)
  },
  licenseUrl: (state) => (mode = 'web') => {
    return licenseURL(state.currentLicenseAttributes, mode)
  },
  iconsList: (state) => {
    return licenseIconsArr(state.currentLicenseAttributes)
  },
}

export const mutations = {
  /**
   * Updates current license attributes when user selects radio option.
   * Edge case: If user selects ND, SA should be set to false
   * @param state
   * @param {string} name
   * @param {Boolean} selected
   */
  setSelected(state, { name, selected }) {
    if (name === 'ND' && selected && state.currentLicenseAttributes.SA) {
      state.currentLicenseAttributes = {
        ...state.currentLicenseAttributes,
        SA: false,
        ND: true,
      }
    } else if (['BY', 'NC', 'ND', 'SA'].includes(name)) {
      state.currentLicenseAttributes = {
        ...state.currentLicenseAttributes,
        [name]: selected,
      }
    }
  },
  updateAttributesFromShort(state, shortName) {
    if (shortName.includes('CC0')) {
      state.currentLicenseAttributes = { ...CC0Attributes }
    } else {
      state.currentLicenseAttributes.BY = true
      state.currentLicenseAttributes.NC = !!shortName.includes('NC')
      state.currentLicenseAttributes.ND = !!shortName.includes('ND')
      state.currentLicenseAttributes.SA = !!shortName.includes('SA')
    }
  },
  setCreatorName(state, newName) {
    state.attributionDetails.creatorName = newName
  },
  setCreatorProfileUrl(state, newName) {
    state.attributionDetails.creatorProfileUrl = newName
  },
  setWorkTitle(state, newName) {
    state.attributionDetails.workTitle = newName
  },
  setWorkUrl(state, newName) {
    state.attributionDetails.workUrl = newName
  },
  setAttributionType(state, attrType) {
    state.attributionType = attrType
  },
  restoreLicenseAttr(state) {
    state.currentLicenseAttributes = defaultAttributes
  },
}
