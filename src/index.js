var app_state = new Vue({ // eslint-disable-line
    el: "#chooser-app",
    data: {
        message: "Hello Vue!",
        image: "cc-logo_large_black.png",
        modal_toggle: "modal",
        modal_content: "",
        modal_contents: {
            "allow_adaptations": "TEST 1",
            "allow_commercial": "TEST 2",
            "selected_license": "T3",
            "work_attribute_to_name": "T4",
            "work_attribute_to_url": "T5",
            "work_source_url": "T6",
            "work_more_permissions_url": "T7",
            "license_mark": "T8",
            "have_a_webpage": "T9"
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
