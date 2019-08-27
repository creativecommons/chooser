<template>
    <div>
        <div id="chooser-selected-share_adapt">
            <p>{{license_noVersion}} attribution means you allow people to</p>
            <p id="generated-license-share"><b>Share</b> the material in any medium or format</p>
            <p id="generated-license-adapt" v-if="licenseInfo.adapt"><b>Adapt</b> {{licenseInfo.adapt}}</p>
        </div>
        <p id="chooser-selected-description">
            {{licenseInfo.description}}
        </p>
    </div>
</template>
<script>
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
                case "CC BY 4.0":
                    return {
                        description: "As the most accommodating of \
                        licenses offered, the CC BY license allows others \
                        to distribute, remix, tweak, and build upon your \
                        work, even commercially, as long as they credit \
                        you for the original creation.",
                        adapt: "it for any purpose, even commercially"
                    }
                case "CC BY-SA 4.0":
                    return {
                        description: "The CC BY-SA license is realtively \
                        accommodating. Similar to the CC BY license, BY-SA \
                        allows others to distribute, remix, tweak, and build \
                        upon your work, even commercially, as long as they \
                        credit you for the original creation, and share the \
                        derivative work under the same license.",
                        adapt: "it for any purpose, even commercially \
                        (must share under the same license)"
                    }
                case "CC BY-NC 4.0":
                    return {
                        description: "The CC BY-NC license begins to become \
                        less accommodating. BY-NC stipulates that others may \
                        not use your work for commercial purposes. BY-NC allows \
                        others to distribute, remix, tweak, and build upon your \
                        work, as long as they credit you with the original creation.",
                        adapt: "it for any purpose, except commercially",
                    }
                case "CC BY-ND 4.0":
                    return {
                        description: "The CC BY-ND license begins to become \
                        less accommodating. BY-ND stipulates that people are \
                        free to distribute your work, even commercially, \
                        and must credit you with the original creation, but \
                        they are not allowed to remix, tweak, or build upon \
                        your work."
                    }
                case "CC-BY-NC-SA 4.0":
                    return {
                        description: "The CC BY-NC-SA license is the second \
                        least accommodating license that CC offers. BY-NC-SA \
                        stipulates that others are free to distribute, remix, \
                        tweak, and build upon your work, as long as they share \
                        the derivative work under the same license, credit you \
                        with the original creation, and as long as the work \
                        is not used for commercial purposes.",
                        adapt: "it for any purpose, except commercially \
                        (must share under the same license)",
                    }
                case "CC-BY-NC-ND 4.0":
                    return {
                        description: "The CC BY-NC-ND license is the \
                        least accommodating license that CC offers. BY-NC-ND \
                        stipulates that others are free to distribute your \
                        work, but not for commercial purposes, and that \
                        others may not remix, tweak, or build upon your \
                        work. BY-NC-ND also stipulates that others must \
                        credit you for the original creation.",
                    }
                default:
                    break;
            }
        },
        license_noVersion() {
            const selected = this.$props.selectedLicense
            return selected.slice(0, selected.length-3)
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
</style>
