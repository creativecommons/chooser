<template>
    <div id="app">
        <Header appName="cc-chooser TEST"/>
        <div class="container" id="site-container">
            <Chooser/>
            <hr>
            <HelpSection/>
            <hr>
            <HTMLGenerator/>
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
</style>
