<template>
  <footer class="main-footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <a
            href="https://creativecommons.org"
            class="main-logo margin-bottom-bigger has-text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 304 73"
            >
              <use
                href="~@creativecommons/vocabulary/assets/logos/cc/logomark.svg#logomark"
              />
            </svg>
          </a>
          <address class="margin-bottom-normal">
            <span class="is-block">Creative Commons</span>
            <span>PO Box 1866, Mountain View CA 94042</span>
          </address>
          <a href="mailto:info@creativecommons.org" class="mail is-block">
            info@creativecommons.org
          </a>
          <a href="tel://+1-415-429-6753" class="phone">+1-415-429-6753</a>

          <div class="social-icons margin-vertical-large">
            <a
              href="https://www.instagram.com/creativecommons"
              class="social has-text-white"
              target="_blank"
              rel="noopener"
            >
              <font-awesome-layers class="fa-2x margin-right-small">
                <font-awesome-icon icon="fa-solid fa-circle" />
                <font-awesome-icon icon="fa-brands fa-instagram" transform="shrink-6" :style="{ color: 'black' }" />
              </font-awesome-layers>
            </a>
            <a
              href="https://www.twitter.com/creativecommons"
              class="social has-text-white"
              target="_blank"
              rel="noopener"
            >
              <font-awesome-layers class="fa-2x margin-right-small">
                <font-awesome-icon icon="fa-solid fa-circle" />
                <font-awesome-icon icon="fa-brands fa-twitter" transform="shrink-6" :style="{ color: 'black' }" />
              </font-awesome-layers>
            </a>
            <a
              href="https://www.facebook.com/creativecommons"
              class="social has-text-white"
              target="_blank"
              rel="noopener"
            >
              <font-awesome-layers class="fa-2x margin-right-small">
                <font-awesome-icon icon="fa-solid fa-circle" />
                <font-awesome-icon icon="fa-brands fa-facebook-f" transform="shrink-6" :style="{ color: 'black' }" />
              </font-awesome-layers>
            </a>
            <a
              href="https://www.linkedin.com/company/creative-commons/"
              class="social has-text-white"
              target="_blank"
              rel="noopener"
            >
              <font-awesome-layers class="fa-2x margin-right-small">
                <font-awesome-icon icon="fa-solid fa-circle" />
                <font-awesome-icon icon="fa-brands fa-linkedin-in" transform="shrink-6" :style="{ color: 'black' }" />
              </font-awesome-layers>
            </a>
          </div>
        </div>
        <div class="column">
          <nav class="footer-navigation">
            <ul class="menu">
              <li>
                <a
                  class="menu-item"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfF7MCKxlPsPuMn17v_sLYWMkxBkudQSPXCXoJKjh5GCtx63g/viewform"
                  >Feedback</a
                >
              </li>
            </ul>
          </nav>
          <div class="attribution margin-top-bigger">
            <p class="caption">
              Except where otherwise
              <a
                href="https://creativecommons.org/policies#license"
                target="_blank"
                rel="noopener"
                >noted</a
              >, content on this site is licensed under the
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener"
              >
                Creative Commons Attribution 4.0 International license </a
              >.
              <a
                href="https://fontawesome.com/"
                target="_blank"
                rel="noopener"
                class="has-text-white"
              >
                Icons by Font Awesome.
              </a>
            </p>

            <div class="margin-top-smaller">
              <span class="icon cc-logo margin-right-small is-color-white">
                <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.972 0c4.196 0 7.769 1.465 10.715 4.393A14.426 14.426 0 0128.9 9.228C29.633 11.04 30 12.964 30 15c0 2.054-.363 3.978-1.085 5.772a13.77 13.77 0 01-3.2 4.754 15.417 15.417 0 01-4.983 3.322A14.932 14.932 0 0114.973 30c-1.982 0-3.88-.38-5.692-1.14a15.087 15.087 0 01-4.875-3.293c-1.437-1.437-2.531-3.058-3.281-4.862A14.71 14.71 0 010 15c0-1.982.38-3.888 1.138-5.719a15.062 15.062 0 013.308-4.915C7.303 1.456 10.812 0 14.972 0zm.055 2.706c-3.429 0-6.313 1.196-8.652 3.589a12.896 12.896 0 00-2.72 4.031 11.814 11.814 0 00-.95 4.675c0 1.607.316 3.156.95 4.646a12.428 12.428 0 002.72 3.992 12.362 12.362 0 003.99 2.679c1.483.616 3.037.924 4.662.924 1.607 0 3.164-.312 4.675-.937a12.954 12.954 0 004.084-2.705c2.339-2.286 3.508-5.152 3.508-8.6 0-1.66-.304-3.231-.91-4.713a11.994 11.994 0 00-2.651-3.965c-2.412-2.41-5.314-3.616-8.706-3.616zm-.188 9.803l-2.01 1.045c-.215-.445-.477-.758-.79-.937-.312-.178-.602-.268-.87-.268-1.34 0-2.01.884-2.01 2.652 0 .803.17 1.446.509 1.928.34.482.84.724 1.5.724.876 0 1.492-.43 1.85-1.286l1.847.937a4.407 4.407 0 01-1.634 1.728c-.696.42-1.464.63-2.303.63-1.34 0-2.42-.41-3.242-1.233-.821-.82-1.232-1.964-1.232-3.428 0-1.428.416-2.562 1.246-3.401.83-.84 1.879-1.26 3.147-1.26 1.858 0 3.188.723 3.992 2.17zm8.652 0l-1.983 1.045c-.214-.445-.478-.758-.79-.937-.313-.178-.613-.268-.897-.268-1.34 0-2.01.884-2.01 2.652 0 .803.17 1.446.51 1.928.338.482.838.724 1.5.724.874 0 1.49-.43 1.847-1.286l1.875.937a4.606 4.606 0 01-1.66 1.728c-.696.42-1.455.63-2.277.63-1.357 0-2.441-.41-3.253-1.233-.814-.82-1.22-1.964-1.22-3.428 0-1.428.415-2.562 1.246-3.401.83-.84 1.879-1.26 3.147-1.26 1.857 0 3.18.723 3.965 2.17z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span class="icon cc-by margin-right-small is-color-white">
                <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.973 0c4.213 0 7.768 1.446 10.66 4.34C28.544 7.25 30 10.803 30 15c0 4.215-1.43 7.723-4.287 10.526C22.678 28.51 19.098 30 14.973 30c-4.054 0-7.571-1.474-10.553-4.42C1.474 22.633 0 19.107 0 15S1.474 7.34 4.42 4.34C7.313 1.446 10.83 0 14.973 0zm.054 2.706c-3.41 0-6.295 1.196-8.652 3.589-2.447 2.5-3.67 5.402-3.67 8.706 0 3.321 1.214 6.196 3.642 8.624 2.429 2.429 5.322 3.642 8.679 3.642 3.339 0 6.25-1.222 8.732-3.67 2.358-2.267 3.536-5.133 3.536-8.598 0-3.41-1.197-6.311-3.589-8.705-2.392-2.392-5.285-3.588-8.678-3.588zm4.018 8.57v6.134H17.33v7.286h-4.66V17.41h-1.714v-6.134a.93.93 0 01.28-.683.933.933 0 01.684-.281h6.161c.25 0 .474.093.67.28a.912.912 0 01.294.684zM12.91 7.42c0-1.41.696-2.116 2.09-2.116s2.09.705 2.09 2.116c0 1.393-.697 2.09-2.09 2.09-1.393 0-2.09-.697-2.09-2.09z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div class="column">
          <section class="donate-section">
            <h2 class="title is-5">
              {{ $t('footer.donation.header') }}
            </h2>
            <p>{{ $t('footer.donation.call') }}</p>
            <a
              class="button small donate"
              href="http://creativecommons.org/donate"
            >
              <span class="icon cc-heart margin-right-small">
                <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.755 3.93c-2.581-.368-4.81.582-6.718 2.672l-.015.017-.022.024-.029-.032-.007-.009c-1.909-2.09-4.137-3.04-6.718-2.672-2.663.38-4.931 2.306-5.737 4.902-.62 1.997-.363 4.234.467 6.274C4.27 18.279 8.086 22.788 15 25.94c6.914-3.153 10.732-7.663 12.024-10.835.83-2.04 1.088-4.277.468-6.274-.806-2.596-3.074-4.522-5.738-4.902zM1.297 6.165C4.3 1.193 10.832.33 15 3.638 19.168.33 25.7 1.193 28.704 6.165c.997 1.651 1.372 3.57 1.284 5.476-.153 3.306-1.564 6.195-3.636 8.689-2.79 3.356-6.846 5.995-11.263 7.964l-.089.04a9.814 9.814 0 00-.08-.036l-.008-.004c-4.44-1.969-8.473-4.607-11.264-7.964C1.576 17.836.165 14.947.013 11.64c-.088-1.905.286-3.825 1.284-5.476zm11.685 8.054l1.897.95c-.35.833-1.226 1.604-2.014 2.004-1.019.516-2.216.573-3.316.33-2.255-.5-3.305-2.41-3.345-4.623-.038-2.164 1.055-4.17 3.212-4.754 2.027-.55 4.418.12 5.438 2.09l-2.071 1.074c-.238-.56-.682-1.182-1.725-1.236-1.631-.085-2.11 1.51-2.053 2.892.042 1.012.364 2.218 1.452 2.52 1.386.383 1.865-.275 2.525-1.247zm8.944 0l1.897.95c-.35.833-1.226 1.604-2.014 2.004-1.019.516-2.216.573-3.316.33-2.255-.5-3.305-2.41-3.345-4.623-.038-2.164 1.055-4.17 3.212-4.754 2.027-.55 4.418.12 5.438 2.09l-2.071 1.074c-.238-.56-.682-1.182-1.725-1.236-1.631-.085-2.11 1.51-2.053 2.892.042 1.012.364 2.218 1.452 2.52 1.386.383 1.866-.275 2.525-1.247z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Donate now
            </a>
          </section>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';
library.add(faTwitter, faFacebookF, faLinkedinIn, faInstagram, faCircle);

export default {
  name: 'FooterSection',
  components: {
    FontAwesomeIcon,
    FontAwesomeLayers,
  },
};
</script>

<style lang="scss" scoped>
.main-footer {
  --icon-size: 30px;
}
.donate,
.social {
  &:hover {
    text-decoration: none;
  }
}
.icon {
  width: var(--icon-size);
  height: var(--icon-size);
  display: inline-flex;
  svg {
    width: 100%;
    height: auto;
  }
}
.donate-section h2 {
  color: white;
}
.main-footer .donate-section .donate svg {
  margin-right: 0;
}
.social-icons {
  display: flex;
  align-items: center;
}

@media screen and (min-width: 1023px) {
  // All columns are set the same width on 'tablet'-sized screen
  // Half-sized middle column makes the last column too small for
  // the 'Donate' button and breaks the layout
  .column:nth-child(2) {
    flex: none;
    width: 50%;
  }
}
</style>
