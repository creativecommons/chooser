function spawn_modal(modal_id) {
    app_state.modals.modal_content = app_state.modals.modal_packs[modal_id].content // Update modal content
    app_state.modals.modal_title = app_state.modals.modal_packs[modal_id].title // Update modal title
    app_state.modals.modal_toggle = "modal is-active" // Show modal
}

function destroy_modal() {
    app_state.modals.modal_toggle = "modal"
}

function copy_text_to_clipboard() {
    
}