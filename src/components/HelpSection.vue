<!-- eslint-disable no-trailing-spaces -->
<template>
    <div>
        <h2 class="title is-2 vocab-h2">Confused? Need Help?</h2>
        <p class="help__instructions desktop-hide mobile-show">{{ $t('help.instructions.mobile') }}</p>
        <p class="help__instructions mobile-hide desktop-show">{{ $t('help.instructions.desktop') }}</p>

        <div class="columns" id="modal-buttons">
            <div class="column top-bottom-paddingless">
                <button id="cc_license_btn" class="button is-light is-large is-fullwidth help-button"
                        @click="clickHandler(1)">
                    <p>
                        {{ $t('help.what_are_cc_licenses.heading') }}
                    </p>
                </button>
                <button id="license_work_btn" class="button is-light is-large is-fullwidth help-button"
                    @click="clickHandler(2)">
                    <p>
                        {{ $t('help.how_licenses_work.heading') }}
                    </p>
                </button>
                <button id="icons_meaning_btn" class="button is-light is-large is-fullwidth help-button"
                    @click="clickHandler(3)">
                    <p>
                        {{ $t('help.what_icons_mean.heading') }}
                    </p>
                </button>
                <button id="license_communication_btn" class="button is-light is-large is-fullwidth help-button"
                    @click="clickHandler(7)">
                    <p>
                        {{ $t('help.how_licenses_communicated.heading') }}
                    </p>
                </button>
            </div>
            <div class="column top-bottom-paddingless">
                <button id="consideration_btn" class="button is-light is-large is-fullwidth help-button"
                    @click="clickHandler(4)">
                    <p>
                        {{ $t('help.considerations_before_licensing.heading') }}
                    </p>
                </button>
                <button id="formal_license_btn" class="button is-light is-large is-fullwidth help-button"
                    @click="clickHandler(5)">
                    <p>
                        {{ $t('help.how_formally_license.heading') }}
                    </p>
                </button>
                <button id="license_description_btn" class="button is-light is-large is-fullwidth help-button"
                    @click="clickHandler(6)">
                    <p>
                        {{ $t('help.six_cc_licenses.heading') }}
                    </p>
                </button>
            </div>
        </div>

        <b-modal :active.sync="modals[1].status">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title" v-html="this.$t('help.what_are_cc_licenses.heading')"/>
            </header>
            <section class="modal-card-body">
                <article class="help-text" v-html="this.$t('help.what_are_cc_licenses.text')"/>
                <footer class="modal-card-foot">
                    <p v-html="this.$t('help.what_are_cc_licenses.footer')"/>
                </footer>
            </section>
        </b-modal>
        <b-modal :active.sync="modals[2].status">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">
                    {{ $t('help.how_licenses_work.heading') }}
                </p>
            </header>
            <section class="modal-card-body">
                <article v-html="this.$t('help.how_licenses_work.text')"/>
                <footer class="modal-card-foot" v-html="this.$t('help.how_licenses_work.footer')"/>
            </section>
        </b-modal>
        <b-modal :active.sync="modals[3].status">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">
                    {{ $t('help.what_icons_mean.heading') }}
                </p>
            </header>
            <section class="modal-card-body">
                <div class="columns">
                    <div class="column is-half top-bottom-paddingless">
                        <div class="edu-icons-section">
                            <div class="edu-icons-title-section is-gapless">
                                <img src="../assets/license-icons/cc-by_icon.svg">
                                <div class="icon-title">
                                    <b>{{ $t('help.what_icons_mean.BY.long_name') }}</b>
                                    <p class="help">{{ $t('help.what_icons_mean.BY.short_name') }}</p>
                                </div>
                            </div>
                            <p>
                                {{ $t('help.what_icons_mean.BY.text')}}
                            </p>
                        </div>
                        <div class="edu-icons-section is-gapless">
                            <div class="edu-icons-title-section">
                                <img src="../assets/license-icons/cc-nd_icon.svg">
                                <div class="icon-title">
                                    <b>{{ $t('help.what_icons_mean.ND.long_name') }}</b>
                                    <p class="help">{{ $t('help.what_icons_mean.ND.short_name') }}</p>
                                </div>
                            </div>
                            <p>
                                {{ $t('help.what_icons_mean.ND.text') }}

                            </p>
                        </div>
                    </div>
                    <div class="column is-half top-bottom-paddingless">
                        <div class="edu-icons-section is-gapless">
                            <div class="edu-icons-title-section">
                                <img class="icon-img" src="../assets/license-icons/cc-nc_icon.svg">
                                <div class="icon-title">
                                    <b>{{ $t('help.what_icons_mean.NC.long_name') }}</b>
                                    <p class="help">{{ $t('help.what_icons_mean.NC.short_name') }}</p>
                                </div>
                            </div>
                            <div v-html="this.$t('help.what_icons_mean.NC.text')"></div>
                        </div>
                        <div class="edu-icons-section">
                            <div class="edu-icons-title-section is-gapless">
                                <img src="../assets/license-icons/cc-sa_icon.svg">
                                <div class="icon-title">
                                    <b>{{ $t('help.what_icons_mean.SA.long_name') }}</b>
                                    <p class="help">{{ $t('help.what_icons_mean.SA.short_name') }}</p>
                                </div>
                            </div>
                            <p>
                                {{ $t('help.what_icons_mean.SA.text') }}
                            </p>
                        </div>
                    </div>
                </div>
                <footer class="modal-card-foot" v-html="this.$t('help.what_icons_mean.footer')">

                </footer>
            </section>
        </b-modal>
        <b-modal :active.sync="modals[4].status">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">
                    {{ $t('help.considerations_before_licensing.heading') }}
                    </p>
            </header>
            <section class="modal-card-body">
                <article v-html="this.$t('help.considerations_before_licensing.text')" />
                <footer class="modal-card-foot">
                    <p v-html="this.$t('help.considerations_before_licensing.footer')" />
                </footer>
            </section>
        </b-modal>
        <b-modal :active.sync="modals[5].status">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">
                    {{ $t('help.how_formally_license.heading') }}
                </p>
            </header>
            <section class="modal-card-body">
                <article v-html="this.$t('help.how_formally_license.text')"/>
            </section>
        </b-modal>
        <b-modal :active.sync="modals[6].status">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">
                    {{ $t('help.six_cc_licenses.heading') }}
                </p>
            </header>
            <section class="modal-card-body">
                <div class="columns">
                    <div class="column is-two-thirds">
                        <article
                            v-html="this.$t('help.six_cc_licenses.text')">
                       </article>
                    </div>
                    <div class="column">
                        <img src="../assets/license-openness-scale.png">
                    </div>
                </div>

                <footer class="modal-card-foot">
                    <p v-html="this.$t('help.six_cc_licenses.footer')" />
                </footer>
            </section>
        </b-modal>
        <b-modal :active.sync="modals[7].status">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">{{ $t('help.how_licenses_communicated.heading') }}
                </p>
            </header>
            <section class="modal-card-body">
                <p v-html="this.$t('help.how_licenses_communicated.text')" />
                <table class="table is-hoverable is-fullwidth">
                    <tbody>
                    <tr>
                        <th>{{ $t('general.license_full_name') }}</th>
                        <td>{{ $t('license_full_names.CC-BY-SA') }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('general.license_short_name') }}</th>
                        <td>CC BY-NC</td>
                    </tr>
                    <tr>
                        <th>{{ $t('general.license_icons') }}</th>
                        <td><LicenseIconography :icon-list="['', 'by', 'nc']"/></td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </b-modal>
    </div>
</template>
<script>
import LicenseIconography from './LicenseIconography'

// eslint-disable-next-line
const ModalForm = {
    template: `
        <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Login</p>
                </header>
                <section class="modal-card-body">

                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                </footer>
            </div>
        </form>
    `
}
export default {
    components: {
        LicenseIconography
    },
    data() {
        return {
            sixLicensesImg: '<img src="../assets/license-openness-scale.png">',
            modals: {
                1: {
                    status: false,
                    title: 'what_are_cc_licenses'
                },
                2: {
                    status: false,
                    title: 'how_licenses_work'
                },
                3: {
                    status: false,
                    title: 'what_icons_mean'
                },
                4: {
                    status: false,
                    title: 'considerations_before_licensing'
                },
                5: {
                    status: false,
                    title: 'how_formally_license'
                },
                6: {
                    status: false,
                    title: 'six_cc_licenses'
                },
                7: {
                    status: false,
                    title: 'how_licenses_communicated'
                }
            }
        }
    },
    methods: {
        clickHandler(modalNumber) {
            this.modals[modalNumber].status = true
            if (process.env.NODE_ENV === 'production') {
                this.$ga.event({
                    eventCategory: 'HelpSection',
                    eventAction: 'clicked',
                    eventLabel: this.modals[modalNumber].title
                })
            }
        }
    }
}
</script>
<style scoped>

    table svg {
        width: 28px !important;
        height: 28px !important;
        vertical-align: middle;
        margin-right: 3px;
    }

    table {
        margin-top: 1.5rem;
    }

    .top-bottom-paddingless {
        padding-bottom: 0 !important;
        padding-top: 0 !important;
    }

    #modal-buttons {
        padding-bottom: 1.5rem;
    }

    @media only screen and (max-width: 1025px) {
        .tablet-hide { display: none; }
        .tablet-show { display: block; }
    }

    @media only screen and (max-width: 670px) {
        h2 { font-size: 30px !important; }
        button p { font-size: 18px; }

        #modal-buttons {
            padding-top: 1rem;
            padding-bottom: 1rem;
        }

        .modal-title { font-size: 18px; }
        .modal-content {
            margin-left: 10%;
            margin-right: 10%;
        }

        .mobile-hide { display: none; }
        .mobile-show { display: block; }
    }
</style>
<style lang="scss">
    .help__instructions {
        text-align: center;
        margin-bottom: 0.5rem;
    }
    .help-text {
        margin-bottom: 1rem;
    }
    .help-button {
        margin-top: 3% !important;
    }
    .help-h5 {
        font-weight: bold;
    }
    .vocab-h2 {
        font-size: 50px;
        text-align: center;
        margin-bottom: 1%;
    }
    .edu-icons-section {
        margin-top: 1.5%;
    }
    .edu-icons-title-section {
        display: grid;
        grid-template-columns: 1fr 7fr;
    }

    .edu-icons-section img {
        width: 45px;
    }

    .edu-icons-section p {
        margin-bottom: 6%;
    }

    .edu-icons-section .title {
        vertical-align: middle !important;
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
        margin-left: 2% !important;
        font-style: normal;
        font-weight: bold;
        font-size: 23px;
        line-height: 27px;
    }

    .edu-icons-section b {
        padding-top: 0;
    }

    .edu-icons-section-icon_title p {
        margin: 0;
    }

    .vocab.license-icons img {
        width: 35px;
    }

</style>
