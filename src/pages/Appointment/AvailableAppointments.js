import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';

import AppointmentOption from './AppointmentOption';
import BookingModal from './BookingModal';
import Loading from '../../components/Loading';


const AvailableAppointments = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);
     const date = format(selectedDate, 'PP');

    // const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
    //     queryKey: ['appointmentOptions', date],
    //     queryFn: async () => {
    //         const res = await fetch(`https://doctors-portal-server-rust.vercel.app/v2/appointmentOptions?date=${date}`);
    //         const data = await res.json();
    //         return data
    //     }
    // });

    // if(isLoading){
    //     return <Loading />
    // }


    const appointmentOptions=[
        {
            title:'Counseling Psychology',
            time:"10:00AM-11:00AM",
            value:1,

        },
        {
            title:'Counseling Psychology',
            time:"11:00AM-12:00AM",
            value:2,

        },
        {
            title:'Counseling Psychology',
            time:"12:00AM-1:00PM",
            value:3,

        },
        {
            title:'Counseling Psychology',
            time:"2:00PM-3:00PM",
            value:4,

        },
        {
            title:'Counseling Psychology',
            time:"3:00PM-3:00PM",
            value:5,

        }
    ]



    return (
        <section className='my-4'>
            <h4 className='text-primary my-3 text-center'>Available Appointments on {format(selectedDate, 'PP')}</h4>
            
            <div className='row'>
            
                {
                    appointmentOptions.map(option =><div className='col-md-4 col-lg-4 col-sm-6 my-2' >
                     <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                        date={date}
                    ></AppointmentOption>
                    
                    </div>
                    
                    )
                }
            
            </div>
        </section>
    );
};

export default AvailableAppointments;