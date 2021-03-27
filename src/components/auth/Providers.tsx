import { ReactElement, useContext } from 'react'
import { AppContext } from '../App'


export default function Providers(): ReactElement {
  const { firebase } = useContext(AppContext)
  
  const signInWithGoogle = async () => {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}
