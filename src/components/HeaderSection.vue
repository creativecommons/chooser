<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="logo" aria-current="page" href="/">
            <img
              src="@creativecommons/cc-assets/logos/products/chooser.svg"
              alt="Creative Commons License chooser"
              height="40"
              width="169"
            />
          </a>
          <a
            role="button"
            aria-label="menu"
            aria-expanded="false"
            class="navbar-burger"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div class="navbar-menu navbar-end">
          <a
            class="navbar-item navbar-item-feedback"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfF7MCKxlPsPuMn17v_sLYWMkxBkudQSPXCXoJKjh5GCtx63g/viewform"
            title="Feedback"
          >
            {{ $t('header.nav-feedback') }}
            <font-awesome-icon class="icon" icon="fa-solid fa-external-link-alt" />
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faExternalLinkAlt);

export default {
  name: 'HeaderSection',
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style lang="scss">
#app .navbar {
  padding: 0.5rem 0 0;
}
.navbar-burger {
  background-color: white;
}
.navbar-item.navbar-item-feedback {
  font-size: 1rem;
  font-weight: bold;
  color: #787878;
  transition: color 300ms ease;
  &:hover {
    color: #fb7729;
    background-color: white;
  }
}
</style>
