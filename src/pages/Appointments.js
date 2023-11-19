import React, { useState } from 'react';
import Layout from '../components/Layout';
import AppointmentBanner from './Appointment/AppointmentBanner';
import AvailableAppointments from './Appointment/AvailableAppointments';


const Appointments = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <Layout>
            <div className='mx-2'>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AppointmentBanner>
            <AvailableAppointments
                selectedDate={selectedDate}
            ></AvailableAppointments>
            </div>
        </Layout>
    );
};
export default Appointments;
