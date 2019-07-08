function gen_html() {
    var final = 
    '<p style="font-style:italic;">{0}{1} is licensed under {2}{3}</p>'.format(
        htmlgen_work_title(), htmlgen_creator_name(),
        htmlgen_license_name(), htmlgen_license_icons()
    );
    document.getElementById("html-generator-generated-richtext-container").innerHTML = final
    document.getElementById("ex-gen-html").innerHTML = final
    app_state.chooser.metadata["gen_html"] = final
}

function htmlgen_rich_text() {
    
}

function htmlgen_work_title() {
    var meta = app_state.chooser.metadata
    var template;
    var title;
    if (!meta["work_title"]) {
        return "This work"
    } 
    else {
        title = meta["work_title"]
    }

    if (!meta["work_source_url"]) {
        return title
    }
    else {
        template = '<a href="{0}">{1}</a>'
        return template.format(meta["work_source_url"], meta["work_title"])
    }
}

function htmlgen_creator_name() {
    var meta = app_state.chooser.metadata
    var template = '<span> by <a href="{0}">{1}</a></span>';

    if (!meta["work_attribute_to_name"]) {
        return ""
    }
    return template.format(meta["work_attribute_to_url"], meta["work_attribute_to_name"])
}

function htmlgen_license_link() {
    const short_license = app_state.chooser.selected_license_short_slugified
    var url = 'https://creativecommons.org/licenses/{0}/4.0/?ref=cc-chooser&atype=html'.format(short_license)
    return url;
}

function htmlgen_license_name() {
    var template = '<a href="{0}" style="margin-right:5px;">{1}</a>'
    return template.format(htmlgen_license_link(), app_state.chooser.selected_license_short)
}

function htmlgen_license_icons() {
    var template = '<a href="{0}" target="_blank" rel="noopener noreferrer"\
    style="display:inline-block;white-space:none;opacity:.7;margin-top:2px;\
    margin-left:3px;height:22px!important;"><img style="height:inherit;\
    margin-right:3px;display:inline-block;" src="https://search.creativecommons.org/static/img/cc_icon.svg"/>\
    <img style="height: inherit;margin-right: 3px;display: inline-block;" \
    src="https://search.creativecommons.org/static/img/cc-by_icon.svg"/>'
    var icon_template = '<img style="height: inherit;margin-right: 3px;display: \
    inline-block;" src="https://search.creativecommons.org/static/img/cc-{0}_icon.svg"/>'
    var icons = app_state.chooser.icons

    if (icons.nc_shown) {
        template += icon_template.format("nc")
    }

    if (icons.sa_shown) {
        template += icon_template.format("sa")
    }
    else if(icons.nd_shown) {
        template += icon_template.format("nd")
    }
    return template.format(htmlgen_license_link()) + "</a>"
}

function field_update(field) {
    app_state.chooser.metadata[field.id] = field.value
    gen_html()
}