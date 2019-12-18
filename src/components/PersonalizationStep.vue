<template>
    <div class="card chooser-selected">
        <div class="card-content">
            <section>
                <b-field label="Work Author">
                    <b-input
                        v-model="value.authorName"/>
                </b-field>
                <b-field label="Title of Work">
                    <b-input
                        v-model="value.workTitle"/>
                </b-field>
                <b-field label="Work URL">
                    <b-input
                        v-model="value.workUrl"/>
                </b-field>
                <b-field label="URL of the Source Work">
                    <b-input
                        v-model="value.sourceWorkUrl"/>
                </b-field>
            </section>
        </div>
    </div>
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

<style scoped>

</style>
