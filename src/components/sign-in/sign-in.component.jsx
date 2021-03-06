import React from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { auth ,signInWithGoogle} from '../firebase/firebase.utils'
 

export class SignIn extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email :'',
            password: ''
        }
    }

    handleChange = event =>{
        const { value, name } = event.target;
        this.setState({ [name]: value });
     }

    handleSubmit = async event => {
        event.preventDefault();
         const {email,password} = this.state;
         try{
             await auth.signInWithEmailAndPassword(email, password);
             this.setState({
                 email :'',
                password: ''
                }
             )
         } catch(error){
             console.log(error)
        }
    }
    

    render() {
        return (
             <div className="sign-in">
                <h2>I already have an account</h2>
                <span> Sign in with your Email and password </span>
                <form onSubmit= {this.handleSubmit} > 

                    <FormInput 
                    name="email"
                     type="email" 
                     value= {this.state.email} 
                     required
                     handleChange={this.handleChange}
                     label="email"
                     />
 
                    <FormInput 
                    name="password" 
                    type="password"
                     value= {this.state.password} 
                     required 
                     handleChange={this.handleChange}
                     label="password"
                     />

                     <div className="buttons">

                     

                      <CustomButton type="submit" > Sign In </CustomButton>

                      <CustomButton IsGoogleSignIn onClick={signInWithGoogle} >Sign in with Google</CustomButton>
                      </div>
                </form>
                
            </div>
         )
    }
}

export default SignIn;
