import React from 'react';
import classes from './SignIn.module.scss';
import { Authorization } from '../../components/Authorization/Authorization';

const SignIn = () => {
    return (
        <div className={classes.main}>
           <Authorization isSignIn={true}/>
        </div>
    );
};

export {SignIn};
