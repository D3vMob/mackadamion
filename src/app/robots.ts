import { type MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/login', '/api/', '/admin/'],
      }
    ],
    sitemap: 'https://mackadamion.com/sitemap.xml',
    host: 'https://mackadamion.com'
  }
}