// src/components/SectionLabel.tsx
// Section eyebrow written as an API request, continuing the hero's API console metaphor.
export function SectionLabel({ path }: { path: string }) {
  return (
    <p className="section-label">
      <span className="api-method">GET</span>
      {path}
    </p>
  )
}
