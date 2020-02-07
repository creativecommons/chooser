<template>
    <div class="card-content step-card-content" v-if="!(this.status==='inactive')">
        <div class="step-actions" v-if="this.status==='current'">
            <p class="attribution-details-instructions">{{$t('stepper.ad.instructions')}}</p>
            <form class="attribution-details-form">
                <b-field :label="this.$t('stepper.attribution-details.creator-name.label')" label-position="inside">
                    <b-input
                        v-model="value.creatorName"
                        :placeholder="this.$t('stepper.attribution-details.creator-name.placeholder')"
                    />
                </b-field>
                <b-field :label="this.$t('stepper.attribution-details.creator-profile.label')" label-position="inside">
                    <b-input
                        v-model="value.creatorProfileUrl"
                        :placeholder="this.$t('stepper.attribution-details.creator-profile.placeholder')"
                    />
                </b-field>
                <b-field :label="this.$t('stepper.attribution-details.work-title.label')" label-position="inside">
                    <b-input
                        v-model="value.workTitle"
                        :placeholder="this.$t('stepper.attribution-details.work-title.placeholder')"
                    />
                </b-field>
                <b-field :label="this.$t('stepper.attribution-details.work-url.label')" label-position="inside">
                    <b-input
                        v-model="value.workUrl"
                        :placeholder="this.$t('stepper.attribution-details.work-url.placeholder')"
                    />
                </b-field>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AttributionDetails',
    props: ['value', 'status'],
    watch: {
        value() { this.$emit('input', this.$props.value) }
    }

}
</script>

<style scoped>

</style>
