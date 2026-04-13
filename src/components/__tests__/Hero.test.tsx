// src/components/__tests__/Hero.test.tsx
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { Hero } from '../Hero'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div {...p}>{children}</div>,
    section: ({ children, ...p }: React.HTMLAttributes<HTMLElement>) => <section {...p}>{children}</section>,
    img: ({ ...p }: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...p} />,
    h1: ({ children, ...p }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...p}>{children}</h1>,
    p: ({ children, ...p }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...p}>{children}</p>,
    span: ({ children, ...p }: React.HTMLAttributes<HTMLSpanElement>) => <span {...p}>{children}</span>,
    a: ({ children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...p}>{children}</a>,
  },
  useAnimation: () => ({}),
}))

vi.mock('../assets/hero.png', () => ({ default: 'hero.png' }))
vi.mock('../assets/curriculum/Curriculo_Murilo_Weiss_Kist_Ultra_Profissional.pdf?url', () => ({ default: '/cv.pdf' }))

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('Hero', () => {
  it('renders full name', () => {
    render(<Hero />, { wrapper: Wrapper })
    expect(screen.getByText(/murillo/i)).toBeInTheDocument()
    expect(screen.getByText(/w\. kist/i)).toBeInTheDocument()
  })

  it('CV button links to correct PDF', () => {
    render(<Hero />, { wrapper: Wrapper })
    const cvLink = screen.getByRole('link', { name: /baixar currículo|download resume/i })
    expect(cvLink).toHaveAttribute('download')
  })

  it('renders profile photo', () => {
    render(<Hero />, { wrapper: Wrapper })
    const img = screen.getByAltText(/murillo w\. kist/i)
    expect(img).toBeInTheDocument()
  })
})
