import Hindu from './Hindu.jsx'
import Muslim from './Muslim.jsx'
import Christian from './Christian.jsx'

// Pick a religion's full motif set. Every set implements the same contract
// (SideLamp · Portal · PatternDraw · Ceremony · Spark + meta), so the scene
// components stay religion-agnostic.
const SETS = { hindu: Hindu, muslim: Muslim, christian: Christian }

export function motifsFor(religion) {
  return SETS[religion] || SETS.hindu
}

export { Hindu, Muslim, Christian }
