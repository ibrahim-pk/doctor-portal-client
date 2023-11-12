
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
 // You can create a separate CSS file for styling
import axios from 'axios'
import toast from 'react-hot-toast';
const timeSlots = [
  '10:00am-11:00am',
  '11:00am-12:00pm',
  '2:00pm-3:00pm',
  '3:00pm-4:00pm',
];

const Appointments=()=> {
 const userId=JSON.parse(localStorage.getItem('userInfo'))?._id
 const [loader, setLoader] = useState(false)
 const [appointments, setAppointments] = useState([]);

  
  const [formData, setFormData] = useState({
    patientName: '',
    studentId: '',
    mobileNo: '',
    date: '',
    time: '',
    userId:userId
  });
 useEffect(()=>{
   const fetchData=async()=>{

    const { data } = await axios.get(
      `https://portal-server-rosy.vercel.app/api/user/get-appointments-by-user-id/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setAppointments(data?.data)
    //console.log(data);

   }
   fetchData()

  
 },[])

 const appointmentStatus=appointments.filter((pd)=>pd.status===0)



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTimeSelect = (time) => {
    setFormData({
      ...formData,
      time: time,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log(formData);
    setLoader(true)
     const {data}=await axios.post('https://portal-server-rosy.vercel.app/api/user/book-appointment',formData)
     setLoader(false)
     if(data?.msg){
      toast.success(data?.msg);
      setFormData({
        patientName: '',
        studentId: '',
        mobileNo: '',
        date: '',
        time: '',
        userId:''
      });
     }else{
      toast.error("Something Wrong");
     }
  };

  return (
    <Layout>
      {loader && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <div className="container">
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
          <h3>Doctor Appointment Form</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-1">
              <label>Patient Name</label>
              <input
                type="text"
                className="form-control"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-1">
              <label>Student ID</label>
              <input
                type="text"
                className="form-control"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-1">
              <label>Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-1">
              <label>Time</label>
              <select
                className="form-control"
                name="time"
                value={formData.time}
                onChange={(e) => handleTimeSelect(e.target.value)}
                required
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((timeSlot,i) => (
                  <option key={i} value={timeSlot}>
                    {timeSlot}
                  </option>
                ))}
              </select>
            </div>
            <button disabled={appointmentStatus.length>0?'true':''} className="btn btn-primary my-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default Appointments;
