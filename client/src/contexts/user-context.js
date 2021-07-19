import React, { useState, useEffect } from 'react';

const API_SERVER_BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;

const AuthContext = React.createContext({
    isLoading: false,
    user: {},
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { },
    onRegister: (name, email, password) => { }
})

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')));
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }, [])

    const loginHandler = async (email, password) => {

        try {
            const requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email, "password": password })
            };

            const response =
                await fetch(`${API_SERVER_BASE_URL}/api/user/login`,
                    requestOptions);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            setIsLoggedIn(true);

            return { message: "Login successful", ok: true };
        } catch (err) {
            return { message: err.message, ok: false };
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setIsLoading(false);
    };

    const registerationHandler = async (name, email, password) => {

        try {
            const requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password
                })
            };

            const response =
                await fetch(`${API_SERVER_BASE_URL}/api/user/register`,
                    requestOptions);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            return {
                message: `Registration successful.
                An email has been sent to your inbox. 
            Please verify your email to proceed.`, ok: true
            };
        } catch (err) {
            return { message: err.message, ok: false };
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoading: isLoading,
            user: user,
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler,
            onRegister: registerationHandler
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;