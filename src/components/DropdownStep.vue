<template>
    <div class="step-content">
        <div
            v-if="status==='previous'"
            class="step-header__caption"
        >
            {{ cardText }}
        </div>
        <div
            v-else-if="status==='active'"
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
                return ['active', 'previous', 'inactive'].includes(value)
            }
        },
        id: Number
    },
    computed: {
        ...mapGetters(['fullName']),
        cardText() {
            return this.fullName
        }
    },
    methods: {
        updateSelected() {
            this.$emit('change', { name: 'DD', id: this.$props.id, selected: true })
        }
    }
}
</script>
