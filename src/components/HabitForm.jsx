import { useState } from "react";
import { useAuthContext } from "../hook/useAuthContext";
import {useHabitContext} from '../hook/useHabitContext'
import Spinner from "./Spinner";
import ErrorMessage from './ErrorMessage'

const HabitForm = () => {
    const {user} = useAuthContext()
    const {dispatch} = useHabitContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        if(name !== '' && description !== ''){
            const habit = {name, description, userId: user._id}

            try{
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
                    dispatch({type: 'CREATE_HABIT', payload: json})
                    setIsLoading(false)
                }
            }catch(err){
                setError(err.message)
                setIsLoading(false)
            }
        }else{
            setError('All fields are required!')
            setIsLoading(false)
        }
    }
    
    
    return ( 
        <div className="habit-card md:col-span-1">
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
                    <label htmlFor="name" className="form-label">
                    Description
                    </label>
                    <textarea 
                        type="text" 
                        name="name" 
                        id="name" 
                        className="form-control"
                        placeholder="Describe your habit"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
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