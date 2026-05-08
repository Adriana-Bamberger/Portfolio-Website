import { InterestsData } from './InterestsData'

export default function InterestsBox() {
  return (
    <div className="mx-auto my-5 px-4 md:px-6 lg:px-8">
      <div
        data-aos="fade-up"
        className="bg-white bg-opacity-10 border border-white border-opacity-0 rounded-custom backdrop-blur-sm p-6 shadow-md text-center mb-6"
      >
        <h2 className="text-2xl font-bold">Interests</h2>
      </div>
      <div
        data-aos="fade-up"
        className="columns-1 sm:columns-2 lg:columns-3 gap-6"
      >
        {InterestsData.map((interest, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 border border-white border-opacity-0 rounded-custom backdrop-blur-sm p-6 shadow-md mb-6 break-inside-avoid hover:shadow-lg transition-shadow"
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
        ))}
      </div>
    </div>
  )
}
