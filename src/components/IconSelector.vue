<template>
    <div id="component">
        <div class="columns chooser-icon-column">
            <div class="column is-narrow">
                <input
                    :id="id"
                    type="checkbox"
                    class="css-checkbox"
                    ref="input"
                    @input="update()">
                <label
                    :for="id"
                    v-bind:class="icon">
                </label>
            </div>
            <div class="column icon-description">
                <b>{{heading}}</b>
                <p>{{description}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'IconSelector',
    props: ['id', 'icon', 'value'],
    methods: {
        update() {
            console.info("clicked")
            this.$emit('input', !this.$refs.input.checked)
        }
    },
    computed: {
        description() {
            switch (this.icon) {
            case 'nc': return 'You let others copy, distribute, display, perform, and (unless you have chosen NoDerivatives) modify and use your work for any purpose other than commercially, unless they get your permission first.'
            case 'nd': return 'You let others copy, distribute, display, and perform, and modify your work, as long as they distribute any modified work, they must get your permission first.'
            case 'sa': return 'You let others copy, distribute, perform, and modify your work, as long as they distribute any modified work on the same terms. If they want to distribute modified works under other terms, they must get your permission first.'
            default: break
            }
        },
        heading() {
            switch (this.icon) {
            case 'nd': return 'Modifying Not Allowed'
            case 'nc': return 'Commercial Uses Not Allowed'
            case 'sa': return 'Distributed on Same Terms'
            default: return null
            }
        },
        imageSrc() {
            switch (this.icon) {
            /* eslint-disable */
            case 'nd': return "../assets/license-icons/cc-nd-icon.svg"
            case 'nc': return "../assets/license-icons/cc-nc-icon.svg"
            case 'sa': return "../assets/license-icons/cc-sa-icon.svg"
            default: break
            /* eslint-enable */
            }
        }
    }
}
</script>
<style scoped>
    #component {
        cursor: pointer;
        margin-top: 2%;
        margin-bottom: 1.5%;
    }
    .icon-description {
        vertical-align: middle
    }
    input[type=checkbox].css-checkbox{ display: none; }
    label {
        display: flex;
        height: 65px;
        padding: 20px 50px 40px 20px;
        margin-top: 25%;
        background-repeat: no-repeat;
        background-size: contain;
        cursor: pointer;
        opacity: 0.4;
        filter: alpha(opacity=40); /* msie */
    }
    .css-checkbox:checked + label {
        background-position: 0 0;
        opacity: 1;
        filter: alpha(opacity=100); /* msie */
    }
    .css-checkbox:hover + label {
        opacity: .5;
        filter: alpha(opacity=50);
    }
    label.nd {
        background-image: url(../assets/license-icons/cc-nd-icon.svg);
    }
    input[type=checkbox].css-checkbox:checked + label.nd {
        background-image: url(../assets/license-icons/cc-nd-icon.svg);
        opacity: 1;
        filter: alpha(opacity=100); /* msie */
    }
    label.nc {
        background-image: url(../assets/license-icons/cc-nc_icon.svg)
    }
    input[type=checkbox].css-checkbox:checked + label.nc {
        background-image: url(../assets/license-icons/cc-nc_icon.svg);
        opacity: 1;
        filter: alpha(opacity=100); /* msie */
    }
    label.sa {
        background-image: url(../assets/license-icons/cc-sa_icon.svg);
    }
    input[type=checkbox].css-checkbox:checked + label.sa {
        background-image: url(../assets/license-icons/cc-sa_icon.svg);
        opacity: 1;
        filter: alpha(opacity=100); /* msie */
    }
</style>