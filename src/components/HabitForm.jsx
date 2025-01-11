import { useState } from "react";
import { useAuthContext } from "../hook/useAuthContext";

const HabitForm = () => {
    const {user} = useAuthContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const habit = {name, description, userId: user._id}

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
        }

        if(response.ok){
            console.log(json)
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
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex flex-col items-center">
                    <button type="submit" className="btn mx-auto my-3">Add Habit</button>
                </div>
            </form>
      </div>
     );
}
 
export default HabitForm;