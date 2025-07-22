import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductsPage(){

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(
        ()=>{
            if(loading){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                    (res)=>{
                        setProducts(res.data)
                        setLoading(false)
                    }
                )
            }
        },
        [loading]
    )


    return(
        <div className="w-full h-full ">
            {
                loading? <Loader/> :
                <div className="w-full  flex flex-wrap gap-[40px] justify-center items-center p-[20px]">
                    {
                        products.map(
                            (product)=>{
                                return(
                                    <ProductCard key={product.productId} product={product}/>
                                )
                            }
                        )
                    }
                </div>
            }
        </div>
    )
}