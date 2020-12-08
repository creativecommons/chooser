<template>
    <div class="selected-license-card">
        <h3 class="vocab">
            {{ headingText }}
        </h3>
        <h4 class="vocab b-header">
            <a
                :href="licenseUrl('web')"
                class="license-name"
            >
                {{ fullName }} ({{ shortName }})
                <LicenseIcons
                    class="license-icons"
                    :url="licenseUrl('web')"
                    :icons-arr="iconsList"
                />
            </a>
        </h4>
        <p class="chooser-selected-description">
            <b>{{ slug.toUpperCase() }}</b>
            {{ $t(licenseKey) }}
        </p>
        <section class="license-visual-info">
            <ul class="license-list">
                <transition-group name="highlight">
                    <li
                        v-for="item in iconsList"
                        :key="item"
                        :class="['license-list-item', item]"
                    >
                        <span class="readable-string">
                            <b v-if="item!=='zero'">{{ item.toUpperCase() }}:</b>
                            <b v-else>CC0:</b>
                            {{ $t(`license-details-card.item-description.${item}`) }}
                        </span>
                    </li>
                </transition-group>
            </ul>
        </section>
    </div>
</template>
<script>
import { LICENSES, licenseSlug } from '../utils/license-utilities'
import LicenseIcons from './LicenseIcons'
import { mapGetters } from 'vuex'

export default {
    name: 'LicenseDetailsCard',
    components: {
        LicenseIcons
    },
    computed: {
        ...mapGetters(['shortName', 'fullName', 'iconsList', 'licenseUrl']),
        licenseDescription() {
            const descriptionString = `${this.slug}-description`
            return this.$t(descriptionString)
        },
        licenseKey() {
            return `license-details-card.full-description.${this.slug}`
        },
        slug() {
            return licenseSlug(this.shortName)
        },
        headingText() {
            return this.shortName === LICENSES.CC0.SHORT
                ? this.$t('license-details-card.cc0-heading')
                : this.$t('license-details-card.heading')
        }
    }
}
</script>

<style lang="scss">
    .select-license-card {
        margin-bottom: 32px;
    }
    .license-name {
        vertical-align: middle;
        display: inline-block;
        margin-top: 8px;
    }
    .license-icons {
        height: 35px;
        vertical-align: middle;
    }
    .license-name .photo-license-icon {
        height: 35px;
        opacity: 1;
    }
    .license-visual-info {
        margin-top: 16px;
    }
    .license-list-item {
        position: relative;
        padding-bottom: 8px;
    }
    .license-list-item span {
        vertical-align: middle;
        display:inline-block;
    }
    .license-list-item span b {
        display: inline-block;
        width: 36px;
    }
    .license-list-item::before{
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        content: "";
        background-size: 35px 35px;
    }
    .license-list-item.zero::before {
        background-image: url("../assets/license-icons/zero.svg");
    }
    .license-list-item.by::before {
        background-image: url("../assets/license-icons/by.svg");
    }
    .license-list-item.nc::before {
        background-image: url("../assets/license-icons/nc.svg");
    }
    .license-list-item.nd::before {
        background-image: url("../assets/license-icons/nd.svg");
    }
    .license-list-item.sa::before {
        background-image: url("../assets/license-icons/sa.svg");
    }
    .readable-string {
        padding-left:51px;
        line-height:35px;
    }
</style>
