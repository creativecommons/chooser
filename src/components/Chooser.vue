<template>
    <div class='container'>
        <div class='columns'>
            <Stepper
                v-model="selected"
            />
            <LicenseCard
                v-model="selected"
                @dropdown-clicked="goToPersonalization()"
            />
        </div>
    </div>
</template>
<script>

import Stepper from './Stepper'
import LicenseCard from './LicenseCard'

export default {
    name: 'Chooser',
    components: {
        Stepper,
        LicenseCard
    },
    data() {
        return {
            selected: {
                shortName: 'CC BY 4.0',
                fullName: 'Attribution 4.0 International',
                personalDetails: {
                    authorName: '',
                    workTitle: '',
                    workUrl: '',
                    sourceWorkUrl: ''
                }
            }
        }
    },
    methods: {
        goToPersonalization() {
            this.$children[0].$children[0].changeStep(4)
        }
    }
}
</script>
<style scoped>

.selected-license-names b {
    font-size: 1.8rem;
}

b {
    text-align: center;
}
</style>
