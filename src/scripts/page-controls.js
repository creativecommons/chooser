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

function copy_text_to_clipboard() {
    
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}