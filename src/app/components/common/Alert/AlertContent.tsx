interface ContentProps {
  title?: string
  description?: string
}

const Content: React.FC<ContentProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-start min-w-80 max-w-96">
      <h2 className="font-medium text-brand-300">{title}</h2>
      <p className="text-sm text-brand-300">{description}</p>
    </div>
  )
}

export default Content
