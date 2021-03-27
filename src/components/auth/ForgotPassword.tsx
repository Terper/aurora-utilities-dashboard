import React, { ReactElement, useContext, useRef, useState } from 'react'
import { AppContext } from "../App"
import { Link } from 'react-router-dom'


export default function ForgotPassword(): ReactElement {
  const { firebase } = useContext(AppContext)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  const email: any = useRef(null)

  const handleSubmitEmail = (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      firebase.auth().sendPasswordResetEmail(email.current.value)
      setLoading(false)
      setDone(true)
    } catch (error) {
      console.log(error)
      setError(error.message)
      setLoading(false)
    }
  }

  if (!done) {
    return (
      <div>
        <h2>Reset password</h2>
        {error &&
          <div className="error">{error}</div>
        }
        <form onSubmit={handleSubmitEmail}>
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email" id="email" ref={email}/>
          <input type="submit" value="Send email" disabled={loading}/>
        </form>
        <Link to="signin">Return to Sign in</Link>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Reset password</h2>
        Check your inbox for further instructions
        <button onClick={(() => setDone(false))}>Try again</button>
        <Link to="signin">Return to Sign in</Link>
      </div>
    )
  }
}
