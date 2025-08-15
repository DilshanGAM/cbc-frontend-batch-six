import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverViewPage() {
	const params = useParams();
	const [product, setProduct] = useState(null);
	const navigate = useNavigate();
	const [status, setStatus] = useState("loading"); //loading, success, error
	useEffect(() => {
		if (status === "loading") {
			axios
				.get(
					import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`
				)
				.then((res) => {
					setProduct(res.data);
					setStatus("success");
				})
				.catch(() => {
					setStatus("error");
				});
		}
	}, [status]);

	return (
		<div className="w-full h-full">
			{status == "loading" && <Loader />}
			{status == "success" && (
				<div className="w-full h-full flex flex-col md:flex-row ">
					<h1 className="text-2xl my-4 text-center font-bold md:hidden">
						{product.name}{" "}
						<span className="font-light">{product.altNames.join(" | ")}</span>
					</h1>

					<div className="w-full md:w-[49%] h-full flex flex-col justify-center items-center ">
						<ImageSlider images={product.images} />
					</div>
					<div className="w-full md:w-[49%] h-full flex flex-col items-center pt-[50px] ">
						<h1 className="text-2xl font-bold hidden md:block">
							{product.name}{" "}
							<span className="font-light">{product.altNames.join(" | ")}</span>
						</h1>
						<p className="text-lg p-2">{product.description}</p>
						<div className="w-full flex flex-col items-center mt-[20px]">
							{product.labelledPrice > product.price ? (
								<div>
									<span className="text-2xl font-semibold  line-through mr-[20px]">
										{product.labelledPrice.toLocaleString("en-US", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</span>
									<span className="text-3xl font-bold ">
										{product.price.toLocaleString("en-US", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</span>
								</div>
							) : (
								<div>
									<span className="text-3xl font-bold ">
										{product.price.toLocaleString("en-US", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</span>
								</div>
							)}
						</div>
						<div className="w-full flex flex-row justify-center items-center mt-[20px]  gap-[10px]">
							<button
								onClick={() => {
									navigate("/checkout", {
										state: {
											items: [
												{
													productId: product.productId,
													quantity: 1,
													name: product.name,
													image: product.images[0],
													price: product.price,
												},
											],
										},
									});
								}}
								className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-900 border-[3px] border-blue-900 hover:bg-white hover:text-blue-900"
							>
								Buy Now
							</button>
							<button
								className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-600 border-[3px] border-blue-600 hover:bg-white hover:text-blue-600"
								onClick={() => {
									addToCart(product, 1);
									toast.success("Product added to cart");
									console.log(getCart());
								}}
							>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			)}
			{status == "error" && <div>Error loading product</div>}
		</div>
	);
}
