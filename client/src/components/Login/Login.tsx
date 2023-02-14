import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Login.css";

interface LoginScreenProps {
    navigateTo: string;
    postLoginFunc?: (username: string) => void
}

const Login: React.FC<LoginScreenProps> = (props): JSX.Element => {
    const { navigateTo, postLoginFunc } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState<string>('')

    const onLogin = () => {
        postLoginFunc(username);
        navigate(navigateTo, { replace: true });
    }

    return (
        <div className="page-container">
            <div className="login-container">
                <div>
                    <div className="input-title">Please Enter Your Username:</div>
                    <TextField
                        id="username"
                        name="name"
                        label="Username"
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={username}
                        onChange={(newName) => setUsername(newName.target.value)}
                    />
                </div>
                <Button 
                    type='submit'
                    color='primary'
                    variant="contained"
                    className={'button-style'}
                    onClick={onLogin}
                    fullWidth
                >
                    Sign in
                </Button>
            </div>
        </div>
    )
}

export default Login;