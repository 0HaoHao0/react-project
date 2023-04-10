import { useEffect, useRef, useState } from "react";
import { getAllPatient } from "../../../services/admin/patient/apiPatient";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function PatientGetAll() {
	const rendered = useRef(false)

	const [patientData, setPatientData] = useState();

	const currentPage = patientData ? patientData.page : 1;
	const totalPage = patientData ? patientData.total_pages : 0;

	const defaultFilter = {
		page: currentPage,
		pageSize: 10,
		userName: null,
		email: null,
		phoneNumber: null,
	}

	const [filter, setFilter] = useState(defaultFilter);

	useEffect(() => {


		const loadData = async () => {
			if (rendered.current) {
				Swal.fire({
					icon: "info",
					title: "Waiting for response..."
				});
				Swal.showLoading();
			}
			let res = await getAllPatient({
				params: filter
			});

			if (res.status === 200) {
				setPatientData(res.data);
			} else {
				toast.error("System is busy!");
			}
			if (rendered.current) {
				Swal.close();
			}
		}

		loadData();

		return () => {
			rendered.current = true
		}

	}, [filter]);


	// Pagination
	const peviousPage = (e) => {
		if (filter.page - 1 > 0) {
			setFilter({
				...filter,
				page: filter.page - 1
			})
		}
	}
	const nextPage = (e) => {
		if (filter.page + 1 <= totalPage) {
			setFilter({
				...filter,
				page: filter.page + 1
			})
		}
	}
	const enterPage = (e) => {
		if (e.keyCode === 13) {
			if (e.target.value >= -9999999 && e.target.value <= 9999999) {
				if (e.target.value < 1) {
					toast.error("Page must larger than 1!")

				}
				else if (e.target.value > totalPage) {
					toast.error("Max Page is " + totalPage)
				}
				else {
					setFilter({
						...filter,
						page: e.target.value
					});
					e.target.value = "";
					e.target.blur();
				}
			}
			else {
				toast.error("Input in wrong format!");
			}
		}
	}
	return (
		<>
			<div className="patient-get-all p-5">
				{!patientData ? (
					<>
						<div>
							<h1>Patient Management</h1>
						</div>
						<hr />
						<DataLoading></DataLoading>
					</>
				) : (
					<>
						<div>
							<h1>Patient Management</h1>
						</div>
						<hr />
						<div className="filter row mb-4 justify-content-end">
							<div className="col-lg-3">
								<input type="text" placeholder="Search by UserName" className="form-control"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											setFilter({
												...filter,
												userName: e.target.value,
												page: 1
											});
										}
									}}
								/>
							</div>
							<div className="col-lg-3">
								<input type="text" placeholder="Search by Email" className="form-control"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											setFilter({
												...filter,
												email: e.target.value,
												page: 1
											});
										}
									}}
								/>
							</div>
							<div className="col-lg-3">
								<input type="text" placeholder="Search by PhoneNumber" className="form-control"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											setFilter({
												...filter,
												phoneNumber: e.target.value,
												page: 1
											});
										}
									}}
								/>
							</div>
						</div>
						<div className="overflow-auto mb-4">
							<table id="table" className="table table-hover">
								<thead>
									<tr className="table-dark">
										<th>User Name</th>
										<th>Full Name</th>
										<th>Email</th>
										<th>Phone Number</th>
										<th>Gender</th>
										<th>More</th>
									</tr>
								</thead>
								<tbody>
									{patientData.data.map((value, index) => (
										<tr key={index}>
											<td>{value.baseUser.userName}</td>
											<td>{value.baseUser.fullName}</td>
											<td>{value.baseUser.email}</td>
											<td>{value.baseUser.phoneNumber}</td>
											<td>{value.baseUser.gender}</td>
											<td>
												<Link
													to="info"
													state={value}
													className="btn btn-success"
												>
													<i className="fa-solid fa-circle-info"></i>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<Pagiation
							page={patientData.page}
							total_pages={patientData.total_pages}
							previousPage={peviousPage}
							nextPage={nextPage}
							enterPage={enterPage}
						/>
					</>
				)}
			</div>
		</>
	);
}

export default PatientGetAll;
