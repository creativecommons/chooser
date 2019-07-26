<template>
    <div id="app">
        <div class="container" id="site-container">
            <img src="./assets/logo.png">
            <Chooser/>
            <hr>
            
            <hr>
            <HTMLGenerator/>
        </div>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Chooser from './components/Chooser'
import HTMLGenerator from './components/HTMLGenerator'

export default {
    name: 'App',
    components: {
        HelloWorld,
        Chooser,
        HTMLGenerator
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

hr {
    margin-left: 5%;
    margin-right: 5%;
}
</style>
