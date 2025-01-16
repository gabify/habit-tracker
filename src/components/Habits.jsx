import HabitCard from "./HabitCard";
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'

const Habits = ({habits, isLoading, error, loadHabit}) => {
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

            <div className="flex justify-center mt-4">
                <button 
                    className="btn" 
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