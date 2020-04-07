<template>
    <div class="step-content">
        <div
            v-if="status==='previous'"
            class="step-description"
        >
            {{ cardText }}
        </div>
        <div
            v-else-if="status==='current'"
            class="step-actions"
        >
            <LicenseDropdown @input="updateSelected" />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LicenseDropdown from './LicenseDropdown'
export default {
    name: 'DropdownStep',
    components: { LicenseDropdown },
    props: {
        status: {
            type: String,
            validator(value) {
                return ['current', 'previous', 'inactive'].includes(value)
            }
        },
        stepId: Number
    },
    computed: {
        ...mapGetters(['fullName']),
        cardText() {
            return this.fullName
        }
    },
    methods: {
        updateSelected() {
            this.$emit('change', 'DD', this.$props.stepId, true)
        }
    }
}
</script>
