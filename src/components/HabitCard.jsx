import { useEffect, useState } from "react"

const HabitCard = ({habit, isHidden, markAsFinished, unmarkedAsFinished}) => {
    const [isChecked, setIschecked] = useState(false)
    const daysOftheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let goals = habit.goals.toSorted().map(day => daysOftheWeek[day -1])

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
            unmarkedAsFinished(habit._id)
            setIschecked(false)
        }else{
            markAsFinished(habit._id)
            setIschecked(true)
        }
    }

    useEffect(() =>{
        if(!isHidden){
            setIschecked(false)
        }
    }, [isHidden])

    return ( 
        <div className="habit-item relative">
            <div className="absolute top-0 right-0 me-0.5 mt-0.5 hidden sm:block">
                {goals.map((goal) =>
                    <span className="badge" key={goal}>{goal}</span>
                )}
            </div>
            <div className="flex gap-1">
                <input 
                    type="checkbox" 
                    name="isDone" 
                    id="isDone" 
                    className="me-1"
                    checked={isChecked}
                    hidden={isHidden}
                    onChange={handleCheck}
                />
                <div>
                    <h3 className="font-medium mb-0.5">{habit.name}</h3>
                    <small className="font-light tracking-wide">{habit.description}</small>
                </div>
            </div>
        </div>
     );
}
 
export default HabitCard;