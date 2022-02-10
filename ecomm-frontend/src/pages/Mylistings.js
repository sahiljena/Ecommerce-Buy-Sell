import React,{useState,  useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from '../components/Productcard';
const MyListings = ({token , setToken }) =>{

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    

    const fetchListings = async () =>{
        setLoading(true)
        try{
            const response = await fetch('https://ecomm-backend-xcv34.herokuapp.com/api/listings/my',{
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            })
            const tours = await response.json()
            //console.log(tours)
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

    const handleDelete = async (id) =>{
        setLoading(true)
        try{
            const response = await fetch('https://ecomm-backend-xcv34.herokuapp.com/api/listings/delete',{
                method:"POST",
                headers:{
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    id:id
                })
            })
            const tours = await response.json()
            console.log(tours)
            setLoading(false)
            setListings(tours)
        } catch(error){
            setLoading(false)
            console.log("Error Occured");
            console.log(error);
        }
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
        <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6 md:px-15 px-5 py-10">
            {listings.length>0?<>
                {listings.map((data)=>{
                    console.log(data._id);
                    return <>
                        <Product nav={data._id} img={data.prodcutImg} title={data.title} description={data.description} price={data.expectedPrice} old={data.productAge} deleteListing={()=>handleDelete(data._id)} delButton={true} img={data.prodcutImg} />
                    </>
                })}
                </>:<p className="text-center">Nothing to show!</p>
            }
        </div>
        </>
    );
}

export default MyListings;