<template>
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
</template>

<script>
export default {
    name: 'AttributionDetailsStep',
    props: ['value'],
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
