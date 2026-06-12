import type { MetadataRoute } from 'next'
import { BRAND } from '@/config/brand'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:              BRAND.siteUrl,
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         1,
    },
  ]
}
