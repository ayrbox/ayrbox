module.exports = {
  siteMetadata: {
    title: 'beans.ayrbox',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-plugin-postcss',
  ],
  pathPrefix: '/beans.ayrbox.com',
}
