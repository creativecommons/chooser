<template>
  <div>
    <b-field
      :label="this.$t('locale-selector.label')"
      :class="'locale-chooser-field'"
    >
      <b-select v-model="$i18n.locale">
        <option
          v-for="lang in availableLocaleNames"
          :key="lang.eng"
          :value="lang.name"
        >
          {{ lang.eng }} - {{ lang.native }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'LocaleChooser',
  data() {
    return {
      localeList: this.$i18n.availableLocales,
      localeNamesList: require('../utils/locales.json'),
      currentLanguage: 'English'
    }
  },
  computed: {
    availableLocaleNames() {
      const localeNames = []
      for (const locale of this.localeList) {
        localeNames.push(this.localeNamesList[locale])
      }
      return localeNames
    }
  }
}
</script>

<style>
    .locale-chooser-field {
        display: grid;
        grid-template-columns: 1fr;
    }
    .locale-chooser-field .label {
        padding-right: 1rem;
    }
    .locale-chooser-field .control .select::before {
        content: url("../assets/language.png");
        position: absolute;
        left: 10px;
        top: 8px;
        z-index: 1;
    }
    .locale-chooser-field .control,
    .locale-chooser-field .select,
    .locale-chooser-field select {
        width: 100%;
    }
    .locale-chooser-field .control .select select {
        padding-left: 2.5em;
    }
    .locale-chooser-field label.label {
        font-weight: normal;
        font-size: 1rem;
        line-height: 2.25rem;
        margin-bottom: 0;
    }
    @media only screen and (min-width: 769px) {
        .locale-chooser {
            justify-self: end;
        }
    }
    @media only screen and (min-width: 1024px) {
        .locale-chooser-field {
            padding-top:0.5rem;
            display: grid;
            grid-template-columns: 1fr minmax(210px, 1fr);
        }
        .locale-chooser-field .label {
            padding-right: 0.5rem;
            justify-self: end;
        }
    }
</style>
