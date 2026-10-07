export type ExperienceType =
  | 'Project'
  | 'Conference'
  | 'Company Visit'
  | 'Education'
  | 'Presentation'
  | 'Award'
export type Experience = {
  slug: string
  type: ExperienceType
  title: string
  period: string
  description: string
  tags: string[]
  href?: string
  featured?: boolean
  accent: string
  details?: {
    problem: string
    role: string
    implementation: string[]
    security: string[]
    takeaway: string
  }
}
export const profile = {
  name: '김정현',
  role: '정보보호학 전공 학생',
  email: 'shshjang14@gmail.com',
  github: 'https://github.com/junghyunkim329',
  blog: 'https://shshjang14.tistory.com/',
}
export const experiences: Experience[] = [
  {
    slug: 'vehicle-network-anomaly-detection',
    type: 'Project',
    title: 'Vehicle Network Anomaly Detection',
    period: '2025 — Present',
    description:
      'CAN bus traffic를 분석해 ECU 간 비정상 메시지를 탐지하는 보안 연구 프로젝트입니다.',
    tags: ['Python', 'CAN', 'Machine Learning'],
    href: 'https://github.com',
    featured: true,
    accent: 'from-[#683c18] to-[#5969b4]',
    details: {
      problem:
        '차량 내부 네트워크는 인증 없이 메시지가 전달될 수 있어, 정상 패턴에서 벗어난 프레임을 빠르게 식별해야 합니다.',
      role: 'CAN 트래픽 수집 파이프라인과 탐지 규칙을 설계하고 데이터 전처리 및 평가를 담당했습니다.',
      implementation: [
        'SocketCAN 기반 테스트 환경 구성',
        '메시지 주기·ID·payload 기반 특징 추출',
        '오탐을 줄이기 위한 baseline 프로파일링',
      ],
      security: [
        'Threat modeling으로 공격 표면 정의',
        '민감한 원본 로그의 접근 범위 최소화',
        '탐지 이벤트에 대한 구조화된 감사 로그 기록',
      ],
      takeaway:
        '차량 보안은 프로토콜 이해와 운영 가능한 탐지 설계가 함께 필요하다는 것을 배웠습니다.',
    },
  },
  {
    slug: 'linux-kernel-vulnerability-study',
    type: 'Project',
    title: 'Linux Kernel Vulnerability Study',
    period: '2024 — 2025',
    description:
      'Linux 커널 취약점의 원인을 분석하고 재현 환경을 구축하며 시스템 보안 역량을 확장했습니다.',
    tags: ['C', 'Linux', 'Vulnerability Research'],
    href: 'https://github.com',
    featured: true,
    accent: 'from-[#150807] to-[#7f8696]',
    details: {
      problem:
        '공개된 취약점 분석 자료를 재현 가능한 실습 단위로 정리하고 근본 원인을 추적했습니다.',
      role: '취약점 재현, crash triage, 패치 전후 동작 비교를 수행했습니다.',
      implementation: [
        '격리된 Linux VM 실습 환경 구축',
        'GDB와 sanitizers를 활용한 원인 추적',
        '재현 절차와 완화 방안 문서화',
      ],
      security: [
        '실험 환경을 외부 네트워크와 분리',
        '비파괴적 테스트 케이스만 사용',
        '결과물에 책임 있는 공개 원칙 적용',
      ],
      takeaway:
        '낮은 수준의 원인을 이해해야 설계 단계의 방어도 더 정교해진다는 것을 체감했습니다.',
    },
  },
  {
    slug: 'security-research-presentation',
    type: 'Presentation',
    title: '차량 사이버보안 위협 모델링',
    period: '2025. 08',
    description:
      '차량 도메인 컨트롤러를 대상으로 STRIDE 기반 위협 모델링 결과를 발표했습니다.',
    tags: ['ISO 21434', 'Threat Modeling'],
    featured: true,
    accent: 'from-[#683c18] to-[#8794d2]',
  },
  {
    slug: 'whitehat-conference-2025',
    type: 'Conference',
    title: 'WhiteHat Security Conference 2025',
    period: '2025. 07',
    description:
      '차량 보안과 임베디드 시스템 취약점 분석 세션을 중심으로 최신 동향을 학습했습니다.',
    tags: ['Vehicle Security', 'Research'],
    featured: true,
    accent: 'from-[#354680] to-[#6d78aa]',
  },
  {
    slug: 'information-security-major',
    type: 'Education',
    title: '정보보호학 전공',
    period: '2022 — Present',
    description:
      '시스템 보안, 네트워크, 암호학을 기반으로 보안 엔지니어링의 기초를 쌓고 있습니다.',
    tags: ['System Security', 'Networks'],
    accent: 'from-[#30406f] to-[#6477b2]',
  },
  {
    slug: 'automotive-security-lab',
    type: 'Company Visit',
    title: 'Automotive Security Lab Visit',
    period: '2025. 04',
    description:
      '차량 보안 연구소를 방문해 실제 제품 보안 프로세스와 테스트 환경을 살펴봤습니다.',
    tags: ['Automotive', 'Security Lab'],
    accent: 'from-[#455c80] to-[#9aa8c9]',
  },
  {
    slug: 'security-competition-award',
    type: 'Award',
    title: '교내 보안 경진대회 우수상',
    period: '2024. 11',
    description:
      '웹·시스템 보안 문제를 해결하며 분석 과정과 팀 협업 역량을 인정받았습니다.',
    tags: ['CTF', 'Teamwork'],
    accent: 'from-[#5d527d] to-[#aa91bc]',
  },
]
export const featuredProjects = experiences.filter((item) => item.featured)
export const experienceTypes: Array<'All' | ExperienceType> = [
  'All',
  'Project',
  'Conference',
  'Company Visit',
  'Education',
  'Presentation',
  'Award',
]
export const skills = {
  Programming: ['C', 'Python', 'Bash'],
  Backend: ['FastAPI', 'MySQL'],
  Infra: ['Linux', 'Docker', 'Git'],
  Security: ['System Hacking', 'Binary Exploitation', 'Vulnerability Analysis'],
}
export const roadmap = [
  {
    status: 'Current focus',
    title: 'Vehicle security foundations',
    items: ['Linux', 'CAN', 'UDS', 'System Hacking'],
  },
  {
    status: 'Next',
    title: 'Automotive security depth',
    items: ['AUTOSAR', 'Secure Boot', 'HSM', 'SHE', 'ISO 21434'],
  },
]
export const typeLabels: Record<ExperienceType | 'All', string> = {
  All: '전체',
  Project: '프로젝트',
  Conference: '컨퍼런스',
  'Company Visit': '견학',
  Education: '교육',
  Presentation: '발표',
  Award: '수상',
}
export function formatType(type: ExperienceType) {
  return typeLabels[type]
}
export function getExperience(slug: string) {
  return experiences.find((item) => item.slug === slug)
}
export function getVisibleExperiences(
  query: string,
  type: 'All' | ExperienceType,
) {
  const q = query.trim().toLowerCase()
  return experiences
    .filter(
      (item) =>
        (type === 'All' || item.type === type) &&
        (!q ||
          [item.title, item.description, item.type, ...item.tags]
            .join(' ')
            .toLowerCase()
            .includes(q)),
    )
    .sort((a, b) => b.period.localeCompare(a.period))
}
export function getStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: 'Security Engineer in training',
    description:
      '차량 보안 솔루션 엔지니어를 목표로 학습하는 정보보호학 전공 학생',
    sameAs: [profile.github, profile.blog],
  }
}
export const getProjectCount = () =>
  experiences.filter((item) => item.type === 'Project').length
export const getFooterStats = () => ({ total: 1284, today: 42 })
export const typeClass: Record<ExperienceType, string> = {
  Project:
    'bg-[#e8edff] text-[#683c18] dark:bg-[#683c18]/30 dark:text-[#b9c4ff]',
  Conference:
    'bg-[#eef5f2] text-[#28634d] dark:bg-[#28634d]/30 dark:text-[#a8e5c9]',
  'Company Visit':
    'bg-[#fff4e1] text-[#8a5b11] dark:bg-[#8a5b11]/30 dark:text-[#ffd68c]',
  Education:
    'bg-[#f1ecff] text-[#6846a5] dark:bg-[#6846a5]/30 dark:text-[#d6c4ff]',
  Presentation:
    'bg-[#ffecef] text-[#9d3f56] dark:bg-[#9d3f56]/30 dark:text-[#ffb8c8]',
  Award: 'bg-[#fff1da] text-[#9a6717] dark:bg-[#9a6717]/30 dark:text-[#ffd98e]',
}
export const siteDescription =
  '차량 보안 솔루션 엔지니어를 목표로 학습하고 기록하는 포트폴리오입니다.'
export const focusAreas = [
  'Vehicle Security',
  'ECU Security',
  'System Hacking',
  'Vulnerability Research',
  'Secure Software Development',
]
export const productionStack = [
  'MongoDB Atlas',
  'Node.js MongoDB Driver',
  'Route Handlers',
  'Input validation',
]
export const projectSlugs = experiences.map((item) => item.slug)
export const projectPath = (slug: string) => `/project/${slug}`
export const experienceCount = experiences.length
export const projectCount = getProjectCount()
export const visitorStats = getFooterStats()
export const portfolioData = {
  profile,
  experiences,
  featuredProjects,
  skills,
  roadmap,
  experienceTypes,
}
