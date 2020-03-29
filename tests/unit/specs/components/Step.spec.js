import { mount, createLocalVue, config } from "@vue/test-utils";
import Step from "@/Components/Step.vue";
import VueI18n from "vue-i18n";
import Vuex from "vuex";

describe("Step.vue", () => {
    let wrapper;
    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(VueI18n);
        localVue.use(Vuex);
        wrapper = mount(Step, {
            localVue
        });
        const messages = require("@/locales/en.json");
        const i18n = new VueI18n({
            locale: "en",
            fallbackLocale: "en",
            messages: messages
        });
        config.mocks.i18n = i18n;
        config.mocks.$t = key => {
            return i18n.messages[key];
        };
    });

    it("Has the main div tag with class step-content is present", () => {
        expect(wrapper.contains(".step-content")).toBe(true);
    });

    it("Has the p tag with class vocab-body body-normal is present", () => {
        expect(wrapper.contains(".vocab-body body-normal")).toBe(false);
    });

    it("renders without any errors", () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it("Checks if the cardtext function return the correct answer when enabled is false and disabledDue===ND", () => {
        wrapper.setProps({
            disabledDue: "ND",
            enabled: false
        });
        expect(wrapper.vm.cardText).toBe("stepper.disabled-text-ND");
    });

    it("Checks if the get function in radio returns the correct value when selected is undefined", () => {
        wrapper.setProps({
            selected: undefined
        });
        expect(wrapper.vm.radio).toBe(undefined);
    });

    it("Checks if the get function in radio returns the correct value when selected is yes", () => {
        wrapper.setData({
            reversed: true,
            selected: false
        });
        expect(wrapper.vm.radio).toBe("yes");
    });

    it("Checks if the cardtext function return the correct answer when enabled is false and disabledDue!==ND", () => {
        wrapper.setProps({
            disabledDue: "NN",
            enabled: false
        });
        expect(wrapper.vm.cardText).toBe("stepper.disabled-text");
    });

    it("Checks if the tPrefix function return the correct string when stepName is FS", () => {
        wrapper.setProps({
            stepName: "FS"
        });
        expect(wrapper.vm.tPrefix).toBe("stepper.FS");
    });

    it("Checks if the tPrefix function return the correct string when stepName is BY", () => {
        wrapper.setProps({
            stepName: "BY"
        });
        expect(wrapper.vm.tPrefix).toBe("stepper.BY");
    });

    it("Checks if the tPrefix function return the correct string when stepName is NC", () => {
        wrapper.setProps({
            stepName: "NC"
        });
        expect(wrapper.vm.tPrefix).toBe("stepper.NC");
    });

    it("Checks if the tPrefix function return the correct string when stepName is ND", () => {
        wrapper.setProps({
            stepName: "ND"
        });
        expect(wrapper.vm.tPrefix).toBe("stepper.ND");
    });

    it("Checks if the tPrefix function return the correct string when stepName is SA", () => {
        wrapper.setProps({
            stepName: "SA"
        });
        expect(wrapper.vm.tPrefix).toBe("stepper.SA");
    });

    it("Checks if the tPrefix function return the correct string when stepName is DD", () => {
        wrapper.setProps({
            stepName: "DD"
        });
        expect(wrapper.vm.tPrefix).toBe("stepper.DD");
    });

    it("Checks if the tPrefix function return the correct string when stepName is CW", () => {
        wrapper.setProps({
            stepName: "CW"
        });
        expect(wrapper.vm.tPrefix).toBe("stepper.CW");
    });

    it("Checks if the tPrefix function return the correct string when stepName is AD", () => {
        wrapper.setProps({
            stepName: "AD"
        });
        expect(wrapper.vm.tPrefix).toBe("stepper.AD");
    });

    it("Checks if the yesSelected function returns the correct boolean when selected is true", () => {
        wrapper.setProps({
            selected: true
        });
        expect(wrapper.vm.yesSelected).toBe("selected");
    });

    it("Checks if the yesSelected function returns the correct boolean when selected is false", () => {
        wrapper.setProps({
            selected: false
        });
        expect(wrapper.vm.yesSelected).toBe("not-selected");
    });

    it("Checks if the noSelected function returns the correct boolean when selected is true", () => {
        wrapper.setProps({
            selected: true
        });
        expect(wrapper.vm.noSelected).toBe("not-selected");
    });

    it("Checks if the noSelected function returns the correct boolean when selected is false", () => {
        wrapper.setProps({
            selected: false
        });
        expect(wrapper.vm.noSelected).toBe("selected");
    });

    it("Checks if the showDisabledDue function returns the correct boolean when enabled is true and disabledDue is equal to undefined", () => {
        wrapper.setProps({
            enabled: true,
            disabledDue: undefined
        });
        expect(wrapper.vm.showDisabledDue).toBe(false);
    });

    it("Checks if the showDisabledDue function returns the correct boolean when enabled is false and disabledDue is equal to undefined", () => {
        wrapper.setProps({
            enabled: false,
            disabledDue: undefined
        });
        expect(wrapper.vm.showDisabledDue).toBe(false);
    });

    it("Checks if the qualifier function returns the correct boolean when reversed is true and selected is false", () => {
        wrapper.setProps({
            selected: false,
            reversed: true
        });
        expect(wrapper.vm.qualifier).toBe(true);
    });

    it("Checks if the qualifier function returns the correct boolean when reversed is false and selected is false", () => {
        wrapper.setProps({
            selected: false,
            reversed: false
        });
        expect(wrapper.vm.qualifier).toBe(false);
    });

    it("Checks if the qualifier function returns the correct boolean when reversed is false and selected is true", () => {
        wrapper.setProps({
            selected: true,
            reversed: false
        });
        expect(wrapper.vm.qualifier).toBe(true);
    });

    it("Checks if the qualifier function returns the correct boolean when reversed is true and selected is true", () => {
        wrapper.setProps({
            selected: true,
            reversed: true
        });
        expect(wrapper.vm.qualifier).toBe(false);
    });
});
