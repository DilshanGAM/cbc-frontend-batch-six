import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../components/paginator";
import toast from "react-hot-toast";

export default function OrdersPageAdmin() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [popupVisible, setPopupVisible] = useState(false);
	const [clickedOrder, setClickedOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState("pending"); // pending, completed, cancelled
    const [orderNotes, setOrderNotes] = useState("");

	useEffect(() => {
		if (loading) {
			axios
				.get(
					import.meta.env.VITE_BACKEND_URL +
						"/api/orders/" +
						page +
						"/" +
						limit,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				)
				.then((res) => {
					setOrders(res.data.orders);
					setTotalPages(res.data.totalPages);
					setLoading(false);
					console.log(res.data);
				})
				.catch((err) => {
					console.error(err);
					// Handle error appropriately
				});
		}
	}, [loading, page, limit]);

	return (
		<div className="w-full h-full flex flex-col justify-between">
			<table className="w-full border-[3px]">
				<thead>
					<tr>
						<th className="p-[10px]">Order ID</th>
						<th className="p-[10px]">email</th>
						<th className="p-[10px]">name</th>
						<th className="p-[10px]">Address</th>
						<th className="p-[10px]">Phone</th>
						<th className="p-[10px]">Status</th>
						<th className="p-[10px]">Date</th>
						<th className="p-[10px]">Total</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order, index) => {
						return (
							<tr
								key={index}
								className="border-b-[1px] hover:bg-blue-600 hover:text-white"
								onClick={() => {
                                    setOrderStatus(order.status);
                                    setOrderNotes(order.notes);
									setClickedOrder(order);
									setPopupVisible(true);
								}}
							>
								<td className="p-[10px]">{order.orderID}</td>
								<td className="p-[10px]">{order.email}</td>
								<td className="p-[10px]">{order.name}</td>
								<td className="p-[10px]">{order.address}</td>
								<td className="p-[10px]">{order.phone}</td>
								<td className="p-[10px]">{order.status}</td>
								<td className="p-[10px]">
									{new Date(order.date).toLocaleDateString()}
								</td>
								<td className="p-[10px] text-end">
									{order.total.toLocaleString("en-US", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			\
			{popupVisible && clickedOrder && (
				<div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center z-50">
					<div className="w-full max-w-2xl max-h-[600px] bg-white rounded-lg  p-6 relative shadow-xl">
                        {
                            (orderStatus!=clickedOrder.status || orderNotes != clickedOrder.notes)&&<button className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-lg" 
                            onClick={async ()=>{
                                setPopupVisible(false);
                                try{
                                    await axios.put(
                                        import.meta.env.VITE_BACKEND_URL + "/api/orders/" + clickedOrder.orderID,
                                        {
                                            status: orderStatus,
                                            notes: orderNotes
                                        },
                                        {
                                            headers: {
                                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                            },
                                        }
                                    );
                                    toast.success("Order updated successfully");
                                    setLoading(true);
                                }catch(err){
                                    console.error(err);
                                    toast.error("Failed to update order");
                                }

                            }}>
                                Save Changes
                            </button>
                        }
						{/* Close Button */}
						<button
							className="absolute w-[30px] h-[30px] bg-red-600 border-2 border-red-600 text-white top-[-25px] right-[-25px] rounded-full cursor-pointer hover:bg-transparent hover:text-red-600 z-50"
							onClick={() => setPopupVisible(false)}
						>
							X
						</button>

						{/* Header */}
						<h2 className="text-2xl font-semibold mb-4">Order Details</h2>

						{/* Customer Info */}
						<div className="mb-6 space-y-1">
							<p>
								<span className="font-semibold">Order ID:</span>{" "}
								{clickedOrder.orderID}
							</p>
							<p>
								<span className="font-semibold">Name:</span> {clickedOrder.name}
							</p>
							<p>
								<span className="font-semibold">Email:</span>{" "}
								{clickedOrder.email}
							</p>
							<p>
								<span className="font-semibold">Phone:</span>{" "}
								{clickedOrder.phone}
							</p>

							<p>
								<span className="font-semibold">Address:</span>{" "}
								{clickedOrder.address}
							</p>
                            {/* total */}
                            <p>
								<span className="font-semibold">Total:</span>{" "}
								{clickedOrder.total.toLocaleString("en-US", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</p>
							<p>
								<span className="font-semibold">Status:</span>{" "}
								<span
									className={`capitalize px-2 py-1 rounded ${
										clickedOrder.status === "pending"
											? "bg-yellow-100 text-yellow-700"
											: "bg-green-100 text-green-700"
									}`}
								>
									{clickedOrder.status}
								</span>
                                <select
                                    className="ml-4 p-1 border rounded"
                                    value={orderStatus}
                                    onChange={(e) => setOrderStatus(e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
							</p>
                            <p>
								<span className="font-semibold">Notes:</span>{" "}
								{clickedOrder.notes}
							</p>
                            <textarea
                                className="w-full h-[50px] p-2 border rounded mt-2"
                                value={orderNotes}
                                onChange={(e) => setOrderNotes(e.target.value)}
                            ></textarea>
							<p>
								<span className="font-semibold">Date:</span>{" "}
								{new Date(clickedOrder.date).toLocaleString()}
							</p>
						</div>

						{/* Items */}
						<div>
							<h3 className="text-xl font-semibold mb-2">Items</h3>
							<div className="space-y-4 max-h-[100px] overflow-y-auto">
								{clickedOrder.items.map((item, index) => (
									<div
										key={item._id || index}
										className="flex items-center gap-4 border p-3 rounded-md"
									>
										<img
											src={item.image}
											alt={item.name}
											className="w-16 h-16 object-cover rounded-md border"
										/>
										<div className="flex-1">
											<p className="font-semibold">{item.name}</p>
											<p className="text-sm text-gray-600">Qty: {item.qty}</p>
											<p className="text-sm text-gray-600">
												Price: Rs. {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
											</p>
											<p className="text-sm font-medium">
												Subtotal: Rs. {(item.qty * item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
			{/* //{ currentPage , totalPages, setCurrentPage , limit , setLimit} */}
			<Paginator
				currentPage={page}
				totalPages={totalPages}
				setCurrentPage={setPage}
				limit={limit}
				setLimit={setLimit}
				setLoading={setLoading}
			/>
		</div>
	);
}
