import { useCallback } from 'react'
import { useAudio } from './context/AudioContext.jsx'
import FallingLeaves from './components/ui/FallingLeaves.jsx'
import LanguageSwitcher from './components/ui/LanguageSwitcher.jsx'
import ThemeToggle from './components/ui/ThemeToggle.jsx'
import MusicButton from './components/ui/MusicButton.jsx'
import SealIntro from './components/sections/SealIntro.jsx'
import MainInvitation from './components/sections/MainInvitation.jsx'
import FamilyInvitation from './components/sections/FamilyInvitation.jsx'
import ScratchCard from './components/sections/ScratchCard.jsx'
import Countdown from './components/sections/Countdown.jsx'
import Venue from './components/sections/Venue.jsx'
import Verse from './components/sections/Verse.jsx'
import Closing from './components/sections/Closing.jsx'

export default function App() {
  const { play } = useAudio()

  // Fired when the wax seal is tapped: start the music (first user gesture,
  // so the browser allows it) and glide down to the invitation.
  const handleOpen = useCallback(() => {
    play()
    window.setTimeout(() => {
      document
        .getElementById('invitation')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 850)
  }, [play])

  return (
    <>
      <FallingLeaves />

      {/* fixed persistent controls */}
      <LanguageSwitcher />
      <ThemeToggle />
      <MusicButton />

      <main className="app">
        <SealIntro onOpen={handleOpen} />
        <MainInvitation id="invitation" />
        <FamilyInvitation />
        <ScratchCard />
        <Countdown />
        <Venue />
        <Verse />
        <Closing />
      </main>
    </>
  )
}
