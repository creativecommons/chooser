<template>
    <div>
        <b-checkbox>
            {{ $t('cc0.copyright-waive-statement') }}
        </b-checkbox>
        <textarea :value="this.$t('cc0.waiver')" :class="'waiver-textarea'" />
        <b-checkbox>
            {{ $t("cc0.confirm")}}
        </b-checkbox>
    </div>
</template>

<script>
export default {
    name: 'CopyrightWaiverStep',
    props: ['value']
}
</script>

<style lang="scss">
label.label {
    font-size: 0.845rem;
}
textarea.waiver-textarea {
    width: 100%;
    min-height: 150px;
    margin: 1rem 0;
}
.b-checkbox {
    align-items: flex-start;
}
    nav.step-navigation {
        margin-top:1.8rem;
    }
</style>
