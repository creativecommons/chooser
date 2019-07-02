function set_license() {
    set_license_text()
    set_license_icons()
    set_license_info()
}

function set_license_text() {
    /*
    var state = app_state.chooser
    if (state.inputs.allow_adaptations == null &&
        state.inputs.allow_commercial_uses == null) {
        state.selected_license = "To Choose a License, Please Make Some Selections Using the Controls to the Left."
    } else if (state.inputs.allow_adaptations == null &&
        state.inputs.allow_commercial_uses != null) {
        state.selected_license = "Please Select Whether or not to Allow Adaptations of Your Work."
    }*/
    app_state.chooser.selected_license = gen_license_name()
    app_state.chooser.selected_license_short = gen_shortened_name()
    set_license_link()
}

function set_license_info() {
    var chooser_state = app_state.chooser
    var pack = app_state.license_packs[chooser_state.selected_license_short_slugified]
    chooser_state.selected_license_desc = pack["description"]

    chooser_state.selected_license_adapt = pack["Adapt"]
    if (!pack["Adapt"]) { // If adaptations are not allowed
        document.getElementById("generated-license-adapt").style.display = "none"
    } else {
        document.getElementById("generated-license-adapt").style.display = "block"
    }
}

function set_license_icons() {
    var state = app_state.chooser
    if (state.inputs.allow_adaptations) {
        state.icons.nd_shown = false
        state.icons.sa_shown = false
        toggle_license_icon("nd-sa", false)
        if (state.inputs.share_alike) {
            state.icons.sa_shown = true
            state.icons.nd_shown = false
            state.icons.nd_sa_src = "cc-sa_icon.svg"
            toggle_license_icon("nd-sa", true)
        }
    }
    else if (!state.inputs.allow_adaptations) {
        state.icons.nd_shown = true
        state.icons.sa_shown = false
        state.icons.nd_sa_src = "cc-nd_icon.svg"
        toggle_license_icon("nd-sa", true)
    }

    if (state.inputs.allow_commercial_uses) {
        state.icons.nc_shown = false
        toggle_license_icon("nc", false)
    } else {
        state.icons.nc_shown = true
        toggle_license_icon("nc", true)
    }
}

function gen_license_name() {
    var state = app_state.chooser
    var license_base = "Atribution"
    if (!state.inputs.allow_commercial_uses) {
        license_base += "-NonCommercial"
    }
    if (state.inputs.allow_adaptations) {
        if (state.inputs.share_alike) {
            license_base += "-ShareAlike"
        }
    }
    else if (!state.inputs.allow_adaptations) {
        license_base += "-NoDerivatives"
    }
    license_base += " 4.0 International"
    app_state.chooser.selected_license = license_base
    return license_base
}

/**
 * 
 * @param {boolean} url_version If the shortened name need to be slugified for a URL
 */
function gen_shortened_name(url_version = false) {
    const license = app_state.chooser.selected_license
    var short = "CC BY"
    if (license.includes("NonCommercial")) {
        short += "-NC"
    }
    if (license.includes("NoDerivatives")) {
        short += "-ND"
    } else if(license.includes("ShareAlike")) {
        short += "-SA"
    }
    app_state.chooser.selected_license_short_noversion = short
    app_state.chooser.selected_license_short_slugified = short.slice(3).toLowerCase()
    return (url_version ? short.slice(3).toLowerCase() : short += " 4.0")
}

function set_license_link() {
    const short_license = gen_shortened_name(true)
    app_state.chooser.selected_license_slugified = short_license
    var url = "https://creativecommons.org/licenses/{0}/4.0".format(short_license)
    app_state.chooser.selected_license_link = url
}

/**
 * 
 * @param {object} check The HTML SA Checkbox object
 */
function sa_check_callback(check) {
    console.log("Checkbox Toggled")
    app_state.chooser.inputs.share_alike = check.checked
    set_license()
}

/**
 * 
 * @param {object} cb The HTML switch object
 */
function switch_callback(cb) {
    console.log("Switch Toggled - " + cb.id)
    var state = app_state.chooser.inputs
    state.selected_license = ""
    switch (cb.id) {
        case "allow-adaptations-switch":
            state.allow_adaptations = cb.checked
            if (cb.checked) { // If allow adaptations
                console.log("Is Allow Adaptations - " + cb.checked)
                state.allow_adaptations = true
                show_sa_check()
                set_license()
            } 
            else { // If NOT allow adaptations
                state.allow_adaptations = false
                hide_sa_check()
            }
            break;
        case "allow-commercial-switch":
            state.allow_commercial_uses = cb.checked
            break;
        default:
            console.log("Whoops! This function isn't designed to handle that parameter.")
            break;
    }
    set_license()
}

function toggle_license_icon(icon, is_show) {
    switch (icon) {
        case "nd-sa":
            if (!is_show) document.getElementById("adaptations-icon").style.display = "none" 
            else document.getElementById("adaptations-icon").style.display = "inline"
            break;
        case "nc":
            if (!is_show) document.getElementById("commercial-icon").style.display = "none" 
            else document.getElementById("commercial-icon").style.display = "inline"
            break;
        default:
            console.log("Whoops! This function isn't designed to handle that parameter.")
            break;
    }
}

function hide_sa_check() {
    console.log("SA Hidden")
    document.getElementById("sa-checkbox").style.display = "none"
}

function show_sa_check() {
    console.log("SA Shown")
    var element = document.getElementById("sa-checkbox")
    if (app_state.chooser.inputs.share_alike) {
        element.checked = "true"
    } else {
        element.checked = "false"
    }

    element.style.display = "block"
}