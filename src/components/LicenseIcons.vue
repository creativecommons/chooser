<template>
    <a
        :href="url"
        class="photo-license-icons"
        target="_blank"
        rel="noopener noreferrer"
        @click.stop="() => false"
    >
        <img
            class="photo-license-icon"
            alt="CC icon"
            title="CC icon"
            src="../assets/license-icons/cc.svg"
        >
        <img
            v-for="(license, index) in iconsArr"
            :key="index"
            class="photo-license-icon"
            :alt="license + ' icon'"
            :title="license + ' icon'"
            :src="require(`../assets/license-icons/${license.toLowerCase()}.svg`)"
        >
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
      height: 2rem;
      width: auto;
      margin-right: 3px;
    }
</style>
