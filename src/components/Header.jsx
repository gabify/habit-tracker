import {useAuthContext} from '../hook/useAuthContext'

const Header = () => {
    const {user, dispatch} = useAuthContext()

    const handleClick = () =>{
        dispatch({type: 'LOGOUT'}) 
    }

    return (
        <section>
            {user ? (
                <header className="header">
                    <h1 className="text-2xl font-semibold">Habit Tracker</h1>
                    <div className='flex gap-2 items-center'>
                        <p className='text-md font-medium'>{user.name}</p>
                        <button className='btn-outline' onClick={handleClick}>Log out</button>
                    </div>
                </header>
            ): (
            <header className="mt-8 text-center">
                <h1 className="text-2xl font-semibold">Bug</h1>
                <p className="font-light tracking-wide">Habit Tracker</p>
            </header>
        )}
        </section>
     );
}
 
export default Header;