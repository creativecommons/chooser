<template>
    <footer class="footer chooser-footer">
        <div class="container chooser-footer-container">
            <section class="cc-info-column">
                <img
                    src="../assets/cc-logo_white.png"
                    :alt="$t('alt.cc-logo')"
                    class="footer-cc-logo"
                >
                <p class="vocab-body-normal no-bottom-margin">
                    Creative Commons
                </p>
                <p class="vocab-body-normal">
                    PO Box 1866, Mountain View, CA 94042
                </p>
                <p class="vocab-body-normal">
                    <a href="mailto:info@creativecommons.org">info@creativecommons.org</a>
                </p>
                <p class="vocab-body-normal">
                    <a href="tel:+1-415-429-6753">+1-415-429-6753</a>
                </p>
            </section>
            <section class="middle-column">
                <p
                    class="footer-licensing-text"
                    v-html="$t('footer.licensing.text')"
                />
                <p class="footer-license-icons">
                    <img src="../assets/license-icons/icon-cc_white.png">
                    <img src="../assets/license-icons/icon-by-white.png">
                </p>
                <p
                    class="footer-contribute-link"
                    v-html="$t('footer.contribute')"
                />
            </section>
            <section class="donation-column">
                <h4 class="vocab ha h4a">
                    {{ $t('footer.donation.header') }}
                </h4>
                <p class="vocab-body-normal">
                    {{ $t('footer.donation.call') }}
                </p>
            </section>
        </div>
    </footer>
</template>

<script>

export default {
    name: 'Footer'
}
</script>

<style>
.footer.chooser-footer {
    background-color: black;
    color: white;
    padding: 3rem 1.5rem;
    margin-top:5rem;
}
.chooser-footer .chooser-footer-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: 3%;
}
.chooser-footer p.no-bottom-margin {
    margin-bottom: 0;
    padding-bottom:0;
}
.chooser-footer a,
.middle-column .footer-licensing-text a {
    color:  #05B5DA;
}
.chooser-footer a:hover,
.middle-column .footer-licensing-text a:hover {
    color: #363636;
}

.footer-cc-logo {
    margin-bottom: 40px;
}
.footer-license-icons img {
    margin-right:8px;
}
.middle-column {
    padding-top: 120px;
}
.donation-column {
    padding-top: 118px;
}
@media only screen and (max-width: 768px) {
    .chooser-footer .chooser-footer-container {
        display: grid;
        grid-template-columns: 100%;
    }
    .middle-column {
        padding-top: 1rem;
    }
    .donation-column {
        padding-top: 1rem;
    }
    .footer-cc-logo {
        max-width: 300px;
    }
}
</style>
