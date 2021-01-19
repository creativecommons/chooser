import fs from 'fs'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()
const messages = JSON.parse(fs.readFileSync('./src/utils/locales_for_translation/en_for_translation.json', 'utf-8'))


const needsTransform = (key, value) => {
    return key === 'text' || key === 'footer' || containsMd(value)
}

const containsMd = (str) => {
    return str.includes('[') && str.includes(']') && str.includes('(') && str.includes(')') || str.includes('**')
}

const renderMd = (str) => {
    return md.render(str)
}

const renderMdProperty = (obj) => {
    for (const k in obj) {
        if (typeof obj[k] == 'string') {
            obj[k] = needsTransform(k, obj[k]) ? renderMd(obj[k]) : obj[k]
        }
        else {
            obj[k] = renderMdProperty(obj[k])
        }
    }
    return obj
}

const renderedMessages = renderMdProperty(messages)
fs.writeFileSync('./src/locales/en.json', JSON.stringify(renderedMessages, null, 2))
