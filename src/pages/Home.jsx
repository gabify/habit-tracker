import { useEffect, useState } from "react"

import HabitForm from "../components/HabitForm"
import Habits from "../components/Habits"
import Header from "../components/Header"
import { useAuthContext } from "../hook/useAuthContext"
import {useHabitContext} from '../hook/useHabitContext'

const Home = () => {
    const {user} = useAuthContext()
    const {habits, dispatch} = useHabitContext()
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() =>{
        const getData = async() =>{
            setIsLoading(true)
            setError(null)
            try{
                const response = await fetch(`${import.meta.env.VITE_API_LINK}/habit/${user._id}`,{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
    
                if(!response.ok){
                    setIsLoading(false)
                    setError(json.error)
                }
    
                if(response.ok){
                    dispatch({type: 'SET_HABIT', payload: json})
                    setIsLoading(false)
                }
            }catch(err){
                setIsLoading(false)
                setError(err.message)
            }
        }

        getData()
    }, [])


    return (
        <section className="home">
            <Header />
            <div className="xl:grid grid-cols-3 grid-rows-1">
                <Habits habits={habits} isLoading={isLoading} error={error}/>
                <HabitForm />
            </div>
            <p className="text-xs mt-3 text-center text-gray-600">Designed and Developd By <a href="https://github.com/gabify/" target="_blank" className="link">Gabify</a></p>
        </section>
    )
}
 
export default Home;