var app_state = new Vue({ // eslint-disable-line
    el: "#chooser-app",
    data: {
        message: "Hello Vue!",
        modal_toggle: "modal",
        modals: {
            modal_toggle: "modal",
            modal_content: "",
            modal_title: "",
            modal_packs: {
                "allow_adaptations": {
                    "title": "Allowing Adaptations",
                    "content": "Test 1"
                },
                "allow_commercial": {
                    "title": "Allowing Commercial Use",
                    "content": ""
                },
                "selected_license": {
                    "title": "Selected License",
                    "content": ""
                },
                "work_attribute_to_name": {
                    "title": "",
                    "content": ""
                },
                "work_attribute_to_url": {
                    "title": "",
                    "content": ""
                },
                "work_source_url": {
                    "title": "",
                    "content": ""
                },
                "work_more_permissions_url": {
                    "title": "",
                    "content": ""
                },
                "license_mark": {
                    "title": "",
                    "content": ""
                },
                "have_a_webpage": {
                    "title": "",
                    "content": ""
                }
            }
        },
        chooser: {
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
        }
    }
});
