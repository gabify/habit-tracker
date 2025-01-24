import { useAuthContext } from '../hook/useAuthContext'
import {useLogout} from '../hook/useLogout'

const Header = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()

    const handleClick = () =>{
        logout()
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
                <header className="mt-7 text-center">
                    <h1 className="text-2xl font-semibold">Bug</h1>
                    <p className="font-light tracking-wide">Habit Tracker</p>
                </header>
            )}
        </section>
     );
}
 
export default Header;