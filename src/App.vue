<template>
    <div id="app">
        <header-section />
        <div
            id="site-container"
            class="container"
        >
            <div class="page-head">
                <div class="select-license-column">
                    <h2 class="vocab">
                        {{ $t('select-license.heading') }}
                    </h2>
                    <p class="stepper-instructions vocab-body body-bigger">
                        {{ $t('select-license.instructions') }}
                    </p>
                </div>
                <LocaleChooser class="locale-chooser" />
            </div>
            <div class="columns">
                <Stepper v-model="currentStepId" />
                <div class="column">
                    <div class="fixed-right-column">
                        <LicenseDetailsCard
                            v-if="showLicense"
                        />
                        <LicenseUseCard
                            v-if="showLicenseUse"
                        />
                        <HelpSection />
                    </div>
                </div>
            </div>
        </div>
        <footer-section />
    </div>
</template>

<script>
// TODO Reduce custom styling in favour of Vocabulary styles

import HelpSection from './components/HelpSection'
import Stepper from './components/Stepper'
import LicenseUseCard from './components/LicenseUseCard'
import HeaderSection from './components/HeaderSection'
import FooterSection from './components/FooterSection'
import LocaleChooser from './components/LocaleChooser'
import LicenseDetailsCard from './components/LicenseDetailsCard'

export default {
    name: 'App',
    components: {
        HelpSection,
        Stepper,
        LicenseDetailsCard,
        LicenseUseCard,
        HeaderSection,
        FooterSection,
        LocaleChooser
    },
    data() {
        return {
            currentStepId: 0,
            showLicense: false
        }
    },
    computed: {
        showLicenseUse() {
            return this.currentStepId === 7
        }
    },
    created: function() {
        // send home to google analytics
        if (process.env.NODE_ENV === 'production') {
            this.$ga.page('/')
        }
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'updateAttributesFromShort' || mutation.type === 'setSelected') {
                this.showLicense = true
            }
        })
    }
}
</script>
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
    @import '~buefy/src/scss/utils/_variables.scss';
    @import '~buefy/src/scss/components/_modal.scss';
    @import '~buefy/src/scss/components/_radio.scss';
    @import '~buefy/src/scss/components/_tabs.scss';
    @import '~buefy/src/scss/components/_select.scss';
    @import '~buefy/src/scss/components/_form.scss';
    @import '~buefy/src/scss/components/_icon.scss';

    @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A%20400%2C600%2C700%7CRoboto+Condensed&ver=4.9.8");
    @import "@creativecommons/vocabulary/scss/vocabulary.scss";

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        counter-reset: step-counter;
    }
    #site-container {
        padding: 0.75rem;
    }
    .page-head {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1.5rem;
        grid-template-areas: "localechooser" "heading";
    }
    .selected-license-column {
        grid-area: heading;
    }
    .locale-chooser {
        grid-area: localechooser;
    }
    .stepper-instructions {
        margin-bottom: 14px;
    }
    .fixed-right-column {
        position: sticky;
        top: 10px;
    }
    .selected-license-card {
        // Margin is added to make the left column long enough
        // for the right column to stay sticky when scrolling
        margin-bottom: 32px;
    }
    footer.footer.chooser-footer {
        margin-top: 2rem;
    }
    @media only screen and (min-width: 769px) {
        #site-container {
            padding-top: 2rem;
        }
        .page-head {
            grid-template-columns: 1fr 1fr;
            grid-gap: 1.5rem;
            grid-template-areas: "heading localechooser";
        }
        footer {
            margin-top: 5rem;
        }
    }
    @media only screen and (min-width: 1025px) {
        #site-container {
            padding-left: 0;
            padding-right: 0;
        }
    }

</style>
