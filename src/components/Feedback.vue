<template>
    <div id="feedback">
            <p>
                The new Creative Commons License Chooser is still in beta, and we would like to know what you think!
            </p>
            <b>Please give us your feedback by <a href="#" class="anim_link-underline">filling out this short Google Form</a>!</b>
    </div>
</template>
<script>
export default {
    name: 'Feedback'
}
</script>
<style lang="scss" scoped>
    #feedback {
        text-align: center;
        background-color: #eee;
        padding-top: 1rem;
        padding-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    p {
        font-weight: 500;
    }

    a {
        position:relative;
        text-decoration:none;
        display:inline-block;

        &:hover {
            color: #fb7729;    
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

    @media only screen and (max-width: 670px) {
        #feedback {
            padding: .3rem .5rem .3rem .5rem;
            font-size: .8rem;
        }
    }
</style>
