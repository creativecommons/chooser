<template>
    <div id="app">
        <Header :title="$t('chooser')"/>
        <Feedback/>
        <div class="container" id="site-container">
            <Chooser />
            <hr>
            <HelpSection/>
            <hr>
        </div>
        <Footer>
            <div class="panel">
                <div>
                    <p>
                        Built with <a href="https://creativecommons.github.io/cc-vocabulary/">Vocabulary</a>.
                    </p>
                    <p>
                        <a href="https://github.com/creativecommons/cc-chooser">Icons</a> by The Noun Project and
                        FontAwesome.
                    </p>
                    <p>
                        Contribute on <a href="https://github.com/creativecommons/cc-chooser">Github</a>.
                    </p>
                </div>
                <Locale/>
            </div>
        </Footer>
    </div>
</template>

<script>
// TODO Reduce custom styling in favour of Vocabulary styles
import '@creativecommons/vocabulary/root.css'
import '@creativecommons/vocabulary/vocabulary.css'

import Chooser from './components/Chooser'
import HelpSection from './components/HelpSection'
import { Header, Footer, Locale } from '@creativecommons/vocabulary'
import Feedback from './components/Feedback'

export default {
    name: 'App',
    components: {
        Chooser,
        HelpSection,
        Header,
        Footer,
        Locale,
        Feedback
    }
}
</script>

<style>

    @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C600%2C700%7CRoboto+Condensed&ver=4.9.8");

    html {
        font-family: Source Sans Pro,Noto Sans,Arial,Helvetica Neue,Helvetica,sans-serif;
        background-color: #e0e0e0;
    }
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
        padding-top: 2rem;
        padding-bottom: 2%;
    }

    .desktop-hide {
        display: none;
    }

    .desktop-show {
        display: block;
    }

    @media only screen and (max-width: 1025px) {
        #site-container {
            margin-left: 2%;
            margin-right: 2%;
        }

        .mobile-hide {
            display: none;
        }

        .mobile-show {
            display: block;
        }
    }

    @media only screen and (max-width: 670px) {
        #site-container {
            margin-left: 3%;
            margin-right: 3%;
        }
    }

    .vocab-container .vocab-grid .panel {
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }

    .vocab.select-field.normal-sized {
        font-size: 1rem;
    }

    .vocab.select-field > .field.has-addons {
        padding-left: calc(1em + var(--select-field-addons-space));
        margin-bottom: 0;
        min-width: 10em;
    }

    .vocab.select-field > .field > option[disabled] {
        opacity: 0.6;
    }

    .panel {
        margin-top: 1rem;
    }
</style>
<style scoped>
    p {
        margin-bottom: .5em;
    }

    #custom .panel > div:first-child {
        margin-bottom: 10vh;
    }

    .vocab.footer {
        font-family: Source Sans Pro, Noto Sans, Arial, Helvetica Neue, Helvetica, sans-serif;
        line-height: 1.2;
    }
</style>
