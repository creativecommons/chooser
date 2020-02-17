<template>
<div class="selected-license-card">
    <h3 class="vocab-h3">RECOMMENDED LICENSE</h3>
    <h4 class="vocab-h4">
        <a :href="licenseUrl">{{fullName}} ({{shortName}})
            <LicenseIcons
                :url="licenseUrl"
                :iconsArr="iconsList"/>
        </a>
    </h4>
    <p id='chooser-selected-description'>
        <b>{{licenseSlug}}</b>
        {{this.$t("selected-license.description.common") }}
        <span v-if="!fullName.includes('CC0')">
            {{this.$t("selected-license.description.non-cc0")}}</span>
    </p>
    <section class="license-visual-info">
        <ul class="license-list">
            <transition-group name="highlight">
                <li v-for="item in iconsList"
                    :class="['license-list-item', item]"
                    :key="item">
                    <span class="readable-string">
                        <b>{{item.toUpperCase()}}:</b> {{$t(`selected-license.description.${item}`)}}
                    </span>
                </li>
            </transition-group>
        </ul>
    </section>
</div>
</template>

<script>
import LicenseIcons from './LicenseIcons'
import { mapGetters } from 'vuex'

export default {
    name: 'SelectedLicenseCard',
    components: {
        LicenseIcons
    },
    computed: {
        ...mapGetters(['shortName', 'fullName', 'iconsList', 'licenseUrl']),
        licenseDescription() {
            const descriptionString = `${this.$licenseSlug(this.shortName)}-description`
            return this.$t(descriptionString)
        },
        licenseSlug() {
            return this.shortName.slice(0, this.shortName.length - 3)
        }
    }
}
</script>

<style lang="scss">
    .license-name {
        vertical-align: middle;
        display: inline-block;
        margin-top: 8px;
    }
    .license-name .photo-license-icons {
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
        width: 24px;
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
    .license-list-item.by::before {
        background-image: url("../assets/license-icons/cc-by_icon.svg");
    }
    .license-list-item.nc::before {
        background-image: url("../assets/license-icons/cc-nc_icon.svg");
    }
    .license-list-item.nd::before {
        background-image: url("../assets/license-icons/cc-nd_icon.svg");
    }
    .license-list-item.sa::before {
        background-image: url("../assets/license-icons/cc-sa_icon.svg");
    }
    .readable-string {
        padding-left:51px;
        line-height:35px;
    }
</style>
