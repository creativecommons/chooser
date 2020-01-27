<template>
    <a :href="url"
       @click.stop="() => false"
       class="photo-license-icons"
       target="_blank"
       rel="noopener noreferrer">
        <img class="photo-license-icon"
             src="../assets/license-icons/cc_icon.svg">
        <img v-for="(license, index) in iconsArr"
             class="photo-license-icon"
             :src="require(`../assets/license-icons/cc-${license.toLowerCase()}_icon.svg`)"
             :key="index">
    </a>
</template>

<script>
const LicenseIcons = {
    name: 'license-icons',
    components: {},
    props: ['url', 'iconsArr']
}
export default LicenseIcons
</script>
<style lang="scss" scoped>
    .photo-license-icons {
        display: inline-block;
        white-space: nowrap;
        vertical-align: text-bottom;
        opacity: .7;
        margin-right:3px;
        height: 22px !important;
    &:hover {
        opacity: 1;
    }
  }
  .photo-license-icon {
      height: inherit;
      margin-left: 3px;
  }
</style>
