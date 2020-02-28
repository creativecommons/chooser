<template>
    <a :href="url"
        class="photo-license-icons"
        target="_blank"
        rel="noopener noreferrer"
        @click.stop="() => false">
        <img class="photo-license-icon"
            src="../assets/license-icons/cc_icon.svg">
        <img v-for="(license, index) in iconsArr"
            :key="index"
            class="photo-license-icon"
            :src="require(`../assets/license-icons/cc-${license.toLowerCase()}_icon.svg`)">
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
        vertical-align: middle;
        margin-right:3px;
    }
    .photo-license-icon {
      height: inherit;
      margin-left: 3px;
    }
</style>
