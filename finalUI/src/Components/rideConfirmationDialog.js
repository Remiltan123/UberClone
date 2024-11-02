// RideConfirmationDialog.js
import Loader from "../Components/Loader/Loader";
import React from 'react';

const RideConfirmationDialog = ({ pickup, dropoff, vehicleType, numPassengers, onConfirm, onCancel, loading }) => {
  console.log(vehicleType)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1050]">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 md:mx-0 z-[1051]">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Confirm Ride Details</h3>
        <div className="text-gray-600 space-y-2">
          <p><strong>Pickup:</strong> {pickup}</p>
          <p><strong>Dropoff:</strong> {dropoff}</p>
          <p><strong>Vehicle Type:</strong> {vehicleType}</p>
          <p><strong>Number of Passengers:</strong> {numPassengers}</p>
        </div>
        <h3 className='font-bold mt-4' style={{ fontSize: '24px' }}>Are you sure you want to confirm your ride?</h3>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm Ride
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      {loading && <Loader />} {/* Show loader when loading is true */}
    </div>
  );
};

export default RideConfirmationDialog;
