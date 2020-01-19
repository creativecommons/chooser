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
        padding-top:1rem;
        h2.vocab-h2 {
            font-family: Roboto Condensed;
            font-style: normal;
            font-weight: bold;
            font-size: 28px;
            line-height: 36px;
            /* identical to box height, or 129% */
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }
    }
    div.card-content {
        padding: 0.5rem 2rem 2rem;
    }
</style>
