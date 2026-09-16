import { forwardRef } from 'react'
import { motion } from 'framer-motion'

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

  const activate = (e) => {
    if (disabled) return
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
    </Comp>
  )
})

export default InteractiveObject
