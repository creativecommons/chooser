<template>
  <a :href="url"
      @click.stop="() => false"
     class="photo-license-icons"
     target="_blank"
     rel="noopener noreferrer">
    <img class="photo-license-icon" src="../assets/license-icons/cc_icon.svg"><img
          v-for="(license, index) in iconsArr"
          class="photo-license-icon"
          :src="require(`../assets/license-icons/cc-${license.toLowerCase()}_icon.svg`)"
          :key="index">
  </a>
</template>

<script>
/* eslint-disable */
const LicenseIcons = {
  name: 'license-icons',
  components: {},
  props: [ 'url', 'iconsArr' ],
};
export default LicenseIcons;
</script>
<style lang="scss" scoped>
  .photo-license-icons {
    display: inline-block;
    height: 32px;
    white-space: none;
    opacity: .7;
    margin-top: 2px;
    height: 22px !important;
    &:hover {
      opacity: 1;
    }
  }
  .photo-license-icon {
    height: inherit;
    margin-right: 3px;
  }
</style>
