<template>
    <div id="app">
        <Header :title="$t('chooser')"/>
        <Feedback/>
        <div class="container" id="site-container">
            <Chooser v-model="selected"/>
            <hr>
            <HelpSection/>
            <hr>
            <HTMLGenerator :shortLicenseName="selected.shortName"/>
        </div>
        <Footer>
            <p>
                <a href="https://github.com/creativecommons/cc-chooser">Icons</a> by The Noun Project and FontAwesome.
            </p>
            <p>
                View this page's source code <a href="https://github.com/creativecommons/cc-chooser">on Github</a>.
            </p>
            <Locale/>
        </Footer>
    </div>
</template>
<script>
// TODO Reduce custom styling in favour of Vocabulary styles
import '@creativecommons/vocabulary/root.css'
import '@creativecommons/vocabulary/vocabulary.css'

import Chooser from './components/Chooser'
import HelpSection from './components/HelpSection'
import HTMLGenerator from './components/HTMLGenerator'
import { Header, Footer, LicenseIconography, Locale } from '@creativecommons/vocabulary'
import Feedback from './components/Feedback'

export default {
    name: 'App',
    components: {
        Chooser,
        HelpSection,
        HTMLGenerator,
        Header,
        Footer,
        LicenseIconography,
        Locale,
        Feedback
    },
    data() {
        return {
            selected: {
                shortName: 'CC BY 4.0',
                fullName: 'Attribution 4.0 International'
            }
        }
    },
    methods: {
        onLicenseUpdate(e) {
            this.selected = e
        }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C600%2C700%7CRoboto+Condensed&ver=4.9.8");

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

hr {
    margin-left: 5%;
    margin-right: 5%;
}

#site-container {
    padding-bottom: 2%;
}

.desktop-hide { display: none; }
.desktop-show { display: block; }

@media only screen and (max-width: 1025px) {
    #site-container {
        margin-left: 2%;
        margin-right: 2%;
    }

    .mobile-hide { display: none; }
    .mobile-show { display: block; }
}

@media only screen and (max-width: 670px) {
    #site-container {
        margin-left: 3%;
        margin-right: 3%;
    }
}
</style>
<style scoped>
    p {
        margin-bottom: .5em;
    }
</style>

<i18n src="./locales/App.json">
</i18n>
