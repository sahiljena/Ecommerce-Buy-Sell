import React from "react";
import Modal from "./Modal";
const Product = (props) =>{
    var itsurl = `/item/${props.nav}`;
    //console.log(props);
    if(props.type=="full"){
        console.log(props)
        return<>
                <div className="flex flex-wrap justify-around">
                    <div className="mt-10">
                        <img className="object-cover rounded h-98 w-96" src={`https://ecomm-backend-xcv34.herokuapp.com/${props.img}`} />
                    </div>
                    <div className="text-left">
                        <h2 className="mt-5 md:mt-1 text-2xl text-purple-600">{props.title}</h2><span className="text-xs mt-2 text-gray-500">{props.old} Yrs Old</span><br />
                        
                        <span className="text-xl font-semibold  text-gray-600 mt-10">Rs. {props.price}</span>
                        <p className="text-sm text-gray-700 mt-6">
                            <span className="text-base text-gray-800">Description</span> :<br /> 
                            {props.description}
                        </p>
                        <Modal email={props.email_c}/>
                    </div>
                </div>
        </>
    }

    return (
        <a href={itsurl}>
            <div className="shadow-lg rounded bg-gray-200 px-4 py-4">
                
                <img className="object-cover rounded h-48 w-96" src={`https://ecomm-backend-xcv34.herokuapp.com/${props.img}`} />
                
                <div className="mt-2">
                    <p className="text-gray-700 flex justify-between ">
                        <span className="text-lg font-semibold">{props.title}</span> <span className="text-xs mt-2">{props.old} Yrs Old</span>
                    </p>
                    <p className="text-xs text-gray-700">
                        {props.description}
                    </p>
                    <span className="font-semibold text-gray-800">Rs. {props.price}</span>
                    
                </div>
                {props.delButton?<button onClick={props.deleteListing} className="px-2 py-1 font-semibold text-xs bg-red-500 text-white rounded shadow-sm">Delete</button>:<></>}
            </div>
        </a>
    );
}

export default Product