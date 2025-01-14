import { useState } from "react";
import { useAuthContext } from "../hook/useAuthContext";
import {useHabitContext} from '../hook/useHabitContext'
import Spinner from "./Spinner";
import ErrorMessage from './ErrorMessage'
import DayCard from "./DayCard";

const HabitForm = () => {
    const {user} = useAuthContext()
    const {dispatch} = useHabitContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [frequency, setFrequency] = useState([])

    //days of the week
    const daysOfTheWeek = {
        "Sun" : 1,
        "Mon" : 2,
        "Tue" : 3,
        "Wed" : 4,
        "Thu" : 5,
        "Fri" : 6,
        "Sat" : 7
    }

    const addFrequency = (day) =>{
        
        if(frequency.length === 0){
            setFrequency([day])
        }else{
            const index = frequency.findIndex((val) => val === day)
            if(index === -1){
                const newFrequency = [...frequency, day]
                setFrequency(newFrequency)
            }
        }
    }

    const removeFrequency = (day) =>{
        const newFrequency = frequency.filter((val) => val !== day)
        setFrequency(newFrequency)
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try{
            if(name === '' || description === ''){
                throw Error('All fields are required!')
            }

            if(frequency.length === 0){
                throw Error('Please set your weekly goal')
            }


            const goals = frequency.map(day => daysOfTheWeek[day])
            const habit = {name, description, goals, userId: user._id}

            const response = await fetch(`${import.meta.env.VITE_API_LINK}/habit/new`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(habit)
            })

            const json = await response.json()

            if(!response.ok){
                console.log(json.error)
                setError(json.error)
                setIsLoading(false)
            }

            if(response.ok){
                setName('')
                setDescription('')
                setFrequency([])
                dispatch({type: 'CREATE_HABIT', payload: json})
                setIsLoading(false)
            }
        }catch(err){
            setError(err.message)
            setIsLoading(false)
        }
    }    
    
    return ( 
        <div className="habit-card lg:col-span-1 row-auto">
            <h2 className="card-title">Add New Habit</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        className="form-control"
                        onChange={(e) =>setName(e.target.value)}
                        value={name}
                        placeholder="What is your habit called?"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                    Description
                    </label>
                    <textarea 
                        type="text" 
                        name="description" 
                        id="description" 
                        className="form-control"
                        placeholder="Describe your habit"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="weeklyGoal" className="form-label">Set your weekly goal</label>
                    <small className="font-light tracking-wide mb-3">How frequent you want to do this habit?</small>
                    <div className="flex gap-2 justify-center">
                        {Object.keys(daysOfTheWeek).map((day) =>
                            <DayCard 
                                day={day} 
                                key={day}
                                frequency={frequency}
                                addFrequency={addFrequency}
                                removeFrequency={removeFrequency}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <button type="submit" className={isLoading ? 'btn-disabled': 'btn'} disabled={isLoading}>
                        {isLoading ? (
                            <div className="flex gap-1">
                                <Spinner/>
                                <p>Loading...</p>
                            </div>
                        ) : 'Add Habit'}
                        
                    </button>
                </div>
            </form>
            {error && (
                <ErrorMessage error={error}/>
            )}
      </div>
     );
}
 
export default HabitForm;