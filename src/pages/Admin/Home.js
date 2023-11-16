import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [allAppoint, setAllAppoint] = useState([]);
  const [filterRecord, setFilterRecors] = useState([]);

  useEffect(() => {
    const formData = async () => {
      const { data } = await axios.get(
        `https://portal-server-rosy.vercel.app/api/user/get-all-appointments`,
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAllAppoint(data?.data);
      console.log(data);
    };
    formData();
  }, []);


  const approveData=allAppoint.filter((pd)=>pd.status===1)
  const pendingData=allAppoint.filter((pd)=>pd.status===0)
  const cancelData=allAppoint.filter((pd)=>pd.status===-1)
 
  const filterData=(id)=>{
   const filterInfo= allAppoint.filter((pd)=>pd.status===id)
   setFilterRecors(filterInfo)
  }


  const columns = [
    {
      title: "Name",
      dataIndex: "patientName",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "mobileNo",
      key: "Phone",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span>
          {
           record.status === 0 ? (
            <p>Pending</p>
          ) : record.status === 1 ? (
            <p>Accept</p>
          ) : (
            <p>Cancel</p>
          )}
        </span>
      ),
    },
  ];

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-4 text-center">
          <div class="card bg-success text-white">
            <div class="card-body">
              <h5 class="card-title">Approved Patients</h5>
              <h6 class="card-text ">Number:{approveData?.length}</h6>
              <button onClick={()=>filterData(1)} to="#" class="btn btn-sm my-2 btn-light">
                View
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-4 text-center">
          <div class="card bg-warning text-dark">
            <div class="card-body">
              <h5 class="card-title">Pending Patients</h5>
              <h6 class="card-text">Number:{pendingData?.length}</h6>
              <button onClick={()=>filterData(0)} class="btn btn-sm my-2 btn-dark">
                View
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-4 text-center">
          <div class="card bg-danger text-white">
            <div class="card-body">
              <h5 class="card-title">Cancelled Patients</h5>
              <h6 class="card-text">Number:{cancelData?.length}</h6>
              <button onClick={()=>filterData(-1)} to="#" class="btn btn-sm my-2 btn-light">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
            <h1 className="page-title">Appointments</h1>
            <hr />
            <Table columns={columns} dataSource={filterRecord} />
          </div>
    </div>
  );
};

export default AdminHome;
