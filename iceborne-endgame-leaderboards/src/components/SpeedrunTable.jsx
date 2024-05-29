import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./SpeedrunTable.css"

const SpeedrunTable = ({ questName }) => { 
    const [speedruns, setSpeedruns] = useState([]);
    const [filteredSpeedruns, setFilteredSpeedruns] = useState([]);
    const [selectedWeapon, setSelectedWeapon] = useState("All");

    function timeToMilliseconds(time) {
        const [minutes, seconds, milliseconds] = time.split(':').map(Number);
        const totalMilliseconds = (minutes * 60 + seconds) * 1000 + milliseconds;
        return totalMilliseconds;
    }

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
                tempSpeedruns.sort((a, b) => timeToMilliseconds(a.time) - timeToMilliseconds(b.time));
                setSpeedruns(tempSpeedruns);
                setFilteredSpeedruns(tempSpeedruns);
            }
        };

        getSpeedruns();
    }, [questName]);

    const handleDropdownChange = (e) => {
        setSelectedWeapon(e.target.value);
    };

    const filterFreestyle = () => {
        setFilteredSpeedruns(speedruns);
    };
      
    const filterTAWiki = () => {
        const filtered = speedruns.filter(speedrun => speedrun.ruleset === "TA Wiki");
        console.log(filtered);
        setFilteredSpeedruns(filtered);
    };
    
    const filteredItems = selectedWeapon === "All" ? filteredSpeedruns : filteredSpeedruns.filter(speedrun => speedrun.weapon === selectedWeapon);
    
    return (
        <div className="leaderboard">
            <h1>{questName}</h1>
            <div className='filters'>
                <select value={selectedWeapon} onChange={handleDropdownChange}>
                    <option value="All">All</option>
                    <option value="Greatsword">Greatsword</option>
                    <option value="longsword">Longsword</option>
                    <option value="Sword and Shield">Sword and Shield</option>
                    <option value="dual-blades">Dual Blades</option>
                    <option value="hammer">Hammer</option>
                    <option value="hunting-horn">Hunting Horn</option>
                    <option value="lance">Lance</option>
                    <option value="gunlance">Gunlance</option>
                    <option value="switch-axe">Switch Axe</option>
                    <option value="charge-blade">Charge Blade</option>
                    <option value="insect-glaive">Insect Glaive</option>
                    <option value="light-bowgun">Light Bowgun</option>
                    <option value="heavy-bowgun">Heavy Bowgun</option>
                <option value="bow">Bow</option>
                </select>
                <button onClick={filterFreestyle}>Freestyle</button>
                <button onClick={filterTAWiki}>TA Wiki</button>
            </div>

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
                {filteredItems.map((speedrun, index) => (
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
