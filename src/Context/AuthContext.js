import { createContext, useState } from "react";

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    let [userIsLoggedIn, setUserIsLoggedIn] = useState(localStorage.getItem("token")?true:false)

    return <AuthContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
        {children}
    </AuthContext.Provider>
} 