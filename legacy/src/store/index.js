import Vue from 'vue';
import Vuex from 'vuex';
import {
  defaultAttributes,
  CC0Attributes,
  attrToShort,
  attrToFull,
  licenseURL,
  licenseIconsArr,
} from '../utils/license-utilities.js';

Vue.use(Vuex);

export const defaultState = {
  currentLicenseAttributes: { ...defaultAttributes },
  attributionDetails: {
    creatorName: '',
    creatorProfileUrl: '',
    workTitle: '',
    workUrl: '',
    yearOfCreation: '',
  },
  attributionType: 'short',
  copyright: {
    agreed: false,
    confirmed: false,
  },
  // confirm that cc licenses are appropriate for the user
  appropriate: {
    ownupagreed: false,
    termsagreed: false,
    nonrevocableagreed: false,
  },
};

/**
 * Updates copyright checkboxes
 * @param state
 * @param {Object} payload
 * @param {string} payload.key The name of the copyright checkbox
 */
export const toggleCopyrightCheckbox = (state, { key }) => {
  state.copyright[key] = !state.copyright[key];
};

export const allCopyrightClausesChecked = state => {
  return Object.values(state.copyright).every(i => i === true);
};

export const toggleAppropriatenessValue = (state, { key }) => {
  state.appropriate[key] = !state.appropriate[key];
};

export const allAppropriatenessQualificationsMet = state => {
  return Object.values(state.appropriate).every(i => i === true);
};

const createStore = state => {
  const initialState = { ...defaultState, ...state };
  return new Vuex.Store({
    state: initialState,
    getters: {
      isLicenseSelected: state => {
        /**
         * By default, all four license attributes are undefined
         * As soon as the first attribute(BY) is selected (true/false),
         * we can show the recommended license
         */
        return state.currentLicenseAttributes.BY !== undefined;
      },
      shortName: state => {
        return attrToShort(state.currentLicenseAttributes);
      },
      fullName: state => {
        return attrToFull(state.currentLicenseAttributes);
      },
      licenseUrl: state => (mode = 'web') => {
        return licenseURL(state.currentLicenseAttributes, mode);
      },
      iconsList: state => {
        return licenseIconsArr(state.currentLicenseAttributes);
      },
      allCopyrightClausesChecked,
      allAppropriatenessQualificationsMet,
    },
    mutations: {
      /**
       * Updates current license attributes when user selects radio option.
       * Edge case: If user selects ND, SA should be set to false
       * @param state
       * @param {Object} payload
       * @param {string} payload.name
       * @param {Boolean} payload.selected
       */
      setSelected(state, { name, selected }) {
        if (name === 'ND' && selected && state.currentLicenseAttributes.SA) {
          state.currentLicenseAttributes = {
            ...state.currentLicenseAttributes,
            SA: false,
            ND: true,
          };
        } else if (['BY', 'NC', 'ND', 'SA'].indexOf(name) > -1) {
          state.currentLicenseAttributes = {
            ...state.currentLicenseAttributes,
            [name]: selected,
          };
        }
      },
      updateAttributesFromShort(state, shortName) {
        if (shortName.includes('CC0')) {
          state.currentLicenseAttributes = { ...CC0Attributes };
        } else {
          state.currentLicenseAttributes.BY = true;
          state.currentLicenseAttributes.NC = !!shortName.includes('NC');
          state.currentLicenseAttributes.ND = !!shortName.includes('ND');
          state.currentLicenseAttributes.SA = !!shortName.includes('SA');
        }
      },
      setCreatorName(state, newName) {
        state.attributionDetails.creatorName = newName;
      },
      setCreatorProfileUrl(state, newName) {
        state.attributionDetails.creatorProfileUrl = newName;
      },
      setWorkTitle(state, newName) {
        state.attributionDetails.workTitle = newName;
      },
      setWorkUrl(state, newName) {
        state.attributionDetails.workUrl = newName;
      },
      setYearOfCreation(state, newName) {
        state.attributionDetails.yearOfCreation = newName;
      },
      setAttributionType(state, attrType) {
        state.attributionType = attrType;
      },
      restoreLicenseAttr(state) {
        state.currentLicenseAttributes = defaultAttributes;
      },
      toggleCopyrightCheckbox,
      toggleAppropriatenessValue,
    },
  });
};

export default createStore;
