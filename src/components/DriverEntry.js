//layout for each driver entry component
import React from 'react';
import './DriverEntry.css';

const DriverEntry = ({key, driver}) => {
    return(
    <div className="driver-entry">
      <div className="driver-details">
        <h4>
        <b>{driver.key}</b>
        </h4>

      </div>
    </div>
  );
};

export default DriverEntry;
