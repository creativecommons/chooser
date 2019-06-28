var app_state = new Vue({ // eslint-disable-line
    el: "#chooser-app",
    data: {
        message: "Hello Vue!",
        chooser: {
            selected_license: "[License Name]",
            selected_license_short: "[License Short]",
            selected_license_slugified: "",
            selected_license_short_noversion: "[License Short No Version]",
            selected_license_description: "[Selected Description]",
            selected_license_share_allowance: "[Share Allowance]",
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
            },
            license_packs: {
                "by": {
                    "description": "As the most accommodating of \
                    the licenses offered, the CC BY license \
                    allows others to distribute, remix, tweak, \
                    and build upon your work, even commercially \
                    , as long as they credit you for the \
                    original creation.",
                    "Adapt": "it for any purpose, even commercial."
                },
                "by-sa": {
                    "description": "",
                    "Adapt": "remix, transform, and build upon the \
                    material for any purpose, even commercially."
                },
                "by-nd": {
                    "description": "",
                    "Adapt": false
                },
                "by-nc": {
                    "description": "",
                    "Adapt": "remix, transform, and build upon the material, \
                    but not for commercial purposes."
                },
                "by-nc-sa": {
                    "description": "",
                    "Adapt": "remix, transform, and build upon the material, \
                    but not for commercial purposes."
                },
                "by-nc-nd": {
                    "description": "",
                    "Adapt": false
                }
            }
        }
    }
});
