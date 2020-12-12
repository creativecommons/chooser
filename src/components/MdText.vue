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
        this.md.options.breaks = true
    },
    destroyed() {
        this.md = null
    },
    render(h) {
        const paragraphs = this.content.replaceAll('<br>', '</p><p>')
        return h(this.tag, { domProps: { innerHTML: paragraphs } })
    }
}
</script>

<style scoped>

</style>
