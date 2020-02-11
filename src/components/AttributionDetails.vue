<template>
    <div class="card-content step-card-content" v-if="!(this.status==='inactive')">
        <div class="step-actions" v-if="this.status==='current'">
            <p class="attribution-details-instructions">{{$t('stepper.AD.instructions')}}</p>
            <form class="attribution-details-form">
                <b-field :label="this.$t('stepper.attribution-details.creator-name.label')">
                    <b-input
                        v-model="creatorName"
                        :placeholder="this.$t('stepper.attribution-details.creator-name.placeholder')"
                    />
                </b-field>
                <b-field :label="this.$t('stepper.attribution-details.creator-profile.label')">
                    <b-input
                        v-model="creatorProfileUrl"
                        :placeholder="this.$t('stepper.attribution-details.creator-profile.placeholder')"
                    />
                </b-field>
                <b-field :label="this.$t('stepper.attribution-details.work-title.label')">
                    <b-input
                        v-model="workTitle"
                        :placeholder="this.$t('stepper.attribution-details.work-title.placeholder')"
                    />
                </b-field>
                <b-field :label="this.$t('stepper.attribution-details.work-url.label')">
                    <b-input
                        v-model="workUrl"
                        :placeholder="this.$t('stepper.attribution-details.work-url.placeholder')"
                    />
                </b-field>
            </form>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'AttributionDetails',
    props: ['status'],
    methods: {
        ...mapMutations(['setCreatorName', 'setCreatorProfileUrl', 'setWorkTitle', 'setWorkUrl'])
    },
    computed: {
        ...mapState({ attributionDetails: state => state.attributionDetails }),
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
    }

}
</script>

<style>
    .attribution-details-form {
        margin-top: 1rem;
    }
.attribution-details-form label {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
}
    .field .control .input {
        font-weight: 500;
        font-size: 16px;
    }
</style>
