<template>
  <div
    class="license-use-card"
    @click="updateCopyTarget"
  >
    <h3>
      {{ $t('license-use.heading') }}
    </h3>
    <p class="license-use-instructions">
      {{ $t('license-use.common-instructions') }}
    </p>
    <tabs
      ref="alltabs"
      class="top-tabs"
    >
      <!-- Website: Richtext, HTML, XMP -->
      <tab
        ref="web"
        class="main-tabs"
        :title="$t('license-use.web-tab-heading')"
      >
        {{ $t('license-use.web-instructions') }}
        <tabs
          ref="web"
          class="attribution-tabs"
          :boxed="true"
        >
          <tab
            ref="richtext"
            :title="$t('license-use.rich-text-label')"
          >
            <license-text
              class="richtext"
              text-for="web"
            />
          </tab>
          <tab
            ref="html"
            :title="$t('license-use.html-label')"
          >
            <license-h-t-m-l class="html" />
          </tab>
          <tab
            ref="xmp"
            title="XMP"
          />
        </tabs>
      </tab>
      <!-- Print work or media -->
      <tab
        ref="printmedia"
        :title="$t('license-use.print-media-tab-heading')"
      >
        {{ $t('license-use.print-media-instructions') }}
        <tabs
          class="attribution-tabs"
          :boxed="true"
        >
          <tab
            ref="plaintext"
            :title="$t('license-use.plain-text-label')"
          >
            <license-text
              class="plaintext"
              text-for="print"
            />
          </tab>
        </tabs>
      </tab>
    </tabs>
    <copy-tools :clipboard-target="copyTarget" />
  </div>
</template>
<script>
import CopyTools from '@/components/CopyTools'
import LicenseHTML from '@/components/LicenseHTML'
import LicenseText from '@/components/LicenseText'
export default {
  name: 'LicenseUseCard',
  components: {
    LicenseHTML,
    LicenseText,
    CopyTools,
  },
  data() {
    return {
      copyTarget: '.richtext',
    }
  },
  methods: {
    updateCopyTarget() {
      const activeTab = this.$refs.alltabs.$data.activeTabIndex === 0 ? 'web' : 'print'
      if (activeTab === 'web') {
        const activeWebTabIndex = Number.parseInt(this.$refs.web.$data.activeTabIndex)
        this.copyTarget = `.${['richtext', 'html', 'xmp'][activeWebTabIndex]}`
      } else {
        this.copyTarget = '.plaintext'
      }
    },
  },
}
</script>
<style lang="scss">
.license-use-card {
    margin-bottom: 1.5rem;
    h3 {
        margin-bottom: 0.5rem;
    }

    &.shake {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
    }
    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }
        20%, 80% {
            transform: translate3d(3px, 0, 0);
        }
        30%, 50%, 70% {
            transform: translate3d(-6px, 0, 0);
        }
        40%, 60% {
            transform: translate3d(6px, 0, 0);
        }
    }
}

.top-tabs > .tabs:not(:last-child) {
    margin: 2rem 0 1rem;
}
.attribution-tabs {
    margin-top: 1.25rem;
    .tabs-content.is-boxed {
        padding: 1.5rem;
        border-bottom: none;
    }
}
.tabs.is-boxed li:first-child a {
    border-top-left-radius: 0.25rem;
}
.tabs.is-boxed li:last-child a {
    border-top-right-radius: 0.25rem;
}
@media only screen and (max-width: 768px) {
    .tabs li a{
        font-size: 1.125 rem
    }
    .attribution-tabs {
        margin-top: 1.25rem;
        .tabs-content.is-boxed {
            padding: 1rem;
            border-bottom: none;
            font-size: 0.8125rem;
            font-style: normal;
            font-weight: 600;
            line-height: 1.1875rem;
            letter-spacing: 0;
            text-align: left;
        }
        .tabs.is-boxed a {
             font-size: 0.8125rem;
             font-style: normal;
             font-weight: 600;
             line-height: 1.1875rem;
             letter-spacing: 0;
             text-align: left;
        }
    }

}

</style>
