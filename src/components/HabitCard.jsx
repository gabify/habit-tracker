const HabitCard = ({habit}) => {
    return ( 
        <div className="habit-item">
            <h3 className="font-medium mb-0.5">{habit.name}</h3>
            <small className="font-light tracking-wide">{habit.description}</small>
        </div>
     );
}
 
export default HabitCard;