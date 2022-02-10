import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
const Register = ({token, setToken}) => {
    //console.log(token);
    const [status, setStatus] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const RegisterStatusMessage = (props) =>{
        if(props.status===201){
            return <div className='bg-green-300 text-xs rounded px-1 py-1'>
                Successfully Registered! , you can <a className='text-blue-600' href="/login">login here</a>
            </div>
        }
        if(props.status===500){
            return <div className='bg-red-300 text-xs rounded px-1 py-1'>
                Your account already exsists, you can <a className='text-blue-600' href="/login">login here</a>
            </div>
        }
        else{
            return <></>
        }
    }

    const handleRegister = (event) =>{
        event.preventDefault();
        if(name && email && password){
            //console.log(name,password,email);
            fetch('https://ecomm-backend-xcv34.herokuapp.com/api/user/new',{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                })
            })
            .then(function (response) {
                setStatus(response.status)
                return response.json();
            })
            //Then with the data from the response in JSON...
            .then((data) => {
            console.log('Success:', data);
            })
            //Then with the error genereted...
            .catch((error) => {
            console.error('Error:', error);
            });

        }else{
            console.log("Something wrong !!")
        }
    }

    //console.log(token);

    useEffect(() => {
        if(token){
            return(navigate('/'));
        }
    }, [token]);
    

    return(
        <>
        <Navbar token={token} setToken={setToken} />
            <div className='flex justify-center mt-10'>
                <div class="w-full max-w-xs">
                    <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className='mb-4 text-center text-lg font-bold text-gray-600'>
                            <h2>Register</h2>
                        </div>
                        <div className='mb-4'>
                            <RegisterStatusMessage status={status} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold tracking-tight text-gray-500 mb-2" for="email">
                                Email
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="email" 
                                type="email" 
                                placeholder="name@example.com"
                                value = {email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <p className="text-red-500 text-xs italic"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold tracking-tight text-gray-500 mb-2" for="name">
                                Full Name
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="name" 
                                type="text" 
                                placeholder="Full Name"
                                value = {name}
                                onChange={(e)=>{setName(e.target.value)}}
                            />
                            <p className="text-red-500 text-xs italic"></p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold tracking-tight text-gray-500 mb-2" for="password">
                                Password
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" 
                                type="password" 
                                placeholder="******************"
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <p className="text-red-500 text-xs italic"></p>
                        </div>
                        <div className="flex items-center justify-center">
                            <button 
                                className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                type="submit"

                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;