import React from 'react';

const CompletedRides = () => {
  const completedRides = [
    { id: 1, distance: '15 km', passengers: 3, earnings: '$20' },
    { id: 2, distance: '10 km', passengers: 2, earnings: '$15' },
    { id: 3, distance: '25 km', passengers: 4, earnings: '$30' },
  ];

  return (
    <div className="completed-rides-section">
      <h2>Completed Rides</h2>
      <ul>
        {completedRides.map((ride) => (
          <li key={ride.id}>
            Distance: {ride.distance}, Passengers: {ride.passengers}, Earnings: {ride.earnings}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedRides;
