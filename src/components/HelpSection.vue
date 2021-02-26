<template>
  <div class="help-section">
    <h2 class="title is-3">
      {{ $t('help.heading') }}
    </h2>
    <ul class="help-links">
      <li
        v-for="(modal, idx) in modals"
        :key="idx"
        class="help-link"
      >
        <v-button
          theme="text"
          class="help-link-a"
          @click="clickHandler(idx)"
        >
          {{ $t(`help.${modal}.heading`) }}
        </v-button>
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
        'how-licenses-work',
        'what-icons-mean',
        'considerations-before-licensing',
        'how-formally-license',
        'six-cc-licenses',
        'how-licenses-communicated',
        'what-free-culture-license',
        'look-earlier-license-ver',
      ],
    }
  },
  computed: {
    openModalTitle() {
      return this.openModal !== null
        ? this.modals[this.openModal]
        : null
    },
  },
  methods: {
    async clickHandler(modalNumber) {
      this.$emit('change', modalNumber)
      this.openModal = parseInt(modalNumber)
      if (process.env.NODE_ENV === 'production') {
        this.$ga.event({
          eventCategory: 'HelpSection',
          eventAction: 'clicked',
          eventLabel: this.modals[modalNumber],
        })
      }
      await this.$nextTick()
      this.$nextTick(function() {
        const modalLinks = document.querySelectorAll('.modal a')
        modalLinks.forEach(function(link) {
          link.target = '_blank'
          link.rel = 'noopener noreferrer'
        })
      })
    },
  },
}
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
                color: #C74200;
                font-weight: 600;

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
    }
}

</style>
