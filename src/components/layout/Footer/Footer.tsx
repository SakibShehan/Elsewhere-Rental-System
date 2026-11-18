import facebookIcon from '@/assets/icons/facebook.svg'
import instagramIcon from '@/assets/icons/instagram.svg'
import logoStar from '@/assets/icons/hill-landscape.svg'
import pinterestIcon from '@/assets/icons/pinterest.svg'
import youtubeIcon from '@/assets/icons/youtube.svg'
import styles from './Footer.module.css'

// Social icons as a small list, so the JSX stays short
const socials = [
  { label: 'Instagram', icon: instagramIcon },
  { label: 'Pinterest', icon: pinterestIcon },
  { label: 'Facebook', icon: facebookIcon },
  { label: 'YouTube', icon: youtubeIcon },
]

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <img src={logoStar} alt="" className={styles.logoIcon} />
          <span className={styles.logoText}>Elsewhere</span>
        </a>

        <span className={styles.divider} aria-hidden="true" />

        <p className={styles.tagline}>Get inspired. Delivered to your inbox.</p>

        {/* Stops the page from reloading when you press Subscribe */}
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

        <ul className={styles.social}>
          {socials.map((social) => (
            <li key={social.label}>
              <a href="#" className={styles.socialLink} aria-label={social.label}>
                <img src={social.icon} alt="" className={styles.socialIcon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer