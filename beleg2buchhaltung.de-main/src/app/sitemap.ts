import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://beleg2buchhaltung.de'
  const blogDir = path.join(process.cwd(), 'src/app/blog')
  let blogs: string[] = []
  try {
    blogs = fs.readdirSync(blogDir).filter(f => fs.statSync(path.join(blogDir, f)).isDirectory())
  } catch {}

  const routes = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/impressum`, lastModified: new Date() },
    { url: `${baseUrl}/datenschutz`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
   ...blogs.map(slug => ({ url: `${baseUrl}/blog/${slug}`, lastModified: new Date() }))
  ]
  return routes
}
