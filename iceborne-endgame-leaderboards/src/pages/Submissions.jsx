import { useState, useEffect } from "react"
import { db } from "../firebase";
import { collection, query, getDocs, addDoc, where, deleteDoc} from "firebase/firestore";
import "./Submissions.css"

function Submissions() {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const getSubmissions = async () => {
            const q = query(collection(db, "submissions"));
            const querySnapshot = await getDocs(q);
            const tempSpeedruns = [];
            querySnapshot.forEach((doc) => {
                tempSpeedruns.push(doc.data());
            });
            setSubmissions(tempSpeedruns);
        };

        getSubmissions();
    }, []);

    const acceptSubmission = async (speedrun) => {
        await addDoc(collection(db, "speedruns"), {
            runner: speedrun.runner,
            time: speedrun.time,
            link: speedrun.link,
            weapon: speedrun.weapon,
            questName: speedrun.questName,
            ruleset: speedrun.ruleset
        })

        const q = query(collection(db, "submissions"), 
        where("link", "==", speedrun.link));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

        const updatedSubmissions = submissions.filter(submission => submission.link !== speedrun.link);
        setSubmissions(updatedSubmissions);
    }

    const deleteSubmission = async (speedrun) => {
        const q = query(collection(db, "submissions"), 
        where("link", "==", speedrun.link));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

        const updatedSubmissions = submissions.filter(submission => submission.link !== speedrun.link);
        setSubmissions(updatedSubmissions);
    }

    return (
        <div className="submissions">
            <h1>Submissions</h1>

            <table>
                <thead>
                <tr>
                    <th className="medium-width">Runner</th>
                    <th className="small-width">Time</th>
                    <th className="medium-width">Weapon</th>
                    <th className="large-width">Quest</th>
                    <th className="small-width">Ruleset</th>
                </tr>
                </thead>

                <tbody>
                {submissions.map((speedrun, index) => (
                    <tr key={index}>
                    <td>{speedrun.runner}</td>
                    <td>
                        <a href={speedrun.link} target="_blank" rel="noopener noreferrer">{speedrun.time}</a>
                    </td>
                    <td>{speedrun.weapon}</td>
                    <td>{speedrun.questName}</td>
                    <td>{speedrun.ruleset}</td>
                    <td>
                        <button onClick={() => acceptSubmission(speedrun)}>Accept</button>
                        <button onClick={() => deleteSubmission(speedrun)}>Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Submissions