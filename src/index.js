var app_state = new Vue({ // eslint-disable-line
    el: "#chooser-app",
    data: {
        message: "Hello Vue!",
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
