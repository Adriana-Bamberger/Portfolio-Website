import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import HeaderBar from './HeaderBar'
import ExperienceBox from './ExperienceBox'
import ProjectsBox from './ProjectsBox'
import InterestsBox from './interests/InterestsBox'
import SkillsBox from './SkillsBox'
import Footer from './Footer'
import HeroBox from './HeroBox'
import GlowEffect from '../GlowEffect'

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    })
  }, [])
  return (
    <div className="bg-cover bg-fixed bg-background-small sm:bg-background-small md:bg-background-medium lg:bg-background-large xl:bg-background-extra-large 2xl:bg-background-extra-large text-white">
      <div className="font-poppins overflow-hidden m-0 p-0"></div>
      <GlowEffect />
      <HeaderBar />
      <HeroBox />
      <ProjectsBox />
      <SkillsBox />
      <InterestsBox />
      <ExperienceBox />
      <Footer />
      <div className="overflow-hidden m-0 p-0"></div>
    </div>
  )
}
