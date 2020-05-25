<template>
    <div class="help-section">
        <h3 class="vocab">
            {{ $t('help.heading') }}
        </h3>
        <ul class="help-links">
            <li
                v-for="(modal, idx) in modals"
                :key="idx"
                class="help-link"
            >
                <a
                    class="vocab-body body-big help-link-a"
                    @click="clickHandler(idx)"
                >
                    {{ $t(`help.${modal.title}.heading`) }}
                </a>
            </li>
        </ul>
        <Portal selector="#portal-target">
            <b-modal :active.sync="modals[1].status">
                <header class="modal-card-head">
                    <p
                        class="modal-card-title modal-title"
                        v-html="this.$t('help.what-are-cc-licenses.heading')"
                    />
                </header>
                <section class="modal-card-body">
                    <article
                        class="help-text"
                        v-html="this.$t('help.what-are-cc-licenses.text')"
                    />
                </section>
                <footer class="modal-card-foot">
                    <p v-html="this.$t('help.what-are-cc-licenses.footer')" />
                </footer>
            </b-modal>
        </Portal>
        <Portal selector="#portal-target">
            <b-modal :active.sync="modals[2].status">
                <header class="modal-card-head">
                    <p class="modal-card-title modal-title">
                        {{ $t('help.how-licenses-work.heading') }}
                    </p>
                </header>
                <section class="modal-card-body">
                    <article v-html="this.$t('help.how-licenses-work.text')" />
                </section>
                <footer
                    class="modal-card-foot"
                    v-html="this.$t('help.how-licenses-work.footer')"
                />
            </b-modal>
        </Portal>
        <Portal selector="#portal-target">
            <b-modal :active.sync="modals[3].status">
                <header class="modal-card-head">
                    <p class="modal-card-title modal-title">
                        {{ $t('help.what-icons-mean.heading') }}
                    </p>
                </header>
                <section class="modal-card-body">
                    <article v-html="this.$t('help.what-icons-mean.text')" />
                    <div class="columns">
                        <div class="column is-half top-bottom-paddingless">
                            <div class="edu-icons-section">
                                <div class="edu-icons-title-section is-gapless">
                                    <img src="../assets/license-icons/cc-by_icon.svg">
                                    <div class="icon-title">
                                        <b>{{ $t('help.what-icons-mean.BY.long-name') }}</b>
                                        <p class="help">
                                            {{ $t('help.what-icons-mean.BY.short-name') }}
                                        </p>
                                    </div>
                                </div>
                                <p>
                                    {{ $t('help.what-icons-mean.BY.text') }}
                                </p>
                            </div>
                            <div class="edu-icons-section is-gapless">
                                <div class="edu-icons-title-section">
                                    <img src="../assets/license-icons/cc-nd_icon.svg">
                                    <div class="icon-title">
                                        <b>{{ $t('help.what-icons-mean.ND.long-name') }}</b>
                                        <p class="help">
                                            {{ $t('help.what-icons-mean.ND.short-name') }}
                                        </p>
                                    </div>
                                </div>
                                <p>
                                    {{ $t('help.what-icons-mean.ND.text') }}
                                </p>
                            </div>
                        </div>
                        <div class="column is-half top-bottom-paddingless">
                            <div class="edu-icons-section is-gapless">
                                <div class="edu-icons-title-section">
                                    <img
                                        class="icon-img"
                                        src="../assets/license-icons/cc-nc_icon.svg"
                                    >
                                    <div class="icon-title">
                                        <b>{{ $t('help.what-icons-mean.NC.long-name') }}</b>
                                        <p class="help">
                                            {{ $t('help.what-icons-mean.NC.short-name') }}
                                        </p>
                                    </div>
                                </div>
                                <div v-html="this.$t('help.what-icons-mean.NC.text')" />
                            </div>
                            <div class="edu-icons-section">
                                <div class="edu-icons-title-section is-gapless">
                                    <img src="../assets/license-icons/cc-sa_icon.svg">
                                    <div class="icon-title">
                                        <b>{{ $t('help.what-icons-mean.SA.long-name') }}</b>
                                        <p class="help">
                                            {{ $t('help.what-icons-mean.SA.short-name') }}
                                        </p>
                                    </div>
                                </div>
                                <p>
                                    {{ $t('help.what-icons-mean.SA.text') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </b-modal>
        </Portal>
        <Portal selector="#portal-target">
            <b-modal :active.sync="modals[4].status">
                <header class="modal-card-head">
                    <p class="modal-card-title modal-title">
                        {{ $t('help.considerations-before-licensing.heading') }}
                    </p>
                </header>
                <section class="modal-card-body">
                    <article v-html="this.$t('help.considerations-before-licensing.text')" />
                </section>
                <footer class="modal-card-foot">
                    <p v-html="this.$t('help.considerations-before-licensing.footer')" />
                </footer>
            </b-modal>
            <b-modal :active.sync="modals[5].status">
                <header class="modal-card-head">
                    <p class="modal-card-title modal-title">
                        {{ $t('help.how-formally-license.heading') }}
                    </p>
                </header>
                <section class="modal-card-body">
                    <article v-html="this.$t('help.how-formally-license.text')" />
                </section>
            </b-modal>
            <b-modal :active.sync="modals[6].status">
                <header class="modal-card-head">
                    <p class="modal-card-title modal-title">
                        {{ $t('help.six-cc-licenses.heading') }}
                    </p>
                </header>
                <section class="modal-card-body">
                    <div class="columns">
                        <div class="column is-two-thirds">
                            <article
                                v-html="this.$t('help.six-cc-licenses.text')"
                            />
                        </div>
                        <div class="column">
                            <img src="../assets/license-openness-scale.png">
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <p v-html="this.$t('help.six-cc-licenses.footer')" />
                </footer>
            </b-modal>
        </Portal>
        <Portal selector="#portal-target">
            <b-modal :active.sync="modals[7].status">
                <header class="modal-card-head">
                    <p class="modal-card-title modal-title">
                        {{ $t('help.how-licenses-communicated.heading') }}
                    </p>
                </header>
                <section class="modal-card-body">
                    <p v-html="this.$t('help.how-licenses-communicated.text')" />
                    <table class="table is-hoverable is-fullwidth help-section__table">
                        <tbody>
                            <tr>
                                <th>{{ $t('help.how-licenses-communicated.full-name') }}</th>
                                <td>{{ $t('help.how-licenses-communicated.CC-BY-NC') }}</td>
                            </tr>
                            <tr>
                                <th>{{ $t('help.how-licenses-communicated.short-name') }}</th>
                                <td>CC BY-NC</td>
                            </tr>
                            <tr>
                                <th>{{ $t('help.how-licenses-communicated.license-icons') }}</th>
                                <td><LicenseIcons :icons-arr="['by', 'nc']" /></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </b-modal>
        </Portal>
        <Portal selector="#portal-target">
            <b-modal :active.sync="modals[8].status">
                <header class="modal-card-head">
                    <p class="modal-card-title modal-title">
                        {{ $t('help.what-free-culture-license.heading') }}
                    </p>
                </header>
                <section class="modal-card-body">
                    <p v-html="this.$t('help.what-free-culture-license.text')" />
                </section>
                <footer class="modal-card-foot">
                    <p v-html="this.$t('help.what-free-culture-license.footer')" />
                </footer>
            </b-modal>
            <b-modal :active.sync="modals[9].status">
                <header class="modal-card-head">
                    <p class="modal-card-title modal-title">
                        {{ $t('help.look-earlier-license-ver.heading') }}
                    </p>
                </header>
                <section class="modal-card-body">
                    <p v-html="this.$t('help.look-earlier-license-ver.text')" />
                </section>
            </b-modal>
        </Portal>
    </div>
</template>
<script>
import LicenseIcons from './LicenseIcons'
import { Portal } from '@linusborg/vue-simple-portal'

export default {
    components: {
        LicenseIcons,
        Portal
    },
    data() {
        return {
            sixLicensesImg: '<img src="../assets/license-openness-scale.png">',
            modals: {
                1: {
                    status: false,
                    title: 'what-are-cc-licenses'
                },
                2: {
                    status: false,
                    title: 'how-licenses-work'
                },
                3: {
                    status: false,
                    title: 'what-icons-mean'
                },
                4: {
                    status: false,
                    title: 'considerations-before-licensing'
                },
                5: {
                    status: false,
                    title: 'how-formally-license'
                },
                6: {
                    status: false,
                    title: 'six-cc-licenses'
                },
                7: {
                    status: false,
                    title: 'how-licenses-communicated'
                },
                8: {
                    status: false,
                    title: 'what-free-culture-license'
                },
                9: {
                    status: false,
                    title: 'look-earlier-license-ver'
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
    .help-link {
        padding-bottom: 8px;
    }
    .help-link .help-link-a {
        color: #ED592F;
    }
    .help-links .help-link .help-link-a:hover {
        color:#363636!important;
    }
    .help-links {
        list-style-position: inside;
        list-style-image: url("../assets/arrow-right.png");
    }

    table svg {
        width: 28px !important;
        height: 28px !important;
        vertical-align: middle;
        margin-right: 3px;
    }

    .help-section__table {
        margin-top: 1.5rem;
    }

    .top-bottom-paddingless {
        padding-bottom: 0 !important;
        padding-top: 0 !important;
    }

    @media only screen and (max-width: 1025px) {
        .tablet-hide { display: none; }
        .tablet-show { display: block; }
    }

    @media only screen and (max-width: 670px) {
        h2 { font-size: 30px !important; }
        button p { font-size: 18px; }

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

</style>
