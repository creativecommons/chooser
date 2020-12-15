<template>
    <div id="app">
        <header-section />
        <div
            id="site-container"
            class="container"
        >
            <nav
                class="breadcrumb caption bold"
                aria-label="breadcrumbs"
            >
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Child Page</a></li>
                    <li class="is-active">
                        <a
                            href="#"
                            aria-current="page"
                        >{{ $t('app.page-title') }}</a>
                    </li>
                </ul>
            </nav>

            <h2>
                {{ $t('chooser.heading') }}
            </h2>
            <p class="stepper-instructions body-bigger">
                {{ $t('chooser.instructions') }}
            </p>

            <div class="columns wider-gap">
                <div class="column">
                    <Stepper
                        v-model="currentStepId"
                        @restart="restart"
                        @done="done"
                    />
                    <help-section />
                </div>
                <div class="column">
                    <div :class="{ 'fixed-right-column': !showLicenseUse }">
                        <transition name="appear">
                            <LicenseDetailsCard
                                v-if="showLicense"
                            />
                        </transition>

                        <LicenseUseCard
                            v-if="showLicenseUse"
                            ref="licenseUseCard"
                            :class="{ 'shake' : shouldShake}"
                        />
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
import LicenseDetailsCard from './components/LicenseDetailsCard'

export default {
    name: 'App',
    components: {
        HelpSection,
        Stepper,
        LicenseDetailsCard,
        LicenseUseCard,
        HeaderSection,
        FooterSection
    },
    data() {
        return {
            currentStepId: 0,
            showLicense: false,
            shouldShake: false
        }
    },
    computed: {
        showLicenseUse() {
            return this.currentStepId === 7
        }
    },
    watch: {
        currentStepId(newId) {
            const offset = newId === 7 ? -200 : -120
            this.$scrollTo(`.step-${newId}`, { offset: offset })
        }
    },
    created: function() {
        // send home to google analytics
        if (process.env.NODE_ENV === 'production') {
            this.$ga.page('/')
        }
        this.$store.subscribe((mutation) => {
            if (mutation.type === 'updateAttributesFromShort' || mutation.type === 'setSelected') {
                this.showLicense = true
            }
        })
    },
    methods: {
        restart() {
            this.currentStepId = 0
            this.showLicense = 0
        },
        done() {
            const scrollDuration = 800
            const shakeDuration = 3000
            const comp = this

            setTimeout(() => { comp.shouldShake = true }, scrollDuration)
            setTimeout(() => { comp.shouldShake = false }, shakeDuration)
            this.$scrollTo(this.$refs.licenseUseCard.$el, 800)
        }
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
    @import '~buefy/src/scss/components/_select.scss';
    @import '~buefy/src/scss/components/_form.scss';
    @import '~buefy/src/scss/components/_icon.scss';

    @import "@creativecommons/vocabulary/scss/vocabulary.scss";

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        counter-reset: step-counter;
        background-color: #f5f5f5;
    }
    #site-container {
        padding: 0.75rem;
        --border-width: 0.125rem;
    }
    #site-container .breadcrumb {
        margin-bottom: 2rem;
    }
    #site-container h2 {
        letter-spacing: 0.05rem;
    }
    .stepper-instructions {
        margin-top: 0.5rem;
        margin-bottom: 2.75rem;
    }
    .columns.wider-gap {
        --outer-padding: 1rem;
        --inner-padding: 1.5rem;
    }
    .columns.wider-gap .column:first-child {
        padding-left: var(--outer-padding);
        padding-right: var(--inner-padding);
    }
    .columns.wider-gap .column:last-child {
        padding-right: var(--outer-padding);
        padding-left: var(--inner-padding);
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
    footer.main-footer {
        margin-top: 2rem;
    }
    @media only screen and (min-width: 769px) {
        #site-container {
            padding-top: 2rem;
        }
        footer.main-footer {
            margin-top: 5rem;
        }
    }
    @media only screen and (min-width: 1024px) {
        #site-container {
            padding-left: 0;
            padding-right: 0;
        }
    }
    @media only screen and (max-width: 768px) {
        #site-container {
            padding-right: 1.375rem;
            padding-left: 1.375rem;
        }
        #site-container h2, #site-container h3 {
            font-size: 1.4375rem;
        }
        .body-bigger {
            font-size: 1rem;
        }
        .stepper-instructions {
            margin-bottom: 2rem;
        }
        .columns.wider-gap .column:first-child,
        .columns.wider-gap .column:last-child {
            padding-right: 0.75rem;
            padding-left: 0.75rem;
        }

    }
    .appear-enter-active {
        transition: all .8s ease;
    }
    .appear-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .appear-enter, .appear-leave-to
        /* .appear-leave-active below version 2.1.8 */ {
        transform: translateY(-10px);
        opacity: 0;
    }
</style>
