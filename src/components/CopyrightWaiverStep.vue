<template>
  <div class="step-actions">
    <v-checkbox
      :value="copyright.agreed"
      @input="toggle('agreed')"
    >
      {{ $t('stepper.CW.copyright-waive-agreement') }}
    </v-checkbox>
    <v-checkbox
      :value="copyright.confirmed"
      @input="toggle('confirmed')"
    >
      <i18n
        path="stepper.CW.copyright-waive-confirmation"
        tag="span"
      >
        <a
          slot="link"
          href="#"
          @click="openModal=true"
        >
          {{ $t('stepper.CW.link-label') }}
        </a>
      </i18n>
    </v-checkbox>
    <app-modal
      v-if="openModal"
      title="CC0 1.0"
      @close="closeModal"
    >
      <div class="modal-container">
        <iframe
          id="iframe"
          width="100%"
          height="100%"
          allowtransparency="true"
          src="https://creativecommons.org/publicdomain/zero/1.0/legalcode"
        />
      </div>
    </app-modal>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'CopyrightWaiverStep',
  inheritAttrs: false,
  props: {
    id: Number,
    name: String,
    selected: Boolean,
  },
  data() {
    return {
      openModal: false,
    }
  },
  computed: {
    ...mapGetters(['allCopyrightClausesChecked']),
    ...mapState(['copyright']),
  },
  watch: {
    // Watch for all copyright checkboxes being checked and enable the next button if they are
    allCopyrightClausesChecked(newValue) {
      this.$emit('change', { name: this.$props.name, id: this.$props.id, selected: newValue ? true : undefined })
    },
  },
  methods: {
    toggle(key) {
      this.$store.commit('toggleCopyrightCheckbox', { key })
    },
    closeModal() {
      this.openModal = false
    },
  },
}
</script>
<style lang="scss">
.step-actions .control-label {
    color: #333333;
}
input[type='checkbox'] {
    transform: translateY(3px);
}
.modal-container {
    width: 85vw;
    height: 85vh;
    overflow: hidden;
}
.deed-main {
    padding-right: 2rem;
}
.v-checkbox {
    margin-bottom: 1.5rem;
}

.overlay.app-modal {
    .close-button {
        margin-left: 0;
    }
    .modal {
        display: block;
        overflow: hidden;
    }
    .modal-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem !important;
        h3 {
            flex: 1;
            text-align: center;
        }
    }
}
</style>
