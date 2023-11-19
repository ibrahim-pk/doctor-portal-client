import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import AdminHome from "./Admin/Home";

function Home() {
  const userId = JSON.parse(localStorage.getItem("userInfo"))?._id;
  const admin = JSON.parse(localStorage.getItem("userInfo"))?.isAdmin;
  const doctor = JSON.parse(localStorage.getItem("userInfo"))?.isDoctor;
  const [appointments, setAppointments] = useState([]);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      if (doctor === true) {
        //console.log("doctor");
        const { data } = await axios.get(
          `https://portal-server-rosy.vercel.app/api/user/get-all-appointments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (data?.success) {
          //console.log(data);
          setAppointments(data?.data);
        }
      } else {
        // console.log("user");
        const { data } = await axios.get(
          `https://portal-server-rosy.vercel.app/api/user/get-appointments-by-user-id/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (data?.success) {
          //console.log(data);
          setAppointments(data?.data);
        }
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const handleApprove = async ({ id, status, phone }) => {
    //console.log(id,status,phone,msg);
    const formData = {
      id: id,
      status: status,
      msg: msg,
      phoneNo: phone,
    };
    const { data } = await axios.put(
      `https://portal-server-rosy.vercel.app/api/user/update-appointments-by-id/${id}`,
      {
        formData,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (data?.msg) {
      //console.log(data);
      // console.log(data);
      toast.success(data?.msg);
      setMsg("");
      window.location.href = "/";
    }
  };

  // const handleCancel = async (id) => {
  //   const { data } = await axios.put(
  //     `https://portal-server-rosy.vercel.app/api/user/update-appointments-by-id/${id}`,
  //     {
  //       status: -1,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   );
  //   if (data?.msg) {
  //     //console.log(data);
  //     // console.log(data);
  //     toast.success(data?.msg);
  //   }
  // };

  const handleCancel = async ({ id, status, phone }) => {
    //console.log(id,status,phone,msg);
    const formData = {
      id: id,
      status: status,
      msg: msg,
      phoneNo: phone,
    };
    const { data } = await axios.put(
      `https://portal-server-rosy.vercel.app/api/user/update-appointments-by-id/${id}`,
      {
        formData,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (data?.msg) {
      //console.log(data);
      // console.log(data);
      toast.success(data?.msg);
      setMsg("");
      window.location.href = "/";
    }
  };

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
          {doctor ? (
            <div>
              <textarea
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Your message"
              />
              <br />
              <button
                data-toggle="modal"
                data-target="#exampleModalCenter"
                type="button"
                disabled={record.status === 1 ? true : false}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  marginRight: "5px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
                onClick={() =>
                  handleApprove({
                    id: record?._id,
                    status: 1,
                    phone: record?.mobileNo,
                  })
                }
              >
                Approve
              </button>
              <button
                disabled={record.status === -1 ? true : false}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  marginRight: "5px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
                onClick={() =>
                  handleCancel({
                    id: record?._id,
                    status: 1,
                    phone: record?.mobileNo,
                  })
                }
              >
                Cancel
              </button>
            </div>
          ) : record.status === 0 ? (
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
// use useeffect
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
    <Layout>
      <div>
        {admin && (
          <div>
           <AdminHome />
          </div>
        )}
        {!admin && (
          <div>
            <h1 className="page-title">Appointments</h1>
            <hr />
            <Table columns={columns} dataSource={appointments} />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;
