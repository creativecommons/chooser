import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CC0Attributes = { BY: false, NC: false, ND: false, SA: false }
const CCBYAttributes = { BY: true, NC: false, ND: false, SA: false }
const visibleSetters = {
    FS: {
        true: ['FS', 'DD', 'AD'],
        false: ['FS', 'BY', 'NC', 'ND', 'SA', 'AD']
    },
    BY: {
        // Decide if NC/ND/SA should be disabled or removed on CC0
        true: ['FS', 'BY', 'NC', 'ND', 'SA', 'AD'],
        false: ['FS', 'BY', 'CW', 'NC', 'ND', 'SA', 'AD']
    },
    ND: {
        true: ['FS', 'BY', 'NC', 'ND', 'AD']
    }
}
const disabledSetters = {
    // Steps that should be disabled if other steps are selected/not selected
    BY: {
        false: ['NC', 'ND', 'SA']
    },
    ND: {
        false: ['SA']
    }
}

export default new Vuex.Store({
    state: {
        currentLicenseAttributes: { ...CCBYAttributes },
        // FS: First step, checks if user knows the license (and we need to open the dropdown)
        // CW: Copyright waiver step for CC0
        // DD: Dropdown step if user knows the license
        // AD: Attribution Details step with the form
        steps: [
            // VISIBLE: Steps are shown only if visible is set to true
            // eg. When we choose BY, Copyright Waiver is not shown
            // ENABLED: Steps are shown but disabled when they cannot be chosen
            // eg. When we choose ND, SA is disabled
            { id: 0, name: 'FS', visible: true, enabled: true, status: 'current' },
            { id: 1, name: 'BY', visible: true, enabled: true, status: 'inactive' },
            { id: 2, name: 'NC', visible: true, enabled: true, status: 'inactive' },
            { id: 3, name: 'ND', visible: true, enabled: true, status: 'inactive' },
            { id: 4, name: 'SA', visible: true, enabled: true, status: 'inactive' },
            { id: 5, name: 'CW', visible: false, enabled: true, status: 'inactive' },
            { id: 6, name: 'DD', visible: false, enabled: true, status: 'inactive' },
            { id: 7, name: 'AD', visible: true, enabled: true, status: 'inactive' }
        ],
        attributionDetails: {
            creatorName: '',
            creatorProfileUrl: '',
            workTitle: '',
            workUrl: ''
        },
        knowLicense: false,
        currentStepId: 0
    },
    getters: {
        shortName: state => {
            let shortLicenseName = 'CC'
            if (state.currentLicenseAttributes.BY) {
                shortLicenseName = ` BY${state.currentLicenseAttributes.NC ? '-NC' : ''}`
                if (state.currentLicenseAttributes.SA && !state.currentLicenseAttributes.ND) {
                    shortLicenseName += '-SA'
                } else if (state.currentLicenseAttributes.ND) {
                    shortLicenseName += '-ND'
                }
                shortLicenseName += ' 4.0'
            } else {
                shortLicenseName += '0 1.0'
            }
            return shortLicenseName
        },
        fullName: state => {
            let fullLicenseName = ''
            if (state.currentLicenseAttributes.BY) {
                fullLicenseName = `Attribution${state.currentLicenseAttributes.NC ? '-NonCommercial' : ''}`
                if (state.currentLicenseAttributes.SA && !state.currentLicenseAttributes.ND) {
                    fullLicenseName += '-ShareAlike'
                } else if (state.currentLicenseAttributes.ND) {
                    fullLicenseName += '-NoDerivatives'
                }
                fullLicenseName += ' 4.0'
                return fullLicenseName
            } else {
                return 'CC0 1.0 Universal'
            }
        },
        licenseUrl: state => {
            if (!state.currentLicenseAttributes.BY) {
                return 'https://creativecommons.org/publicdomain/zero/1.0/?ref=ccchooser'
            } else {
                const license = `by${state.currentLicenseAttributes.NC ? '-nc' : ''}${state.currentLicenseAttributes.ND ? '-nd' : ''}${state.currentLicenseAttributes.SA ? '-sa' : ''}`
                return 'https://creativecommons.org/licenses/' + license + '/4.0/?ref=ccchooser'
            }
        },
        iconsList: state => {
            const iconsArray = []
            for (const key in state.currentLicenseAttributes) {
                if (state.currentLicenseAttributes[key]) {
                    iconsArray.push(key.toLowerCase())
                }
            }
            return iconsArray
        },
        isStepSelected: state => (stepName) => {
            return stepName === 'FS'
                ? state.knowLicense
                : state.currentLicenseAttributes[stepName]
        },
        enabledAndVisibleSteps: state => {
            return state.steps.filter(step => {
                return step.visible && step.enabled
            })
        },
        getStepById: (state, getters) => (id) => {
            return state.steps.find(step => step.id === id)
        },
        getStepByName: (state, getters) => (name) => {
            return state.steps.find(step => step.name === name)
        }
    },
    mutations: {
        toggleSelected(state, stepName) {
            // Called when a radio button is clicked, either FirstStep or VerticalStep
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
        updateStepStatus(state, stepName) {
            // when transitioning, set currentStep's status to 'previous' and nextStep's status to 'current'
            const stepId = state.steps.find(step => step.name === stepName).id
            const nextStep = state.steps.slice(stepId + 1).find(step => step.visible && step.enabled).id
            Vue.set(state.steps, nextStep, { ...state.steps[nextStep], status: 'current' })
            Vue.set(state.steps, stepId, { ...state.steps[stepId], status: 'previous' })
            state.currentStepId = nextStep
        },
        goToPrevious(state, stepName) {
            // when transitioning, set currentStep's (and steps between current and next) status to 'inactive' and
            // nextStep's status to 'current'
            const stepId = state.steps.find(step => step.name === stepName).id
            let previousStep = stepId
            for (let i = stepId - 1; i >= 0; i--) {
                const thisStep = state.steps[i]
                if (thisStep.visible && thisStep.enabled) {
                    previousStep = state.steps[i].id
                    break
                }
            }
            Vue.set(state.steps, previousStep, { ...state.steps[previousStep], status: 'current' })
            Vue.set(state.steps, stepId, { ...state.steps[stepId], status: 'inactive' })
            state.currentStepId = previousStep
        },
        updateDisabledSteps(state, stepsToSetDisabled) {
            // Set disabled steps in the stepsToSetDisabled array
            for (const step of state.steps) {
                if (stepsToSetDisabled.indexOf(step.name) > -1 && step.enabled) {
                    Vue.set(state.steps, step.id, { ...step, enabled: false })
                } else if (stepsToSetDisabled.indexOf(step.name) === -1 && !step.enabled) {
                    Vue.set(state.steps, step.id, { ...step, enabled: true })
                }
            }
        },
        updateVisibleSteps(state, stepsToSetVisible) {
            // stepsToSetVisible is an array of stepNames to set Visible
            let visibleCounter = 0
            for (const step of state.steps) {
                if (stepsToSetVisible.indexOf(step.name) > -1 && !step.visible) {
                    Vue.set(state.steps, step.id, { ...step, visible: true, currentId: visibleCounter })
                    visibleCounter += 1
                } else if (stepsToSetVisible.indexOf(step.name) === -1 && step.visible) {
                    Vue.set(state.steps, step.id, { ...step, visible: false, currentId: -1 })
                } else if (!step.visible && step.currentId !== -1) {
                    Vue.set(state.steps, step.id, { ...step, currentId: -1 })
                } else if (step.visible && step.currentId === -1) {
                    Vue.set(state.steps, step.id, { ...step, currentId: visibleCounter })
                    visibleCounter += 1
                }
            }
        },
        setCreatorName(state, newName) {
            state.attributionDetails.creatorName = newName
        },
        setCreatorProfileUrl(state, newName) {
            state.attributionDetails.ProfileUrl = newName
        },
        setWorkTitle(state, newName) {
            state.attributionDetails.workTitle = newName
        },
        setWorkUrl(state, newName) {
            state.attributionDetails.workUrl = newName
        }
    },
    actions: {
        updateDisabledAndVisibleSteps(context, payload) {
            const [stepName, isStepSelected] = payload
            if (stepName in visibleSetters) {
                const visible = visibleSetters[stepName][isStepSelected]
                if (visible !== undefined) {
                    context.commit('updateVisibleSteps', visible)
                }
            }
            if (stepName in disabledSetters) {
                const disabled = disabledSetters[stepName][isStepSelected]
                if (disabled !== undefined) {
                    context.commit('updateDisabledSteps', disabled)
                }
            }
        },
        handleNext: (context, payload) => {
            const currentStepName = payload
            const isCurrentStepSelected = context.getters.isStepSelected(payload)
            context.dispatch('updateDisabledAndVisibleSteps', [currentStepName, isCurrentStepSelected])
            context.commit('updateStepStatus', currentStepName)
        },
        handlePrevious: (context, payload) => {
            const currentStepName = payload
            const isCurrentStepSelected = context.getters.isStepSelected(payload)
            context.dispatch('updateDisabledAndVisibleSteps', [currentStepName, isCurrentStepSelected])
            context.commit('goToPrevious', currentStepName)
        },
        updateSelected: (context, payload) => {
            // On radio button click, Step's Selected parameter is toggled and Disabled/Visible
            // steps are updated
            const [currentStepName, isCurrentStepSelected] = payload
            context.commit('toggleSelected', currentStepName)
            context.dispatch('updateDisabledAndVisibleSteps', [currentStepName, !isCurrentStepSelected])
        },
        setActiveStep: (context, payload) => {
            const nextStep = context.getters.getStepByName(payload)
            if (context.state.currentStepId < nextStep.id) {
                for (let i = context.state.currentStepId; i < nextStep.id; i++) {
                    Vue.set(context.state.steps, i,
                        { ...context.state.steps[i], status: 'previous' })
                }
                Vue.set(context.state.steps,
                    nextStep.id,
                    { ...context.state.steps[nextStep.id], status: 'current' })
            } else {
                for (let i = context.state.currentStepId; i > nextStep.id; i--) {
                    Vue.set(context.state.steps, i,
                        { ...context.state.steps[i], status: 'inactive' })
                }
                Vue.set(context.state.steps,
                    nextStep.id,
                    { ...context.state.steps[nextStep.id], status: 'current' })
            }
            context.state.currentStepId = nextStep.id
        }
    }
})
