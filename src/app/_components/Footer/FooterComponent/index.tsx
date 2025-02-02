'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Footer, Media } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../constants'
import { Button } from '../../Button'

import classes from './index.module.scss'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const pathname = usePathname()
  const navItems = footer?.navItems || []

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
      <div className={classes.footer}>
        <div className={classes.footerContent}>
          <div className={classes.footerMain}>
            <div className={classes.footerLeft}>
              <Link href="/" className={classes.logoLink}>
                <Image src="/logo-black.svg" alt="logo" width={170} height={50} />
              </Link>
              <p className={classes.description}>
                Your one-stop shop for quality products and exceptional service.
              </p>
              <div className={classes.socialLinks}>
                {navItems.map(item => {
                  const icon = item?.link?.icon as Media

                  return (
                    <Button
                      key={item.link.label}
                      el="link"
                      href={item.link.url}
                      newTab={true}
                      className={classes.socialLinkItem}
                    >
                      <Image
                        src={icon?.url}
                        alt={item.link.label}
                        width={24}
                        height={24}
                        className={classes.socialIcon}
                      />
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className={classes.footerNavigation}>
              <div className={classes.navSection}>
                <h5>Quick Links</h5>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/products">Products</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </div>

              <div className={classes.navSection}>
                <h5>Categories</h5>
                <ul>
                  <li><Link href="/products?category=electronics">Electronics</Link></li>
                  <li><Link href="/products?category=fashion">Fashion</Link></li>
                  <li><Link href="/products?category=home">Home & Living</Link></li>
                  <li><Link href="/products?category=accessories">Accessories</Link></li>
                </ul>
              </div>

              <div className={classes.navSection}>
                <h5>Help & Support</h5>
                <ul>
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/shipping">Shipping Info</Link></li>
                  <li><Link href="/returns">Returns</Link></li>
                  <li><Link href="/track-order">Track Order</Link></li>
                </ul>
              </div>

              <div className={classes.navSection}>
                <h5>Legal</h5>
                <ul>
                  <li><Link href="/secure-payment">Secure Payment</Link></li>
                  <li><Link href="/terms">Terms of Service</Link></li>
                  <li><Link href="/refund-policy">Refund Policy</Link></li>
                  <li><Link href="/legal-notice">Legal Notice</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className={classes.footerBottom}>
            <p className={classes.copyright}>{footer?.copyright}</p>
            <p className={classes.attribution}>Made with ❤️ by Jatin</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
