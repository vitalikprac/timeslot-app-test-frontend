import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from 'react';
import classes from './Authorization.module.scss'
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import {useAuth} from "../../hooks/useAuth";
import { Link, useHistory } from 'react-router-dom';
import {TokenContext} from "../../TokenContext";


interface AuthorizationProp{
    isSignIn: boolean
}

const Authorization = ({isSignIn}:AuthorizationProp) => {

    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    const {setToken} = useContext(TokenContext);

    // Passing setName and setPassword to clear input after fetch
    const [loading,error,data,authAsync] = useAuth(setName,setPassword);

    useEffect(()=>{
        if (data.token && setToken) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            history.push('/');
        }
        return ()=>{}
    },[data,history,setToken]);

    const onSubmitForm = (e:FormEvent)=>{
        e.preventDefault();
        authAsync(name,password,isSignIn);
    }

    const onChangeName=(e:ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value);
    }

    const onChangePassword=(e:ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
    }

    return (
        <Form onSubmit={onSubmitForm} className={classes.main}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    disabled={loading}
                    onChange={onChangeName}
                    maxLength={15}
                    required={true}
                    value={name}
                    type="text"
                    placeholder="Enter your username"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    disabled={loading}
                    onChange={onChangePassword}
                    required={true}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className={classes.footer}>
                <Button disabled={loading}
                        type="submit"
                        variant="primary"
                        >
                    {isSignIn?'Sign In':'Sign Up'}
                </Button>
                {loading && <Spinner className={classes.spinner} animation="border" variant="success" />}
            </div>
            {isSignIn?
                <div className={classes.link}>Don't have an account? <Link to="/signUp">Sign Up</Link></div>:
                <div className={classes.link}>Already have an account? <Link to="/signIn">Sign In</Link></div>
            }
        </Form>
    );
};

export {Authorization};

