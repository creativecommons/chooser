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

set_license()

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
    } 
    else {
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
    } 
    else {
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
    } 
    else if(license.includes("ShareAlike")) {
        short += "-SA"
    }
    app_state.chooser.selected_license_short_noversion = short
    app_state.chooser.selected_license_short_slugified = short.slice(3).toLowerCase()
    return (url_version ? short.slice(3).toLowerCase() : short += " 4.0")
}

function set_license_link() {
    const short_license = gen_shortened_name(true)
    app_state.chooser.selected_license_slugified = short_license
    // Broken for some reason
    //var url = "https://creativecommons.org/licenses/{0}/4.0".format(short_license)
    var url = "https://creativecommons.org/licenses/"+ short_license +"/4.0"
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
    } 
    else {
        element.checked = "false"
    }

    element.style.display = "block"
}

function spawn_modal(modal_id) {
    /* Deprecated, but I want to keep it for future reference.
    app_state.modals.modal_content = app_state.modals.modal_packs[modal_id].content // Update modal content
    app_state.modals.modal_title = app_state.modals.modal_packs[modal_id].title // Update modal title
    
    const more_info_url = app_state.modals.modal_packs[modal_id].more_info_url
    const more_info_text = app_state.modals.modal_packs[modal_id].more_info_text
    if (more_info_url == "") { // If there's no more_info_url defined, hide the element
        document.getElementById("modal-more-info").style.display = "none";
    } else {
        document.getElementById("modal-more-info").style.display = "block";
        app_state.modals.more_info_url = more_info_url
        app_state.modals.more_info_text = more_info_text
    }
    app_state.modals.modal_toggle = "modal is-active" // Show modal*/
    const nmodal_id = "modal-" + modal_id
    var element = document.getElementById(nmodal_id)
    element.classList.add("is-active")
}

function destroy_modal(modal_id) {
    const nmodal_id = "modal-" + modal_id
    var element = document.getElementById(nmodal_id)
    element.classList.remove("is-active")
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } 
        else {
            content.style.display = "block";
        }
    });
}
String.prototype.format = function() {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}