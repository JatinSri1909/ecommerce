'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink 
            key={i} 
            {...link} 
            appearance="none" 
            className={classes.navLink}
            data-active={pathname === link.url}
          />
        )
      })}
      <Link 
        href="/about" 
        className={classes.navLink}
        data-active={pathname === '/about'}
      >
        About
      </Link>
      <Link 
        href="/contact" 
        className={classes.navLink}
        data-active={pathname === '/contact'}
      >
        Contact
      </Link>
      {user && (
        <Link 
          href="/account" 
          className={classes.navLink}
          data-active={pathname === '/account'}
        >
          Account
        </Link>
      )}
      {!user && (
        <Button
          el="link"
          href="/login"
          label="Login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
          className={classes.loginBtn}
        />
      )}
      {user && <CartLink className={classes.cartLink} />}
    </nav>
  )
}
