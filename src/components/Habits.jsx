import HabitCard from "./HabitCard";
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'

const Habits = ({habits, isLoading, error}) => {
    return ( 
        <div className="habit-card lg:col-span-2 row-auto">
            <h2 className="card-title">My Habits</h2>
            {isLoading && (
                <div className="flex flex-col items-center">
                    <Spinner/>
                </div>
            )}
            {habits && habits.map((habit) =>
                <HabitCard habit={habit} key={habit._id} />
            )}
            {error && (
                <ErrorMessage error={error}/>
            )}
        </div>
     );
}
 
export default Habits;