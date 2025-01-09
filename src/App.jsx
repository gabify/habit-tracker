import { useEffect, useState } from "react"
import HabitForm from "./components/HabitForm"
import Habits from "./components/Habits"
import Header from "./components/Header"

function App() {
  const [habits, setHabits] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  useEffect(() =>{
    const getData = async() =>{
      setIsLoading(true)
      const response = await fetch('http://localhost:7979/api/v1/habit/')
      const json = await response.json()

      if(response.ok){
        setIsLoading(false)
        setHabits(json)
      }
    }

    getData()
  }, [])


  return (
    <main className="px-10 py-5">
      <Header />
      <section className="content">
        <Habits habits={habits}/>
        <HabitForm />
      </section>
      <p className="text-xs mt-3 text-center text-gray-600">Designed and Developd By Gabify</p>
    </main>
  )
}

export default App
