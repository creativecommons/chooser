<template>
    <b-navbar wrapper-class="container">
        <template slot="brand">
            <b-navbar-item>
                <a
                    class="logo"
                    href="/"
                >
                    <img
                        src="../assets/chooser.svg"
                        alt="Creative Commons License chooser"
                    >
                </a>
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item
                href="https://docs.google.com/forms/d/e/1FAIpQLSfF7MCKxlPsPuMn17v_sLYWMkxBkudQSPXCXoJKjh5GCtx63g/viewform"
                title="Feedback"
                class="navbar-item-feedback"
            >
                {{ $t('header.nav-feedback') }}
                <i class="icon external-link" />
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
nav.navbar {
    padding: 0.5rem 0 0;
}
.navbar-item-feedback {
    padding-right: 30%;
    font-family: Roboto Condensed,sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #787878!important;
    transition: color 300ms ease;
    &:hover {
        color: #fb7729!important;
        background-color: white;
    }
}
</style>
