import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from "../firebase/firebase.utils";
 
class SignUp extends React.Component{

    constructor() {
        super();
        this.state = {
            displayName:'',
            email:'',
            password: '',
            confirmPassword: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
    
        const { displayName, email, password, confirmPassword } = this.state;
    
        if (password !== confirmPassword) {
          alert("passwords don't match");
          return;
        }
    
        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
    
          await createUserProfileDocument(user, { displayName });
    
          this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        } catch (error) {
          console.error(error);
        }
      };

    handleChange = event =>{

        const{name, value} = event.target;

        this.setState({
            [name] : value
        })
    }

    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className="sign-up"> 
                <h2>I dont have an account</h2>
                <span> sign up with your email and password </span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    
                    <FormInput
                    type="text"
                    value={displayName}
                    name="displayName"
                    onChange={this.handleChange}
                    label="Display Name"
                    required
                   />
                   <FormInput
                    type="email"
                    value={email}
                    name="email"
                    onChange={this.handleChange}
                    label="email"
                    required
                   />
                   <FormInput
                    type="password"
                    value={password}
                    name="password"
                    onChange={this.handleChange}
                    label="password"
                    required
                   />
                   <FormInput
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={this.handleChange}
                    label="confirm password"
                    required
                   />
                   <CustomButton type="submit">SIGN UP</CustomButton>

                </form>

            </div>

        )
    }


}

export default SignUp;


