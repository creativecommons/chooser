<template>
    <div>
        <div
            class="creator"
            v-html="attribution.creator"
        />
        <div
            class="html-string"
            v-html="attribution.htmlString"
        />
        <div
            class="license-link"
            v-html="attribution.licenseLink"
        />
        <div
            class="work-title"
            v-html="attribution.workTitle"
        />
    </div>
</template>
<script>
export default {
    name: 'TestComponent',
    props: {
        attribution: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
</style>
