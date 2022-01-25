<template>
  <div class="recommended-card">
    <h3>{{ cardHeading }}</h3>
    <div class="license-short-name">
      <span class="license-icons">
        <license-icons
          v-for="icon in ['logo', ...iconsList]"
          :key="icon"
          :icons-arr="[icon]"
          :size="50"
          :class="['icon']"
        />
      </span>
      <h4 class="b-header">
        {{ shortName }}
      </h4>
    </div>
    <h4 class="b-header">
      {{ fullName }}
    </h4>
    <p class="license-full-description body-big">
      {{ $t(licenseKey) }}
    </p>
    <section class="items-description">
      <ul class="license-list">
        <transition-group name="highlight">
          <li
            v-for="item in iconsList"
            :key="item"
            :class="['license-list-item', item]"
          >
            <span class="readable-string">
              <license-icons :icons-arr="[item]" :size="30" :class="['icon']" />
              <span>
                <b>{{ item === 'zero' ? 'CC0' : item.toUpperCase() }}:</b>
                {{ $t(`license-details-card.item-description.${item}`) }}
              </span>
            </span>
            <span v-if="item === 'nc'" class="description-caption caption">
              {{ $t(`license-details-card.caption.${item}`) }}
            </span>
          </li>
        </transition-group>
      </ul>
    </section>
    <div>
      <a
        class="license-deed-link"
        :href="licenseUrl()"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t(textKey) }}
        <font-awesome-icon
          class="icon icon-size"
          icon="fa-solid fa-external-link-alt"
        />
      </a>
    </div>
  </div>
</template>
<script>
import LicenseIcons from './LicenseIcons';
import { LICENSES, licenseSlug } from '../utils/license-utilities';
import { mapGetters } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faExternalLinkAlt);

export default {
  name: 'LicenseDetailsCard',
  components: {
    FontAwesomeIcon,
    LicenseIcons,
  },
  computed: {
    ...mapGetters(['shortName', 'fullName', 'iconsList', 'licenseUrl']),
    licenseKey() {
      return `license-details-card.full-description.${this.slug}`;
    },
    slug() {
      return licenseSlug(this.shortName);
    },
    cardHeading() {
      return this.shortName === LICENSES.CC0.SHORT
        ? this.$t('license-details-card.heading-cc0')
        : this.$t('license-details-card.heading');
    },
    textKey() {
      return this.shortName === LICENSES.CC0.SHORT
        ? this.$t('license-details-card.cc0-deed')
        : this.$t('license-details-card.license-deed');
    },
  },
};
</script>

<style lang="scss" scoped>
.recommended-card {
  margin-bottom: 2rem;
}
.license-full-description {
  margin: 1.5rem 0;
}
.license-short-name {
  margin-bottom: 0.5rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.license-deed-link {
  margin-top: 1.375rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  .icon {
    margin-left: 0.5rem;
  }
}
.license-list-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.readable-string {
  display: flex;
  flex-direction: row;
  align-items: center;
  i {
    font-size: 2.1875rem;
    height: 2.1875rem;
    width: 2.1875rem;
    margin-right: 1rem;
  }
  b {
    margin-right: 0.2rem;
  }
}
.license-icons {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-size: 2.1875rem;
  .icon {
    height: 2.1875rem;
    width: 2.1875rem;
  }
}
.description-caption {
  padding-left: 3.1875rem;
  font-weight: 600;
}
.icon-size {
  height: 1em;
}
</style>
