import { useRef } from 'react'
import logoStar from '@/assets/icons/star.svg'
import { navMenus } from '@/data/navigation'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useScrolled } from '@/hooks/useScrolled'
import { useToggle } from '@/hooks/useToggle'
import NavActions from './NavActions'
import NavDropdown from './NavDropdown'
import styles from './Navbar.module.css'

// The bar turns white after about one screen of scrolling: just after the hero
const afterFirstScroll = () => 10
function Navbar() {
  // Hamburger menu: open or closed
  const { value: isMenuOpen, toggle, close } = useToggle()
  const headerRef = useRef<HTMLElement>(null)

  // True once the page is scrolled past the hero
const isScrolled = useScrolled(afterFirstScroll)
  // Close the menu when the user clicks outside the navbar
  useOnClickOutside(headerRef, close)

  return (
    <header
      ref={headerRef}
      className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''} ${
        isMenuOpen ? styles.navbarOpen : ''
      }`}
    >
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <img src={logoStar} alt="" className={styles.logoIcon} />
          <span className={styles.logoText}>Elsewhere</span>
        </a>

        {/* Full menu: hidden on tablets and phones */}
        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.links}>
            {navMenus.map((menu) => (
              <NavDropdown key={menu.label} menu={menu} />
            ))}
            <li>
              <a href="#about" className={styles.link}>
                About
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.right}>
          <NavActions />

          <button
            type="button"
            className={styles.menuButton}
            onClick={toggle}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Hamburger panel: only on tablets and phones */}
      {isMenuOpen && (
        <nav id="mobile-menu" className={styles.mobileMenu} aria-label="Mobile">
          <ul>
            {navMenus.map((menu) => (
              <li key={menu.label}>
                <a href="#" className={styles.mobileLink} onClick={close}>
                  {menu.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#about" className={styles.mobileLink} onClick={close}>
                About
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar