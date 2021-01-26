module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/static/**/*.html', './src/**/*.vue'],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(
          /<style[^]+?<\/style>/gi,
          ''
        )
        return (
          contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) ||
          []
        )
      },
      safelist: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
        /is-text/,
        /control/,
        /select/,
        /^tabs.*/,
        /is-boxed/,
        /app-modal/,
        /overlay/,
        /^modal.*/,
        /padding.*/,
        /icon/,
        /close-button/,
        /has-color-gray/,
        /is-size-.*/,
      ],
    }),
  ],
}
