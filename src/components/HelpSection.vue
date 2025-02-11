<template>
  <div class="help-section">
    <h2 class="title is-3">
      {{ $t('help.heading') }}
    </h2>
    <ul class="help-links">
      <li v-for="(modal, idx) in modals" :key="idx" class="help-link">
        <a :href="'#' + modal" class="help-link-a" @click.prevent="clickHandler(idx)">
          {{ $t(`help.${modal}.heading`) }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openModal: null,
      modals: [
        'what-are-cc-licenses',
        'how-to-apply-cc-license',
        'what-should-i-consider',
        'what-icons-mean',
        'what-if-other-questions',
      ],
    };
  },
  computed: {
    openModalTitle() {
      return this.openModal !== null ? this.modals[this.openModal] : null;
    },
  },
  methods: {
    async clickHandler(modalNumber) {
      this.$emit('change', modalNumber);
      this.openModal = parseInt(modalNumber);
      await this.$nextTick();

      // Ensure modal links open in a new tab
      this.$nextTick(() => {
        const modalLinks = document.querySelectorAll('.modal a');
        modalLinks.forEach(link => {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        });
      });
    },
  },
};
</script>

<style lang="scss">
.help-section {
  margin-top: 3rem;

  .help-links {
    margin-top: 1rem;

    .help-link {
      margin-bottom: 0.25rem;
      list-style: disc inside none;

      &::marker {
        color: #b0b0b0;
      }

      .help-link-a {
        color: #c74200;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .help-section .help-links .help-link .help-link-a {
    width: 90%;
    display: block;
  }
}
</style>
