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
          <span @click="toggleInfoModal">
            <font-awesome-icon class="icon" icon="fa-solid fa-info-circle" />
          </span>
        </template>bottom
      </v-input>
      <v-input
        v-model="workUrl"
        v-validate="{ url: { require_protocol: true } }"
        :label="$t('stepper.AD.form.work-url.label')"
        :placeholder="$t('stepper.AD.form.work-url.placeholder')"
      />
      <span v-if="attributionErrorMsg.workUrlError">{{ attributionErrorMsg.workUrlError }}</span>
      <v-input
        v-model="creatorProfileUrl"
        :label="$t('stepper.AD.form.creator-profile.label')"
        :placeholder="$t('stepper.AD.form.creator-profile.placeholder')"
      />
      <span v-if="attributionErrorMsg.creatorProfileUrlError">{{ attributionErrorMsg.creatorProfileUrlError }}</span>
      <v-input
        v-if="currentLicenseAttributes.BY"
        v-model="yearOfCreation"
        :label="$t('stepper.AD.form.year-of-creation.label')"
        :placeholder="$t('stepper.AD.form.year-of-creation.placeholder')"
      />
      <span v-if="attributionErrorMsg.yearOfCreationError">{{ attributionErrorMsg.yearOfCreationError }}</span>
    </form>

    <app-modal
      v-if="showInfoModal"
      :title="$t(`help.context-for-creator-name.heading`)"
      @close="toggleInfoModal"
    >
      <section class="modal-body">
        <section :class="['modal-content', 'modal-0']">
          <article v-html="$t(`help.context-for-creator-name.text`)"></article>
        </section>
      </section>
    </app-modal>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import VInput from '@/Vocabulary/VInput';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faInfoCircle);

export default {
  name: 'AttributionDetails',
  components: { VInput, FontAwesomeIcon },
  inheritAttrs: false,
  props: {
    status: {
      type: String,
      validator(value) {
        return ['active', 'previous', 'inactive'].includes(value);
      },
    },
  },
  data() {
    return {
      showInfoModal: false,
      attributionErrorMsg: [],
    };
  },
  computed: {
    ...mapState(['attributionDetails', 'currentLicenseAttributes']),
    creatorName: {
      get() {
        return this.attributionDetails.creatorName;
      },
      set(newVal) {
        this.setCreatorName(newVal);
      },
    },
    creatorProfileUrl: {
      get() {
        return this.attributionDetails.creatorProfileUrl;
      },
      set(newVal) {
        this.setCreatorProfileUrl(newVal);
      },
    },
    workTitle: {
      get() {
        return this.attributionDetails.workTitle;
      },
      set(newVal) {
        this.setWorkTitle(newVal);
      },
    },
    workUrl: {
      get() {
        return this.attributionDetails.workUrl;
      },
      set(newVal) {
        this.setWorkUrl(newVal);
      },
    },
    yearOfCreation: {
      get() {
        return this.attributionDetails.yearOfCreation;
      },
      set(newVal) {
        this.setYearOfCreation(newVal);
      },
    },
  },
  watch: {
    creatorProfileUrl(value){
      this.attributionDetails.creatorProfileUrl = value;
      this.validateCreatorProfileUrl(value);
    },
    workUrl(value){
      this.attributionDetails.workUrl = value;
      this.validateWorkUrl(value);
    },
    yearOfCreation(value){
      this.attributionDetails.yearOfCreation = value;
      this.validateYearOfCreation(value);
    },
  },
  methods: {
    toggleInfoModal() {
      this.showInfoModal = !this.showInfoModal;
    },
    validateCreatorProfileUrl(value) {
      if(value.length === 0){
        this.attributionErrorMsg.creatorProfileUrlError = '';
      }
      else if (/[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(value)) {
        this.attributionErrorMsg.creatorProfileUrlError = '';
      } else {
        this.attributionErrorMsg.creatorProfileUrlError = 'Please enter a valid URL.';
      }
    },
    validateWorkUrl(value) {
      if(value.length === 0){
        this.attributionErrorMsg.workUrlError = '';
      }
      else if (/[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(value)) {
        this.attributionErrorMsg.workUrlError = '';
      } else {
        this.attributionErrorMsg.workUrlError = 'Please enter a valid URL.';
      }
    },
    validateYearOfCreation(value){
      if(value.length === 0){
        this.attributionErrorMsg.yearOfCreationError = '';
      }
      else if(Number(value)>= 1000 && Number(value)<=9999 && !value.includes('.')){
        this.attributionErrorMsg.yearOfCreationError = '';
      }
      else {
        this.attributionErrorMsg.yearOfCreationError = 'Please enter a valid year';
      }
    },
    ...mapMutations([
      'setCreatorName',
      'setCreatorProfileUrl',
      'setWorkTitle',
      'setWorkUrl',
      'setYearOfCreation',
    ]),
  },
};
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
.info:hover {
  cursor: pointer;
}
</style>
