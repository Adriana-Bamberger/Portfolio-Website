import InterestCard from './InterestCard';
import { InterestsData } from './InterestsData';

export default function InterestsBox() {
	return (
		<div className="mx-auto my-5 px-4 md:px-6 lg:px-8">
			<div
				data-aos="fade-up"
				className="columns-1 gap-4 sm:columns-2 lg:columns-4"
			>
				{InterestsData.map((interest, index) => (
					<InterestCard key={index} interest={interest} index={index} />
				))}
			</div>
		</div>
	);
}
