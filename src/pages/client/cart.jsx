import { useState } from "react";
import { addToCart, getCart, getTotal } from "../../utils/cart";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
	const [cart, setCart] = useState(getCart());
	const navigate = useNavigate();
	console.log(cart);
	return (
		<div className="w-[100vw] max-w-[100vw] h-screen flex flex-col px-[10px] py-[40px] items-center">
			{cart.map((item) => {
				return (
					<div
						key={item.productId}
						className="w-full md:w-[800px] h-[200px] md:h-[100px] m-[10px] shadow-2xl flex flex-row items-center relative "
					>
						<div className="md:w-[100px] w-[200px] justify-center items-center flex flex-col text-2xl md:text-md">
							<img
								src={item.image}
								className="w-[100px] h-[100px] object-cover"
							/>
							<div className=" h-full   flex-col justify-center pl-[10px] md:hidden flex">
								<span className=" font-bold text-center md:text-left">
									{item.name}
								</span>
								{/* price */}
								<span className=" font-semibold text-center md:text-left">
									{item.price.toLocaleString("en-US", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
							</div>
						</div>
						<div className="w-[320px] h-full   flex-col justify-center pl-[10px] hidden md:flex">
							<span className=" font-bold text-center md:text-left">
								{item.name}
							</span>
							{/* price */}
							<span className=" font-semibold text-center md:text-left">
								{item.price.toLocaleString("en-US", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</span>
						</div>
						<div className="w-[190px] h-full text-4xl md:text-md  flex flex-row justify-center items-center ">
							<button
								className="flex justify-center items-center w-[30px] rounded-lg bg-accent text-white cursor-pointer hover:bg-blue-400"
								onClick={() => {
									addToCart(item, -1);
									setCart(getCart());
								}}
							>
								-
							</button>
							<span className="mx-[10px]">{item.quantity}</span>
							<button
								className="flex justify-center items-center w-[30px] rounded-lg bg-accent text-white cursor-pointer hover:bg-blue-400"
								onClick={() => {
									addToCart(item, 1);
									setCart(getCart());
								}}
							>
								+
							</button>
						</div>
						<div className="w-[190px] text-3xl md:text-md h-full flex justify-end items-center pr-[10px]">
							{/* total quantity * price */}
							<span className="font-semibold">
								{(item.quantity * item.price).toLocaleString("en-US", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</span>
						</div>
						<button
							className="w-[30px] h-[30px] absolute top-[0px] right-[0px] md:top-[35px]  md:right-[-40px] cursor-pointer bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-700 hover:bg-white hover:text-red-700"
							onClick={() => {
								addToCart(item, -item.quantity);
								setCart(getCart());
							}}
						>
							<TbTrash className="text-xl" />
						</button>
					</div>
				);
			})}
			<div className="md:w-[800px] w-full h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end relative">
				<span className="font-bold text-2xl ">
					Total:{" "}
					{getTotal().toLocaleString("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</span>
				<button
					className="absolute left-[10px] w-[200px] text-2xl md:text-md md:w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-accent border-[2px] border-accent text-white hover:bg-white hover:text-accent"
					onClick={() => {
						navigate("/checkout", { state: { items: cart } });
					}}
				>
					Checkout
				</button>
			</div>
		</div>
	);
}
