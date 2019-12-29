<template>
        <section class="pers-form">
            <b-field label="Work Author" label-position="inside">
                <b-input
                    v-model="value.authorName"
                    placeholder="John Silver"
                />
            </b-field>
            <b-field
                label="Title of Work" label-position="inside"
              >
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
            <b-field label="URL of the Source Work" label-position="inside">
                <b-input
                    v-model="value.sourceWorkUrl"
                    placeholder="https://www.example.com/source.jpg"
                />
            </b-field>
        </section>
</template>

<script>
export default {
    name: 'PersonalizationStep',
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
