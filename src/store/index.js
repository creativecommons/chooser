import Vue from 'vue'
import Vuex from 'vuex'
import { defaultAttributes, CC0Attributes, attrToShort, attrToFull, licenseUrl, licenseIconsArr } from '../utils/license-utilities.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentLicenseAttributes: { ...defaultAttributes },
        attributionDetails: {
            creatorName: '',
            creatorProfileUrl: '',
            workTitle: '',
            workUrl: ''
        }
    },
    getters: {
        isLicenseSelected: state => {
            return state.currentLicenseAttributes.BY !== undefined
        },
        shortName: state => {
            return attrToShort(state.currentLicenseAttributes)
        },
        fullName: state => {
            return attrToFull(state.currentLicenseAttributes)
        },
        licenseUrl: state => {
            return licenseUrl(state.currentLicenseAttributes)
        },
        iconsList: state => {
            return licenseIconsArr(state.currentLicenseAttributes)
        },
        isAttrSelected: (state) => (attrName) => {
            return state.currentLicenseAttributes[attrName]
        }
    },
    mutations: {
        setSelected(state, { stepName, isSelected }) {
            // When a Radio button is selected, either knowLicense or
            // currentLicenseAttribute 'selected' attribute is updated
            if (['BY', 'NC', 'ND', 'SA'].indexOf(stepName) > -1) {
                state.currentLicenseAttributes = {
                    ...state.currentLicenseAttributes,
                    [stepName]: isSelected
                }
            } else if (stepName === 'FS') {
                state.knowLicense = !state.knowLicense
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
