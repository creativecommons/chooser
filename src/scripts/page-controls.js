function spawn_modal(modal_id) {
    app_state.modals.modal_content = app_state.modals.modal_packs[modal_id].content
    app_state.modals.modal_title = app_state.modals.modal_packs[modal_id].title
    app_state.modals.modal_toggle = "modal is-active"
}

function destroy_modal() {
    app_state.modals.modal_toggle = "modal"
}
