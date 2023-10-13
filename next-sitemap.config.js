/** @type {import('next-sitemap').IConfig} */
// next-sitemap.js
module.exports = {
  siteUrl: 'https://yesjob.be',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // Exclude any paths not intended for public indexing
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  alternateRefs: [
    {
      href: 'https://yesjob.be/en',
      hreflang: 'en-US',
    },
    {
      href: 'https://yesjob.be/fr',
      hreflang: 'fr-BE',
    },
    {
      href: 'https://yesjob.be/nl',
      hreflang: 'nl-BE',
    },
  ],
  // Default transformation function
  transform: async (config, url) => {
    return {
      loc: url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs,
    };
  },
  additionalPaths: async (config) => {
    const additionalPaths = ['/annonce', '/annonce/publier', '/contact'];

    // Fetch the IDs of all ads from your backend
    // This is a placeholder function, replace it with your actual implementation
    const fetchAdIds = async () => {
      // Placeholder array of ad IDs. Replace this with a fetch request to your backend.
      return ['id-1', 'id-2', 'id-3'];
    };

    const adIds = await fetchAdIds();

    // Add the paths for each ad to the array of additional paths
    adIds.forEach((id) => {
      additionalPaths.push(`/annonce/${id}`);
    });

    return additionalPaths.map((path) => config.transform(config, path));
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
