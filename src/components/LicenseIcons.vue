<template>
    <span>
        <img
            :width="size"
            :height="size"
            src="../assets/license-icons/cc.svg"
        >
        <img
            v-for="(license, index) in iconsArr"
            :key="index"
            :width="size"
            :height="size"
            :src="require(`../assets/license-icons/${license.toLowerCase()}.svg`)"
        >
    </span>
</template>
<script>
const LicenseIcons = {
    name: 'license-icons',
    props: {
        size: {
            type: [Number, String],
            default: 20
        },
        iconsArr: {
            type: Array,
            default: []
        }
    }
}
export default LicenseIcons
</script>
<style lang="scss" scoped>
    span {
        display: inline-flex;
        align-items:center;
        white-space: nowrap;
        vertical-align: middle;
        margin-right:3px;
    }
    span > * {
        margin-right: 3px;
    }
</style>
