import { useEffect, useState } from "react"

import HabitForm from "../components/HabitForm"
import Habits from "../components/Habits"
import Header from "../components/Header"
import { useAuthContext } from "../hook/useAuthContext"
import {useHabitContext} from '../hook/useHabitContext'
import { useLogout } from "../hook/useLogout"

const Home = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
    const {habits, dispatch} = useHabitContext()
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(0)

    const loadHabit = () =>{
        setPage(page + 1)
    }

    useEffect(() =>{
        const getData = async() =>{
            setIsLoading(true)
            setError(null)
            try{
                const response = await fetch(`${import.meta.env.VITE_API_LINK}/habit/${user._id}?p=${page}`,{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()

                if(response.status === 401){
                    logout()
                }

                if(!response.ok){
                    setIsLoading(false)
                    setError(json.error)
                }
    
                if(response.ok){
                    console.log(json)
                    if(!habits){
                        dispatch({type: 'SET_HABIT', payload: json.habits})
                    }else{
                        dispatch({type: 'SET_HABIT', payload: habits.concat(json.habits)})
                    }
                    setIsLoading(false)
                }
            }catch(err){
                setIsLoading(false)
                setError(err.message)
            }
        }

        getData()
    }, [page])


    return (
        <section className="home">
            <Header />
            <div className="xl:grid grid-cols-3 grid-rows-1">
                <Habits 
                    habits={habits} 
                    isLoading={isLoading} 
                    error={error} 
                    loadHabit={loadHabit}/>
                <HabitForm />
            </div>
            <p className="text-xs my-3 text-center text-gray-600">Designed and Developd By <a href="https://github.com/gabify/" target="_blank" className="link">Gabify</a></p>
        </section>
    )
}
 
export default Home;