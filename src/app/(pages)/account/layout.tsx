'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Gutter } from '../../_components/Gutter'
import { profileNavItems } from '../../constants'
import { UserInfo } from './UserInfo'

import classes from './index.module.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className={classes.container}>
      <Gutter>
        <h3>My Profile</h3>
        <div className={classes.account}>
          <div className={classes.nav}>
            <UserInfo />

            <ul>
              {profileNavItems.map(item => {
                const isActive = pathname === item.url
                return (
                  <li key={item.title}>
                    <Link 
                      href={item.url} 
                      className={classes.navItem}
                      data-active={isActive}
                    >
                      <Image 
                        src={item.icon} 
                        alt={item.title} 
                        width={24} 
                        height={24}
                      />
                      <p>{item.title}</p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </Gutter>
    </div>
  )
}
