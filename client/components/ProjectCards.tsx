/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { projects } from './projectsData'
import { Project } from './Types'

export default function ProjectsCards() {
  return (
    <div>
      {projects.map((project: Project, index: number) => (
        <div
          key={project.id}
          data-aos="fade-up"
          className="bg-white bg-opacity-10 border border-white border-opacity-0 rounded-custom backdrop-blur-sm 
                   mx-3 lg:mx-10 my-5 p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col"
        >
          <div className="lg:hidden">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <hr className="my-2" />
          </div>
          <div
            className={`flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full! object-contain lg:w-1/3 rounded-lg lg:mr-6"
              loading="lazy"
            />
            <div className="w-full lg:w-2/3 mt-4 lg:mt-0 lg:pl-6">
              <div className="hidden lg:block">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <hr className="my-2" />
              </div>
              <p>{project.description}</p>
              <div className="flex flex-wrap mt-4">
                {project.images &&
                  project.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`${project.title} ${idx + 1}`}
                      loading="lazy"
                      className="h-6 w-auto mx-1"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
