<template>
    <div class="step-actions">
        <p class="body-normal">
            {{ $t('stepper.AD.instructions') }}
        </p>
        <form class="attribution-details-form">
            <v-input
                v-model="workTitle"
                :label="$t('stepper.AD.form.work-title.label')"
                :placeholder="$t('stepper.AD.form.work-title.placeholder')"
            />
            <v-input
                v-model="creatorName"
                :label="$t('stepper.AD.form.creator-name.label')"
                :placeholder="$t('stepper.AD.form.creator-name.placeholder')"
            />
            <v-input
                v-model="workUrl"
                :label="$t('stepper.AD.form.work-url.label')"
                :placeholder="$t('stepper.AD.form.work-url.placeholder')"
            />
            <v-input
                v-model="creatorProfileUrl"
                :label="$t('stepper.AD.form.creator-profile.label')"
                :placeholder="$t('stepper.AD.form.creator-profile.placeholder')"
            />
        </form>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import VInput from '@/Vocabulary/VInput'

export default {
    name: 'AttributionDetails',
    components: { VInput },
    inheritAttrs: false,
    props: {
        status: {
            type: String,
            validator(value) {
                return ['active', 'previous', 'inactive'].includes(value)
            }
        }
    },
    computed: {
        ...mapState(['attributionDetails']),
        creatorName: {
            get() { return this.attributionDetails.creatorName },
            set(newVal) {
                this.setCreatorName(newVal)
            }
        },
        creatorProfileUrl: {
            get() { return this.attributionDetails.creatorProfileUrl },
            set(newVal) {
                this.setCreatorProfileUrl(newVal)
            }
        },
        workTitle: {
            get() { return this.attributionDetails.workTitle },
            set(newVal) {
                this.setWorkTitle(newVal)
            }
        },
        workUrl: {
            get() { return this.attributionDetails.workUrl },
            set(newVal) {
                this.setWorkUrl(newVal)
            }
        }
    },
    methods: {
        ...mapMutations(['setCreatorName', 'setCreatorProfileUrl', 'setWorkTitle', 'setWorkUrl'])
    }

}
</script>
<style lang="scss">
.attribution-details-form {
    margin-top: 1.5rem;
    .input[type="text"] {
        font-weight: 600;
        font-size: 1rem;
        color: #333333;
        border: 2px solid #d8d8d8;
        &:focus, &:active, &:hover {
            border-color: #b0b0b0;
        }
    }
    .control + .control {
        margin-top: 1rem;
    }
}
@media only screen and (max-width: 768px) {
    .attribution-details-instructions {
        font-size: 0.8125rem;
        line-height: 1.1875rem;
        font-weight: 600;
    }
    .attribution-details-form {
        .label {
            font-size: 0.8125rem;
            &.label-bold {
                font-weight: 600;
            }
        }
        input[type="text"].input {
            font-size: 0.8125rem;
        }
    }
}
</style>
