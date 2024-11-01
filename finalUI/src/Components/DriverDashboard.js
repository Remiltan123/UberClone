
// import React, { useState, useEffect } from 'react';
// import CompletedRides from './CompletedRides';
// // import RideRequests from './RideRequest';
// import PaymentInfo from './PaymentInfo';
// import '../CSS/DriverDashboard.css';
// import axios from 'axios';
// import io from 'socket.io-client';

// // Initialize the Socket.io client
// const socket = io('http://localhost:5000'); // Update with your server URL

// const DriverDashboard = () => {
//   const [isAvailable, setIsAvailable] = useState(false);
//   const [locationError, setLocationError] = useState('');
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [address, setAddress] = useState('');
//   const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
//   const [nearbyPlaces, setNearbyPlaces] = useState([]);
//   const [newRideRequest, setNewRideRequest] = useState(null);

//   const toggleAvailability = () => {
//     if (!isAvailable) {
//       getLiveLocation();
//     } else {
//       setAddress('');
//       setCoordinates({ latitude: null, longitude: null });
//       setNearbyPlaces([]);
//       updateDriverStatus(false, '', { latitude: null, longitude: null });
//     }
//     setIsAvailable(!isAvailable);
//   };

//   const getLiveLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocationError('');
//           fetchAddress(latitude, longitude);
//           setCoordinates({ latitude, longitude });
//         },
//         (error) => {
//           setLocationError('Unable to retrieve your location.');
//         }
//       );
//     } else {
//       setLocationError('Geolocation is not supported by your browser.');
//     }
//   };

//   const fetchAddress = async (latitude, longitude) => {
//     const apiUrl = `https://google-map-places.p.rapidapi.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=en&region=en`;
//     try {
//       const response = await axios.get(apiUrl, {
//         headers: {
//           'x-rapidapi-key': '962111a97cmshe5fa71b93e2a226p128708jsn2f0b2b4e19e8',
//           'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
//         },
//       });
//       if (response.data && response.data.results && response.data.results.length > 0) {
//         const formattedAddress = response.data.results[0].formatted_address;
//         setAddress(formattedAddress);
//         loadGoogleMap(latitude, longitude);
//         fetchNearbyPlaces(formattedAddress);
//         updateDriverStatus(true, formattedAddress, { latitude, longitude });
//       } else {
//         setLocationError('Unable to fetch address.');
//       }
//     } catch (error) {
//       setLocationError('Error fetching location data.');
//       console.error(error);
//     }
//   };

//   const fetchNearbyPlaces = async (searchAddress) => {
//     const apiUrl = `https://google-map-places.p.rapidapi.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(searchAddress)}&inputtype=textquery&language=en`;
//     try {
//       const response = await axios.get(apiUrl, {
//         headers: {
//           'x-rapidapi-key': '962111a97cmshe5fa71b93e2a226p128708jsn2f0b2b4e19e8',
//           'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
//         },
//       });
//       if (response.data && response.data.candidates) {
//         setNearbyPlaces(response.data.candidates);
//       } else {
//         console.error('No nearby places found');
//       }
//     } catch (error) {
//       console.error('Error fetching nearby places:', error);
//     }
//   };

//   const updateDriverStatus = async (availability, driverAddress, coordinates) => {
//     try {
//       const driverId = localStorage.getItem('driverId');
//       const response = await axios.post('http://localhost:5000/api/driver/update-availability', {
//         driverId,
//         isAvailable: availability,
//         liveLocation: {
//           address: driverAddress,
//           coordinates: [coordinates.longitude, coordinates.latitude], // Change this to an array
//         },
//       });
//       console.log('Driver status updated successfully:', response.data);
//     } catch (error) {
//       console.error('Error updating driver status:', error);
//     }
//   };

//   const loadGoogleMap = (latitude, longitude) => {
//     if (window.google) {
//       const map = new window.google.maps.Map(document.getElementById('map'), {
//         center: { lat: latitude, lng: longitude },
//         zoom: 15,
//       });

//       new window.google.maps.Marker({
//         position: { lat: latitude, lng: longitude },
//         map: map,
//         title: 'Your Location',
//       });

//       setMapLoaded(true);
//     }
//   };

//   // Socket.io listener for new ride requests
//   useEffect(() => {
//     // Listen for 'newRideRequest' event
//     socket.on('newRideRequest', (rideData) => {
//       setNewRideRequest(rideData); // Store ride request data
//       alert('New ride request received!'); // Show notification
//     });

//     return () => {
//       socket.off('newRideRequest');
//     };
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <h1>Driver Dashboard</h1>

//       <div className="availability-section">
//         <h2>Availability Status</h2>
//         <button onClick={toggleAvailability} className={`availability-button ${isAvailable ? 'available' : 'unavailable'}`}>
//           {isAvailable ? 'Available for Rides' : 'Unavailable for Rides'}
//         </button>
//         {locationError && <p className="error-text">{locationError}</p>}
//       </div>

//       {mapLoaded && (
//         <div className="map-container">
//           <h3>Your Current Location</h3>
//           <div id="map" style={{ width: '100%', height: '400px' }}></div>
//           {address && <p><strong>Address:</strong> {address}</p>}
//           {coordinates.latitude && coordinates.longitude && (
//             <p>
//               <strong>Coordinates:</strong> Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
//             </p>
//           )}
//         </div>
//       )}

//       {nearbyPlaces.length > 0 && (
//         <div className="nearby-places">
//           <h3>Nearby Places</h3>
//           <ul>
//             {nearbyPlaces.map((place, index) => (
//               <li key={index}>{place.name} - {place.formatted_address}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* <RideRequests /> */}
//       <CompletedRides />
//       <PaymentInfo />

//       {newRideRequest && (
//         <div className="ride-request-notification">
//           <h2>New Ride Request</h2>
//           <p>Pickup Location: {newRideRequest.pickupLocation}</p>
//           <p>Destination: {newRideRequest.destination}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DriverDashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../CSS/DriverDashboard.css';
// import { useParams } from 'react-router-dom';

// const DriverDashboard = () => {
//     const [isAvailable, setIsAvailable] = useState(false);
//     const [locationError, setLocationError] = useState('');
//     const [rideRequests, setRideRequests] = useState([]);
//     const { token } = useParams();

//     const toggleAvailability = () => {
//         setIsAvailable(!isAvailable);
//         if (!isAvailable) {
//             fetchRideRequests(); // Fetch ride requests when the driver becomes available
//         } else {
//             setRideRequests([]); // Clear requests when unavailable
//         }
//     };

//     const fetchRideRequests = async () => {
//         try {
//             const response = await axios.post(`http://localhost:5000/api/driver/ride-requests/${token}`);
//             setRideRequests(response.data.nearbyRequests); // Set the fetched ride requests
//             alert("Hi")
//         } catch (error) {
//             setLocationError('Error fetching ride requests.');
//             console.error('Error fetching ride requests:', error);
//         }
//     };

//     return (
//         <div className="dashboard-container">
//             <h1>Driver Dashboard</h1>

//             <div className="availability-section">
//                 <h2>Availability Status</h2>
//                 <button
//                     onClick={toggleAvailability}
//                     className={`availability-button ${isAvailable ? 'available' : 'unavailable'}`}
//                 >
//                     {isAvailable ? 'Available for Rides' : 'Unavailable for Rides'}
//                 </button>
//                 {locationError && <p className="error-text">{locationError}</p>}
//             </div>

//             {isAvailable && rideRequests.length > 0 && (
//                 <div className="ride-requests-section">
//                     <h3>Nearby Ride Requests</h3>
//                     <ul>
//                         {rideRequests.map((request, index) => (
//                             <li key={index}>
//                                 <p><strong>Pickup Location:</strong> {request.pickup.coordinates.join(', ')}</p>
//                                 <p><strong>Dropoff Location:</strong> {request.dropoff.address}</p>
//                                 <p><strong>Status:</strong> {request.status}</p>
//                                 <p><strong>Vehicle Type:</strong> {request.vehicleType}</p>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {isAvailable && rideRequests.length === 0 && (
//                 <p>No nearby ride requests available.</p>
//             )}
//         </div>
//     );
// };






// // export default DriverDashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import '../CSS/DriverDashboard.css';
// import { useParams } from 'react-router-dom';

// // Fix default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// const DriverDashboard = () => {
//   const [isAvailable, setIsAvailable] = useState(false);
//   const [locationError, setLocationError] = useState('');
//   const [rideRequests, setRideRequests] = useState([]);
//   const { token } = useParams();

//   const toggleAvailability = () => {
//     setIsAvailable(!isAvailable);
//     if (!isAvailable) {
//       fetchRideRequests(); // Fetch ride requests when the driver becomes available
//     } else {
//       setRideRequests([]); // Clear requests when unavailable
//     }
//   };

//   const fetchRideRequests = async () => {
//     try {
//       const response = await axios.post(`http://localhost:5000/api/driver/ride-requests/${token}`);
//       const requests = response.data.nearbyRequests;

//       // Fetch user details for each request
//       const requestsWithUserData = await Promise.all(
//         requests.map(async (request) => {
//           try {
//             const userResponse = await axios.post('http://localhost:5000/api/driver/getuser', {
//               id: request.userId,
//             });
//             return {
//               ...request,
//               userName: userResponse.data.username,
//               userEmail: userResponse.data.email,
//             };
//           } catch (error) {
//             console.error('Error fetching user details:', error);
//             return request; // Return request as is if user details fetch fails
//           }
//         })
//       );

//       setRideRequests(requestsWithUserData); // Set ride requests with user details
//     } catch (error) {
//       setLocationError('Error fetching ride requests.');
//       console.error('Error fetching ride requests:', error);
//     }
//   };

//   const acceptRideRequest = async (rideRequestId) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/driver/accept/${rideRequestId}`);
//       if (response.status === 200) {
//         // Update the local state to reflect the accepted status
//         setRideRequests((prevRequests) =>
//           prevRequests.map((request) =>
//             request._id === rideRequestId ? { ...request, status: 'accepted' } : request
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Error accepting ride request:', error);
//       alert('Failed to accept the ride request. Please try again.');
//     }
//   };

//   return (
//     <div className="dashboard-container p-4">
//       <h1 className="text-2xl font-bold">Driver Dashboard</h1>

//       <div className="availability-section my-4">
//         <h2 className="text-xl">Availability Status</h2>
//         <button
//           onClick={toggleAvailability}
//           className={`availability-button mt-2 p-2 rounded ${isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
//             }`}
//         >
//           {isAvailable ? 'Available for Rides' : 'Unavailable for Rides'}
//         </button>
//         {locationError && <p className="error-text text-red-500">{locationError}</p>}
//       </div>

//       {isAvailable && rideRequests.length > 0 && (
//         <div className="ride-requests-section mt-4">
//           {rideRequests.map((request, index) => (
//             <div key={index} className="request-card border rounded shadow-lg mb-4">
//               <div className="map-container">
//                 <MapContainer
//                   center={request.pickup.coordinates.reverse()}
//                   zoom={13}
//                   style={{ height: '250px', width: '100%' }}
//                   className="rounded-t"
//                 >
//                   <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   />
//                   <Marker position={request.pickup.coordinates.reverse()}>
//                     <Popup>
//                       <strong>Pickup:</strong> {request.pickup.address}
//                     </Popup>
//                   </Marker>
//                   <Marker position={request.dropoff.coordinates.reverse()}>
//                     <Popup>
//                       <strong>Dropoff:</strong> {request.dropoff.address}
//                     </Popup>
//                   </Marker>
//                 </MapContainer>
//               </div>
//               <div className="request-details p-4">
//                 <h3 className="text-lg font-semibold">Ride Request Details</h3>
//                 <p><strong>Pickup Location:</strong> {request.pickup.address}</p>
//                 <p><strong>Dropoff Location:</strong> {request.dropoff.address}</p>
//                 <p><strong>Status:</strong> {request.status}</p>
//                 <p><strong>Vehicle Type:</strong> {request.vehicleType}</p>
//                 <p><strong>No of Passengers:</strong> {request.numPassengers}</p>
//                 <p><strong>User Name:</strong> {request.userName || 'Not available'}</p>
//                 <p><strong>User Email:</strong> {request.userEmail || 'Not available'}</p>

//                 <div className="flex justify-center p-5">
//                   <button
//                     className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mx-2 rounded"
//                     onClick={() => acceptRideRequest(request._id)} // Call accept function on click
//                     disabled={request.status === 'accepted'} // Disable button if already accepted
//                   >
//                     Accept
//                   </button>
//                   <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mx-2 rounded">
//                     cannel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {isAvailable && rideRequests.length === 0 && (
//         <p>No nearby ride requests available.</p>
//       )}
//     </div>
//   );
// };

// export default DriverDashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../CSS/DriverDashboard.css';
import { useParams } from 'react-router-dom';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const DriverDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [rideRequests, setRideRequests] = useState([]);
  const { token } = useParams();

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    if (!isAvailable) {
      fetchRideRequests();
    } else {
      setRideRequests([]);
    }
  };

  const fetchRideRequests = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/driver/ride-requests/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error if the response is not OK
      }

      const data = await response.json(); // Parse the JSON response
      if (data.nearbyRequest) {
        // Fetch user details for the nearby request
        const userResponse = await fetch(`http://localhost:5000/api/driver/user/${data.nearbyRequest.userId}`);
        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }
        const userDetails = await userResponse.json();

        // Set the ride request along with user details
        const requestWithUserDetails = {
          ...data.nearbyRequest,
          userName: userDetails.username,
          userEmail: userDetails.email,
        };

        setRideRequests([requestWithUserDetails]); // Set rideRequests to an array containing the single request
      } else {
        setRideRequests([]); // No nearby requests found
        setLocationError('No nearby ride requests available.');
      }
    } catch (error) {
      setLocationError('Error fetching ride requests.');
      console.error('Error fetching ride requests:', error);
    }
  };

  const acceptRideRequest = async (rideRequestId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/driver/accept/${rideRequestId}`);
      if (response.status === 200) {
        // Update the local state with the new status
        setRideRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === rideRequestId ? { ...request, status: 'accepted' } : request
          )
        );
      }
    } catch (error) {
      console.error('Error accepting ride request:', error);
      setLocationError('Failed to accept the ride request. Please try again.');
    }
  };

  return (
    <div className="dashboard-container p-4">
      <h1 className="text-2xl font-bold">Driver Dashboard</h1>

      <div className="availability-section my-4">
        <h2 className="text-xl">Availability Status</h2>
        <button
          onClick={toggleAvailability}
          className={`availability-button mt-2 p-2 rounded ${isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {isAvailable ? 'Available for Rides' : 'Unavailable for Rides'}
        </button>
        {locationError && <p className="error-text text-red-500">{locationError}</p>}
      </div>

      {isAvailable && rideRequests.length > 0 && (
        <div className="ride-requests-section mt-4">
          {rideRequests.map((request) => (
            <div key={request._id} className="request-card border rounded shadow-lg mb-4">
              <div className="map-container">
                <MapContainer
                  center={request.pickup.coordinates.coordinates.reverse()} // Adjusted to ensure proper coordinates
                  zoom={13}
                  style={{ height: '250px', width: '100%' }}
                  className="rounded-t"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={request.pickup.coordinates.coordinates.reverse()}>
                    <Popup>
                      <strong>Pickup:</strong> {request.pickup.address}
                    </Popup>
                  </Marker>
                  <Marker position={request.dropoff.coordinates.coordinates.reverse()}>
                    <Popup>
                      <strong>Dropoff:</strong> {request.dropoff.address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className="request-details p-4">
                <h3 className="text-lg font-semibold">Ride Request Details</h3>
                <p><strong>Pickup Location:</strong> {request.pickup.address}</p>
                <p><strong>Dropoff Location:</strong> {request.dropoff.address}</p>
                <p><strong>Status:</strong> {request.status}</p>
                <p><strong>Vehicle Type:</strong> {request.vehicleType}</p>
                <p><strong>No of Passengers:</strong> {request.numPassengers}</p>
                <p><strong>User Name:</strong> {request.userName || 'Not available'}</p>
                <p><strong>User Email:</strong> {request.userEmail || 'Not available'}</p>
            
                  <button 
                    className="accept-button bg-blue-500 text-white py-1 px-3 rounded" 
                    onClick={() => acceptRideRequest(request._id)} // Call the accept function
                  >
                    Accept Ride
                  </button>
             
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
