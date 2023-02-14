import React from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from './Login/Login'

const App: React.FC = (props): JSX.Element => {

    const CHATROOM_URI = '/chatRoom'
    const [userName, setUsername] = useState<string>('');

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login navigateTo={CHATROOM_URI} postLoginFunc={setUsername}/>}>

                </Route>
                <Route path={CHATROOM_URI} element=
                {
                    userName 
                        ? <div>You're inside the chat room {userName}</div>
                        : <Navigate to='/' replace/>
                }>
                    
                </Route>
            </Routes>
        </Router>
    )
}

export default App;