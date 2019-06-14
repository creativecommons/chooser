function spawn_modal(modal_id) {
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
    app_state.modals.modal_toggle = "modal is-active" // Show modal
}

function destroy_modal() {
    app_state.modals.modal_toggle = "modal"
}

function copy_text_to_clipboard() {
    
}