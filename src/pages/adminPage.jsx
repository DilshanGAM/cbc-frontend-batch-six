import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProduct";
import OrdersPageAdmin from "./admin/ordersPageAdmin";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";
export default function AdminPage() {
	const navigate = useNavigate();
	const [adminValidated, setAdminValidated] = useState(false);
	useEffect(
        ()=>{
            const token = localStorage.getItem("token");
            if(token == null){
                toast.error("You are not logged in");
                navigate("/login");
            }else{
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.data.role == "admin") {
                        setAdminValidated(true);
                    } else {
                        toast.error("You are not authorized");
                        navigate("/login");
                    }
                }).catch(() => {
                    toast.error("You are not authorized");
                    navigate("/login");
                });
            }
        }
    ,[]);
	return (
		<div className="w-full h-screen  flex">
			{adminValidated?<>
				<div className="w-[300px] h-full flex flex-col items-center">
					<span className="text-3xl font-bold my-5">Admin Panel</span>

					<Link
						className="flex flex-row h-[60px] w-full  border p-[20px] items-center text-xl  gap-[25px]"
						to="/admin/products"
					>
						<FaBoxArchive /> Products
					</Link>
					<Link
						className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl  gap-[25px]"
						to="/admin/orders"
					>
						<GiShoppingBag /> Orders
					</Link>
					<Link
						className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl  gap-[25px]"
						to="/admin/users"
					>
						<IoPeople /> Users
					</Link>
					<Link
						className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl  gap-[25px]"
						to="/admin/settings"
					>
						<IoSettings /> Settings
					</Link>
				</div>
				<div className="w-[calc(100%-300px)]  h-full">
					<Routes path="/*">
						<Route path="/" element={<h1>Dashboard</h1>} />
						<Route path="/products" element={<ProductsAdminPage />} />
						<Route path="/newProduct" element={<AddProductPage />} />
						<Route path="/orders" element={<OrdersPageAdmin />} />
						<Route path="/updateProduct" element={<UpdateProductPage />} />
					</Routes>
				</div>
			</>:<Loader/>}
		</div>
	);
}
