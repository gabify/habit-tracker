import HabitCard from "./HabitCard";
import Spinner from './Spinner'

const Habits = ({habits, isLoading}) => {
    return ( 
        <div className="habit-card md:col-span-2">
            <h2 className="card-title">My Habits</h2>
            {isLoading && (
                <div className="flex flex-col items-center">
                    <Spinner/>
                </div>
            )}
            {habits && habits.map((habit) =>
                <HabitCard habit={habit} key={habit._id} />
            )}
        </div>
     );
}
 
export default Habits;