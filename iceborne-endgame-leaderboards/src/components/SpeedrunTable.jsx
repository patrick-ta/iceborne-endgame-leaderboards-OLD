import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const SpeedrunTable = ({ questName }) => { 
    const [speedruns, setSpeedruns] = useState([]);

    useEffect(() => {
        const getSpeedruns = async () => {
            if (questName) {
                const q = query(collection(db, "speedruns"), where("questName", "==", questName));
                const querySnapshot = await getDocs(q);
                const tempSpeedruns = [];
                querySnapshot.forEach((doc) => {
                    tempSpeedruns.push(doc.data());
                    console.log(doc.data());
                });
                setSpeedruns(tempSpeedruns);
            }
        };

        getSpeedruns();
    }, [questName]);
    
    return (
        <div>
            <h2>{questName}</h2>
            <table>
                <thead>
                <tr>
                    <th>Runner</th>
                    <th>Time</th>
                    <th>Weapon</th>
                    <th>Quest</th>
                    <th>Ruleset</th>
                </tr>
                </thead>

                <tbody>
                {speedruns.map((speedrun, index) => (
                    <tr key={index}>
                    <td>{speedrun.runner}</td>
                    <td>
                        <a href={speedrun.link} target="_blank" rel="noopener noreferrer">{speedrun.time}</a>
                    </td>
                    <td>{speedrun.weapon}</td>
                    <td>{speedrun.questName}</td>
                    <td>{speedrun.ruleset}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SpeedrunTable;
