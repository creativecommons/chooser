<template>
    <div class='container'>
        <div class='columns'>
            <SelectionStepper
                v-model="selected"
            />
            <SelectedLicenseCard
                v-model="selected"
            />
        </div>
    </div>
</template>
<script>

import SelectionStepper from './SelectionStepper'
import SelectedLicenseCard from './SelectedLicenseCard'

export default {
    name: 'Chooser',
    components: {
        SelectedLicenseCard,
        SelectionStepper
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
