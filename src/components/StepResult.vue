<template>
    <div
        class="step-header__caption vocab-body body-normal"
        tabindex="0"
        @click="$emit('step-click', stepId)"
        @keyup.13="$emit('step-click', stepId)"
    >
        <p class="vocab-body body-normal">
            {{ label }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'StepResult',
    props: {
        stepId: {
            type: Number,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.step-header__caption {
    color: #333333;
    padding-left: 69px;
    padding-bottom:8px;
    padding-right: 24px;
    &:focus {
         outline: none;
     }
}

</style>
