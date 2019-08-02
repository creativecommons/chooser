<template>
    <div>
        <b-collapse :open="false" aria-id="contentIdForA11y1">
            <button
                class="button is-primary is-fullwidth collapsible-button"
                slot="trigger"
                aria-controls="contentIdForA11y1">
                <h3 class="title is-3">Have a Website?</h3>
            </button>
            <div class="notification">
                <div class="content">
                    <h3>
                        Subtitle
                    </h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                        Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                        Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
                    </p>
                </div>
            </div>
        </b-collapse>
    </div>
</template>
<style>
.collapsible-button {
    height: 70px;
}
</style>
