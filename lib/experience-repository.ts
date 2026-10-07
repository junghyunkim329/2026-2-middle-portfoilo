import { experiences, type Experience } from '@/lib/portfolio-data'
import { getDatabase } from '@/lib/mongodb'

const collectionName = 'experiences'

function normalize(document: Record<string, unknown>): Experience {
  return {
    slug: String(document.slug),
    type: document.type as Experience['type'],
    title: String(document.title),
    period: String(document.period),
    description: String(document.description),
    tags: Array.isArray(document.tags) ? document.tags.map(String) : [],
    href: document.href ? String(document.href) : undefined,
    featured: Boolean(document.featured),
    accent: String(document.accent ?? 'from-[#233067] to-[#5969b4]'),
    details: document.details as Experience['details'],
  }
}

export async function listExperiences(): Promise<Experience[]> {
  const db = await getDatabase()
  const documents = await db.collection(collectionName).find({}).sort({ period: -1 }).toArray()
  return documents.length ? documents.map((document) => normalize(document)) : experiences
}

export async function upsertExperience(experience: Experience): Promise<Experience> {
  const db = await getDatabase()
  await db.collection(collectionName).replaceOne({ slug: experience.slug }, experience, { upsert: true })
  return experience
}

export async function deleteExperience(slug: string): Promise<void> {
  const db = await getDatabase()
  await db.collection(collectionName).deleteOne({ slug })
}
