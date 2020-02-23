<template>
    <div class="locale-chooser">
        <b-field :label="this.$t('locale-selector.label')" :class="'locale-chooser-field'">
            <b-select v-model="$i18n.locale">
                <option
                    v-for="lang in this.availableLocaleNames"
                    :value="lang.name"
                    :key="lang.eng">
                    {{lang.eng}} - {{lang.native}}
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
.locale-chooser {
    height: 132px;
}
.locale-chooser-field {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.locale-chooser-field .label {
    justify-self: end;
    font-weight: normal;
    font-size: 16px;
    line-height: 36px;
    padding-right: 16px;
}
.locale-chooser-field .control,
.locale-chooser-field .select,
.locale-chooser-field select {
    width: 100%;
}
.locale-chooser-field .control .select select {
    padding-left:2.5em;
}
.locale-chooser-field .control .select::before {
    content: url("../assets/language.png");
    position: absolute;
    z-index: 1;
    left:10px;
    top:8px;
}
.locale-chooser .select:not(.is-multiple):not(.is-loading)::after {
     z-index: 0;
 }
@media only screen and (max-width: 768px) {
    .locale-chooser {
        height: auto;
        margin-bottom: 1rem;
    }
    .locale-chooser-field {
        width: 100%;
        display: grid;
        grid-template-columns: 100%;
    }
    .locale-chooser-field .label {
        justify-self: auto;
    }
}
</style>
