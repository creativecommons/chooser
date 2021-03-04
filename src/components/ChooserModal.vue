<template>
  <app-modal
    v-if="activeModal!==null"
    :title="$t(`help.${modals[activeModal]}.heading`)"
    @close="closeModal"
  >
    <section class="modal-body">
      <section
        v-if="isSimpleModal(activeModal)"
        :class="['modal-content', `modal-${activeModal}`]"
      >
        <article
          v-html="$t(`help.${modals[activeModal]}.text`)"
        />
      </section>

      <section
        v-if="activeModal === 2"
        class="modal-content modal-2"
      >
        <p>
          {{ $t('help.what-icons-mean.text') }}
        </p>
        <div class="icons-section">
          <div class="icon-item">
            <img
              src="../assets/license-icons/by.svg"
              :alt="$t('help.what-icons-mean.BY.icon-alt-text')"
            >
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
              src="../assets/license-icons/nd.svg"
              :alt="$t('help.what-icons-mean.ND.icon-alt-text')"
            >
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
              src="../assets/license-icons/nc.svg"
              :alt="$t('help.what-icons-mean.NC.icon-alt-text')"
            >
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
              src="../assets/license-icons/sa.svg"
              :alt="$t('help.what-icons-mean.SA.icon-alt-text')"
            >
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
      <section
        v-if="activeModal === 5"
        class="modal-content modal-5"
      >
        <article class="columns-auto">
          <div
            v-html="$t('help.six-cc-licenses.text')"
          />
          <img
            alt="license openness scale"
            src="../assets/license-openness-scale.png"
          >
        </article>
      </section>
      <section
        v-if="activeModal === 6"
        class="modal-content modal-6"
      >
        <article>
          <p v-html="$t('help.how-licenses-communicated.text')" />
          <div class="license-communication">
            <div class="info-row">
              <h6 class="b-header">
                {{ $t('help.how-licenses-communicated.full-name') }}
              </h6>
              <p>{{ $t('help.how-licenses-communicated.CC-BY-NC') }}</p>
            </div>

            <div class="info-row">
              <h6 class="b-header">
                {{ $t('help.how-licenses-communicated.short-name') }}
              </h6>
              <p>CC BY-NC 4.0</p>
            </div>
            <div class="info-row">
              <h6 class="b-header">
                {{ $t('help.how-licenses-communicated.license-icons') }}
              </h6>
              <div><license-icons :icons-arr="['by', 'nc']" /></div>
            </div>
          </div>
        </article>
      </section>
      <footer
        class="modal-footer modal-card-foot"
        v-html="$t(`help.${modals[activeModal]}.footer`)"
      />
    </section>
  </app-modal>
</template>

<script>
import LicenseIcons from './LicenseIcons'

export default {
  name: 'ChooserModal',
  components: {
    LicenseIcons,
  },
  props: {
    activeModal: {
      type: [String, Number, null],
      default: null,
    },
  },
  data() {
    return {
      modals: [
        'what-are-cc-licenses',
        'how-licenses-work',
        'what-icons-mean',
        'considerations-before-licensing',
        'how-formally-license',
        'six-cc-licenses',
        'how-licenses-communicated',
        'what-free-culture-license',
        'look-earlier-license-ver',
      ],
    }
  },
  methods: {
    isSimpleModal(number) {
      return ![2, 5, 6].includes(number)
    },
    closeModal() {
      this.openModal = null
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">

.modal {
    --h-padding: 2rem;
    --v-padding: 2.5rem;

    display: block;
    overflow-y: hidden;

    .modal-header {
        background-color: #f5f5f5;
        color: #333333;
        font-size: 1.5rem;
        border-bottom: 1px solid #dbdbdb;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    .modal-card-foot {
        align-items: center;
        background-color: #f5f5f5;
        display: flex;
        flex-shrink: 0;
        justify-content: flex-start;
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-left: var(--h-padding);
        padding-right: var(--h-padding);
        width: 100%;
    }

    .modal-content {
        padding-left: var(--h-padding);
        padding-right: var(--h-padding);
        padding-bottom: var(--v-padding);
        width: 100%;
    }

    .modal-body {
      max-height: 80vh;
        overflow-y: auto;
        padding-top: var(--h-padding);
        margin: 0;
        color: #333333;

        article {
            max-width: 85ch;
            margin-right: auto;
            margin-left: auto;
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
    grid-template-areas: "icon title"
                     "icon caption"
                     "text text";
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

    .license-communication {
        display: flex;
        flex-direction: column;

    .info-row {
        display: flex;
        flex-direction: row;
        padding-bottom: 1rem;
        padding-top: 1rem;
        h6 {
            flex: 1;
        }
        p, div {
            flex: 3;
        }
        &:not(:last-child) {
            border-bottom: 1px solid rgb(219, 219, 219);
        }
    }
}

.modal-body .icon-item .icon-caption {
    margin-bottom: 0.5rem;
}

.modal-body p:not(:last-child) {
    margin-bottom: 1rem;
}
.modal-body .license-communication p:not(:last-child) {
    margin-bottom: 0;
}

.columns-auto {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--h-padding);
}

@media only screen and (max-width: 768px) {
    .app-modal {
        .modal {
            --h-padding: 1rem;
            --v-padding: 1.5rem;
            .modal-header {
                padding-top: 1.5rem !important;
                padding-left: 1rem !important;
            }

            max-height: unset;
        }
        .modal-title {
            font-size: 2.125rem;
        }
        .modal.is-active .modal-body {
            max-height: calc(100vh - 20px);
        }
    }
    .columns-auto {
        display: flex;
        flex-direction: column;
    }
}
</style>
