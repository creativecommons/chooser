<template>
    <form class="attribution-details-form">
        <b-field :label="this.$t('stepper.attribution-details.creator-name.label')" label-position="inside">
            <b-input
                v-model="this.attributionDetails.creatorName"
                :placeholder="this.$t('stepper.attribution-details.creator-name.placeholder')"
            />
        </b-field>
        <b-field :label="this.$t('stepper.attribution-details.creator-profile.label')" label-position="inside">
            <b-input
                v-model="this.attributionDetails.creatorProfileUrl"
                :placeholder="this.$t('stepper.attribution-details.creator-profile.placeholder')"
            />
        </b-field>
        <b-field :label="this.$t('stepper.attribution-details.work-title.label')" label-position="inside">
            <b-input
                v-model="this.attributionDetails.workTitle"
                :placeholder="this.$t('stepper.attribution-details.work-title.placeholder')"
            />
        </b-field>
        <b-field :label="this.$t('stepper.attribution-details.work-url.label')" label-position="inside">
                <b-input
                    v-model="this.attributionDetails.workUrl"
                    :placeholder="this.$t('stepper.attribution-details.work-url.placeholder')"
                />
            </b-field>
    </form>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'AttributionDetailsStep',
    props: ['value'],
    computed: {
        ...mapState('attributionDetails')
    },
    watch: {
        value() { this.$emit('input', this.$props.value) }
    }
}
</script>

<style lang="scss">
label.label {
    font-size: 0.845rem;
}
</style>
