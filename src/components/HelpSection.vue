<template>
    <div>
        <h2 class="title is-2">Confused? Need Help?</h2>
        <p align="center">You can click the buttons below to get answers to the questions on them!</p>
        <div class="columns">
            <div class="column">
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal1Active = true">
                    What Are Creative Commons Licenses?
                </button>
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal2Active = true">
                    How do the Licenses Work?
                </button>
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal3Active = true">
                    Want Public Domain Instead?
                </button>
            </div>
            <div class="column">
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal4Active = true">
                    Considerations Before Licensing
                </button>
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal5Active = true">
                    How do I Formally License my Work?
                </button>
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal6Active = true">
                    The Six CC Licenses
                </button>
            </div>
        </div>
        <b-modal :active.sync="isModal1Active">
            <p class="image is-4by3">
                <img src="/static/img/placeholder-1280x960.png">
            </p>
        </b-modal>
        <b-modal :active.sync="isModal2Active">
            <p class="image is-4by3">
                <img src="/static/img/placeholder-1280x960.png">
            </p>
        </b-modal>
        <b-modal :active.sync="isModal3Active">
            <p class="image is-4by3">
                <img src="/static/img/placeholder-1280x960.png">
            </p>
        </b-modal>
        <b-modal :active.sync="isModal4Active">
            <p class="image is-4by3">
                <img src="/static/img/placeholder-1280x960.png">
            </p>
        </b-modal>
        <b-modal :active.sync="isModal5Active">
            <p class="image is-4by3">
                <img src="/static/img/placeholder-1280x960.png">
            </p>
        </b-modal>
        <b-modal :active.sync="isModal6Active">
            <p class="image is-4by3">
                <img src="/static/img/placeholder-1280x960.png">
            </p>
        </b-modal>
    </div>
</template>
<script>
export default {
    // eslint-disable-next-line
    data() {
        return {
            isModal1Active: false,
            isModal2Active: false,
            isModal3Active: false,
            isModal4Active: false,
            isModal5Active: false,
            isModal6Active: false
        }
    }
}
</script>
<style>
button {
    margin-top: 3%;
}

h2 {
    font-size: 50px;
    text-align: center;
    margin-bottom: 1%;
}
</style>
