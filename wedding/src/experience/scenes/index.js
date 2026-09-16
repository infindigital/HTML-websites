import Opening from './Opening.jsx'
import CoupleReveal from './CoupleReveal.jsx'
import PatternReveal from './PatternReveal.jsx'
import Story from './Story.jsx'
import Discovery from './Discovery.jsx'
import Family from './Family.jsx'
import Ceremony from './Ceremony.jsx'
import Verse from './Verse.jsx'
import Events from './Events.jsx'
import CoupleInteraction from './CoupleInteraction.jsx'
import Countdown from './Countdown.jsx'
import Venue from './Venue.jsx'
import Rsvp from './Rsvp.jsx'
import Closing from './Closing.jsx'

// Scene type → component. Each config's `scenes` array references these
// keys, so the per-religion arc is data, not code.
export const SCENES = {
  opening: Opening,
  coupleReveal: CoupleReveal,
  pattern: PatternReveal,
  story: Story,
  discovery: Discovery,
  family: Family,
  ceremony: Ceremony,
  verse: Verse,
  events: Events,
  coupleInteraction: CoupleInteraction,
  countdown: Countdown,
  venue: Venue,
  rsvp: Rsvp,
  closing: Closing,
}
