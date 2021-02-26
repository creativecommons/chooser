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
      <v-input
        v-if="currentLicenseAttributes.BY"
        v-model="yearOfCreation"
        :label="$t('stepper.AD.form.year-of-creation.label')"
        :placeholder="$t('stepper.AD.form.year-of-creation.placeholder')"
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
      },
    },
  },
  computed: {
    ...mapState(['attributionDetails', 'currentLicenseAttributes']),
    creatorName: {
      get() { return this.attributionDetails.creatorName },
      set(newVal) {
        this.setCreatorName(newVal)
      },
    },
    creatorProfileUrl: {
      get() { return this.attributionDetails.creatorProfileUrl },
      set(newVal) {
        this.setCreatorProfileUrl(newVal)
      },
    },
    workTitle: {
      get() { return this.attributionDetails.workTitle },
      set(newVal) {
        this.setWorkTitle(newVal)
      },
    },
    workUrl: {
      get() { return this.attributionDetails.workUrl },
      set(newVal) {
        this.setWorkUrl(newVal)
      },
    },
    yearOfCreation: {
      get() { return this.attributionDetails.yearOfCreation },
      set(newVal) {
        this.setYearOfCreation(newVal)
      },
    },
  },
  methods: {
    ...mapMutations(['setCreatorName', 'setCreatorProfileUrl', 'setWorkTitle', 'setWorkUrl', 'setYearOfCreation']),
  },

}
</script>
<style lang="scss">
.attribution-details-form {
    margin-top: 1.5rem;
    .control + .control {
        margin-top: 1rem;
    }
}
</style>
