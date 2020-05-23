<template>
    <b-navbar wrapper-class="container">
        <template slot="brand">
            <b-navbar-item>
                <img
                    src="../assets/chooser.svg"
                    alt="Creative Commons License chooser"
                >
                <h1 class="app-heading">
                    {{ $t('app.title') }}
                </h1>
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item
                href="https://docs.google.com/forms/d/e/1FAIpQLSfF7MCKxlPsPuMn17v_sLYWMkxBkudQSPXCXoJKjh5GCtx63g/viewform"
                title="Feedback"
                :class="'navbar-item-feedback'"
            >
                {{ $t('header.nav-feedback') }}
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    name: 'HeaderSection'
}
</script>

<style lang="scss">
.navbar-item-feedback {
    padding-right: 30%;
    font-family: Roboto Condensed,sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #787878!important;
}

.app-heading {
    font-family: Source Sans Pro,sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 33px;
    color: #333333;
    margin-left:5px;
}
.navbar-item-feedback {
    &:hover {
         color: #fb7729!important;
     }
    &:after {
         display:block;
         content: '';
         border-bottom: solid 2px #fb7729;
         transform: scaleX(0);
         transition: transform 250ms ease-in-out;
         transform-origin:100% 50%
     }
    &:hover:after {
         transform: scaleX(1);
         transform-origin:0 50%;
     }
}
</style>
