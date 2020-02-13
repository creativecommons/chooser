<template>
    <footer class="footer chooser-footer">
        <div class="container chooser-footer-container">
            <section class="cc-info-column">
                <img src="../assets/cc-logo_white.png" :alt="$t('cc-logo')" class="footer-cc-logo">
                <p class="vocab-body-normal no-bottom-margin">Creative Commons</p>
                <p class="vocab-body-normal">PO Box 1866, Mountain View, CA 94042</p>
                <p class="vocab-body-normal"><a href="mailto:info@creativecommons.org">info@creativecommons.org</a></p>
                <p class="vocab-body-normal"><a href="tel:+1-415-429-6753">+1-415-429-6753</a></p>
            </section>
            <section class="middle-column">
                <p class="vocab-caption">
                    Except where otherwise <a href="https://creativecommons.org/policies#license">noted</a>, content on this site is licensed under a
                    <a href="#">Creative Commons Attribution 4.0 International license</a>. Icons by Noun Project.
                </p>
                <p class="footer-license-icons">
                    <img src="../assets/license-icons/icon-cc_white.png">
                    <img src="../assets/license-icons/icon-by-white.png">
                </p>
            </section>
            <section class="donation-column">
                <h4 class="vocab-h4a">OUR WORK RELIES ON YOU!</h4>
                <p class="vocab-body-normal">Help us keep Internet free and open.</p>
            </section>
        </div>
    </footer>
</template>

<script>

export default {
    name: 'Footer'
}
</script>

<style scoped>
.footer.chooser-footer {
    background-color: black;
    color: white;
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
.chooser-footer a {
    color:  #05B5DA;
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
</style>
