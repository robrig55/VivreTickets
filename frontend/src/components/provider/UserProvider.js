import React, { createContext, useState } from 'react'

export const UserContext = createContext({
    token: '',
    saveToken: () => {},
    user: '',
    role: '',
})

const UserProvider = ({ children }) => {
    const getRole = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.role
    };
  
    const getUser = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.user
    };  

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };  

    const getID = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.id
    };  

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [role, setRole] = useState(getRole());
    const [id, setID] = useState(getID());

    const saveToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setRole(userToken.role);
        setUser(userToken.user);
        setToken(userToken.token)
        setID(userToken.id);
    }


    return (
        <UserContext.Provider value={{
            id,
            token,
            saveToken,
            user,
            role,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider