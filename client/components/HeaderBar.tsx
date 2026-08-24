import { useState, useRef, useEffect } from 'react'
import SocialIcon from './SocialIcon'
import Github from '../public/Images/Social Icons/github-logo.png'
import Linkedin from '../public/Images/Social Icons/linkedin.png'
import Instagram from '../public/Images/Social Icons/instagram.png'
import StackOverflow from '../public/Images/Social Icons/stack-overflow.png'
import GoodReads from '../public/Images/Social Icons/goodReads.png'
import DownloadCV from '../public/Images/Social Icons/CV-Download-Icon-white.png'
import { SocialLink } from './Types'

export default function HeaderBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const socialLinks: SocialLink[] = [
    {
      href: 'https://github.com/Adriana-Bamberger',
      src: Github,
      alt: 'GitHub Icon (Black and White)',
    },
    {
      href: 'https://nz.linkedin.com/in/adriana-bamberger-a58742205',
      src: Linkedin,
      alt: 'LinkedIn Icon (Black and White)',
    },
    {
      href: 'https://www.instagram.com/adri.bamberger/?hl=en',
      src: Instagram,
      alt: 'Instagram Icon (Black and White)',
    },
    {
      href: 'https://stackoverflow.com/users/23250670/adriana-bamberger',
      src: StackOverflow,
      alt: 'Stack Overflow Icon (Black and White)',
    },
    {
      href: 'https://www.goodreads.com/user/show/166058375-adriana-bamberger',
      src: GoodReads,
      alt: 'Good Reads Icon (Black and White)',
    },
    {
      href: 'https://drive.google.com/file/d/1QOwD44nxCr2xwGKcztoMW1gDjxKf81RT/view?usp=sharing',
      src: DownloadCV,
      alt: 'Download CV',
    },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <div className="relative z-50 bg-white bg-opacity-20 border border-white border-opacity-0 rounded-custom backdrop-blur-sm mx-3 lg:mx-10 my-5 px-7 py-3 flex justify-between items-center">
      <h1 className="font-semibold text-2xl md:hidden">
        Adriana Bamberger Portfolio
      </h1>
      <h1 className="font-semibold text-2xl hidden md:block">
        Adriana Bamberger | Portfolio
      </h1>

      <div className="relative md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <img src={DownloadCV} alt="Menu" className="w-8 h-8" />
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full right-0 mt-2 bg-clr12 bg-opacity-90 backdrop-blur-md shadow-md rounded-custom p-4 flex flex-col gap-4 z-10"
          >
            {socialLinks.map((link) => (
              <SocialIcon
                key={link.href}
                href={link.href}
                src={link.src}
                alt={link.alt}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex gap-2">
        {socialLinks.map((link) => (
          <SocialIcon
            key={link.href}
            href={link.href}
            src={link.src}
            alt={link.alt}
          />
        ))}
      </div>
    </div>
  )
}
