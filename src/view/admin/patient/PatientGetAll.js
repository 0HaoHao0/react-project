import { useEffect, useState } from "react";
import { getAllPatient } from "../../../services/admin/patient/apiPatient";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
function PatientGetAll() {
  const [patientData, setPatientData] = useState();

  const loadData = async () => {
    const res = await getAllPatient();

    setPatientData(res.data);

    $("#table").DataTable({
      paging: false,
      ordering: false,
    });
  };

  useEffect(() => {
    loadData();
    return () => {
      $("#table").dataTable().fnDestroy();
    };
  }, []);

  return (
    <>
      <div>
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
            <div className="overflow-auto mb-4">
              <table id="table" className="table table-hover">
                <thead>
                  <tr className="bg-dark">
                    <th>No.</th>
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
                      <td>{index}</td>
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
                          <i class="fa-solid fa-circle-info"></i>
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
            />
          </>
        )}
      </div>
    </>
  );
}

export default PatientGetAll;
