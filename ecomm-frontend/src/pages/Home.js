import React,{useState,  useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from '../components/Productcard';
import Category from "./Category";
const Home = ({token , setToken }) =>{

    document.title = "Home | BUY SELL"

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    

    const fetchListings = async () =>{
        setLoading(true)
        try{
            const response = await fetch('http://localhost:5000/api/listings')
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

    

    if(loading){
        return (
            <>
            <Navbar setToken={setToken} token={token} />
            <div className="grid justify-items-center items-center h-screen">
                <div>
                    <h3 className="text-center text-xl">Loading..</h3>
                    <p className="text-sm">this might take a few minutes</p>
                </div>
            </div>
            </>
            
        );
    }
    return(
        <>
        <Navbar setToken={setToken} token={token} />
        {listings.length>0?
        <>
        <h2 className="text-2xl py-3 px-6 text-purple-600">Recently Added</h2>
        <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6 md:px-15 px-5 pt-5">
            {
                listings.map((data)=>{
                    console.log(data);
                    return <>
                        <Product key={data.prodcutImg} nav={data._id} img={data.prodcutImg} title={data.title} description={data.description} price={data.expectedPrice} old={data.productAge} />
                    </>
                })
            }
        </div>
        <br />
        <Category setToken={setToken} token={token} endpoint={"http://localhost:5000/api/listings/mobile/5"} category={"Mobiles"} limit={true}  />
        <Category setToken={setToken} token={token} endpoint={"http://localhost:5000/api/listings/book/5"} category={"Books"} limit={true}  />
        <Category setToken={setToken} token={token} endpoint={"http://localhost:5000/api/listings/laptop/5"} category={"Laptops"} limit={true}  />
        </>:<div className="text-xl px-5 py-5 mt-30 text-center">:( Nothing to show!</div>}
        </>
    );
}

export default Home;