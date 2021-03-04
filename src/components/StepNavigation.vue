<template>
  <div class="step-navigation">
    <v-button
      v-if="stepName!=='FS'"
      class="is-border previous-button"
      @click="handleNavigation('back')"
    >
      {{ $t('stepper.nav.previous-label') }}
    </v-button>
    <v-button
      v-if="stepName!=='AD'"
      :class="['is-success', 'next-button', { 'disabled' : !isNextEnabled } ]"
      :disabled="!isNextEnabled"
      @click="handleNavigation('next')"
    >
      {{ $t('stepper.nav.next-label') }}
    </v-button>
    <v-button
      v-else
      class="is-success next-button done-button"
      @click="handleDone"
    >
      {{ $t('stepper.nav.done-label') }}
    </v-button>
    <v-button
      v-if="stepName==='AD'"
      class="restart-button is-text"
      @click="handleRestart"
    >
      {{ $t('stepper.nav.restart-label') }}
    </v-button>
  </div>
</template>

<script>
export default {
  name: 'StepNavigation',
  props: {
    stepName: {
      type: String,
      required: true,
    },
    isNextEnabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleNavigation(direction) {
      this.$emit('navigate', { direction, name: this.stepName })
    },
    handleDone() {
      this.$emit('done')
    },
    handleRestart() {
      this.$emit('restart')
    },
  },
}
</script>

<style lang="scss">
@import '~@creativecommons/vocabulary/scss/color';
.step-navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.375rem 0 1.375rem 0;
    width: 100%;
    .button + .button {
        margin-left: 1rem;
    }
    .button.restart-button {
        margin-left: auto;
        color: $color-forest-green;
    }
    .button.next-button.is-success {
        background-color: $color-forest-green;
        color: white;
        &:hover, &:active, &:focus {
            background-color: $color-brighter-forest-green;
        }
    }
}
@media only screen and (max-width: 768px) {
    .step-navigation {
        padding-right: 0;
        padding-left: 0;
    }
}
</style>
