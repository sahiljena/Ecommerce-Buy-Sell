import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar"
const Navbar = ({setToken, token}) =>{

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <nav className='px-2 pt-4 block md:hidden'>
                <div className="flex justify-between border-b-2 pb-2">
                    <div className='flex gap-4'>LOGO</div>
                    {token && 
                    <><button className='px-2 py-1 font-semibold text-sm bg-purple-500 text-white rounded shadow-sm' onClick={()=>{navigate('/additem')}}>New Post</button></>}
                    <div  onClick={()=>{setIsOpen(!isOpen)}} class="space-y-2">
                        <span class="block w-8 h-0.5 bg-gray-600"></span>
                        <span class="block w-8 h-0.5 bg-gray-600"></span>
                        <span class="block w-5 h-0.5 bg-gray-600"></span>
                    </div>
                </div>
                {isOpen && <div className="text-center flex flex-col">{token?<>
                    <button className='px-2 py-1 font-semibold text-sm text-gray-500 hover:text-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/')}}>Home</button>
                    <button className='px-2 py-1 font-semibold text-sm text-gray-500 hover:text-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/mylistings')}}>My Listings</button>
                    <button className='px-2 py-1 font-semibold text-sm text-red-500 hover:text-red-800 text-white rounded shadow-sm' onClick={()=>{setToken('')}}>Logout</button>
                    </>:<>
                    <button className='px-2 py-1 font-semibold text-sm text-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/login')}}>Sign In</button>
                    <button className='px-2 py-1 font-semibold text-sm bg-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/register')}}>Register</button>
                    </>}</div>}
                {token && <Searchbar token={token} setToken={setToken} />}
            </nav>
            <nav className='flex justify-around border-b-2 px-2 py-4 hidden md:flex'>
                <div className='flex gap-4'>
                LOGO
                    {token && <button className='px-2 py-1 font-semibold text-sm bg-purple-500 text-white rounded shadow-sm' onClick={()=>{navigate('/additem')}}>New Post</button>}
                </div>
                <div className='flex gap-4'>
                    {token?<>
                    <button className='px-2 py-1 font-semibold text-sm text-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/')}}>Home</button>
                    <button className='px-2 py-1 font-semibold text-sm text-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/mylistings')}}>My Listings</button>
                    <button className='px-2 py-1 font-semibold text-sm text-red-500 text-white rounded shadow-sm' onClick={()=>{setToken('')}}>Logout</button>
                    </>:<>
                    <button className='px-2 py-1 font-semibold text-sm text-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/login')}}>Sign In</button>
                    <button className='px-2 py-1 font-semibold text-sm bg-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/register')}}>Register</button>
                    </>}
                </div>
            </nav>
            {token && <div className="flex justify-around shadow-md px-2 py-4">
                <a className="text-blue-700 hover:text-blue-500" href="/">Home</a>
                <a className="text-blue-700 hover:text-blue-500" href="/mobiles">Mobiles</a>
                <div className="hidden md:flex"><Searchbar token={token} setToken={setToken} /></div>
                <a className="text-blue-700 hover:text-blue-500" href="/books">Books</a>
                <a className="text-blue-700 hover:text-blue-500" href="/laptops">Laptops</a>
            </div>}
        </>
    );
}

export default Navbar;