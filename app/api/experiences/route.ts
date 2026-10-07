import { NextResponse } from 'next/server'
import {
  deleteExperience,
  listExperiences,
  upsertExperience,
} from '@/lib/experience-repository'
import type { Experience } from '@/lib/portfolio-data'

export const runtime = 'nodejs'

function isExperience(value: unknown): value is Experience {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<Experience>
  return (
    typeof item.slug === 'string' &&
    /^[a-z0-9-]+$/.test(item.slug) &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    typeof item.period === 'string' &&
    Array.isArray(item.tags) &&
    typeof item.type === 'string' &&
    typeof item.accent === 'string'
  )
}

export async function GET() {
  try {
    return NextResponse.json({ data: await listExperiences() })
  } catch (error) {
    console.error('[v0] Failed to list experiences', error)
    return NextResponse.json(
      { error: 'Experience data is unavailable' },
      { status: 503 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    if (!isExperience(body))
      return NextResponse.json(
        { error: 'Invalid experience payload' },
        { status: 400 },
      )
    return NextResponse.json({ data: await upsertExperience(body) })
  } catch (error) {
    console.error('[v0] Failed to save experience', error)
    return NextResponse.json(
      { error: 'Experience could not be saved' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const slug = new URL(request.url).searchParams.get('slug')
    if (!slug || !/^[a-z0-9-]+$/.test(slug))
      return NextResponse.json(
        { error: 'A valid slug is required' },
        { status: 400 },
      )
    await deleteExperience(slug)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[v0] Failed to delete experience', error)
    return NextResponse.json(
      { error: 'Experience could not be deleted' },
      { status: 500 },
    )
  }
}
