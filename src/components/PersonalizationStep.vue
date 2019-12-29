<template>
    <div class="chooser-selected">
        <section class="pers-form">
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

<style>
    .pers-form label.label {
        font-family: "Source Sans Pro", "Noto Sans", Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 1rem;
        line-height: 38px;
        color: #333333;
    }
</style>
