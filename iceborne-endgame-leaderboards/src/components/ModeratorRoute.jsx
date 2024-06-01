import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const UserRoute = ({children, user}) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const docRef = collection(db, "users");
                const q = query(docRef, where("uid", "==", user.uid));
                const querySnapshot = await getDocs(q);
                
                let role = "";
                querySnapshot.forEach((doc) => {
                    role = doc.data().role;
                });
                setUserRole(role);
            } catch (error) {
                console.error("Error retrieving user role:", error);
                setUserRole("");
            }
        };

        if (user) {
            fetchUserRole();
        }
    }, []);

    if (!user) {
        return <Navigate to="/quests" />;
    }

    if (userRole === null) {
        return <h2>Loading...</h2>
    }

    if (userRole !== "Moderator") {
        return <Navigate to="/quests" />;
    }

    return children;
}

export default UserRoute;