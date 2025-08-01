import { useState } from "react";
import { addToCart, getCart, getTotal } from "../../utils/cart";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
	const [cart, setCart] = useState(getCart());
    const navigate = useNavigate();
	console.log(cart);
	return (
		<div className="w-full h-screen flex flex-col py-[40px] items-center">
			{cart.map((item) => {
				return (
					<div
						key={item.productId}
						className="w-[800px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center relative"
					>
						<img
							src={item.image}
							className="w-[100px] h-[100px] object-cover"
						/>
						<div className="w-[320px] h-full  flex flex-col justify-center pl-[10px]">
							<span className=" font-bold">{item.name}</span>
							{/* price */}
							<span className=" font-semibold">
								{item.price.toLocaleString("en-US", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</span>
						</div>
						<div className="w-[190px] h-full  flex flex-row justify-center items-center">
							<button
								className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-400"
								onClick={() => {
									addToCart(item, -1);
									setCart(getCart());
								}}
							>
								-
							</button>
							<span className="mx-[10px]">{item.quantity}</span>
							<button
								className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-400"
								onClick={() => {
									addToCart(item, 1);
									setCart(getCart());
								}}
							>
								+
							</button>
						</div>
						<div className="w-[190px] h-full flex justify-end items-center pr-[10px]">
							{/* total quantity * price */}
							<span className="font-semibold">
								{(item.quantity * item.price).toLocaleString("en-US", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</span>
						</div>
						<button className="w-[30px] h-[30px] absolute right-[-40px] cursor-pointer bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-700 hover:bg-white hover:text-red-700" 
                        onClick={
                            ()=>{
                                addToCart(item, -item.quantity);
                                setCart(getCart());
                            }
                        }>
							<TbTrash className="text-xl" />
						</button>
					</div>
				);
			})}
            <div
						className="w-[800px] h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end relative">
                        <span className="font-bold text-2xl ">
                            Total: {getTotal().toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <button className="absolute left-[10px] w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-blue-700 border-[2px] border-blue-700 text-white hover:bg-white hover:text-blue-700"
                        onClick={()=>{
                            
                            navigate("/checkout", { state: { items: cart } });
                        }}>
                            Checkout
                        </button>					
            </div>
		</div>
	);
}
