<template>
    <form class="attribution-details-form">
        <b-field label="Work Author" label-position="inside">
            <b-input
                v-model="value.creatorName"
                placeholder="John Silver"
            />
        </b-field>
        <b-field label="URL of Creator Profile" label-position="inside">
            <b-input
                v-model="value.creatorProfileUrl"
                placeholder="Creator's blog/ twitter profile/ instagram profile etc"
            />
        </b-field>
        <b-field label="Title of Work" label-position="inside">
            <b-input
                v-model="value.workTitle"
                placeholder="This work"
            />
        </b-field>
        <b-field label="Work URL" label-position="inside">
                <b-input
                    v-model="value.workUrl"
                    placeholder="https://www.example.com/image.jpg"
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
