import { ReactElement, useContext, useState, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth"
import { AppContext } from "../App"
import Providers from "./Providers"

export default function SignIn(): ReactElement {
  const { firebase } = useContext(AppContext)
  const [user] = useAuthState(firebase.auth())
  const [error, setError] = useState("")
  const [loading, setloading] = useState(false)

  const email : any = useRef(null)
  const password : any= useRef(null)


  async function handleSubmit (e: any) {
    e.preventDefault()
    setloading(true)
    try {
      await firebase.auth().signInWithEmailAndPassword(email.current.value, password.current.value)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
    setloading(false)
  }

  if (!user) {
    return (
      <div>
        <div className="signin">
          <h2>Sign in</h2>
          {error &&
            <div className="s-error">{error}</div>
          }
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label><br />
            <input type="email" name="email" id="email" ref={email} required/><br />
            <label htmlFor="password">Password</label><br />
            <input type="password" name="password" id="password" ref={password} required/><br />
            <input type="submit" value="Sign in" disabled={loading}/>
          </form>
          <Link to="/forgotpassword">Forgot your password?</Link>
          Don't have an account?<br />
          <Link to="/signup">Sign up</Link>
        </div>
        <Providers />
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}
