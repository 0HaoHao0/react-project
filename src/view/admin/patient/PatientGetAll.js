import { useEffect, useState } from "react";
import { getAllPatient } from "../../../services/admin/patient/apiPatient";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function PatientGetAll() {
  const [patientData, setPatientData] = useState();

  const currentPage = patientData ? patientData.page : null;
  const totalPage = patientData ? patientData.total_pages : null;


  const loadData = async (page) => {
    const res = await getAllPatient(page);

    setPatientData(res.data);

    $('#table').DataTable({
      destroy: true,
      retrieve: true,
      paging: false,
    });
  };

  useEffect(() => {
    loadData();
  }, []);


  // Pagination
  const peviousPage = () => {
    loadData(currentPage - 1);
  }
  const nextPage = (e) => {
    loadData(currentPage + 1);
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
          loadData(e.target.value);
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
            <div className="overflow-auto mb-4">
              <table id="table" className="table table-hover">
                <thead>
                  <tr className="table-dark">
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
