import { useRef } from 'react'
import chevronDown from '@/assets/icons/chevron-down.svg'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useToggle } from '@/hooks/useToggle'
import type { NavMenu } from '@/types/navigation'
import styles from './NavDropdown.module.css'

interface NavDropdownProps {
  menu: NavMenu
}

function NavDropdown({ menu }: NavDropdownProps) {
  const { value: isOpen, toggle, close } = useToggle()
  const containerRef = useRef<HTMLLIElement>(null)

  // Close when the user clicks anywhere outside this dropdown
  useOnClickOutside(containerRef, close)

  return (
    <li ref={containerRef} className={styles.dropdown}>
      <button
        type="button"
        className={styles.trigger}
        onClick={toggle}
        aria-expanded={isOpen}
      >
        {menu.label}
        <img
          src={chevronDown}
          alt=""
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {menu.items.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={styles.item} onClick={close}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default NavDropdown