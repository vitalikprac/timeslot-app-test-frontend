import React from 'react';
import classes from './SignUp.module.scss';
import { Authorization } from '../../components/Authorization/Authorization';

const SignUp = () => {
    return (
        <div className={classes.main}>
            <Authorization isSignIn={false}/>
        </div>
    );
};

export {SignUp};
