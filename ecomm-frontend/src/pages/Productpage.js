import React,{useState,  useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from '../components/Productcard';
import { useParams } from "react-router-dom";


const ProductPage = ({token , setToken}) =>{
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    const fetchListings = async () =>{
        setLoading(true)
        var endpoint = `http://localhost:5000/api/listings/find?id=${params.id}`
        try{
            const response = await fetch(endpoint)
            const tours = await response.json()
            setLoading(false)
            setListings(tours)
            console.log(tours)
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

    // if(listings.length===1){
    //     document.title = `${listings[0].title} - Rs ${listings[0].expectedPrice}`
    // }
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
        {listings && <span className="text-sm py-3 px-6 text-gray-600 pt-6">../{listings.length>0?<>{listings[0].title} - Rs. {listings[0].expectedPrice}</> :<></>}</span>}
        {listings.length>0?<div class="px-5 md:py-5 md:mt-10 pb-10">
            {
                listings.map((data)=>{
                    console.log(data);
                    return <>
                        <Product type="full" nav={data._id} img={data.prodcutImg} title={data.title} description={data.description} price={data.expectedPrice} old={data.productAge} />
                    </>
                })
            }
        </div>:<div className="text-xl px-5 py-5 mt-30 text-center">:( Nothing to show!</div>}
        </>
    );
}
export default ProductPage