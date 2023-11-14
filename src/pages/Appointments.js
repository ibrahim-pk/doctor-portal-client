import React, { useState } from 'react';
import Layout from '../components/Layout';
import AppointmentBanner from './Appointment/AppointmentBanner';
import AvailableAppointments from './Appointment/AvailableAppointments';


const Appointments = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <Layout>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AppointmentBanner>
            <AvailableAppointments
                selectedDate={selectedDate}
            ></AvailableAppointments>
        </Layout>
    );
};
export default Appointments;
