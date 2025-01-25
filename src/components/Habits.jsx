import HabitCard from "./HabitCard";
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'
import { useEffect, useState } from "react";

const Habits = ({habits, isLoading, error, loadHabit}) => {
    const [isHidden, setIsHidden] = useState(true)
    const [isEmpty, setIsEmpty] = useState(true)
    const [finishedHabit, setFinishedhabit] = useState([])

    const markAsFinished = (id) =>{
        const habitList = [...finishedHabit, id]
        setFinishedhabit(habitList)
    }

    const unmarkedAsFinished = (id) =>{
        const habitList = finishedHabit.filter((habit) => habit !== id)
        setFinishedhabit(habitList)
    }

    const handleClick = () =>{
        if(isHidden){
            setIsHidden(false)
        }else{
            setIsHidden(true)
        }
    }

    useEffect(() =>{
        if(finishedHabit.length > 0){
            setIsEmpty(false)
        }
    }, [finishedHabit])

    return ( 
        <div className="habit-card lg:col-span-2 row-auto">
            <h2 className="card-title">My Habits</h2>
            <div className="flex justify-end mb-3">
                <button className="btn me-2" onClick={handleClick}>
                    Mark Habits
                </button>
                <button className={isEmpty ? "btn-disabled" : "btn"} hidden={isHidden} disabled={isEmpty}>
                    Done
                </button>
            </div>
            {isLoading && (
                <div className="flex flex-col items-center">
                    <Spinner/>
                </div>
            )}
            {habits && habits.map((habit) =>
                <HabitCard 
                    key={habit._id}
                    habit={habit} 
                    isHidden={isHidden} 
                    markAsFinished={markAsFinished} 
                    unmarkedAsFinished={unmarkedAsFinished}
                />
            )}
            {error && (
                <ErrorMessage error={error}/>
            )}

            <div className="flex justify-center mt-4">
                <button 
                    className={isLoading ? 'btn-disabled': 'btn'} 
                    disabled={isLoading} 
                    onClick={loadHabit}
                >
                    {isLoading ? (
                        <div className="flex gap-1">
                            <Spinner/>
                            <p>Loading...</p>
                        </div>
                    ) : 'Load More'}
                </button>
            </div>
        </div>
     );
}
 
export default Habits;