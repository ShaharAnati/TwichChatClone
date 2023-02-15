import React from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ChatRoom from "./ChatRoom/ChatRoom";

import Login from './Login/Login'

const App: React.FC = (props): JSX.Element => {

    const CHATROOM_URI = '/chatRoom'
    const [userName, setUsername] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    const onLogin = (userId: string, userName: string)  => {
        setUserId(userId);
        setUsername(userName);
    }

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login navigateTo={CHATROOM_URI} postLoginFunc={onLogin}/>}>

                </Route>
                <Route path={CHATROOM_URI} element=
                {
                    userName 
                        ? <ChatRoom currentUser={{id: userId, name: userName}}/>
                        : <Navigate to='/' replace/>
                }>
                    
                </Route>
            </Routes>
        </Router>
    )
}

export default App;