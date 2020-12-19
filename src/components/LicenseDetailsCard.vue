<template>
    <div class="recommended-card">
        <h3> {{ cardHeading }}  </h3>
        <div class="license-short-name">
            <span class="license-icons">
                <i
                    v-for="icon in ['logo', ...iconsList]"
                    :key="icon"
                    :class="['icon', 'has-background-white', `cc-${icon}`]"
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
                            <i :class="['icon', 'has-background-white', `cc-${item}`]" />
                            <span>
                                <b>{{ item === 'zero' ? 'CC0' : item.toUpperCase() }}:</b>
                                {{ $t(`license-details-card.item-description.${item}`) }}
                            </span>
                        </span>
                        <span
                            v-if="item === 'nc'"
                            class="description-caption caption"
                        >
                            {{ $t(`license-details-card.caption.${item}`) }}
                        </span>
                        <span
                            v-if="item === 'nc'"
                            class="description-caption caption"
                        >
                            {{ $t(`license-details-card.caption.${item}`) }}
                        </span>
                    </li>
                </transition-group>
            </ul>
        </section>
        <a
            class="license-deed-link"
            :href="licenseUrl()"
            target="_blank"
            rel="noopener noreferrer"
        >
            See the License Deed
            <span class="icon external-link">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 30 30"
                ><path
                    d="M25.313 18.75h-1.875a.938.938 0 00-.938.938v6.562H3.75V7.5h8.438a.937.937 0 00.937-.938V4.688a.938.938 0 00-.938-.937H2.813A2.813 2.813 0 000 6.563v20.625A2.812 2.812 0 002.813 30h20.625a2.812 2.812 0 002.812-2.813v-7.5a.938.938 0 00-.938-.937zM28.593 0h-7.5c-1.251 0-1.877 1.518-.995 2.402l2.093 2.094-14.28 14.276a1.406 1.406 0 000 1.992l1.327 1.326a1.405 1.405 0 001.993 0L25.505 7.812l2.093 2.09c.879.88 2.402.264 2.402-.996v-7.5A1.406 1.406 0 0028.594 0z"
                    fill="currentColor"
                /></svg>
            </span>
        </a>
    </div>
</template>
<script>
import { LICENSES, licenseSlug } from '../utils/license-utilities'
import { mapGetters } from 'vuex'

export default {
    name: 'LicenseDetailsCard',
    computed: {
        ...mapGetters(['shortName', 'fullName', 'iconsList', 'licenseUrl']),
        licenseKey() {
            return `license-details-card.full-description.${this.slug}`
        },
        slug() {
            return licenseSlug(this.shortName)
        },
        cardHeading() {
            return this.shortName === LICENSES.CC0.SHORT
                ? this.$t('license-details-card.heading-cc0')
                : this.$t('license-details-card.heading')
        }

    }
}
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
        margin-right: 0.5rem;
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
</style>
