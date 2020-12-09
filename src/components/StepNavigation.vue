<template>
    <nav class="step-navigation">
        <v-button
            v-if="stepName!=='FS'"
            class="is-border previous-button"
            @click="handleNavigation('back')"
        >
            {{ $t('stepper.nav.previous-label') }}
        </v-button>
        <v-button
            v-if="stepName!=='AD'"
            :class="['is-success', 'next-button', { 'disabled' : isNextEnabled } ]"
            :disabled="!isNextEnabled"
            @click="handleNavigation('next')"
        >
            {{ $t('stepper.nav.next-label') }}
        </v-button>
        <span
            v-else
            class="pagination-finish"
        >{{ $t('stepper.nav.finish-label') }}</span>
    </nav>
</template>

<script>
export default {
    name: 'StepNavigation',
    props: {
        stepName: {
            type: String,
            required: true
        },
        isNextEnabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleNavigation(direction) {
            this.$emit('navigate', { direction, stepName: this.stepName })
        }
    }
}
</script>

<style lang="scss" scoped>
.step-navigation {
    padding: 1.375rem 0.5rem 1.375rem var(--step-left-padding);
    .button + .button {
        margin-left: 1rem;
    }
}
.pagination-finish {
    margin-left: 1rem;
    line-height: 2.625rem;
}
</style>
