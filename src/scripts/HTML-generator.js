function gen_html() {
    var final = 
    '<p style="font-size:.9rem;font-style:italic;">{0}\
    <span> by {1}</span> is licensed under {2} {3}'.format(
            htmlgen_work_title(), htmlgen_creator_name(),
            htmlgen_license_name(), htmlgen_license_icons()
        );
    app_state.chooser.metadata["gen_html"] = final
}

function htmlgen_rich_text() {
    
}

function htmlgen_work_title() {
    var meta = app_state.chooser.metadata
    var template;
    var title;
    var link;
    if (!meta["work_title"]) {
        title = "This work"
    } 
    else {
        title = meta["work_title"]
    }

    if (!meta["work_attribute_to_url"]) {
        template = '<p>{1}</p>'
        return template.format(null, meta["work_title"])
    }
    else {
        template = '<a href="{0}">{1}</a>'
        return template.format(meta["work_attribute_to_url"], meta["work_title"])
    }
}

function htmlgen_creator_name() {
    
}

function htmlgen_license_name() {
    var template = '<a href="{0}" style="margin-right:5px;">{1}</a>'
    const short_license = app_state.chooser.selected_license_short_slugified
    var url = "https://creativecommons.org/licenses/{0}/4.0".format(short_license)
    return template.format(url, app_state.chooser.selected_license_short)
}

function htmlgen_license_icons() {

}

function field_update(field) {
    app_state.chooser.metadata[field.id] = field.value
    gen_html()
}