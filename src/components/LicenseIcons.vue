<template>
  <span>
    <img
      v-for="(icon, index) in [...iconsArr]"
      :key="index"
      :width="size"
      :height="size"
      :src="require(`@creativecommons/cc-assets/icons/cc-${filename(icon)}`)"
    />
  </span>
</template>
<script>
export default {
  name: 'LicenseIcons',
  props: {
    size: {
      type: [Number, String],
      default: 20,
    },
    iconsArr: {
      type: Array,
      required: true,
    },
    // Icons for rich text need to be in .png format to enable pasting
    isPng: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    filename(icon) {
      return `${(Array.isArray(icon)? icon[0] : icon).toLowerCase() }.${this.isPng ? 'png' : 'svg'}`;
    },
  },
};
</script>
<style lang="scss" scoped>
span {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  vertical-align: middle;
  margin-right: 3px;
}
span > * {
  margin-right: 3px;
}
</style>
