<template>
    <div id="app">
        <Header :title="$t('app-title')"/>
        <Feedback/>
        <div class="container" id="site-container">
            <div class="columns">
            <VerticalStepper
                :selected="selected"
                @openLicenseCard="openLicenseCard"
                @toggleLicenseAttr="updateLicense"
                @openLicenseUse="openLicenseUse"
            />
            <div class="column">
                <SelectedLicenseCard
                    v-if="showLicense"
                    :selected="selected"
                />
                <LicenseUseCard
                    v-if="showLicenseUse"
                    v-model="selected"
                />
                <HelpSection />
            </div>
            </div>
        </div>
        <Footer>
            <div class="panel">
                <div>
                    <p>
                        Built with <a href="https://creativecommons.github.io/cc-vocabulary/">Vocabulary</a>.
                    </p>
                    <p>
                        <a href="https://github.com/creativecommons/cc-chooser">Icons</a> by The Noun Project and
                        FontAwesome.
                    </p>
                    <p>
                        Contribute on <a href="https://github.com/creativecommons/cc-chooser">Github</a>.
                    </p>
                </div>
                <Locale/>
            </div>
        </Footer>
    </div>
</template>

<script>
// TODO Reduce custom styling in favour of Vocabulary styles
import '@creativecommons/vocabulary/css/root.css'
import '@creativecommons/vocabulary/css/index.css'

import HelpSection from './components/HelpSection'
import VerticalStepper from './components/VerticalStepper'
import SelectedLicenseCard from './components/SelectedLicenseCard'
import LicenseUseCard from './components/LicenseUseCard'
import { Header, Footer, Locale } from '@creativecommons/vue-vocabulary'
import Feedback from './components/Feedback'

export default {
    name: 'App',
    components: {
        HelpSection,
        VerticalStepper,
        SelectedLicenseCard,
        LicenseUseCard,
        Feedback,
        Header,
        Footer,
        Locale
    },
    data() {
        return {
            showLicense: false,
            showLicenseUse: false,
            currentStep: 0,
            selected: {
                shortName: 'CC BY 4.0',
                fullName: 'Attribution 4.0 International',
                attributionDetails: {
                    creatorName: '',
                    creatorProfileUrl: '',
                    workTitle: '',
                    workUrl: ''
                }
            }
        }
    },
    methods: {
        openLicenseCard() {
            this.showLicense = true
        },
        openLicenseUse() {
            this.showLicenseUse = true
        },
        updateLicense(licenseAttribute) {
            const attrUpper = licenseAttribute.toUpperCase()
            const attributes = this.$shortToAttributes(this.selected.shortName)
            const updatedAttributes = { ...attributes }
            updatedAttributes[attrUpper] = !attributes[attrUpper]
            this.selected = {
                ...this.selected,
                shortName: this.$attrToShort(updatedAttributes),
                fullName: this.$attrToFull(updatedAttributes)
            }
        }
    },
    created: function() {
        // send home to google analytics
        if (process.env.NODE_ENV === 'production') {
            this.$ga.page('/')
        }
    }
}</script>
<style lang="scss">
    // Import Bulma's core
    @import "~bulma/sass/utilities/_all";
    $primary: hsl(138, 95%, 33%);

    // Links
    $link: $primary;
    $link-focus-border: $primary;
    // Fonts
    $family-primary: Source Sans Pro,Noto Sans,Arial,Helvetica Neue,Helvetica,sans-serif;
    $family-sans-serif: Source Sans Pro,Noto Sans,Arial,Helvetica Neue,Helvetica,sans-serif!important;

    // Import Bulma and Buefy styles
    @import "~bulma";
    @import "~buefy/src/scss/buefy";
    @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A%20400%2C600%2C700%7CRoboto+Condensed&ver=4.9.8");

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    #site-container {
        padding-top: 2rem;
        padding-bottom: 2%;
    }

    .desktop-hide {
        display: none;
    }

    .desktop-show {
        display: block;
    }
    h2, h3 {
        font-family: Roboto Condensed;
        color: #333333;
    }
    .vocab-h2 {
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 47px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        padding-bottom: 8px;
    }
    .vocab-h3 {
        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        line-height: 36px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        margin-bottom: 12px;
    }
    .vocab-h4 {
        font-style: normal;
        font-weight: bold;
        font-size: 23px;
        line-height: 27px;
        margin-bottom: 12px;
    }
    .vocab-h5 {
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 26px;
    }
    .vocab-tomato {
        color: #ED592F!important;
    }
    .vocab-body-bigger {
        font-style: normal;
        font-weight: normal;
        font-size: 23px;
        line-height: 33px;
        color: #333333;
        margin-bottom: 8px;
        padding-bottom: 8px;
    }
    .vocab-body-big {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 25px;
        color: #333333;
        margin-bottom: 8px;
        padding-bottom: 8px;
    }
    .normal-gray {
        color: #D8D8D8!important;
    }
    .selected-license-card {
        margin-bottom: 32px;
        margin-top: 132px;
    }
    .help-section {
        margin-top: 32px;
    }

    @media only screen and (max-width: 1025px) {
        #site-container {
            margin-left: 2%;
            margin-right: 2%;
        }

        .mobile-hide {
            display: none;
        }

        .mobile-show {
            display: block;
        }
    }

    @media only screen and (max-width: 670px) {
        #site-container {
            margin-left: 3%;
            margin-right: 3%;
        }
    }

    .vocab-container .vocab-grid .panel {
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }

    .vocab.select-field.normal-sized {
        font-size: 1rem;
    }

    .vocab.select-field > .field.has-addons {
        padding-left: calc(1em + var(--select-field-addons-space));
        margin-bottom: 0;
        min-width: 10em;
    }

    .vocab.select-field > .field > option[disabled] {
        opacity: 0.6;
    }

    .panel {
        margin-top: 1rem;
    }
</style>
<style scoped>
    p {
        margin-bottom: .5em;
    }

    #custom .panel > div:first-child {
        margin-bottom: 10vh;
    }

    .vocab.footer {
        line-height: 1.2;
    }
</style>
