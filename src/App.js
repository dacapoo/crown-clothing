import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component'

function App() {

  const HatPage = () => (
    <div>
      <h1>hats page</h1>
    </div>
  )

  return(
    <div>
      <Switch>

        <Route exact path="/" component={HomePage}/>

        <Route path="/shop/hats" component={HatPage}/>
        <Route path="/shop/jackets" component={HatPage}/>
        <Route path="/shop/sneakers" component={HatPage}/>
        <Route path="/shop/womens" component={HatPage}/>
        <Route path="/shop/womens" component={HatPage}/>
 
      </Switch>
    
   </div>

  )
 
}

export default App;
