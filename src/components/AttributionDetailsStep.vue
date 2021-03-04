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
      >
        <template #after-label>
          <span
            @click="toggleInfoModal"
          >
            <img
              class="info"
              src="../assets/info.svg"
              alt="Info"
            >
          </span>
        </template>
      </v-input>
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

    <app-modal
      v-if="showInfoModal"
      :title="$t(`help.context-for-creator-name.heading`)"
      @close="toggleInfoModal"
    >
      <section class="modal-body">
        <section
          :class="['modal-content','modal-0']"
        >
          <article
            v-html="$t(`help.context-for-creator-name.text`)">
          </article>
        </section>
      </section>
    </app-modal>

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
  data() {
    return {
      showInfoModal: false,
    }
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
    toggleInfoModal() {
      this.showInfoModal = !this.showInfoModal
    },
    ...mapMutations(['setCreatorName', 'setCreatorProfileUrl', 'setWorkTitle', 'setWorkUrl', 'setYearOfCreation']),
  },

}
</script>
<style lang="scss">
.modal {
    --h-padding: 2rem;
    --v-padding: 2.5rem;

    display: block;
    overflow-y: hidden;
    .modal-content {
        padding-left: var(--h-padding);
        padding-right: var(--h-padding);
        padding-bottom: var(--v-padding);
    }

    .modal-body {
      max-height: 80vh;
        overflow-y: auto;
        padding-top: var(--h-padding);
        margin: 0;
        color: #333333;

        article {
            max-width: 85ch;
            margin-right: auto;
            margin-left: auto;
        }
    }
}
.attribution-details-form {
    margin-top: 1.5rem;
    .control + .control {
        margin-top: 1rem;
    }
}
.info {
  width: 1.15rem;
  height: 1.15rem;
  margin-left: 0.3rem;
}
.info:hover{
  cursor: pointer;
}
</style>
