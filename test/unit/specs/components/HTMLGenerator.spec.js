import HTMLGenerator from '@/components/HTMLGenerator'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'

const defaultHtml = '<p style="font-size: 0.9rem;font-style: italic;"><a href="">"This work"</a>' +
    ' is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=ccchooser" ' +
    'style="margin-right: 5px;">CC BY 4.0</a><a href="https://creativecommons.org/licenses/by/4.0/?ref=ccchooser" ' +
    'target="_blank" rel="noopener noreferrer" style="display: inline-block;white-space: none;opacity: .7;' +
    'margin-top: 2px;margin-left: 3px;height: 22px !important;"><img style="height: inherit;margin-right: 3px;' +
    'display: inline-block;" src="https://search.creativecommons.org/static/img/cc_icon.svg" />' +
    '<img style="height: inherit;margin-right: 3px;display: inline-block;" ' +
    'src="https://search.creativecommons.org/static/img/cc-by_icon.svg" /></a></p>'
const shortLicenseName = 'CC BY 4.0'
const defaultLicenseURL = 'https://creativecommons.org/licenses/by/4.0/?ref=ccchooser'

const newObject = {
    workTitle: 'newWorkTitle',
    attributeToName: 'newAttributeToName',
    attributeToURL: 'https://newAttributeToURL.com',
    sourceWorkURL: 'https://newSourceWorkURL.com',
    morePermsURL: 'https://newMorePermURL.com',
    workLocation: 'https://newWorkLocation.com'
}

const localVue = createLocalVue()
localVue.use(Buefy)

describe('HTMLGenerator.vue', () => {

    const wrapper = shallowMount(HTMLGenerator, {
        localVue,
        propsData: {
            shortLicenseName
        }
    })

    it('renders the correct markup', () => {
        expect(wrapper.element).toMatchSnapshot()
        expect(wrapper.html()).toContain('<textarea id="attribution-html" readonly="readonly" class="textarea">')
        expect(wrapper.html().includes('textarea'))
    })

    it('renders correctly with default values', () => {
        expect(wrapper.vm.attributionHTML()).toEqual(defaultHtml)
        expect(wrapper.html().includes(shortLicenseName))
        expect(wrapper.vm.licenseURL).toEqual(defaultLicenseURL)
        expect(wrapper.vm.workTitle).toEqual('')
        expect(wrapper.vm.workLocation).toEqual('')
        expect(wrapper.vm.iconsArr).toEqual(['by'])
    })

    it('changes rich text correctly when workLocation changes', () => {
        wrapper.setData({'workLocation': newObject.workLocation})
        expect(wrapper.find('#attribution-richtext').html()).toContain(newObject.workLocation)
    })

    it('changes html correctly when title changes', () => {
        wrapper.setData({'workTitle': newObject.workTitle})
        expect(wrapper.vm.workTitle).toEqual(newObject.workTitle)
        expect(wrapper.vm.attributionHTML()).toContain(newObject.workTitle)
    })

    it('changes html correctly when attribute url and name fields change', () => {
        const byName = `<span> by <span>${newObject.attributeToName}</span></span>`
        const byNameAndURL = `<span> by <a href="${newObject.attributeToURL}">${newObject.attributeToName}</a></span>`
        wrapper.setData({'attributeToName': newObject.attributeToName})
        expect(wrapper.vm.attributionHTML()).toContain(byName)
        wrapper.setData({'attributeToURL': newObject.attributeToURL})
        expect(wrapper.vm.attributionHTML()).toContain(byNameAndURL)
    })

    it('changes correctly when license type changes', () => {
        const ncnd = 'CC BY-NC-ND 4.0'
        const ncndURL = 'https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=ccchooser'
        const ncndIconsArr = ['by', 'nc', 'nd']
        wrapper.setProps({'shortLicenseName': ncnd})
        expect(wrapper.vm.attributionHTML()).toContain(ncndURL)
        expect(wrapper.html()).toContain(ncnd)
        expect(wrapper.vm.licenseURL).toEqual(ncndURL)
        expect(wrapper.vm.iconsArr).toEqual(ncndIconsArr)
    })
})
