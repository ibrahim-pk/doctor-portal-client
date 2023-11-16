import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function Userslist() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setUsers(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const adminDoctor=users.filter((pd)=>pd.isAdmin)
  const allusers=users.filter((pd)=>(!(pd.isAdmin))&&(!(pd.isDoctor)))


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="anchor">{record.isAdmin?'Admin':record.isDoctor?'Doctor':'User'}</h1>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div>
      <h1 className="page-header">Admin or Doctor</h1>
      <hr />
      <Table columns={columns} dataSource={adminDoctor}/>
      </div>
      <hr />
      <div>
      <h1 className="page-header">Users</h1>
      <hr />
      <Table columns={columns} dataSource={allusers}/>
      </div>
    </Layout>
  );
}

export default Userslist;
