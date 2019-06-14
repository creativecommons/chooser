var app_state = new Vue({ // eslint-disable-line
    el: "#chooser-app",
    data: {
        message: "Hello Vue!",
        modal_toggle: "modal",
        modals: {
            modal_toggle: "modal",
            modal_content: "",
            modal_title: "",
            more_info_url: "",
            more_info_text: "",
            modal_packs: {
                "allow_adaptations": {
                    "title": "Allowing Adaptations",
                    "content": "Test 1",
                    "more_info_url": "",
                    "more_info_text": ""
                },
                "allow_commercial": {
                    "title": "Allowing Commercial Use",
                    "content": "",
                    "more_info_url": "",
                    "more_info_text": ""
                },
                "selected_license": {
                    "title": "Selected License",
                    "content": "",
                    "more_info_url": "",
                    "more_info_text": ""
                },
                "have_a_webpage": {
                    "title": "",
                    "content": "",
                    "more_info_url": "",
                    "more_info_text": ""
                },
                "q1": {
                    "title": "What Are Creative Commons Licenses?",
                    "content": "",
                    "more_info_url": "google.com",
                    "more_info_text": "text"
                },
                "q2": {
                    "title": "Considerations Before Licensing",
                    "content": "",
                    "more_info_url": "",
                    "more_info_text": ""
                },
                "q3": {
                    "title": "How do the Licenses Work?",
                    "content": "",
                    "more_info_url": "",
                    "more_info_text": ""
                },
                "q4": {
                    "title": "How do I Formally License my Work?",
                    "content": "",
                    "more_info_url": "",
                    "more_info_text": ""
                },
                "q5": {
                    "title": "Want Public Domain Instead?",
                    "content": "",
                    "more_info_url": "",
                    "more_info_text": ""
                },
                "q6": {
                    "title": "",
                    "content": "",
                    "more_info_url": "",
                    "more_info_text": ""
                }
            }
        },
        chooser: {
            selected_license: "[License Name]",
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
