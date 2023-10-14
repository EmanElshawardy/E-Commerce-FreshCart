import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate} from 'react-router-dom'

function ProtectedRoute({children}) {
const {userIsLoggedIn}=useContext(AuthContext)


if(userIsLoggedIn){
return children
}else{
   return <Navigate to={'/login'}/>
}

 
}

export default ProtectedRoute