import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function DoctorHome() {
  const userId=JSON.parse(localStorage.getItem('userInfo'))?._id
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();


  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const {data} = await axios.get(`https://portal-server-rosy.vercel.app/api/user/get-appointments-by-user-id/${userId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (data?.success) {
        console.log(data);
        setAppointments(data?.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
 
  const columns = [
    {
      title: 'Name',
      dataIndex: 'patientName',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'mobileNo',
      key: 'Phone',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span>
          {
            record.status===0?<p>Pending</p>:record.status===1?<p>Accept</p>:<p>Cancel</p>
          }
        </span>
      ),
    },
  ];
  


  useEffect(() => {
    getAppointmentsData();
  }, []);
  return  <Layout>
  <h1 className="page-title">Appointments</h1>
  <hr />
  <Table columns={columns} dataSource={appointments} />
</Layout>
}

export default DoctorHome;
