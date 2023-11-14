import React from 'react';

import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({selectedDate, setSelectedDate}) => {
    
    return (
        <header className='my-6'>
            <div className="">
                <div style={{
                    display:"flex",
                    justifyContent:'space-evenly',
                    flexDirection:'row-reverse'
                }}>
                    <img style={{
                        width:'500px',
                        height:'auto'
                    }} src="/image/meet.jpg" alt="" className="" />
                    <div className=''>
                        <DayPicker 
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;