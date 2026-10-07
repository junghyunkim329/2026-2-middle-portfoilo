import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProjectPage } from '@/components/portfolio'
import { experiences, getExperience, projectPath } from '@/lib/portfolio-data'
export function generateStaticParams() {
  return experiences.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getExperience(slug)
  return {
    title: item ? `${item.title} / 김정현` : 'Project not found',
    description: item?.description,
  }
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getExperience(slug)
  if (!item) notFound()
  return <ProjectPage item={item} />
}
