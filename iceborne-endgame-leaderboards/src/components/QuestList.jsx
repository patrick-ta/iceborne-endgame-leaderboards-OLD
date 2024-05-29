import { useEffect, useState } from "react";
import { db } from "../firebase"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';

function QuestList() {
    const [quests, setQuests] = useState([]);

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

    console.log(quests);

    return (
        <>
        <h1>Quests</h1>
        <ul>
            {quests.map((item, index) => (
                <li key={index}>
                    <Link to={`/quest/${item.questNameParam}`}>{item.questName}</Link>
                </li>
            ))}
        </ul>
        </>
    )
}

export default QuestList;