import React, { useState } from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import axios from "axios";
const AppointmentOption = ({ appointmentOption,date, setTreatment }) => {
  const { title, time, value } = appointmentOption;
  const [open, setOpen] = useState(false);
  const userId=JSON.parse(localStorage.getItem('userInfo'))?._id
  const [loader, setLoader] = useState(false)
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(false)
  const [formData, setFormData] = useState({
    patientName:JSON.parse(localStorage.getItem('userInfo'))?.name,
    studentId: '',
    mobileNo: '',
    date: date,
    time: time,
    gender:'',
    issues:'',
    slot:value,
    userId:userId
  });

  const onOpenModal = async() =>{
    console.log(value,date,time);
    setOpen(true)
    const bookData={
      value,
      date,time
    }
    setLoader(true)
     const {data}=await axios.post('https://portal-server-rosy.vercel.app/api/user/available-appointment',bookData)
     setLoader(false)
     if(data?.msg){
      toast.error(data?.msg,5000);
      setDisabledSubmitBtn(true)
     }else{
      toast.error("Something Wrong");
     }
    
  } 
  const onCloseModal = () => setOpen(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        gender: '',
        issues:'',
        userId:''
      });
     }else{
      toast.error("Something Wrong");
     }
  };






  return (
    <div className="card">
      <div className="card-body text-center">
        <h4 className="text-center">{title}</h4>
        <h6 className="text-center">{time}</h6>
        
        <button className="btn btn-sm btn-info" onClick={onOpenModal}>Booked Appointment</button>
      <Modal open={open} onClose={onCloseModal} center>
      <div className="container">
      <div className="card p-3 mt-3">
        <div className="">
          <h4>Doctor Appointment Form</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group my-1">
              <label>Full Name</label>
              <input
               disabled="true"
                type="text"
                className="form-control"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-1">
              <label>Gender</label>
              <input
                type="text"
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-1">
              <label>ID</label>
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
              <label>Time</label>
              <input
                disabled="true"
                type="text"
                className="form-control"
                name="time"
                value={time}
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                disabled="true"
                type="text"
                className="form-control"
                name="date"
                value={date}
                required
              />
            </div>
            

            <div className="form-group my-1">
              <label>Issues</label>
              <textarea
                type="text"
                className="form-control"
                name="issues"
                value={formData.issues}
                onChange={handleChange}
                required
              />
            </div>
          
            <button disabled={disabledSubmitBtn} className="btn btn-primary my-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
      </Modal>
    
      </div>
    </div>
  );
};

export default AppointmentOption;
