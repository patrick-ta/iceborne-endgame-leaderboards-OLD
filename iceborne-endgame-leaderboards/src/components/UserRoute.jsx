import { Navigate } from "react-router-dom"

const UserRoute = ({children, user}) => {
    if (user) {
        return children;
    }
    else {
        return <Navigate to="/unauthorized" />;
    }
}

export default UserRoute;