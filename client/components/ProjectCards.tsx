/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { projects } from './projectsData';
import { Project } from './Types';

export default function ProjectsCards() {
	return (
		<div>
			{projects.map((project: Project, index: number) => (
				<div
					key={project.id}
					data-aos="fade-up"
					className="mx-3 my-5 flex flex-col rounded-custom border border-white border-opacity-0 bg-white bg-opacity-10 p-6 backdrop-blur-sm md:p-8 lg:mx-10 lg:p-10 xl:p-12"
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
							className="w-full! rounded-lg object-contain lg:mr-6 lg:w-1/3"
							loading="lazy"
						/>
						<div className="mt-4 w-full lg:mt-0 lg:w-2/3 lg:pl-6">
							<div className="hidden lg:block">
								<h2 className="text-xl font-semibold">{project.title}</h2>
								<hr className="my-2" />
							</div>
							<p>{project.description}</p>
							<div className="mt-4 flex flex-wrap">
								{project.images &&
									project.images.map((image, idx) => (
										<img
											key={idx}
											src={image}
											alt={`${project.title} ${idx + 1}`}
											loading="lazy"
											className="mx-1 h-6 w-auto"
										/>
									))}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
