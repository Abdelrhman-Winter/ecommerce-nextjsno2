'use client'

import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'
import BackDrop from './Backdrop'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])
  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      <div className={classes.navItems}>
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="none" />
        })}
        <CartLink />
        {user && (
          <Link href="/account">
            <Image src="/assets/icons/profile.svg" alt="profile" width={30} height={30} />
          </Link>
        )}
        {!user && (
          <Button
            el="link"
            href="/login"
            label="Login"
            appearance="primary"
            onClick={() => (window.location.href = '/login')}
          />
        )}
      </div>

      {isOpen ? (
        <Image
          src="/assets/icons/close.svg"
          alt="close"
          width={50}
          height={50}
          className={classes.close}
          onClick={toggleOpen}
        />
      ) : (
        <Image
          src="/assets/icons/menu.svg"
          alt="menu"
          width={50}
          height={50}
          className={classes.menu}
          onClick={toggleOpen}
        />
      )}
      <BackDrop onClick={toggleOpen} active={isOpen ? 'open' : 'close'} />
      {/* {isOpen ? <BackDrop onClick={toggleOpen} active={isOpen ? 'open' : 'close'} /> : null} */}
    </nav>
  )
}
