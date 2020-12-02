<template>
    <nav class="step-navigation">
        <v-button
            v-if="stepName!=='FS'"
            class="is-border previous-button"
            @click="handlePrevious"
        >
            {{ $t('stepper.nav.previous-label') }}
        </v-button>
        <v-button
            v-if="stepName!=='AD'"
            :class="['is-success', 'next-button', isNextEnabled ? '' : 'disabled']"
            :disabled="!isNextEnabled"
            @click="handleNext"
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
            required: true
        }
    },
    methods: {
        handlePrevious() {
            this.$emit('navigate', { direction: 'previous', stepName: this.stepName })
        },
        handleNext() {
            this.$emit('navigate', { direction: 'next', stepName: this.stepName })
        }
    }
}
</script>

<style lang="scss" scoped>
.step-navigation {
    margin: 13px 0;
    padding-left: 65px;
        .button + .button {
            margin-left: 1rem;
        }
    }
.pagination-finish{
    margin-left: 1rem;
    line-height: 42px;
}
</style>
