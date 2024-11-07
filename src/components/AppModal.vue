<template>
  <div class="overlay app-modal" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <header v-if="title" class="modal-header">
        <h3>{{ title }}</h3>
        <button aria-label="Close" class="close-button" @click="$emit('close')">
          &times;
        </button>
      </header>

      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
