import { useCallback, useEffect, useState } from 'react'
import { useAudio } from './context/AudioContext.jsx'
import FallingLeaves from './components/ui/FallingLeaves.jsx'
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

  // The invitation stays sealed until the wax seal is tapped. Until then the
  // rest of the sections are not rendered and the page cannot be scrolled —
  // on every device you must open the seal first.
  const [opened, setOpened] = useState(false)

  // Lock the page scroll while the seal is still closed.
  useEffect(() => {
    if (opened) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [opened])

  // Fired when the wax seal is tapped: start the music (this is the first user
  // gesture, so the browser allows it), let the seal-break animation play, then
  // reveal the invitation — starting with the bride & groom section — at the top
  // of the page on every device.
  const handleOpen = useCallback(() => {
    play()
    window.setTimeout(() => {
      setOpened(true)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 1500)
  }, [play])

  return (
    <>
      <FallingLeaves />

      {/* fixed persistent controls */}
      <ThemeToggle />
      {opened && <MusicButton />}

      <main className="app">
        {!opened ? (
          <SealIntro onOpen={handleOpen} />
        ) : (
          <>
            <MainInvitation id="invitation" />
            <FamilyInvitation />
            <ScratchCard />
            <Countdown />
            <Venue />
            <Verse />
            <Closing />
          </>
        )}
      </main>
    </>
  )
}
