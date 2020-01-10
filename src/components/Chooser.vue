<template>
    <div class='container'>
        <div class='columns'>
            <Stepper
                v-model="selected"
            />
            <LicenseCard
                v-model="selected"
                @dropdown-clicked="goToAttributionDetails()"
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
                attributionDetails: {
                    creatorName: '',
                    creatorProfileUrl: '',
                    workTitle: '',
                    workUrl: ''
                }
            }
        }
    },
    methods: {
        goToAttributionDetails() {
            const lastStep = this.$children[0].$children[0].stepItems.length - 1
            this.$children[0].$children[0].changeStep(lastStep)
        }
    }
}
</script>
<style lang="scss">
    header.card-header {
        justify-content: center;
        h2.vocab-h2 {
            font-style: normal;
            font-weight: bold;
            font-size: 25px;
            line-height: 38px;
            color: #333333;
            margin: 1.5% auto;
        }
    }
    div.card-content {
        padding-top: 0.5rem;
    }
</style>
