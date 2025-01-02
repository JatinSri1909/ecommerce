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
          <div className={classes.footerLeft}>
            <Link href="/" className={classes.logoLink}>
              <Image src="/logo-black.svg" alt="logo" width={170} height={50} />
            </Link>
            <p className={classes.copyright}>{footer?.copyright}</p>
          </div>

          <div className={classes.footerRight}>
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
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
