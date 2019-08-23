<template>
    <div id="app">
        <Header appName="cc-chooser"/>
        <div class="container" id="site-container">
            <Chooser @clicked="onLicenseUpdate"/>
            <hr>
            <HelpSection/>
            <hr>
            <HTMLGenerator
                shortLicenseName="selectedLicense"/>
        </div>
        <Footer/>
    </div>
</template>
<script>
import Chooser from './components/Chooser'
import HelpSection from './components/HelpSection'
import HTMLGenerator from './components/HTMLGenerator'
import { Header, Footer, LicenseIconography } from '@creativecommons/vocabulary'

export default {
    name: 'App',
    components: {
        Chooser,
        HelpSection,
        HTMLGenerator,
        Header,
        Footer,
        LicenseIconography
    },
    data() {
        return {
            selected: {
                shortName: "",
                fullName: ""
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
    padding-top: 3%;
    padding-bottom: 10%;
}

@media only screen and (max-width: 670px) {
    #site-container {
        margin-left: 3%;
        margin-right: 3%;
    }
}
</style>
