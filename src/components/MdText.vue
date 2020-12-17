<script>
import MarkdownIt from 'markdown-it'

export default {
    name: 'MdText',
    props: {
        source: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    data() {
        return {
            md: null
        }
    },
    computed: {
        content() {
            const src = this.source
            return this.md?.render(src)
        }
    },
    created() {
        this.md = new MarkdownIt()
    },
    destroyed() {
        this.md = null
    },
    render(h) {
        return h(this.tag, { domProps: { innerHTML: this.content } })
    }
}
</script>

<style scoped>

</style>
