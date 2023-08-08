import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import config from '../config'
import sanitizeHtml from 'sanitize-html';

export async function get(context) {
  const posts = import.meta.glob('./blog/*.{md,mdx}', {
    eager: true
  });
  
  const otherPosts = import.meta.glob('./coding/*.{md,mdx}', {
    eager: true
  });

  const allPosts = { ...posts, ...otherPosts }; // 合并两个文件夹的文章对象
  return rss({
    title: config.title,
    description: `ChetSerenade is blogging about life, tech.`,
    site: context.site,
    items: Object.values(allPosts).map(allPosts => ({
      title: allPosts.frontmatter.title,
      link: allPosts.url,
      content: sanitizeHtml(allPosts.compiledContent()),
      pubDate: allPosts.frontmatter.date,
    }))
  });
}
