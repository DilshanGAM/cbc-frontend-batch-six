import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";

export default function ClientWebPage() {
	return <div className="w-full h-screen max-h-screen">
        <Header/>
        <div className="w-full h-[calc(100%-100px)] bg-yellow-400">
            <Routes path="/">
                <Route path="/" element={<h1 className="text-3xl text-center">Welcome to the Home Page</h1>}/>
                <Route path="/products" element={<h1 className="text-3xl text-center">Products Page</h1>}/>
                <Route path="/reviews" element={<h1 className="text-3xl text-center">Reviews Page</h1>}/>
                <Route path="/about-us" element={<h1 className="text-3xl text-center">About Us Page</h1>}/>
                <Route path="/contact-us" element={<h1 className="text-3xl text-center">Contact Us Page</h1>}/>
                <Route path="/*" element={<h1 className="text-3xl text-center">404 Not Found</h1>}/>

            </Routes>
        </div>
    </div>;
}
