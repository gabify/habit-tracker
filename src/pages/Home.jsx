import { useEffect, useState } from "react"

import HabitForm from "../components/HabitForm"
import Habits from "../components/Habits"
import Header from "../components/Header"
import { useAuthContext } from "../hook/useAuthContext"

const Home = () => {
    const {user} = useAuthContext()
    const [habits, setHabits] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    useEffect(() =>{
        const getData = async() =>{
        setIsLoading(true)
        const response = await fetch(`http://localhost:7979/api/v1/habit/${user._id}`,{
            headers: {
                 'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            setIsLoading(false)
            setHabits(json)
        }
        }

        getData()
    }, [])


    return (
        <section className="home">
            <Header />
            <div className="content">
                <Habits habits={habits}/>
                <HabitForm />
            </div>
            <p className="text-xs mt-3 text-center text-gray-600">Designed and Developd By <a href="https://github.com/gabify/" target="_blank" className="link">Gabify</a></p>
        </section>
    )
}
 
export default Home;