<template>
    <div class="help-section">
        <h3>
            {{ $t('help.heading') }}
        </h3>
        <ul class="help-links">
            <li
                v-for="(modal, idx) in modals"
                :key="idx"
                class="help-link"
            >
                <a
                    class="help-link-a"
                    @click="clickHandler(idx)"
                >
                    {{ $t(`help.${modal.title}.heading`) }}
                </a>
            </li>
        </ul>
        <portal>
            <app-modal
                v-if="openModal"
                :title="$t(`help.${modals[openModal].title}.heading`)"
                :aria-labels="modalAriaLabels"
                @close="closeModal"
            >
                <section
                    v-if="openModal === 1"
                    class="modal-content modal-1"
                >
                    <article
                        class="help-text"
                        v-html="$t('help.what-are-cc-licenses.text')"
                    />
                    <footer class="modal-card-foot">
                        <p v-html="$t('help.what-are-cc-licenses.footer')" />
                    </footer>
                </section>
                <section
                    v-if="openModal === 2"
                    class="modal-content modal-2"
                >
                    <article v-html="$t('help.how-licenses-work.text')" />
                    <footer
                        class="modal-card-foot"
                        v-html="$t('help.how-licenses-work.footer')"
                    />
                </section>
                <section
                    v-if="openModal === 3"
                    class="modal-content modal-3"
                >
                    <article>
                        <p v-html="$t('help.what-icons-mean.text')" />
                        <div class="columns">
                            <div class="column is-half top-bottom-paddingless">
                                <div class="edu-icons-section">
                                    <div class="edu-icons-title-section is-gapless">
                                        <img src="../assets/license-icons/by.svg">
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
                                        <img src="../assets/license-icons/nd.svg">
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
                                            src="../assets/license-icons/nc.svg"
                                        >
                                        <div class="icon-title">
                                            <b>{{ $t('help.what-icons-mean.NC.long-name') }}</b>
                                            <p class="help">
                                                {{ $t('help.what-icons-mean.NC.short-name') }}
                                            </p>
                                        </div>
                                    </div>
                                    <div v-html="$t('help.what-icons-mean.NC.text')" />
                                </div>
                                <div class="edu-icons-section">
                                    <div class="edu-icons-title-section is-gapless">
                                        <img src="../assets/license-icons/sa.svg">
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
                    </article>
                    <footer class="modal-card-foot" />
                </section>
                <section
                    v-if="openModal === 4"
                    class="modal-content modal-4"
                >
                    <article v-html="$t('help.considerations-before-licensing.text')" />
                    <footer class="modal-card-foot">
                        <p v-html="$t('help.considerations-before-licensing.footer')" />
                    </footer>
                </section>
                <section
                    v-if="openModal === 5"
                    class="modal-content modal-5"
                >
                    <article v-html="$t('help.how-formally-license.text')" />
                    <footer class="modal-card-foot" />
                </section>
                <section
                    v-if="openModal === 6"
                    class="modal-content modal-6"
                >
                    <article>
                        <div class="columns">
                            <div class="column is-two-thirds">
                                <p v-html="$t('help.six-cc-licenses.text')" />
                            </div>
                            <div class="column">
                                <img
                                    alt="license openness scale"
                                    src="../assets/license-openness-scale.png"
                                >
                            </div>
                        </div>
                    </article>
                    <footer class="modal-card-foot">
                        <p v-html="$t('help.six-cc-licenses.footer')" />
                    </footer>
                </section>
                <section
                    v-if="openModal === 7"
                    class="modal-content modal-7"
                >
                    <article>
                        <p v-html="$t('help.how-licenses-communicated.text')" />
                        <table class="table is-hoverable is-fullwidth help-section__table">
                            <tbody>
                                <tr>
                                    <th>{{ $t('help.how-licenses-communicated.full-name') }}</th>
                                    <td>{{ $t('help.how-licenses-communicated.CC-BY-NC') }}</td>
                                </tr>
                                <tr>
                                    <th>{{ $t('help.how-licenses-communicated.short-name') }}</th>
                                    <td>CC BY-NC 4.0</td>
                                </tr>
                                <tr>
                                    <th>{{ $t('help.how-licenses-communicated.license-icons') }}</th>
                                    <td><license-icons :icons-arr="['by', 'nc']" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </article>
                    <footer class="modal-card-foot" />
                </section>
                <section
                    v-if="openModal === 8"
                    class="modal-content modal-8"
                >
                    <article v-html="$t('help.what-free-culture-license.text')" />
                    <footer class="modal-card-foot">
                        <p v-html="$t('help.what-free-culture-license.footer')" />
                    </footer>
                </section>

                <section
                    v-if="openModal === 9"
                    class="modal-content modal-9"
                >
                    <article v-html="$t('help.look-earlier-license-ver.text')" />
                    <footer class="modal-card-foot" />
                </section>
            </app-modal>
        </portal>
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
            openModal: null,
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
            },
            modalAriaLabels: {
                // TODO: implement i18n values passing to VueVocabulary components
                'browse-page.aria.close': 'close'
            }
        }
    },
    methods: {
        clickHandler(modalNumber) {
            this.modals[modalNumber].status = true
            this.openModal = parseInt(modalNumber)
            if (process.env.NODE_ENV === 'production') {
                this.$ga.event({
                    eventCategory: 'HelpSection',
                    eventAction: 'clicked',
                    eventLabel: this.modals[modalNumber].title
                })
            }
        },
        closeModal() {
            this.modals[this.openModal].status = false
            this.openModal = null
        }
    }
}
</script>
<style lang="scss" scoped>
.help-section {
    margin-top: 3rem;
}
.help-links {
    margin-top: 1rem;
}
.help-link {
    margin-bottom: 0.25rem;
    list-style: disc inside none;
    &::marker {
        color: #b0b0b0;
    }
}
.help-link .help-link-a {
    color: #d14500;
    font-weight: 600;
    &:hover {
        color:#363636!important;
    }
}
</style>
<style lang="scss">
.overlay.app-modal .modal {
    display: block;
}
.modal-content article,
.modal-content footer {
    padding-left: 2rem;
    padding-right: 1rem;
}
.help__instructions {
    text-align: center;
    margin-bottom: 0.5rem;
    line-height: 20.11px;
}
.help-text {
    margin-bottom: 1rem;
}
.help-button {
    margin-top: 3% !important;
}
.help-h5 {
    font-weight: 600;
}
.edu-icons-section {
    margin-top: 1.5%;
}
.edu-icons-title-section {
    display: grid;
    grid-gap: 0.25rem;
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
    font-weight: 600;
    font-size: 23px;
    line-height: 27px;
}
.edu-icons-section b {
    padding-top: 0;
}
.edu-icons-section-icon_title p {
    margin: 0;
}
.modal.is-active .modal-content {
    overflow: hidden;
}
button.modal-close {
    position: fixed;
}
p.modal-card-title {
    flex-shrink: 1;
    line-height: inherit;
}
.help-section__table {
    margin-top: 1.5rem;
}
.top-bottom-paddingless {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
}

@media only screen and (max-width: 670px) {
    .modal-card-title.modal-title { font-size: 18px; }
    .modal-content {
        margin-left: 10%;
        margin-right: 10%;
    }
    .modal-card-body {
        max-height: 55vh;
    }
    .modal.is-active .modal-content {
        max-height: calc(100vh - 20px);
    }
}
</style>
