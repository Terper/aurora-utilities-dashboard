import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom"
import { config } from "../config"

import firebaseImport from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

import { useAuthState } from "react-firebase-hooks/auth"

import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import ForgotPassword from './auth/ForgotPassword'
import Dashboard from './dashboard/Dashboard'

const firebase = firebaseImport

firebase.initializeApp(config)

export const AppContext = React.createContext({ firebase: firebase })

function App() {
  const [user] = useAuthState(firebase.auth())
  console.log(user)

  return (
    <AppContext.Provider value={{firebase: firebase}}>
      <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
