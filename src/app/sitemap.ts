import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calmgames.vercel.app';
  const lastModified = new Date();

  const activities = [
    'breathe',
    'garden',
    'clouds',
    'love-notes',
    'fireflies',
    'journal',
    'safe-zone',
    'hand',
    'mood',
    'worry-box',
  ];

  const activityRoutes: MetadataRoute.Sitemap = activities.map((slug) => ({
    url: `${baseUrl}/activities/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...activityRoutes,
  ];
}
