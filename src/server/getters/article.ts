/**
 * @file Article getter
 * @module server.getter.article
 * @author JedediahXu <https://github.com/JedediahXu>
 */

import fs from 'fs';
import fg from 'fast-glob';
import matter from 'gray-matter';

export async function getArticleData() {
  const codingPosts = await fg('src/pages/coding/**/*.md');
  const blogPosts = await fg('src/pages/blog/**/*.md');
  const reship = await fg('src/pages/reship/**/*.md');

  const posts = [...codingPosts, ...blogPosts, ...reship].map(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const result = matter(content);
    return result.data.date;
  });

  const modifiedDates = posts.map((post) => {
    const dateString = post.toISOString();
    return dateString.split('T')[0]
  });

  const article = {
    totalContributions: posts.length,
    weeks: [
      {
        contributionDays: modifiedDates.map((date) => ({
          weekday: 0,
          date: date,
          contributionCount: 1,
          color: '#FCC580',
        })),
      },
    ],
  };
  return article;
}
