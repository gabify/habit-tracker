import { useEffect, useState } from "react"

const DayCard = ({day, frequency, addFrequency, removeFrequency}) => {
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

    useEffect(() =>{
        if(frequency.length === 0){
            setIsClicked(false)
        }
    }, [frequency])

    return ( 
        <div className={isClicked ? "day-card clicked": "day-card"} onClick={() => handleClick(day)}>
            {day}
        </div>
     );
}
 
export default DayCard;