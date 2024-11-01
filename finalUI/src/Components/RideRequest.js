// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const RideRequests = () => {
//     const [rides, setRides] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [locationWatchId, setLocationWatchId] = useState(null);

//     // Function to update driver's location
//     const updateDriverLocation = async (position) => {
//         try {
//             const token = localStorage.getItem('token');
//             await axios.put('http://localhost:5000/api/driver/update-availability', {
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude
//             }, {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//         } catch (err) {
//             console.error('Error updating location:', err);
//         }
//     };

//     // Start location tracking
//     useEffect(() => {
//         const startLocationTracking = () => {
//             if ("geolocation" in navigator) {
//                 const watchId = navigator.geolocation.watchPosition(
//                     updateDriverLocation,
//                     (error) => console.error('Location error:', error),
//                     {
//                         enableHighAccuracy: true,
//                         timeout: 5000,
//                         maximumAge: 0
//                     }
//                 );
//                 setLocationWatchId(watchId);
//             } else {
//                 setError('Geolocation is not supported by your browser');
//             }
//         };

//         startLocationTracking();

//         // Cleanup location watching
//         return () => {
//             if (locationWatchId) {
//                 navigator.geolocation.clearWatch(locationWatchId);
//             }
//         };
//     }, []);

//     // Fetch nearby rides periodically
//     useEffect(() => {
//         const fetchNearbyRides = async () => {
//             try {
//                 const token = localStorage.getItem('token');
                
//                 if (!token) {
//                     setError('Please login to view ride requests');
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await axios.get('http://localhost:5000/api/driver/nearby-rides', {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });

//                 setRides(response.data.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching nearby rides:', err);
//                 setError(err.response?.data?.message || 'Error fetching nearby rides');
//                 setLoading(false);
//             }
//         };

//         fetchNearbyRides();
//         // Poll every 10 seconds
//         const interval = setInterval(fetchNearbyRides, 10000);
        
//         return () => clearInterval(interval);
//     }, []);

//     const handleAcceptRide = async (rideId) => {
//         try {
//             const token = localStorage.getItem('token');
//             await axios.post(`http://localhost:5000/api/driver/rides/${rideId}/accept`, {}, {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
            
//             // Remove the accepted ride from the list
//             setRides(prevRides => prevRides.filter(ride => ride._id !== rideId));
//         } catch (err) {
//             setError(err.response?.data?.message || 'Error accepting ride');
//         }
//     };

//     const handleDeclineRide = async (rideId) => {
//         try {
//             const token = localStorage.getItem('token');
//             await axios.post(`http://localhost:5000/api/driver/rides/${rideId}/decline`, {}, {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
            
//             setRides(prevRides => prevRides.filter(ride => ride._id !== rideId));
//         } catch (err) {
//             setError(err.response?.data?.message || 'Error declining ride');
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-[200px]">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
//                 <div className="flex">
//                     <div className="flex-shrink-0">
//                         <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                         </svg>
//                     </div>
//                     <div className="ml-3">
//                         <p className="text-sm text-red-700">{error}</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 max-w-6xl mx-auto">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//                 <div className="border-b border-gray-200 p-6">
//                     <h1 className="text-2xl font-bold text-gray-900">Nearby Ride Requests</h1>
//                 </div>
//                 <div className="p-6">
//                     {rides.length > 0 ? (
//                         <div className="space-y-4">
//                             {rides.map((ride) => (
//                                 <div
//                                     key={ride._id}
//                                     className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
//                                 >
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div className="space-y-3">
//                                             <div className="flex items-center gap-2">
//                                                 <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                                 </svg>
//                                                 <span className="font-medium text-gray-900">{ride.userId?.name}</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                                 </svg>
//                                                 <div>
//                                                     <p className="text-sm text-gray-600">Distance</p>
//                                                     <p className="font-medium text-gray-900">{ride.distanceToPickup} km</p>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                 </svg>
//                                                 <div>
//                                                     <p className="text-sm text-gray-600">Est. Pickup Time</p>
//                                                     <p className="font-medium text-gray-900">{ride.estimatedPickupTime} mins</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="flex items-center justify-end gap-3">
//                                             <button
//                                                 onClick={() => handleAcceptRide(ride._id)}
//                                                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                                             >
//                                                 Accept
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDeclineRide(ride._id)}
//                                                 className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
//                                             >
//                                                 Decline
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-8">
//                             <p className="text-gray-500">No nearby ride requests found.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RideRequests;