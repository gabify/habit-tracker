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
                <header className="header sm:flex justify-between items-baseline">
                    <h1 className="text-2xl font-semibold text-center">Habit Tracker</h1>
                    <div className='flex gap-2 items-center'>
                        <p className='sm:block hidden text-md font-medium'>{user.name}</p>
                        <div className="mx-auto">
                            <button className='btn-outline' onClick={handleClick}>Log out</button>
                        </div>
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