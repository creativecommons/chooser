<template>
    <div>
        <b-checkbox>
            {{$t('stepper.CW.copyright-waive-statement')}}
        </b-checkbox>
        <textarea :value="this.$t('cc0-waiver-text')" :class="'waiver-textarea'" />
        <b-checkbox>
            {{$t("stepper.CW.copyright-waive-confirmation")}}
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
.waiver-textarea {
    width: 100%;
    min-height: 100px;
    margin: 1rem 0;
}
.b-checkbox {
    align-items: flex-start;
}
</style>
