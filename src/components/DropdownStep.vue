<template>
    <div class="card-content step-card-content">
        <div class="step-description" v-if="this.status==='previous'">
            {{cardText}}
        </div>
        <div class="step-actions" v-else-if="this.status==='current'">
            <SelectedLicenseDropdown />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SelectedLicenseDropdown from './SelectedLicenseDropdown'
export default {
    name: 'DropdownStep',
    components: { SelectedLicenseDropdown },
    props: {
        status: String
    },
    computed: {
        ...mapGetters(['fullName']),
        cardText() {
            return this.fullName
        }
    }
}
</script>

<style scoped>

</style>
