<template>
  <b-field class="license-dropdown">
    <b-select
      class="select"
      :placeholder="this.$t('stepper.DD.placeholder')"
      :value="shortName"
      @input="setCurrentLicense"
    >
      <option
        class="options"
        v-for="license in licenseList"
        :key="license"
        :value="license"
      >{{ license }}</option>
    </b-select>
  </b-field>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "SelectedLicenseDropdown",
  data() {
    return {
      licenseList: [
        "CC0 1.0",
        "CC BY 4.0",
        "CC BY-SA 4.0",
        "CC BY-ND 4.0",
        "CC BY-NC 4.0",
        "CC BY-NC-SA 4.0",
        "CC BY-NC-ND 4.0"
      ],
      currentLicense: undefined
    };
  },
  computed: {
    ...mapGetters(["shortName", "fullName"])
  },

  methods: {
    setCurrentLicense(currentLicense) {
      this.$store.commit("updateAttributesFromShort", currentLicense);
      this.$emit("input");
      if (process.env.NODE_ENV === "production") {
        this.$ga.event({
          eventCategory: "LicenseDropdown",
          eventAction: "licenseSelected",
          eventLabel: currentLicense
        });
      }
    }
  }
};
</script>
<style lang="scss">
.license-dropdown {
  margin-top: 1rem;
  .label {
    font-weight: normal;
    opacity: 0.8;
    font-size: 1em;
  }
  .select,
  select {
    width: 100%;
  }
}
</style>
