import { useEffect, useState } from "react";
import { db } from "../firebase"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import SpeedrunTable from "../components/SpeedrunTable";

function Quest() {
    const [quest, setQuest] = useState({});
    const { questNameParam } = useParams()

    useEffect(() => {
        const getQuest = async () => {
            const q = query(collection(db, "quests"), where("questNameParam", "==", questNameParam));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setQuest(doc.data());
            });
        }

        getQuest()
    }, []);

    return (
        <>
        <h1>{quest.questName}</h1>
        <SpeedrunTable questName={quest.questName}/> 
        </>
    )
}

export default Quest;