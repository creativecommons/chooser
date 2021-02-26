<template>
  <div>
    <div
      class="creator"
      v-html="attribution.creator"
    />
    <div
      class="html-string"
      v-html="attribution.paragraph"
    />
    <div
      class="license-link"
      v-html="attribution.license"
    />
    <div
      class="work-title"
      v-html="attribution.work"
    />
  </div>
</template>
<script>
export default {
  name: 'TestComponent',
  props: {
    attribution: {
      type: Object,
      required: true,
    },
  },
}
</script>
