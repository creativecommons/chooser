<template>
  <div class="help-section">
    <h2 class="title is-3">
      {{ $t('help.heading') }}
    </h2>
    <div class="help-accordion">
      <div
        v-for="(modal, idx) in modals"
        :key="idx"
        class="help-accordion-item"
      >
        <button
          class="help-accordion-header"
          :aria-expanded="isAccordionOpen(idx)"
          @click="toggleAccordion(idx)"
        >
          {{ $t(`help.${modal}.heading`) }}
          <span class="chevron" :class="{ rotated: openModal === idx }">
            ▶
          </span>
        </button>
        <div v-show="openModal === idx" class="help-accordion-content">
          <!-- Render rich HTML from JSON's text field -->
          <div v-if="openModal !== 3" v-html="$t(`help.${modal}.text`)"></div>

          <section v-if="openModal === 3">
            <p>
              {{ $t('help.what-icons-mean.text') }}
            </p>
            <div class="icons-section">
              <div class="icon-item">
                <img
                  src="@creativecommons/cc-assets/icons/cc-by.svg"
                  :alt="$t('help.what-icons-mean.BY.icon-alt-text')"
                />
                <h6 class="b-header">
                  {{ $t('help.what-icons-mean.BY.long-name') }}
                </h6>
                <p class="icon-caption">
                  {{ $t('help.what-icons-mean.BY.short-name') }}
                </p>
                <p class="icon-text">
                  {{ $t('help.what-icons-mean.BY.text') }}
                </p>
              </div>
              <div class="icon-item">
                <img
                  src="@creativecommons/cc-assets/icons/cc-nd.svg"
                  :alt="$t('help.what-icons-mean.ND.icon-alt-text')"
                />
                <h6 class="b-header">
                  {{ $t('help.what-icons-mean.ND.long-name') }}
                </h6>
                <p class="icon-caption">
                  {{ $t('help.what-icons-mean.ND.short-name') }}
                </p>
                <p class="icon-text">
                  {{ $t('help.what-icons-mean.ND.text') }}
                </p>
              </div>
              <div class="icon-item">
                <img
                  src="@creativecommons/cc-assets/icons/cc-nc.svg"
                  :alt="$t('help.what-icons-mean.NC.icon-alt-text')"
                />
                <h6 class="b-header">
                  {{ $t('help.what-icons-mean.NC.long-name') }}
                </h6>
                <p class="icon-caption">
                  {{ $t('help.what-icons-mean.NC.short-name') }}
                </p>
                <p class="icon-text">
                  {{ $t('help.what-icons-mean.NC.text') }}
                </p>
              </div>
              <div class="icon-item">
                <img
                  src="@creativecommons/cc-assets/icons/cc-sa.svg"
                  :alt="$t('help.what-icons-mean.SA.icon-alt-text')"
                />
                <h6 class="b-header">
                  {{ $t('help.what-icons-mean.SA.long-name') }}
                </h6>
                <p class="icon-caption">
                  {{ $t('help.what-icons-mean.SA.short-name') }}
                </p>
                <p class="icon-text">
                  {{ $t('help.what-icons-mean.SA.text') }}
                </p>
              </div>
            </div>
          </section>

          <!-- Optional footer if available -->
          <div v-if="$t(`help.${modal}.footer`)" class="help-footer">
            {{ $t(`help.${modal}.footer`) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openModal: null,
      modals: [
        'what-are-cc-licenses',
        'how-to-apply-cc-license',
        'what-should-i-consider',
        'what-icons-mean',
        'what-if-other-questions',
      ],
    };
  },
  computed: {
    openModalTitle() {
      return this.openModal !== null ? this.modals[this.openModal] : null;
    },
  },
  methods: {
    toggleAccordion(index) {
      this.openModal = this.openModal === index ? null : index;
    },
    isAccordionOpen(index) {
      return this.openModal === index;
    },
  },
};
</script>

<style lang="scss">
.help-section {
  margin-top: 3rem;

  .help-accordion {
    .help-accordion-item {
      border-bottom: 1px solid #dddddd;

      .help-accordion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.5rem;
        background: #f9f9f9;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        color: #c74200;

        &:hover {
          background: #f2f2f2;
        }

        .chevron {
          transition: transform 0.2s ease-in-out;

          &.rotated {
            transform: rotate(90deg);
          }
        }
      }

      .help-accordion-content {
        padding: 1rem;
        background: #ffffff;
        color: #333333;
        font-size: 0.9rem;
        line-height: 1.4;
      }
    }
  }

  .icons-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
    @media only screen and (max-width: 768px) {
      grid-template-columns: 100%;
    }
  }

  .icon-item {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr 1fr;
    grid-template-areas:
      'icon title'
      'icon caption'
      'text text';
    column-gap: 1rem;
    img {
      grid-area: icon;
      width: 45px;
    }

    h6 {
      grid-area: title;
    }

    .icon-caption {
      grid-area: caption;
    }

    .icon-text {
      grid-area: text;
    }
  }
}
</style>
