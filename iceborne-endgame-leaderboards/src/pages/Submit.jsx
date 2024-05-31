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

    const handleRunnerChange = (event) => setRunner(event.target.value);
    const handleTimeChange = (event) => setTime(event.target.value);
    const handleLinkChange = (event) => setLink(event.target.value);
    const handleWeaponChange = (event) => setWeapon(event.target.value);
    const handleQuestChange = (event) => setQuest(event.target.value);
    const handleRulesetChange = (event) => setRuleset(event.target.value);

    const submitRun = async () => {
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
        </div>
        </>
    )
}

export default Submit