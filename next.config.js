/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    const svgLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )
    config.module.rules.push(
      {
        ...svgLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: svgLoaderRule.issuer,
        resourceQuery: { not: [...svgLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    )
    svgLoaderRule.exclude = /\.svg$/i
    return config
  }
}
