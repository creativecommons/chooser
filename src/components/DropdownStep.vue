<template>
    <div>
        <div class="step-description" v-if="this.status==='previous'">
            {{cardText}}
        </div>
        <div class="step-actions" v-else-if="this.status==='current'">
            <LicenseDropdown />
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
