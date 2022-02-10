import React,{useState,  useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from '../components/Productcard';
const Category = ({token , setToken, category, endpoint , limit}) =>{

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    if(!limit){
        document.title = `${category} - BUY SELL`
    }
    
    const fetchListings = async () =>{
        setLoading(true)
        try{
            const response = await fetch(endpoint)
            const tours = await response.json()
            setLoading(false)
            setListings(tours)
        } catch(error){
            setLoading(false)
            console.log("Error Occured");
            console.log(error);
        }
    }
    useEffect(() => {
        if(!token){
            return (navigate('/login'));
        }
        fetchListings()
    }, [token])

    if(limit){
        if(loading){
            return <>
                <h2 className="text-2xl py-3 px-6 text-purple-600">{category}</h2>
                <h3 className="text-center text-xl">Loading...</h3>
            </>
        }
        return(
        <>
        <a className="text-2xl py-3 px-6 text-purple-600" href={`/${category}`}>{category}</a>
        {listings.length>0?<div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6 md:px-15 px-5 py-10">
            {
                listings.map((data)=>{
                    return <>
                        <Product nav={data._id} img={data.prodcutImg} title={data.title} description={data.description} price={data.expectedPrice} old={data.productAge} />
                    </> 
                })
            }
        </div>:<div className="text-xl px-5 py-5 mt-30 text-center">:( Nothing to show!</div>}
        <a className="mb-10 px-10 pb-10 text-blue-400" href={`/${category}`}>more...</a><br /><br />
        </>
        )
    }

    if(loading){
        return (
            <div className="grid justify-items-center items-center h-screen">
                <div>
                    <h3 className="text-center text-xl">Loading..</h3>
                    <p className="text-sm">this might take a few minutes</p>
                </div>
            </div>
        );
    }
    return(
        <>
        <Navbar setToken={setToken} token={token} />
        <h2 className="text-2xl py-3 px-6 text-purple-600">{category}</h2>
        {listings.length>0?<div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6 md:px-15 px-5 py-10">
            {
                listings.map((data)=>{
                    return <>
                        <Product nav={data._id} img={data.prodcutImg} title={data.title} description={data.description} price={data.expectedPrice} old={data.productAge} />
                    </>
                })
            }
        </div>:<div className="text-xl px-5 py-5 mt-30 text-center">:( Nothing to show!</div>}
        </>
    );
}

export default Category;