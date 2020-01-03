<template>
    <div class="selected-license-info">
        <h4>
            <a :href="this.$licenseUrl(value.shortName)">{{ value.fullName }}</a>
        </h4>
        <hr class="h4-underline"/>
            <section class="license-visual-info">
                <ul class="license-list">
                <transition-group name="highlight">
                    <li v-for="item in iconsList"
                        :key="item">
                        <LicenseIconography
                            :icon-list="[item]"/>
                        <span class="readable-string">
                            {{ readableString(item)}}
                        </span>
                    </li>
                </transition-group>

            </ul>
                <a href="https://creativecommons.org/freeworks">
                    <div v-if="this.freeWorkStatus" class="license-freeworks-status">
                        <img src="../assets/license-icons/fc_approved_small.png" alt="">
                        <p>Free Culture License</p>
                    </div>
                    <div v-else class="license-freeworks-status">
                        <img v-if="!this.freeWorkStatus" src="../assets/license-icons/fc_dubious.png" alt="">
                        <p>Not a Free Culture License</p>
                    </div>
                </a>
            </section>
        <LicenseDescription
            :selectedLicense="value.shortName"/>
    </div>
</template>
<script>
import LicenseDescription from './LicenseDescription'
import LicenseIconography from './LicenseIconography'

export default {
    name: 'SelectedLicenseInfo',
    props: ['value'],
    components: {
        LicenseDescription,
        LicenseIconography
    },
    methods: {
        readableString(shortString) {
            const readableStrings = {
                cc0: 'Public Domain',
                by: 'The creator must be credited',
                nc: 'Commercial use not permitted',
                nd: 'No derivatives or modification permitted',
                sa: 'Share allowed only on the same conditions'
            }
            return readableStrings[shortString] ? readableStrings[shortString] : 'Public Domain'
        }
    },
    computed: {
        iconsList() {
            return this.$licenseIconsArr(this.$props.value.shortName)
        },
        freeWorkStatus() {
            const short = this.$props.value.shortName.toLowerCase()
            return !(short.includes('nc') || short.includes('nd'))
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
            margin-top: 1rem;
        }
        hr.h4-underline {
            margin: 0 0 0.5rem;
            background-color: #ED592F;
        }
        section.license-visual-info {
            display:grid;
            grid-template-columns: 3fr 1fr;
            ul.license-list {
                height: 87px;

                li {
                    span.license-icons {
                        svg {
                            width: 25px !important;
                            height: 25px !important;
                        }
                    }

                    span.readable-string {
                        vertical-align: top;
                        padding-left: 20px;
                        font-weight: 500;
                    }
                }

            }
            div.license-freeworks-status{
                justify-content: center;
                text-align:center;
                img {
                    width: 76px;
                    height: 76px;
                }
                p {
                    font-size: 13px;
                    line-height: 19px;                }
            }
        }
        div {
            background-color:white;
        }
    }
</style>
