import React, { ReactElement } from 'react'
import SignOut from './SignOut'

interface Props {
  
}

export default function Header({}: Props): ReactElement {
  return (
    <header>
      <h1>Dashboard</h1>
      <SignOut />
    </header>
  )
}
