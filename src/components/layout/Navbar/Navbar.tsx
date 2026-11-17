import logoStar from '@/assets/icons/star.svg'
import { navMenus } from '@/data/navigation'
import NavDropdown from './NavDropdown'
import styles from './Navbar.module.css'
import NavActions from './NavActions'

function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo}>
          <img src={logoStar} alt="" className={styles.logoIcon} />
          <span className={styles.logoText}>Elsewhere</span>
        </a>

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
         <NavActions />
      </div>
    </header>
  )
}

export default Navbar