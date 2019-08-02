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
        <div class="columns">
            <div class="column is-one-third">

            </div>
            <div class="column is-one-third">
                <div class="edu-icons-section">
                    <div class="columns is-gapless is-inline-flex" id="heading">
                        <div class="column is-one-quarter-desktop is-narrow-mobile">
                            <img src="../assets/license-icons/cc-by_icon.svg">
                        </div>
                        <div class="column is-full" id="title">
                            <b>Attribution Required</b>
                            <p class="help">(BY)</p>
                        </div>
                    </div>
                    <p>
                        All CC licenses require that others who use your work in any way must give
                        you credit the way you request, but not in a way that suggests you endorse
                        them or their use. If they want to use your work without giving credit for
                        endorsement purposes, they must get your permission first.
                    </p>
                </div>
                <div class="edu-icons-section">
                    <div class="columns is-gapless is-inline-flex" id="heading">
                        <div class="column is-one-quarter-desktop is-narrow-mobile">
                            <img src="../assets/license-icons/cc-nd_icon.svg">
                        </div>
                        <div class="column is-full" id="title">
                            <b>Modifying Not Allowed</b>
                            <p class="help">(ND/ NoDerivatives)</p>
                        </div>
                    </div>
                    <p>
                        You let others copy, distribute, display, and perform, and modify your work,
                        as long as they distribute any modified work, they must get your permission first.
                    </p>
                </div>
            </div>
            <div class="column is-one-third">
                <div class="edu-icons-section">
                    <div class="columns is-gapless is-inline-flex" id="heading">
                        <div class="column is-one-quarter-desktop is-narrow-mobile">
                            <img src="../assets/license-icons/cc-nc_icon.svg">
                        </div>
                        <div class="column is-full" id="title">
                            <b>Commercial Use Not Allowed</b>
                            <p class="help">(NC/ NonCommercial)</p>
                        </div>
                    </div>
                    <!--
                    <img src="assets/license-icons/cc-nc_icon.svg">
                    <div style="display: inline; vertical-align: middle">
                        <b style="display: inline-block; padding-right: 25%">Commercial Use Not Allowed</b>
                        <p class="help">help</p>
                    </div>-->
                    <p style="margin-bottom: 0%; margin-top: 0px;">
                        You let others copy, distribute, display, perform, and (unless you have
                        chosen NoDerivatives) modify and use your work for any purpose other
                        than commercially, unless they get your permission first.
                    </p>
                    <p class="help">
                        Curious what qualifies as a Commercial Use? Check out the
                        <a href="https://wiki.creativecommons.org/wiki/NonCommercial_interpretation">
                            CC wiki page on interpretation of Commercial Uses.
                        </a>
                    </p>
                </div>
                <div class="edu-icons-section">
                    <div class="columns is-gapless is-inline-flex" id="heading">
                        <div class="column is-one-quarter-desktop is-narrow-mobile">
                            <img src="../assets/license-icons/cc-sa_icon.svg">
                        </div>
                        <div class="column is-full" id="title">
                            <b>Distributed on Same Terms</b>
                            <p class="help">(SA/ ShareAlike)</p>
                        </div>
                    </div>
                    <p>
                        You let others copy, distribute, perform, and modify your work, as long as
                        they distribute any modified work on the same terms. If they want to
                        distribute modified works under other terms, they must get your permission first.
                    </p>
                </div>
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
const ModalForm = {
template: `
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
            </header>
            <section class="modal-card-body">

            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
            </footer>
        </div>
    </form>
    `
}
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

.edu-icons-section {
    margin-top: 1.5%;
}

.edu-icons-section img {
    width: 45px;
}

.edu-icons-section p {
    margin-bottom: 6%;
}

.edu-icons-section #heading {
    margin-bottom: 0%;
}

.edu-icons-section #title {
    vertical-align: middle !important;
    margin-bottom: 0px !important;
    padding-bottom: 0px !important;
    margin-left: 2% !important;
}

.edu-icons-section b {
    padding-top: 0px;
}

.edu-icons-section-icon_title p {
    margin: 0px;
}
</style>
