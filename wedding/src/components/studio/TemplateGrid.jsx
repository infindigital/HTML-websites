import { useState } from 'react'
import TemplateCard from './TemplateCard.jsx'
import PreviewModal from './PreviewModal.jsx'

// A responsive grid of template cards that owns the shared preview modal.
export default function TemplateGrid({ templates }) {
  const [preview, setPreview] = useState(null)

  if (!templates?.length) {
    return <p className="grid__empty">No invitations match your search just yet.</p>
  }

  return (
    <>
      <div className="grid grid--templates">
        {templates.map((t) => (
          <TemplateCard key={t.id} template={t} onPreview={setPreview} />
        ))}
      </div>
      {preview && <PreviewModal template={preview} onClose={() => setPreview(null)} />}
    </>
  )
}
