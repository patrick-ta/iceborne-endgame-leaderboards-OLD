import { useEffect, useState } from "react";
import { db } from "../firebase"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import "./QuestList.css"

function QuestList() {
    const [quests, setQuests] = useState([]);
    const navigate = useNavigate();

    const handleClick = (questNameParam) => {
        // Programmatically navigate to the desired route
        navigate(`/quests/${questNameParam}`);
    };

    useEffect(() => {
        const getQuests = async () => {
            const q = query(collection(db, "quests"), orderBy("questOrder"));
            const querySnapshot = await getDocs(q);
            let tempQuests = [];
            querySnapshot.forEach((doc) => {
                tempQuests.push(doc.data());
            });
            setQuests(tempQuests);
        }

        getQuests();
    }, []);

    return (
        <>
        <h1 className="title">Quests</h1>
        
            {quests.map((item, index) => (
                <div key={index} className="quest" onClick={() => handleClick(item.questNameParam)}>
                    <img src={item.image} className="questImage"/>
                    <div className="link">
                        <h2>{item.questName}</h2>
                        <h1>{item.monster}</h1>
                    </div>
                </div>
            ))}
        
        </>
    )
}

export default QuestList;