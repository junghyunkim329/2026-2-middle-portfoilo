import type { MetadataRoute } from 'next'
import { experiences } from '@/lib/portfolio-data'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://junghyun.dev', lastModified: new Date('2025-09-18') },
    {
      url: 'https://junghyun.dev/experience',
      lastModified: new Date('2025-09-18'),
    },
    ...experiences.map((item) => ({
      url: `https://junghyun.dev/project/${item.slug}`,
      lastModified: new Date('2025-09-18'),
    })),
  ]
}
