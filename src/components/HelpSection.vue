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
                    v-if="isSimpleModal(openModal)"
                    class="modal-content modal-1"
                >
                    <md-text
                        :source="$t(`help.${modals[openModal].title}.text`)"
                        tag="article"
                    />
                </section>

                <section
                    v-if="openModal === 3"
                    class="modal-content modal-3"
                >
                    <p>
                        {{ $t('help.what-icons-mean.text') }}
                    </p>
                    <div class="icons-section">
                        <div class="icon-item">
                            <img
                                src="../assets/license-icons/cc-by_icon.svg"
                                :alt="$t('help.what-icons-mean.BY.icon-alt-text')"
                            >
                            <h6 class="b-header">
                                {{ $t('help.what-icons-mean.BY.long-name') }}
                            </h6>
                            <p class="icon-caption">
                                {{ $t('help.what-icons-mean.BY.short-name') }}
                            </p>
                            <p class="icon-text">
                                {{ $t('help.what-icons-mean.BY.text') }}
                            </p>
                        </div>
                        <div class="icon-item">
                            <img
                                src="../assets/license-icons/cc-nd_icon.svg"
                                :alt="$t('help.what-icons-mean.ND.icon-alt-text')"
                            >
                            <h6 class="b-header">
                                {{ $t('help.what-icons-mean.ND.long-name') }}
                            </h6>
                            <p class="icon-caption">
                                {{ $t('help.what-icons-mean.ND.short-name') }}
                            </p>
                            <p class="icon-text">
                                {{ $t('help.what-icons-mean.ND.text') }}
                            </p>
                        </div>
                        <div class="icon-item">
                            <img
                                src="../assets/license-icons/cc-nc_icon.svg"
                                :alt="$t('help.what-icons-mean.NC.icon-alt-text')"
                            >
                            <h6 class="b-header">
                                {{ $t('help.what-icons-mean.NC.long-name') }}
                            </h6>
                            <p class="icon-caption">
                                {{ $t('help.what-icons-mean.NC.short-name') }}
                            </p>
                            <p class="icon-text">
                                {{ $t('help.what-icons-mean.NC.text') }}
                            </p>
                        </div>
                        <div class="icon-item">
                            <img
                                src="../assets/license-icons/cc-sa_icon.svg"
                                :alt="$t('help.what-icons-mean.SA.icon-alt-text')"
                            >
                            <h6 class="b-header">
                                {{ $t('help.what-icons-mean.SA.long-name') }}
                            </h6>
                            <p class="icon-caption">
                                {{ $t('help.what-icons-mean.SA.short-name') }}
                            </p>
                            <p class="icon-text">
                                {{ $t('help.what-icons-mean.SA.text') }}
                            </p>
                        </div>
                    </div>
                </section>
                <section
                    v-if="openModal === 6"
                    class="modal-content modal-6"
                >
                    <article class="columns-auto">
                        <md-text
                            :source="$t('help.six-cc-licenses.text')"
                            tag="div"
                        />
                        <img
                            alt="license openness scale"
                            src="../assets/license-openness-scale.png"
                        >
                    </article>
                </section>
                <section
                    v-if="openModal === 7"
                    class="modal-content modal-7"
                >
                    <article>
                        <md-text
                            :source="$t('help.how-licenses-communicated.text')"
                            tag="p"
                        />
                        <div class="license-communication">
                            <div class="info-row">
                                <h6 class="b-header">
                                    {{ $t('help.how-licenses-communicated.full-name') }}
                                </h6>
                                <p>{{ $t('help.how-licenses-communicated.CC-BY-NC') }}</p>
                            </div>

                            <div class="info-row">
                                <h6 class="b-header">
                                    {{ $t('help.how-licenses-communicated.short-name') }}
                                </h6>
                                <p>CC BY-NC 4.0</p>
                            </div>
                            <div class="info-row">
                                <h6 class="b-header">
                                    {{ $t('help.how-licenses-communicated.license-icons') }}
                                </h6>
                                <div><license-icons :icons-arr="['by', 'nc']" /></div>
                            </div>
                        </div>
                    </article>
                </section>

                <md-text
                    :source="$t(`help.${modals[openModal].title}.footer`)"
                    tag="footer"
                    class="modal-footer modal-card-foot"
                />
            </app-modal>
        </portal>
    </div>
</template>
<script>
import LicenseIcons from './LicenseIcons'
import { Portal } from '@linusborg/vue-simple-portal'
import MdText from '@/components/MdText'

export default {
    components: {
        MdText,
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
        async clickHandler(modalNumber) {
            this.modals[modalNumber].status = true
            this.openModal = parseInt(modalNumber)
            if (process.env.NODE_ENV === 'production') {
                this.$ga.event({
                    eventCategory: 'HelpSection',
                    eventAction: 'clicked',
                    eventLabel: this.modals[modalNumber].title
                })
            }
            await this.$nextTick()
            this.$nextTick(function() {
                const modalLinks = document.querySelectorAll('.modal a')
                modalLinks.forEach(function(link) {
                    link.target = '_blank'
                    link.rel = 'noopener noreferrer'
                })
            })
        },
        isSimpleModal(number) {
            return ![3, 6, 7].includes(number)
        },
        closeModal() {
            this.modals[this.openModal].status = false
            this.openModal = null
        }
    }
}
</script>
<style lang="scss">
.help-section {
    margin-top: 3rem;
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
            color: #363636;
        }
    }
}
.overlay.app-modal .modal {
    display: block;
}
.modal {
    --h-padding: 2rem;
    --v-padding: 2.5rem;
    .modal-content, footer {
        padding-left: var(--h-padding);
        padding-right: var(--h-padding);
    }
    .modal-content {
        padding-top: var(--h-padding);
        padding-bottom: var(--h-padding);
        margin: 0;
    }
}

.icons-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
    @media screen and (max-width: 768px){
        grid-template-columns: 100%;
    }
}
.icon-item {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr 1fr;
    grid-template-areas: "icon title"
                         "icon caption"
                         "text text";
    column-gap: 1rem;
}
.icon-item {
    img {
        grid-area: icon;
        width: 45px;
    }
    h6 {
        grid-area: title;
    }
    .icon-caption {
        grid-area: caption;
    }
    .icon-text {
        grid-area: text;
    }
}
.license-communication {
    display: flex;
    flex-direction: column;
    .info-row {
        display: flex;
        flex-direction: row;
        padding-bottom: 1rem;
        padding-top: 1rem;
        h6 {
            flex: 1;
        }
        p, div {
            flex: 3;

        }
        &:not(:last-child) {
            border-bottom: 1px solid rgb(219, 219, 219);
        }
    }

}
.modal-content .icon-item .icon-caption {
    margin-bottom: 0.5rem;
}
.modal-content .license-communication p:not(:last-child) {
    margin-bottom: 0;
}

.modal.is-active .modal-content {
    overflow: hidden;
}
.modal-content p:not(:last-child) {
    margin-bottom: 1rem;
}
.columns-auto {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--h-padding);
}

.modal-header {
    background-color: #f5f5f5;
    color: #363636;
    font-size: 1.5rem;
    font-family: "Source Sans Pro", sans-serif;
    border-bottom: 1px solid #dbdbdb;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
    @media only screen and (max-width: 768px) {
        .app-modal {
            .modal-title {
                font-size: 2.125rem;
            }
            .modal.is-active .modal-content {
                max-height: calc(100vh - 20px);
            }
        }
    }

</style>
