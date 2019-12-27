<template>
    <div>
        <div id='chooser-selected-share_adapt'>
            <p>{{license_noVersion}} means you allow people to
                <span id='generated-license-share'>
                <b>share</b> the material in any medium or format</span> and
                <span id='generated-license-adapt' v-if='licenseInfo.adapt'><b>adapt</b> {{licenseInfo.adapt}}</span>.
            </p>
        </div>
        <p id='chooser-selected-description'>
            {{licenseInfo.description}}
        </p>
    </div>
</template>
<script>
/* eslint no-multi-str:0 */

export default {
    name: 'LicenseDescription',
    props: ['selectedLicense'],
    data() {
        return {
            selected_license_adapt: '[selected-license_adapt]',
            selected_license_description: '[selected-license_desc]'
        }
    },
    computed: {
        licenseInfo() {
            switch (this.$props.selectedLicense) {
            case 'CC BY 4.0':
                return {
                    description: 'The CC BY license allows others \
                    to distribute, remix, adapt, and build upon your \
                    work, even commercially, as long as they credit \
                    you.',
                    adapt: 'it for any purpose'
                }
            case 'CC BY-SA 4.0':
                return {
                    description: 'Similar to the CC BY license, BY-SA \
                    allows others to distribute, remix, adapt, and build \
                    upon your work, even commercially, as long as they \
                    credit you for the original creation, and share the \
                    derivative work under the same license.',
                    adapt: 'it for any purpose, however, shared adaptations must be under the same license'
                }
            case 'CC BY-NC 4.0':
                return {
                    description: 'CC BY-NC stipulates that others may \
                    not use your work for commercial purposes. BY-NC allows \
                    others to distribute, remix, adapt, and build upon your \
                    work, as long as they credit you.',
                    adapt: 'it for any purpose, however uses cannot be commercial'
                }
            case 'CC BY-ND 4.0':
                return {
                    description: 'CC BY-ND stipulates that people are \
                    free to distribute your work, even commercially, \
                    and must credit you, but they are not allowed to \
                    share any adaptations they make based on your work.',
                    adapt: 'it for any purpose, however, adaptations that are made may not be shared'
                }
            case 'CC-BY-NC-SA 4.0':
                return {
                    description: 'CC BY-NC-SA \
                    stipulates that others are free to distribute, remix, \
                    adapt, and build upon your work, as long as they credit you, \
                    and as long as shared adaptations are shared under the same license, and as long as the work \
                    is not used for commercial purposes.',
                    adapt: 'it for any purpose, however, uses cannot be commercial, and shared adaptations must be under the same license'
                }
            case 'CC BY-NC-ND 4.0':
                return {
                    description: 'CC BY-NC-ND \
                    stipulates that others are free to distribute your \
                    work, but not for commercial purposes, and that \
                    others may not remix, adapt, or build upon your \
                    work. CC BY-NC-ND also stipulates that others must \
                    credit you.',
                    adapt: 'it for any purpose, however, adaptations that are made may not be shared, and uses may not be commercial'
                }
            default:
                return null
            }
        },
        license_noVersion() {
            const selected = this.$props.selectedLicense
            return selected.slice(0, selected.length - 3)
        }
    }
}
</script>
<style scoped>
    #chooser-selected-share_adapt {
        margin-top: .6rem;
    }

    #chooser-selected-description {
        margin-top: .4rem;
    }

    @media only screen and (max-width: 670px) {
        p {
            font-size: 14px;
        }

        .mobile-hide { display: none; }
        .mobile-show { display: block; }
    }
</style>
