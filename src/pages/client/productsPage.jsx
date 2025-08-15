import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductsPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");

	useEffect(() => {
		if (loading) {
			if (query == "") {
				axios
					.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
					.then((res) => {
						setProducts(res.data);
						setLoading(false);
					});
			} else {
				axios
					.get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/"+query)
					.then((res) => {
						setProducts(res.data);
						setLoading(false);
					});
			}
		}
	}, [loading]);

	return (
		<div className="w-full h-full ">
            <div className="w-full h-[100px] flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setLoading(true);
                    }}
                    className="w-[400px] h-[40px] border border-gray-300 rounded-lg p-2"
                />
            </div>
			{loading ? (
				<Loader />
			) : (
				<div className="w-full  flex flex-wrap gap-[40px] justify-center items-center p-[20px]">
					{products.map((product) => {
						return <ProductCard key={product.productId} product={product} />;
					})}
				</div>
			)}
		</div>
	);
}
