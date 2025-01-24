import { useState } from "react";
import {Link} from 'react-router-dom'
import Header from "../components/Header";
import { useLogin } from "../hook/useLogin";
import Spinner from "../components/Spinner";
import ErrorMessage from '../components/ErrorMessage'

const Login = () => {
    const [login, isLoading, error] = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShown, setIsShown] = useState(false)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const user = {email, password}

        await login(user)

        if(isLoading && !error){
            setIsShown(false)
        }
    }

    return ( 
        <section>
            <Header />
            
            <div className="mt-5 bg-gray-50 px-7 py-8 rounded-xl shadow-md w-96 mx-auto ">
                <h2 className="text-lg font-bold text-center">Welcome Back!</h2>
                <p className="text-sm font-light tracking-wide text-center mb-5">It`s been a while! Don`t miss out your habits!</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type={isShown ? 'text' : 'password'} 
                            name="password" 
                            id="password" 
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="px-3 mb-2 flex items-center">
                        <input 
                            type="checkbox" 
                            name="showPassword" 
                            id="showPassword" 
                            className="me-1"
                            onChange={() => setIsShown(!isShown)} 
                        />
                        <label htmlFor="showPassword" className="text-sm font-light tracking-wide">Show Password</label>
                    </div>

                    <p className="text-sm px-3 mb-4 font-light">
                        Don't have an account yet? 
                        <Link to='/signup' className="ms-1 link">Click here</Link>
                    </p>

                    <div className="flex flex-col items-center ">
                        <button type="submit" className={isLoading ? 'btn-disabled': 'btn'} disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex gap-1">
                                    <Spinner/>
                                    <p>Loading...</p>
                                </div>
                            ) : 'Log in'}
                           
                        </button>
                    </div>
                </form>
                {error && (
                    <ErrorMessage error={error}/>
                )}
            </div>
            <p className="text-xs my-3 text-center text-gray-600">Designed and Developd By <a href="https://github.com/gabify/" target="_blank" className="link">Gabify</a></p>
        </section>
     );
}
 
export default Login;