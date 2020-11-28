import Vue from 'vue'
import Vuex from 'vuex'
import { defaultAttributes, CC0Attributes, attrToShort, attrToFull, licenseUrl, licenseIconsArr } from '../utils/license-utilities.js'

Vue.use(Vuex)

const defaultState = {
    currentLicenseAttributes: { ...defaultAttributes },
    attributionDetails: {
        creatorName: '',
        creatorProfileUrl: '',
        workTitle: '',
        workUrl: ''
    }
}

const createStore = (state) => {
    const initialState = { ...defaultState, ...state }
    return new Vuex.Store({
        state: initialState,
        getters: {
            isLicenseSelected: state => {
                /**
                 * By default, all four license attributes are undefined
                 * As soon as the first attribute(BY) is selected (true/false),
                 * we can show the recommended license
                 */
                return state.currentLicenseAttributes.BY !== undefined
            },
            shortName: state => {
                return attrToShort(state.currentLicenseAttributes)
            },
            fullName: state => {
                return attrToFull(state.currentLicenseAttributes)
            },
            licenseUrl: state => (mode) => {
                return licenseUrl(state.currentLicenseAttributes, mode)
            },
            iconsList: state => {
                return licenseIconsArr(state.currentLicenseAttributes)
            }
        },
        mutations: {
            /**
             * Updates current license attributes when user selects radio option.
             * Edge case: If user selects ND, SA should be set to false
             * @param state
             * @param {string} stepName
             * @param {Boolean} isSelected
             */
            setSelected(state, { stepName, isSelected }) {
                if (stepName === 'ND' && isSelected && state.currentLicenseAttributes.SA) {
                    state.currentLicenseAttributes = {
                        ...state.currentLicenseAttributes,
                        SA: false,
                        ND: true
                    }
                } else if (['BY', 'NC', 'ND', 'SA'].indexOf(stepName) > -1) {
                    state.currentLicenseAttributes = {
                        ...state.currentLicenseAttributes,
                        [stepName]: isSelected
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
            }
        }
    })
}

export default createStore
