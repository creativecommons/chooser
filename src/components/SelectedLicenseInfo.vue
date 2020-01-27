<template>
    <div class="selected-license-info">
        <h4>
            <a :href="this.$licenseUrl(value.shortName)">{{ value.fullName }}</a>
        </h4>
        <p id='chooser-selected-description'>
            <b>{{this.value.shortName.slice(0, this.value.shortName.length-3)}}</b> {{
            this.$t("license-description.common") }} <span
            v-if="!value.fullName.includes('CC0')">{{this.$t("license-description.non-cc0")
            }}</span>
        </p>
        <section class="license-visual-info">
            <ul class="license-list">
                <transition-group name="highlight">
                    <li v-for="item in iconsList"
                        :key="item">
                        <LicenseIconography
                            :icon-list="[item]"/>
                        <span class="readable-string">
                            {{ $t(`license-description.${item}`)}}
                        </span>
                    </li>
                </transition-group>
            </ul>
            <div class="freeworks-status__div">
                <a href="https://creativecommons.org/freeworks">
                    <img v-if="this.freeWorkStatus" src="../assets/license-icons/fc_approved_small.png"
                         alt="{{ $t('alt.free-works-icon') }}" />
                    <img v-else src="../assets/license-icons/fc_dubious.png"
                         alt="{{ $t('alt.non-free-works-icon') }}" />
                </a>
            </div>
            <p class="freeworks-status__p">
                <a href="https://creativecommons.org/freeworks">
                {{this.freeWorkStatusText}}</a>
            </p>
        </section>

    </div>
</template>
<script>
import LicenseIconography from './LicenseIconography'

export default {
    name: 'SelectedLicenseInfo',
    props: ['value'],
    components: {
        LicenseIconography
    },
    computed: {
        iconsList() {
            return this.$licenseIconsArr(this.$props.value.shortName)
        },
        freeWorkStatus() {
            const short = this.$props.value.shortName.toLowerCase()
            return !(short.includes('nc') || short.includes('nd'))
        },
        freeWorkStatusText() {
            return this.freeWorkStatus ? this.$t('free-culture-work.yes') : this.$t('free-culture-work.no')
        },
        licenseDescription() {
            const descriptionString = `${this.$licenseSlug(this.selectedLicense)}-description`
            return this.$t(descriptionString)
        }
    }
}
</script>
<style lang="scss">
    .highlight-enter-active, .highlight-leave-active {
        transition: opacity .5s;
    }
    .highlight-enter, .highlight-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    div.selected-license-info {
        h4 {
            line-height: 2;
            font-weight: 600;
            /*margin-top: 1rem;*/
            margin-left:0.7rem;
            a {
                text-decoration: underline;
            }
        }
        section.license-visual-info {
            display:grid;
            grid-template-columns: 3fr 1fr;
            ul.license-list {
                height: 87px;
                margin-top:0.3rem;
                li {
                    span.license-icons {
                        svg {
                            width: 25px !important;
                            height: 25px !important;
                        }
                    }

                    span.readable-string {
                        vertical-align: top;
                        padding-left: 0.5rem;
                        font-weight: 500;
                    }
                }

            }
            .freeworks-status__div{
                justify-content: center;
                text-align:center;
                img {
                    width: 76px;
                    height: 76px;
                }
            }
            .freeworks-status__p {
                text-align:right;
                grid-row:2;
                grid-column: 1 / span 2;
                a {
                    text-decoration: underline;
                }
            }
        }
        div {
            background-color:white;
        }
    }
    #chooser-selected-description {
        margin-top: 2rem;
    }
    #chooser-selected-description span {
        margin-left: -2px;
    }
    @media only screen and (max-width: 670px) {
        p {
            font-size: 14px;
        }

        .mobile-hide { display: none; }
        .mobile-show { display: block; }
    }
</style>
