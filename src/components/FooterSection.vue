<template>
  <footer class="main-footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <a
            href="https://creativecommons.org"
            class="main-logo margin-bottom-bigger has-text-white"
          >
            <img
              src="@creativecommons/cc-assets/logos/cc/logomark.svg"
              alt="Creative Commons License chooser"
              width="220"
              class="img-invert"
            />
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
            <div class="margin-top-smaller"><license-icons class="img-invert" :icons-arr="['logo','by']" /></div>
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
                <license-icons :icons-arr="['heart']" />
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
import LicenseIcons from './LicenseIcons';
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
    LicenseIcons,
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
.img-invert {
  filter: invert(100%);
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
