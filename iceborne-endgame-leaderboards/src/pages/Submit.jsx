import { useState } from "react"
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import "./Submit.css"

function Submit() {
    const [runner, setRunner] = useState("");
    const [time, setTime] = useState("");
    const [link, setLink] = useState("");
    const [weapon, setWeapon] = useState("");
    const [quest, setQuest] = useState("");
    const [ruleset, setRuleset] = useState("");
    const [runSubmitted, setRunSubmitted] = useState(false);
    const [emptyField, setEmptyField] = useState(false);
    const [invalidTimeFormat, setInvalidTimeFormat] = useState(false);

    const handleRunnerChange = (event) => setRunner(event.target.value);
    const handleTimeChange = (event) => setTime(event.target.value);
    const handleLinkChange = (event) => setLink(event.target.value);
    const handleWeaponChange = (event) => setWeapon(event.target.value);
    const handleQuestChange = (event) => setQuest(event.target.value);
    const handleRulesetChange = (event) => setRuleset(event.target.value);

    const submitRun = async () => {
        if (!runner || !time || !link || !weapon || !quest || !ruleset) {
            setEmptyField(true);
            setInvalidTimeFormat(false);
            return;
        }
        else {
            setEmptyField(false);
        }
        if (!isValidTimeFormat(time)) {
            setInvalidTimeFormat(true);
            setEmptyField(false);
            return;
        }
        else{
            setInvalidTimeFormat(false);
        }

        await addDoc(collection(db, "submissions"), {
            runner: runner,
            time: time,
            link: link,
            weapon: weapon,
            questName: quest,
            ruleset: ruleset
        })
        setRunSubmitted(true);
    }

    function isValidTimeFormat(timeString) {
        // Regular expression to match M:SS:MS or MM:SS:MS format
        const timeRegex = /^([1-9]|[1-5]\d):\d{2}:\d{2}$/;
    
        // Check if the timeString matches the regex pattern
        if (!timeRegex.test(timeString)) {
            return false;
        }
    
        // Split the time string into components
        const components = timeString.split(':').map(Number);
    
        // Handle the case of M:SS:MS format
        let minutes = components[0];
    
        let [seconds, milliseconds] = components.slice(1);
    
        // Check if the components are valid
        if (seconds < 0 || seconds >= 60 || milliseconds < 0 || milliseconds >= 100) {
            return false;
        }
    
        // If milliseconds has more than 2 digits, return false
        if (milliseconds >= 100) {
            return false;
        }
    
        return true;
    }

    if (runSubmitted) {
        return (
            <div className="run-details">
                <h1>Run Submitted for Review!</h1>
            </div>
        )
    }

    return (
        <>
        <div className="run-details">
            <h1>Submit Run</h1>
            <input type="text" placeholder="Runner" onChange={handleRunnerChange}/>
            <input type="text" placeholder="Time (Format MM:SS:MS)" onChange={handleTimeChange}/>
            <input type="text" placeholder="Run Link" onChange={handleLinkChange}/>
            <select name="weapon" id="Weapon" onChange={handleWeaponChange}>
                <option value="" hidden>Select Weapon</option>
                <option value="Greatsword">Greatsword</option>
                <option value="Longsword">Longsword</option>
                <option value="Sword and Shield">Sword and Shield</option>
                <option value="Dual Blades">Dual Blades</option>
                <option value="Hammer">Hammer</option>
                <option value="Hunting Horn">Hunting Horn</option>
                <option value="Lance">Lance</option>
                <option value="Gunlance">Gunlance</option>
                <option value="Switch Axe">Switch Axe</option>
                <option value="Charge Blade">Charge Blade</option>
                <option value="Insect Glaive">Insect Glaive</option>
                <option value="Light Bowgun">Light Bowgun</option>
                <option value="Heavy Bowgun">Heavy Bowgun</option>
                <option value="Bow">Bow</option>
            </select>
            <select name="quest" id="Quest" onChange={handleQuestChange}>
                <option value="" hidden>Select Quest</option>
                <option value="Fade to Black">Fade to Black</option>
                <option value="The Evening Star">The Evening Star</option>
                <option value="Dawn of the Death Star">Dawn of the Death Star</option>
                <option value="The Place Where Winter Sleeps">The Place Where Winter Sleeps</option>
                <option value="Mew are Number One!">Mew are Number One!</option>
            </select>
            <div>
                <input type="radio" name="ruleset" value="Freestyle" id="Freestyle" onChange={handleRulesetChange}/>
                <label htmlFor="Freestyle">Freestyle</label>
                <input type="radio" name="ruleset" value="TA Wiki" id="TA Wiki" onChange={handleRulesetChange}/>
                <label htmlFor="TA Wiki">TA Wiki</label>
            </div>
            <button type="button" onClick={submitRun}>Submit</button>
            {emptyField && <h2>There are empty fields!</h2>}
            {invalidTimeFormat && 
            <>
                <h2>Wrong time format! Times must be submitted in the format MM:SS:MS.</h2>
                <ul>
                    <li>Ex: 5:00:00 &#10004;</li>
                    <li>Ex: 15:00:00 &#10004;</li>
                    <li>Ex: 05:00:00 &#10008;</li>
                    <li>Ex: 5'00"00 &#10008;</li>
                </ul>
            </>
            }
        </div>
        </>
    )
}

export default Submit