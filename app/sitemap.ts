import { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://theodoredeboisseson.github.io';
  const projects = getAllProjects();

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
