import rss from '@astrojs/rss';
import config from '../config'

export async function GET(context) {
  const posts = import.meta.glob('./blog/*.{md,mdx}', {
    eager: true
  });
  
  const otherPosts = import.meta.glob('./coding/*.{md,mdx}', {
    eager: true
  });

  const reship = import.meta.glob('./reship/*.{md,mdx}', {
    eager: true
  });

  const allPosts = { ...posts, ...otherPosts,...reship };
  return rss({
    title: config.title,
    description: `Jed is blogging about life, tech.`,
    site: context.site,
    items: Object.values(allPosts).map(allPosts => ({
      title: allPosts.frontmatter.title,
      link: allPosts.url,
      pubDate: allPosts.frontmatter.date,
    }))
  });
}
