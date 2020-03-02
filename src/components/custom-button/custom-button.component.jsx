import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({children,IsGoogleSignIn, ...otherProps}) =>(
<button className= {` ${IsGoogleSignIn ? 'google-sign-in' : '' }  custom-button ` } {...otherProps} >
    {children}
</button>

)

export default CustomButton;