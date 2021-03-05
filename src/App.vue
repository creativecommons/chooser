<template>
  <div id="app">
    <header-section v-if="!isEmbedded" />
    <div
      id="site-container"
      class="container"
    >
      <nav
        class="breadcrumb caption bold"
        aria-label="breadcrumbs"
      >
        <ul>
          <li><a href="https://creativecommons.org/">Home</a></li>
          <li class="is-active">
            <a
              href="#"
              aria-current="page"
            >{{ $t('app.page-title') }}</a>
          </li>
        </ul>
      </nav>

      <h1 class="title is-2">
        {{ $t('chooser.heading') }}
      </h1>
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
          <help-section @change="openChooserModal" />
        </div>
        <div class="column right-column">
          <!-- The right column with the recommended license should be fixed until
                     the 'LicenseUseCard' appears, when the column should scroll to make the
                     'LicenseUseCard' visible -->
          <div :class="{ 'fixed-right-column': !showLicenseUse }">
            <transition name="appear">
              <LicenseDetailsCard
                v-if="showLicense"
              />
            </transition>
            <transition name="appear">
              <LicenseUseCard
                v-if="showLicenseUse"
                ref="licenseUseCard"
                :class="{ 'shake' : shouldShake}"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
    <footer-section v-if="!isEmbedded" />
    <chooser-modal
      :active-modal="openModal"
      @close="closeChooserModal"
    />
  </div>
</template>

<script>
// TODO Reduce custom styling in favour of Vocabulary styles
import { mapMutations } from 'vuex'

import ChooserModal from './components/ChooserModal'
import HelpSection from './components/HelpSection'
import Stepper from './components/Stepper'
import HeaderSection from './components/HeaderSection'
import FooterSection from './components/FooterSection'
import LicenseDetailsCard from './components/LicenseDetailsCard'

export default {
  name: 'App',
  components: {
    HelpSection,
    Stepper,
    LicenseDetailsCard,
    LicenseUseCard: () => import('@/components/LicenseUseCard'),
    HeaderSection,
    FooterSection,
    ChooserModal,
  },
  data() {
    return {
      isEmbedded: process.env.VUE_APP_CC_OUTPUT === 'embedded' ?? false,
      currentStepId: 0,
      openModal: null,
      showLicense: false,
      shouldShake: false,
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    showLicenseUse() {
      return this.currentStepId === 8
    },
    isBelowTabletWidth() {
      return this.windowWidth < 769
    },
  },
  watch: {
    /**
         * When the new step opens, the page is scrolled to the top of the
         * previous step. When the 'Back' button is clicked, the page is
         * scrolled to the previous step.
         * When the user chooses No attribution, the page is scrolled to the first
         * of the following disabled steps, i.e. step 2 (NC).
         */
    async currentStepId(newId, oldId) {
      const stepToScroll = newId === 6 && oldId === 1
        ? 2
        : Math.min(newId, oldId)
      await this.$nextTick()
      // By default, scroll is cancelled when the user clicks enter. We want to override that
      // so that the stepper scrolls for users using keyboard navigation.
      this.$scrollTo(`.step-${stepToScroll}`, { cancelable: false })
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
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
    ...mapMutations(['setAttributionType']),
    /**
        *  When user clicks restart, we set the active step to 0, so the stepper opens
        *  the first step. We don't, however, delete the information the user entered,
        *  so all the steps have previously selected options, and attribution information
         *  is filled as it was previously.
         */
    restart() {
      this.currentStepId = 0
      this.showLicense = 0
      this.setAttributionType('short')
    },
    /**
         * When the user clicks `Done`, we scroll to the 'Mark your work' section ('LicenseUseCard')
         * and shake it. Shaking animation is triggered by adding 'shake' class to the section, and removing it
         * after a timeout. On mobile, we add a timeout for shaking because the page will first to make the
         * section visible.
         */
    done() {
      const scrollDuration = this.isBelowTabletWidth ? 3000 : 800
      const shakeDuration = 3000 + scrollDuration
      const comp = this
      setTimeout(() => { comp.shouldShake = true }, scrollDuration - 400)
      setTimeout(() => { comp.shouldShake = false }, shakeDuration)
      this.$scrollTo(this.$refs.licenseUseCard.$el, scrollDuration, { cancelable: false })
    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    openChooserModal(modal) {
      this.openModal = modal
    },
    closeChooserModal() {
      this.openModal = null
    },
  },
}
</script>
<style lang="scss">

    @import "~@creativecommons/vocabulary/scss/vocabulary.scss";

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333333;
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
        transition: opacity .6s ease;
    }
    .appear-leave-active {
        transition: opacity .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .appear-enter, .appear-leave-to {
        opacity: 0;
    }
</style>
