import React, { useState } from 'react';
import { ArchiveIcon, ArrowRightIcon } from '@primer/octicons-react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
    }

    const clearForm = () => {
        setPassword('')
        setUserName('')
        setError('')
    }

    const submit = () => {
        debugger
        setError('')
        if (userName.length < 3) {
            setError('username is required !')
            return;
        }
        axios.post('http://127.0.0.1:5000/login', { userName, password })
            .then((data) => {
                if (data.data) {
                    history.push('/home')
                } else {
                    setError('Wrong Password !')
                }
            })
    }

    const content = (
        <div className="container">
            <div className="row"  >
                <h4>Login</h4>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="userName">username</label>
                    <input id="I1" type="text" id="userName" className="form-control" value={userName} onChange={handleUserNameChange}></input>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label id="I2" htmlFor="password">password</label>
                    <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange}></input>
                </div>
            </div>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6">
                    <button id="B1" style={{ width: '100%' }} type="button" className="btn btn-primary" onClick={submit}>Login</button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6">
                    <button id="B2" style={{ width: '100%' }} type="button" className="btn btn-danger" onClick={clearForm} >Clear <ArchiveIcon size={16} /> </button>
                </div>
            </div>
            <div className="row" style={{ marginTop: '20px', textAlign: 'center', color: 'blue', cursor: 'pointer' }}>
                <div className="col-md-6">
                    <Link to="/signUp">SignUp<ArrowRightIcon size={16} /></Link>
                </div>
            </div>
            {error.length > 0 && <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6">
                    <div className="alert alert-warning" role="alert">
                        {error}
                    </div>
                </div>
            </div>}



        </div>

    )

    return content;

}

export default Login
