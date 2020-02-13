import Vue from 'vue'
import Vuex from 'vuex'
import { CCBYAttributes, CC0Attributes, attrToShort, attrToFull, licenseUrl, licenseIconsArr } from '../utils/license-utilities.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentLicenseAttributes: { ...CCBYAttributes },
        attributionDetails: {
            creatorName: '',
            creatorProfileUrl: '',
            workTitle: '',
            workUrl: ''
        },
        currentStepId: 0
    },
    getters: {
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
        toggleSelected(state, stepName) {
            // Called when a radio button is clicked, either FirstStep or Step
            if (['BY', 'NC', 'ND', 'SA'].indexOf(stepName) > -1) {
                state.currentLicenseAttributes = {
                    ...state.currentLicenseAttributes,
                    [stepName]: !state.currentLicenseAttributes[stepName]
                }
            } else {
                state.knowLicense = !state.knowLicense
            }
        },
        updateAttributesFromShort(state, shortName) {
            if (shortName.includes('CC0')) {
                state.currentLicenseAttributes = { ...CC0Attributes }
            } else {
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
