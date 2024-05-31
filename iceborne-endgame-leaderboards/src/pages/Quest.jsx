import { useEffect, useState } from "react";
import { db } from "../firebase"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import SpeedrunTable from "../components/SpeedrunTable";
import Header from "../components/Header";

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
        {/* <Header></Header> */}
        <SpeedrunTable questName={quest.questName}/> 
        </>
    )
}

export default Quest;