<!-- eslint-disable no-trailing-spaces -->
<template>
    <div>
        <h2 class="title is-2">Confused? Need Help?</h2>
        <p align="center" class="mobile-hide desktop-show">You can click the buttons below to get answers to the questions on them!</p>
        <p align="center" class="desktop-hide mobile-show">You can tap the buttons below to get answers to the questions on them!</p>
        <div class="columns" id="modal-buttons">
            <div class="column top-bottom-paddingless">
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal1Active = true">
                    <p>
                        What Are Creative Commons Licenses?
                    </p>
                </button>
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal2Active = true">
                    <p>
                        How do the Licenses Work?
                    </p>
                </button>
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal3Active = true">
                    <p>
                        Want Public Domain Instead?
                    </p>
                </button>
            </div>
            <div class="column top-bottom-paddingless">
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal4Active = true">
                    <p>
                        Considerations Before Licensing
                    </p>
                </button>
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal5Active = true">
                    <p>
                        How do I Formally License my Work?
                    </p>
                </button>
                <button class="button is-light is-large is-fullwidth"
                    @click="isModal6Active = true">
                    <p>
                        The Six CC Licenses
                    </p>
                </button>
            </div>
        </div>
        <div class="columns">
            <div class="column is-one-third top-bottom-paddingless" id="name-to-icons">
                <p>
                    Creative Commons licenses can be represented by their names, their
                    associated icons, or both. For example, a CC BY-NC license, which 
                    requires attribution, and prohibits commercial use could be represented by its:
                    <table class="table is-hoverable is-fullwidth">
                        <tbody>
                            <tr>
                                <th>Full Name</th>
                                <td>Attribution-NonCommercial</td>
                            </tr>
                            <tr>
                                <th>Short Name</th>
                                <td>CC BY-NC</td>
                            </tr>
                            <tr>
                                <th>Icons</th>
                                <td><LicenseIconography :icon-list="['', 'by', 'nc']"/></td>
                            </tr>
                        </tbody>
                    </table>
                </p>
            </div>
            <hr class="desktop-hide mobile-show">
            <div class="column is-one-third top-bottom-paddingless">
                <div class="edu-icons-section">
                    <div class="columns is-gapless is-inline-flex" id="heading">
                        <div class="column is-one-quarter-desktop is-narrow-mobile">
                            <img src="../assets/license-icons/cc-by_icon.svg">
                        </div>
                        <div class="column is-full is-full-mobile" id="title">
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
                        <div class="column is-full is-full-mobile" id="title">
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
            <div class="column is-one-third top-bottom-paddingless">
                <div class="edu-icons-section">
                    <div class="columns is-gapless is-inline-flex" id="heading">
                        <div class="column is-one-quarter-desktop is-narrow-mobile">
                            <img src="../assets/license-icons/cc-nc_icon.svg">
                        </div>
                        <div class="column is-full is-full-mobile" id="title">
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
                        <div class="column is-full is-full-mobile" id="title">
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
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">What Are Creative Commons Licenses?</p>
            </header>
            <section class="modal-card-body">
                <p>
                    The Creative Commons copyright licenses and tools forge a balance inside the tradional
                    "all rights reserved" setting that copyright law creates. Our licenses and tools give everyone from
                    individual creators to large companies a simple, standardized way to grant copyright permissions to
                    their creative work. <br><br>

                    This helps you as a creator, because instead of having to hire a lawer to parse legalese and
                    create a license for you, you can save time and money, use Creative Commons licenses instead!
                </p> <br>
                <footer class="modal-card-foot">
                    <p>
                        For more information, please see 
                        <a href="https://creativecommons.org/licenses/">About the Licenses</a>
                    </p>
                </footer>
            </section>
        </b-modal>
        <b-modal :active.sync="isModal2Active">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">How do the Licenses Work?</p>
            </header>
            <section class="modal-card-body">
                <b>License "Layers"</b> <br>
                <p>Creative Commons licenses incorporate a unique and innovative "three-layer" design.</p><br>
                <ul>
                    <li>
                        <b> - Legal Code: </b>
                        <p>
                            Each license begins as a traditional legal tool, in the kind of 
                            language and text formats that most lawyers know and love. We 
                            call this the Legal Code layer of each license.
                        </p>
                    </li> <br>
                    <li>
                        <b> - Human Readable: </b>
                        <p>
                            Since most creators, educators, and scientists are not in fact lawyers, 
                            we also make the licenses available in a format that normal people can read -- 
                            The Commons Deed (also known as the “human readable” version of the license).
                            This is a handy reference for licensors and licensees, summarizing some of the
                            most important terms and conditions. Think of the Commons Deed as a user-friendly
                            interface to the legal code beneath.
                        </p>
                    </li> <br>
                    <li>
                        <b> - Machine Readable: </b>
                        <p>
                            The final layer of the license design helps out software, from search engines
                            to office productivity, this software plays an enourmous role
                            in the creation, copying, and distribution of creative works. To help out this
                            software, we provide a "Machine Readable" version of the license. <br><br>

                            We developed a standardized way to describe licenses that software can
                            understand called <a href="https://wiki.creativecommons.org/Ccrel">CC Rights Expression language</a> 
                            (CC REL) to accomplish this.
                        </p>
                    </li> <br>
                </ul>
                <footer class="modal-card-foot">
                    <p>
                        For more information, please see 
                        <a href="https://creativecommons.org/licenses/">About the Licenses</a>
                    </p>
                </footer>
            </section>
        </b-modal>
        <b-modal :active.sync="isModal3Active">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">Want Public Domain Instead?</p>
            </header>
            <section class="modal-card-body">
                <p>
                    Our Public Domain Tools help authors keep and manage their copyright
                    on terms they choose. Our public domain tools, on the other hand, enable
                    authors and copyright owners who want to dedicate their works to the 
                    worldwide public domain to do so.
                </p>
                <footer class="modal-card-foot">
                    <p>
                        For more information on CC's public domain tools, please see 
                        <a href="https://creativecommons.org/publicdomain/">Our Public Domain Tools</a>
                    </p>
                </footer>
            </section>
        </b-modal>
        <b-modal :active.sync="isModal4Active">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">Considerations Before Licensing</p>
            </header>
            <section class="modal-card-body">
                <p>
                    There are a number of things you should consider before you apply
                    a Creative Commons license to your work, or before using Creative 
                    Commons-licened material. <br><br>

                    <a href="https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees#Considerations_for_licensors">
                        Considerations for Licensors
                    </a> - If you are licensing your own work <br>
                    <a href="https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees#Considerations_for_licensees">
                        Considerations for Licensees
                    </a> - If you are using someone else's licensed work
                </p> <br>
                <footer class="modal-card-foot">
                    <p>
                        For more information, please see 
                        <a href="https://wiki.creativecommons.org/wiki/Before_Licensing">
                            the CC wiki's page on Considerations for Licensors and Licensees.
                        </a>
                    </p>
                </footer>
            </section>
        </b-modal>
        <b-modal :active.sync="isModal5Active">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">How do I Formally License my Work?</p>
            </header>
            <section class="modal-card-body">
                <p>
                    Formally licensing your work is as easy as marking your work
                    as being CC licensed, along with the specific license it is under.
                    This mark may be in the form of a watermark, or it may be somewhere 
                    around where your work is hosted or shared. This mark may be as 
                    simple as a bit of text stating the license, or as complex as 
                    embedding the license information on your website. <br><br>

                    If you are interested in embedding license information on your 
                    website, please see the "Have a Website?" dropdown at the bottom
                    of this page for help.
                </p> <br>
                <p>
                    <b>Recourse Options</b> <br>
                    So what would I do if someone used my licensed work in a way
                    that the license does not permit? Well, there are lots of 
                    recourse options, but here are the two main ones: <br><br>
                    <ul>
                        <li>
                            <b> - Resolve the Dispute Amicably</b>
                            <p>
                                First, we encourage you to contact the alleged violator, and attempt to
                                resolve the dispute amicalbly. Most disagreements are solved 
                                in this manner, and it saves everyone time and money.
                            </p>
                        </li> <br>
                        <li>
                            <b> - Litigation</b>
                            <p>
                                If you determine that the disput cannot be resolved any other 
                                way, you would then identify the alleged violation, contact a 
                                lawyer, and begin building a case.
                            </p>
                        </li>
                    </ul>
                </p>
            </section>
        </b-modal>
        <b-modal :active.sync="isModal6Active">
            <header class="modal-card-head">
                <p class="modal-card-title modal-title">The Six Creative Commons Licenses</p>
            </header>
            <section class="modal-card-body">
                <div class="columns">
                    <div class="column is-two-thirds">
                        <p>
                            There are six main licenses that Creative Commons offers. <br><br>

                            In the diagram to the right, you can see the six main licenses
                            and the public domain CC0 license, and how restrictive they are,
                            with licenses at the top being the least restrictive, and licenses
                            at the bottom being the most restrictive.<br><br>

                            If you are unsure about which one is right for you and your work,
                            please see the "Choose a License" section below.
                        </p>
                    </div>
                    <div class="column">
                        <img src="../assets/license-openness-scale.png">
                    </div>
                </div>
                <footer class="modal-card-foot">
                    <p>
                        For more information, please see 
                        <a href="https://creativecommons.org/share-your-work/licensing-types-examples/">
                            this page on Creative Commons licenses.
                        </a>
                    </p>
                </footer>
            </section>
        </b-modal>
    </div>
</template>
<script>
import LicenseIconography from './LicenseIconography'

// eslint-disable-next-line
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
    components: {
        LicenseIconography
    },
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
    margin-top: 3% !important;
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

.vocab.license-icons img {
    width: 35px;
}

#name-to-icons svg {
    width: 28px !important;
    height: 28px !important;
    vertical-align: middle;
    margin-left: 3px;
}

table {
    margin-top: 1.5rem;
}

.top-bottom-paddingless {
    padding-bottom: 0px !important;
    padding-top: 0px !important;
}

@media only screen and (max-width: 1025px) {
    .tablet-hide { display: none; }
    .tablet-show { display: block; }
}

@media only screen and (max-width: 670px) {
    h2 { font-size: 30px !important; }
    button p { font-size: 18px; }

    #modal-buttons {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    .mobile-hide { display: none; }
    .mobile-show { display: block; }
}
</style>
