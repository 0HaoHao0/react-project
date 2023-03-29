import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";

import AdminRouter from "../router/AdminRouter";
import UserRouter from "../router/UserRouter";

import ResetPassword from "./authentication/ResetPassword";
import Login from "./authentication/Login";
import Register from "./authentication/Register";

import PublicRouter from "../router/PublicRouter";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Expert from "./expert/Expert";
import Cookies from "universal-cookie/cjs/Cookies";
import { deleteUser } from "../redux/features/userSlide";
import DoctorRouter from "../router/DoctorRouter";
import ReceptionistRouter from "../router/ReceptionistRouter";
import TechnicianRouter from "../router/TechnicianRouter";
import { useEffect } from "react";
import EmailConfirm from "./authentication/Emailconfirm";

const cookie = new Cookies();

function App() {

	const dispatch = useDispatch();

	if (!cookie.get("_to")) {
		axios.defaults.headers.common["Authorization"] = "";
		localStorage.clear();
		dispatch(deleteUser());
	}

	axios.defaults.baseURL = "https://localhost:44355/";
	axios.defaults.headers.common["Authorization"] = localStorage.getItem("app_token");

	const user = useSelector((state) => state.user); // user return {} or { userInfo: {...} }
	const forceConfirmEmail = (user.userInfo && (user.userInfo.emailConfirmed === false)) && user.userInfo.role === "Patient";

	const navigate = useNavigate();

	useEffect(() => {

		if (forceConfirmEmail && window.location.href.endsWith("email-confirm") === false) {
			navigate("/email-confirm");
		}

	}, [forceConfirmEmail, navigate]);

	return (
		<>
			<Routes>
				{
					forceConfirmEmail &&
					<Route path="/email-confirm" element={<EmailConfirm />}></Route>
				}

				{/* Home Router */}
				<Route path="*" element={<PublicRouter />}></Route>

				{user.userInfo === undefined ? (
					<>
						<Route path="login" element={<Login />}></Route>
						<Route path="register" element={<Register />}></Route>
						<Route path="resetpassword" element={<ResetPassword />}></Route>
					</>
				) : (
					<>
						<Route path="/user/*" element={<UserRouter />}></Route>
						{
							user.userInfo && user.userInfo.role === "Doctor" &&
							<Route path="/doctor/*" element={<DoctorRouter />}></Route>
						}
						{
							user.userInfo && user.userInfo.role === "Receptionist" &&
							<Route path="/receptionist/*" element={<ReceptionistRouter />}></Route>
						}
						{
							user.userInfo && user.userInfo.role === "Technician" &&
							<Route path="/technician/*" element={<TechnicianRouter />}></Route>
						}
						{
							user.userInfo && user.userInfo.role === "Expert" &&
							<Route path="/expert/*" element={<Expert />}></Route>
						}
						{
							user.userInfo && user.userInfo.role === "Administrator" &&
							<Route path="/admin/*" element={<AdminRouter />}></Route>
						}

					</>
				)}

			</Routes>
		</>

	);
}

export default App;
