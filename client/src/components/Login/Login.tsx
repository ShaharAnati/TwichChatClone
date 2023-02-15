import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4} from 'uuid';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Login.css";

interface LoginScreenProps {
    navigateTo: string;
    postLoginFunc?: (userId: string, username: string) => void
}

const Login: React.FC<LoginScreenProps> = (props): JSX.Element => {
    const { navigateTo, postLoginFunc } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        setUserId(uuidv4());
    }, [])

    const onLogin = () => {
        postLoginFunc(userId, username);
        navigate(navigateTo, { replace: true });
    }

    return (
        <div className="login-page-container">
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