<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <p>Test</p>
            </div>
            <div class="column">
                <!--<SelectedLicense/>-->
                <!--START SelectedLicense COMPONENT-->
                <p>Test</p>
                <div class="card">
                    <header class="card-header">
                        <h2 class="title is-2">Test Title</h2>
                    </header>
                    <div class="card-content">
                        <h2>Test</h2>
                        <p>Test2</p>
                    </div>
                </div>
                <!--END SelectedLicense COMPONENT-->
            </div>
        </div>
    </div>
</template>
<script>
import SelectedLicense from './SelectedLicense'

export default {
    name: 'Chooser',
    components: [
        SelectedLicense
    ]
}
</script>
<style scoped>
.chooser-selected-card-title {
    margin: 1.5% auto;
}
</style>

