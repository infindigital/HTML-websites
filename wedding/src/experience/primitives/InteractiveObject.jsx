import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// =====================================================================
//  InteractiveObject — one accessible, tappable object in the scene.
//  ---------------------------------------------------------------------
//  Every diya, lantern, ring, door, flower and envelope is one of these.
//  Works with mouse, touch AND keyboard; never depends on hover alone.
//  Exposes hover / pressed / active states for CSS, and carries an
//  aria-label so the object itself is the button (no big generic buttons).
// =====================================================================
const InteractiveObject = forwardRef(function InteractiveObject(
  {
    as = 'button',
    label,
    onActivate,
    className = '',
    children,
    hoverScale = 1.05,
    tapScale = 0.94,
    disabled = false,
    active = false,
    style,
    ...rest
  },
  ref,
) {
  const Comp = motion[as] || motion.button
  const isButton = as === 'button'
  const [pop, setPop] = useState(0)

  const activate = (e) => {
    if (disabled) return
    setPop((n) => n + 1) // trigger a fresh ripple pop
    onActivate?.(e)
  }

  return (
    <Comp
      ref={ref}
      type={isButton ? 'button' : undefined}
      role={isButton ? undefined : 'button'}
      tabIndex={disabled ? -1 : 0}
      className={`iobj${active ? ' is-active' : ''} ${className}`}
      aria-label={label}
      aria-pressed={active || undefined}
      aria-disabled={disabled || undefined}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault()
          activate(e)
        }
      }}
      whileHover={disabled ? undefined : { scale: hoverScale }}
      whileTap={disabled ? undefined : { scale: tapScale }}
      style={style}
      {...rest}
    >
      {children}
      <AnimatePresence>
        {pop > 0 && (
          <motion.span
            key={pop}
            className="iobj__pop"
            aria-hidden="true"
            initial={{ opacity: 0.55, scale: 0.35 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </Comp>
  )
})

export default InteractiveObject
