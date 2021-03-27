import { ReactElement, useContext } from 'react'
import { AppContext } from "../App"


export default function SignOut(): ReactElement {
  const { firebase } = useContext(AppContext)

  return (
    <>
    {firebase.auth().currentUser &&
      <button onClick={() => firebase.auth().signOut()}>Sign out</button>
    }
    </>
  )
}
