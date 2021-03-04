<template>
  <div class="step-actions">
    <v-checkbox
      :value="appropriate.ownupagreed"
      @input="toggle('ownupagreed')"
    >
      {{ $t('stepper.AL.own-up-agreement') }}
    </v-checkbox>
    <v-checkbox
      :value="appropriate.termsagreed"
      @input="toggle('termsagreed')"
    >
      {{ $t('stepper.AL.terms-agreement') }}
    </v-checkbox>
    <v-checkbox
      :value="appropriate.nonrevocableagreed"
      @input="toggle('nonrevocableagreed')"
    >
      {{ $t('stepper.AL.non-revocable-agreement') }}
    </v-checkbox>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AppropraitLicenseStep',
  inheritAttrs: false,
  props: {
    id: Number,
    name: String,
    selected: Boolean,
  },
  computed: {
    ...mapState(['appropriate']),
    ...mapGetters(['allAppropriatenessQualificationsMet']),
  },
  watch: {
    allAppropriatenessQualificationsMet(newValue) {
      this.$emit('change', { name: this.$props.name, id: this.$props.id, selected: newValue ? true : undefined })
    },
  },
  methods: {
    toggle(key) {
      this.$store.commit('toggleAppropriatenessValue', { key })
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
