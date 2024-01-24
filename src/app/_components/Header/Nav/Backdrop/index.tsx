'use client'

import Link from 'next/link'

import { Header as HeaderType } from '../../../../../payload/payload-types'
import { useAuth } from '../../../../_providers/Auth'

import classes from './index.module.scss'

interface BackDropProps {
  onClick: () => void
  active: string
}

const BackDrop: React.FC<BackDropProps> = ({ onClick, active }) => {
  const { user } = useAuth()

  return (
    <div className={`${classes.backdrop} ${active === 'open' ? classes.open : classes.close}`}>
      <div className={classes.links}>
        <Link href={'/'} className={classes.link1} onClick={onClick}>
          Home
        </Link>

        <Link href={'/products'} className={classes.link2} onClick={onClick}>
          Shop
        </Link>

        <Link href={'/cart'} className={classes.link3} onClick={onClick}>
          Cart
        </Link>
        {user ? (
          <Link href={'/account'} className={classes.link3} onClick={onClick}>
            Profile
          </Link>
        ) : (
          <Link href={'/login'} className={classes.link3} onClick={onClick}>
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default BackDrop
