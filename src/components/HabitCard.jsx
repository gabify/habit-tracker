import { useState } from "react"

const HabitCard = ({habit}) => {
    const [isChecked, setIschecked] = useState(false)
    const daysOftheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let goals = habit.goals.toSorted().map(day => daysOftheWeek[day -1])

    console.log(goals)

    if(goals.length === 7){
        goals = ["Everyday"]
    }

    if(goals[0] === "Sun" && goals[1] === "Sat"){
        goals = ["Every weekend"]
    }

    if(goals.includes("Sun") && goals.includes("Sat")){
        goals = ["Every weekdays"]
    }

    const handleCheck = () =>{
        if(isChecked){
            setIschecked(false)
        }else{
            setIschecked(true)
        }
    }
    return ( 
        <div className="habit-item relative">
            <div className="absolute top-0 right-0 me-0.5 mt-0.5 hidden sm:block">
                {goals.map((goal) =>
                    <span class="badge">{goal}</span>
                )}
            </div>
            <div className="flex gap-1">
                <input 
                    type="checkbox" 
                    name="isDone" 
                    id="isDone" 
                    className="me-1"
                    onChange={handleCheck}
                />
                <div>
                    <h3 className={`font-medium mb-0.5 ${isChecked && 'line-through'}`}>{habit.name}</h3>
                    <small className="font-light tracking-wide">{habit.description}</small>
                </div>
            </div>
        </div>
     );
}
 
export default HabitCard;