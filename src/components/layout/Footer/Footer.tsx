import facebookIcon from '@/assets/icons/facebook.svg'
import instagramIcon from '@/assets/icons/instagram.svg'
import logoStar from '@/assets/icons/hill-landscape.svg'
import pinterestIcon from '@/assets/icons/pinterest.svg'
import youtubeIcon from '@/assets/icons/youtube.svg'
import styles from './Footer.module.css'

const socials = [
  { label: 'Instagram', icon: instagramIcon },
  { label: 'Pinterest', icon: pinterestIcon },
  { label: 'Facebook', icon: facebookIcon },
  { label: 'YouTube', icon: youtubeIcon },
]

const navLinks = [
  'HOME',
  'LIST YOUR PROPERTY',
  'WHY BOOK WITH US',
  'HOW IT WORKS',
  'TRAVEL STORIES',
  'ABOUT',
  'CONTACT',
  'FAQS',
]

const categories = [
  {
    title: 'HOTELS',
    items: [
      'The Reid Grand Hotel',
      'Holiday Inn Express Hotel',
      'Manoir Belle Plage Hotel',
      'Casa Queen Suites Hotel',
      'Rosemead Alpine Hotel',
    ],
  },
  {
    title: 'VILLAS',
    items: [
      'Kamehameha Luxury Villa',
      'Galatia Villa',
      'Villa Youlas Canggu',
      'Rouge Private Villa',
      'Gami Ubud Villa',
    ],
  },
  {
    title: 'BEACH HOUSES',
    items: [
      'El Paraíso Beach House',
      'Andalusian Sea House',
      'Seacliff Ocean House',
      'Villa Taray House',
      'Encantos De Orellana',
    ],
  },
  {
    title: 'CABINS',
    items: [
      'Flåm Retreat Cabin',
      'Jarfjord Aurora Lodge',
      'Hardanger Panorama Cabin',
      'Storhaugen Gard Cabin',
      'Lapintintti Eco Cabin',
    ],
  },
  {
    title: 'APARTMENTS',
    items: [
      'Cortina View Apartment',
      'Stay Ari Apartment',
      'SLL Urban Apartment',
      'Roundabout OSAKA Apartment',
      'Engawa Nakano Apartment',
    ],
  },
  {
    title: 'RESORTS',
    items: [
      'Ananea Maldives Resort',
      'Yash Nature Resort',
      'Emerald Faarufushi Resort',
      'Como Cocoa Resort',
      'Patina Fari Resort',
    ],
  },
]

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Top Row: Brand Logo, Newsletter Form & Socials */}
        <div className={styles.topRow}>
          <a href="/" className={styles.logo}>
            <img src={logoStar} alt="" className={styles.logoIcon} />
            <div className={styles.logoGroup}>
              <span className={styles.logoText}>Elsewhere</span>
              <span className={styles.logoSub}>VACATION RENTALS</span>
            </div>
          </a>

          <div className={styles.newsletter}>
            <p className={styles.tagline}>Get inspired. Delivered to your inbox.</p>
            <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                className={styles.input}
                placeholder="Your email address"
                aria-label="Email address"
              />
              <button type="submit" className={styles.button}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Navigation Links Bar */}
        <nav className={styles.navBar} aria-label="Footer navigation">
          {navLinks.map((link) => (
            <a key={link} href="#" className={styles.navLink}>
              {link}
            </a>
          ))}
        </nav>

        <hr className={styles.divider} />

        {/* Hero Statement */}
        <div className={styles.heroSection}>
          <h2 className={styles.heroHeading}>
            Discover handpicked hotels, villas, and vacation homes from around the world.
          </h2>
          <span className={styles.shortLine} aria-hidden="true" />
        </div>

        {/* 6-Column Directory Grid */}
        <div className={styles.directoryGrid}>
          {categories.map((category) => (
            <div key={category.title} className={styles.column}>
              <h3 className={styles.columnTitle}>{category.title}</h3>
              <ul className={styles.columnList}>
                {category.items.map((item) => (
                  <li key={item}>
                    <a href="#" className={styles.columnLink}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className={styles.divider} />

        {/* Bottom Legal, Description & Social Row */}
        <div className={styles.bottomRow}>
          <div className={styles.legalInfo}>
            <div className={styles.legalLinks}>
              <a href="#">PRIVACY POLICY</a>
              <a href="#">TERMS</a>
            </div>
            <p className={styles.description}>
              Elsewhere Vacation Rentals helps travelers discover verified vacation homes, cabins,
              beach houses, and holiday rentals from trusted sources around the world. We&apos;re
              committed to helping you find the right place to stay—securely, easily, and
              confidently.
            </p>
          </div>

          <div className={styles.bottomRight}>
            <ul className={styles.social}>
              {socials.map((social) => (
                <li key={social.label}>
                  <a href="#" className={styles.socialLink} aria-label={social.label}>
                    <img src={social.icon} alt="" className={styles.socialIcon} />
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.copyright}>© 2026 Elsewhere. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer