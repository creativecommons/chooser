function set_license() {
    set_license_text()
}

function set_license_text() {
    app_state.chooser.selected_license = "{0} ({1})".format(
        gen_license_name(),
        gen_shortened_name()
    )
    set_license_link()
}

function gen_license_name() {
    var state = app_state.chooser
    var license_base = "Atribution"
    if (!state.inputs.allow_commercial_uses) {
        license_base += "-NonCommercial"
    }
    if (state.inputs.share_alike) {
        license_base += "-ShareAlike"
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
    return (url_version ? short.slice(3).toLowerCase() : short += " 4.0")
}

function set_license_link() {
    const short_license = gen_shortened_name(true)
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
                state.share_alike = false
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

function hide_sa_check() {
    console.log("SA Hidden")
    document.getElementById("sa-checkbox").style.display = "none";
}

function show_sa_check() {
    console.log("SA Shown")
    document.getElementById("sa-checkbox").style.display = "block";
}