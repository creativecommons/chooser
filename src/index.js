import css from "../src/styles/styles.css";
import bulma_css from "../src/styles/bulma-mods.css"

var app_state = new Vue({ // eslint-disable-line
    el: "#chooser-app",
    data: {
        message: "Hello Vue!",
        chooser: {
            selected_license: "[License Name]",
            selected_license_short: "[License Short]",
            selected_license_short_noversion: "[License Short NoVersion]",
            selected_license_short_slugified: "[Slugified Short]",
            selected_license_desc: "[Description]",
            selected_license_share: "[Share]",
            selected_license_adapt: "[Adapt]",
            selected_license_link: "",
            icons: {
                nc_shown: false,
                sa_shown: false,
                nd_shown: false,
                nd_sa_src: "cc-sa_icon.svg",
            },
            inputs: {
                share_alike: false,
                allow_adaptations: true,
                allow_commercial_uses: true, 
            },
            metadata: {
                work_title: "",
                work_attribute_to_name: "",
                work_attribute_to_url: "",
                work_source_url: "",
                work_more_permissions_url: "",
                work_format: "",
                license_mark: "",
                normal_icon: true,
                metadata_text: ""
            }
        },
        license_packs: {
            "by": {
                "description": "As the most accommodating of \
                licenses offered, the CC BY license allows others \
                to distribute, remix, tweak, and build upon your \
                work, even commercially, as long as they credit \
                you for the original creation.",
                "Adapt": "it for any purpose, even commercially"
            },
            "by-sa": {
                "description": "The CC BY-SA license is realtively \
                accommodating. Similar to the CC BY license, BY-SA \
                allows others to distribute, remix, tweak, and build \
                upon your work, even commercially, as long as they \
                credit you for the original creation, and share the \
                derivative work under the same license.",
                "Adapt": "it for any purpose, even commercially \
                (must share under the same license)"
            },
            "by-nd": {
                "description": "The CC BY-ND license begins to become \
                less accommodating. BY-ND stipulates that people are \
                free to distribute your work, even commercially, \
                and must credit you with the original creation, but \
                they are not allowed to remix, tweak, or build upon \
                your work."
            },
            "by-nc": {
                "description": "The CC BY-NC license begins to become \
                less accommodating. BY-NC stipulates that others may \
                not use your work for commercial purposes. BY-NC allows \
                others to distribute, remix, tweak, and build upon your \
                work, as long as they credit you with the original creation.",
                "Adapt": "it for any purpose, except commercially",
            },
            "by-nc-sa": {
                "description": "The CC BY-NC-SA license is the second \
                least accommodating license that CC offers. BY-NC-SA \
                stipulates that others are free to distribute, remix, \
                tweak, and build upon your work, as long as they share \
                the derivative work under the same license, credit you \
                with the original creation, and as long as the work \
                is not used for commercial purposes.",
                "Adapt": "it for any purpose, except commercially \
                (must share under the same license)",
            },
            "by-nc-nd": {
                "description": "The CC BY-NC-ND license is the \
                least accommodating license that CC offers. BY-NC-ND \
                stipulates that others are free to distribute your \
                work, but not for commercial purposes, and that \
                others may not remix, tweak, or build upon your \
                work. BY-NC-ND also stipulates that others must \
                credit you for the original creation.",
            },
        }
    }
});
