import { ReactElement, useContext } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth"
import { AppContext } from "../App"
import Header from './Header'
import Sidebar from './SideBar'
import Home from './Home'
import Posts from './Posts'


export default function Dashboard(): ReactElement {
  const { firebase } = useContext(AppContext)
  const [user] = useAuthState(firebase.auth())

  if (user) {
    return (
      <div className="dashboard">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/posts" component={Posts} />
        </Switch>
      </div>
    )
  } else {
    return <Redirect to="/signin" />
  }

}
