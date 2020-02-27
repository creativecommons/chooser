<template>
    <div id="app">
        <Header :title="$t('app.title')" />
        <div
            id="site-container"
            class="container"
        >
            <div class="page-head">
                <div class="select-license-column">
                    <h2 class="vocab h2a ha">
                        {{ $t('select-license.heading') }}
                    </h2>
                    <p class="stepper-instructions vocab-body body-bigger">
                        {{ $t('select-license.instructions') }}
                    </p>
                </div>
                <LocaleChooser />
            </div>
            <div class="columns">
                <Stepper v-model="currentStepId" />
                <div class="column">
                    <div class="fixed-right-column">
                        <SelectedLicenseCard
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
        <Footer />
    </div>
</template>

<script>
// TODO Reduce custom styling in favour of Vocabulary styles
import '@creativecommons/vocabulary/css/root.css'
import '@creativecommons/vocabulary/css/index.css'

import HelpSection from './components/HelpSection'
import Stepper from './components/Stepper'
import SelectedLicenseCard from './components/LicenseDetailsCard'
import LicenseUseCard from './components/LicenseUseCard'
import Header from './components/Header.vue'
import Footer from './components/Footer'
import LocaleChooser from './components/LocaleChooser'

export default {
    name: 'App',
    components: {
        HelpSection,
        Stepper,
        SelectedLicenseCard,
        LicenseUseCard,
        Header,
        Footer,
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
    @import "~buefy/src/scss/buefy";
    @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A%20400%2C600%2C700%7CRoboto+Condensed&ver=4.9.8");

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        counter-reset: step-counter;
    }
    #site-container {
        padding-top: 2rem;
        padding-bottom: 2%;
    }
    .page-head {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1.5rem;
        .select-license-column {
            grid-column: 1;
        }
        .locale-chooser {
            grid-column: 2;
        }
    }
    .stepper-instructions {
        margin-bottom: 14px;
    }
    .fixed-right-column {
        position: sticky;
        top: 10px;
    }
    .selected-license-card {
        // Margin is added to make the left column long enough for the right column to stay sticky when scrolling
        margin-bottom: 32px;
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
    @media only screen and (max-width: 768px) {
        #site-container {
            padding-top: 0;
        }
        .page-head {
            grid-template-columns: 100%;
            grid-gap: 1rem;
        }
        .select-license-column {
            order: 2;
        }
        .locale-chooser {
            padding-top: 1rem;
            height: auto;
            grid-column: auto;
            order: 1;
        }
    }
    @media only screen and (max-width: 670px) {
        #site-container {
            margin-left: 3%;
            margin-right: 3%;
        }
    }
</style>
