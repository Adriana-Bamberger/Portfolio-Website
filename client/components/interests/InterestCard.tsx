import { Interest } from '../Types'

export default function InterestCard({ interest, index }: { interest: Interest; index: number }) {
  const baseCard =
    'bg-white bg-opacity-10 border border-white border-opacity-0 rounded-custom backdrop-blur-sm shadow-md mb-6 break-inside-avoid hover:shadow-lg transition-shadow'

  // Quote over image
  if (interest.image && interest.quote) {
    return (
      <div
        data-aos="fade-up"
        key={index}
        className="relative overflow-hidden rounded-custom shadow-md mb-6 break-inside-avoid hover:shadow-lg transition-shadow"
      >
        <img
          src={interest.image}
          alt={interest.title || 'Interest'}
          className="w-full object-cover block"
          style={{
            height: interest.imageSize || '18rem',
            objectPosition: interest.imagePosition || 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <blockquote className="border-l-4 border-white pl-4 text-white font-bold text-lg leading-snug">
            {interest.quote}
          </blockquote>
        </div>
      </div>
    )
  }

  // Image only
  if (interest.image) {
    return (
      <div
        data-aos="fade-up"
        key={index}
        className="overflow-hidden rounded-custom shadow-md mb-6 break-inside-avoid hover:shadow-lg transition-shadow"
      >
        <img
          src={interest.image}
          alt={interest.title || 'Interest'}
          className="w-full object-cover block"
          style={{
            height: interest.imageSize || '18rem',
            objectPosition: interest.imagePosition || 'center',
          }}
        />
      </div>
    )
  }

  // Title only, large centered heading
  if (interest.title && !interest.name && !interest.content) {
    return (
      <div
        data-aos="fade-up"
        key={index}
        className={`${baseCard} p-8 flex items-start`}
      >
        <h3 className="text-3xl font-bold text-left underline underline-offset-4 decoration-1">{interest.title}</h3>
      </div>
    )
  }

  // Default, name and content
  return (
    <div
      data-aos="fade-up"
      key={index}
      className={`${baseCard} p-6`}
    >
      <h3 className="text-lg font-bold mb-2">{interest.name}</h3>
      <p className="text-sm">
        {interest.content}
        {interest.link && (
          <a
            href={interest.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 underline ml-2"
          >
            {interest.link}
          </a>
        )}
      </p>
    </div>
  )
}
