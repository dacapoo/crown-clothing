import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sigh-in-sign-out/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './components/firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
 

class App extends React.Component {

  
 
   unsubscribeFromAuth = null;

  componentDidMount(){ 
    
    const {setTheCurrentUser} = this.props;

    this.unsubscribeFromAuth =  auth.onAuthStateChanged( async userAuth => {

      if(userAuth){

        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot( snapeShot => {
        this.props.setTheCurrentUser({
             id:snapeShot.id,
              ...snapeShot.data()
            });
           } 
        )
        
      } 

      setTheCurrentUser(userAuth);
       
    })

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
  return(
    <div>
      <Header />
      <Switch> 

        <Route  exact path="/" component={HomePage}/>
        <Route exact path="/signin"  render={ () => this.props.currentUser ? (<Redirect to="/"/> ) : ( <SignInAndSignUpPage/> )} />
        <Route exact  path="/shop" component={ShopPage}/>
 
      </Switch>
    
   </div>

  )}
 
};

const mapStateToProps = ({user}) => 
 ({currentUser : user.currentUser})
;

const mapDispatchToProps = dispatch => ({
  setTheCurrentUser : user => dispatch(setCurrentUser(user))

});

export default connect(mapStateToProps,mapDispatchToProps)(App);
