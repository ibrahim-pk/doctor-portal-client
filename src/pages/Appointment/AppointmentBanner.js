import React from 'react';

import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({selectedDate, setSelectedDate}) => {
    
    return (
        <header className='my-6'>
            <div className="row gap-4 BannerSection">
                <div className='col-md-5'>
                    <img  src="/image/meet.jpg" alt="" className="" />
                     </div>
                     <div className='col-md-1'>

                     </div>
                    <div className='col-md-5'>
                        <DayPicker 
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </div>
               
            </div>
        </header>
    );
};

export default AppointmentBanner;