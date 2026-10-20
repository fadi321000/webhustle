export type DesignCategory = 'Restaurants' | 'E-commerce' | 'Business' | 'Portfolios' | 'SaaS' | 'Real Estate' | 'Education' | 'Personal Brands'
export type DesignVariant = 'savor' | 'orbit' | 'essential' | 'habitat' | 'northline' | 'monroe' | 'morrow' | 'avery'

export type DesignProject = {
  slug: string
  name: string
  category: DesignCategory
  description: string
  status?: 'Live demo'
  variant: DesignVariant
  palette: string[]
  previewImage: string
  previewAlt: string
}

export const designCategories = ['All', 'Restaurants', 'E-commerce', 'Business', 'Portfolios', 'SaaS', 'Real Estate', 'Education', 'Personal Brands'] as const

export const designProjects: DesignProject[] = [
  { slug: 'savor', name: 'Savor', category: 'Restaurants', description: 'A warm, inviting home for food made with care.', status: 'Live demo', variant: 'savor', palette: ['#2d251e', '#d29c5e'], previewImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80', previewAlt: 'A candlelit restaurant table set for dinner' },
  { slug: 'orbit', name: 'Orbit', category: 'SaaS', description: 'A clear view of your team’s moving parts.', status: 'Live demo', variant: 'orbit', palette: ['#f4f4f0', '#7863d5'], previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80', previewAlt: 'Analytics dashboard on a desktop screen' },
  { slug: 'essential', name: 'Essential', category: 'E-commerce', description: 'Everyday objects, thoughtfully selected.', status: 'Live demo', variant: 'essential', palette: ['#e9e1d5', '#ad7e57'], previewImage: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1000&q=80', previewAlt: 'Minimal ceramic objects on a warm neutral background' },
  { slug: 'habitat', name: 'Habitat', category: 'Real Estate', description: 'A quieter way to find somewhere to belong.', variant: 'habitat', palette: ['#ebe8e0', '#6a7459'], previewImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80', previewAlt: 'Sunlit modern home interior with natural materials' },
  { slug: 'northline', name: 'Northline', category: 'Business', description: 'A confident digital home for a modern consultancy.', variant: 'northline', palette: ['#eae9e5', '#5a715f'], previewImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80', previewAlt: 'Bright contemporary studio office' },
  { slug: 'monroe', name: 'Monroe', category: 'Portfolios', description: 'A restrained canvas for work worth looking at.', variant: 'monroe', palette: ['#181817', '#d0b17b'], previewImage: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=80', previewAlt: 'Sculptural art installation in a gallery' },
  { slug: 'morrow', name: 'Morrow', category: 'Education', description: 'A welcoming learning space built for curiosity.', variant: 'morrow', palette: ['#f0eee7', '#658a88'], previewImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80', previewAlt: 'Students learning together in a bright classroom' },
  { slug: 'avery', name: 'Avery', category: 'Personal Brands', description: 'A personal platform with a point of view.', variant: 'avery', palette: ['#f2e9e3', '#ba7661'], previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80', previewAlt: 'Portrait of a creative professional' },
]

export const getDesignProject = (slug: string | undefined) => designProjects.find((project) => project.slug === slug)
