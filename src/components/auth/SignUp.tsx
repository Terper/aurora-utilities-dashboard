import { ReactElement, useContext, useState, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth"
import { AppContext } from "../App"
import Providers from './Providers'
export default function Signup(): ReactElement {
  const { firebase } = useContext(AppContext)
  const [user] = useAuthState(firebase.auth())

  const [error, setError] = useState("")
  const [loading, setloading] = useState(false)

  const email : any = useRef(null)
  const password : any= useRef(null)
  const confirmPassword : any = useRef(null)

  async function handleSubmit (e: any) {
    e.preventDefault()
    setloading(true)
    if (password.current.value !== confirmPassword.current.value) {
      setError("Passwords do not match")
      setloading(false)
      return
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email.current.value, password.current.value)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
    setloading(false)
  }

  if (!user) {
    return (
      <div>
        <div className="signup">
        <h2>Sign up</h2>
        {error &&
          <div className="s-error">{error}</div>
        }
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email" id="email" ref={email} required/><br />
          <label htmlFor="password">Password (At least 6 characters)</label><br />
          <input type="password" name="password" id="password" ref={password} required pattern="(?=.*[0-9a-zA-Z]).{6,}" /><br />
          <label htmlFor="confirmPassword">Confirm password</label><br />
          <input type="password" name="confirmPassword" id="confirmPassword" ref={confirmPassword} required/><br />
          <input type="submit" value="Sign up" disabled={loading}/>
        </form>
      Already have an account?
      <Link to="/signin">Sign in</Link>
        </div>
        <Providers />
      </div>
    )
  } else {
    console.log(user)
    return <Redirect to="/" />
  }
}
