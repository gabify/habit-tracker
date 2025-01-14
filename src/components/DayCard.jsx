import { useState } from "react"

const DayCard = ({day, addFrequency, removeFrequency}) => {
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = (day) =>{
        if(isClicked){
            setIsClicked(false)
            removeFrequency(day)
        }else{
            setIsClicked(true)
            addFrequency(day)
        }
    }

    return ( 
        <div className={isClicked ? "day-card clicked": "day-card"} onClick={() => handleClick(day)}>
            {day}
        </div>
     );
}
 
export default DayCard;