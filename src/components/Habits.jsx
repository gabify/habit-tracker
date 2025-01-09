import HabitCard from "./HabitCard";

const Habits = ({habits}) => {
    return ( 
        <div className="habit-card md:col-span-2">
            <h2 className="card-title">My Habits</h2>
            {habits && habits.map((habit) =>
                <HabitCard habit={habit} key={habit._id} />
            )}
        </div>
     );
}
 
export default Habits;