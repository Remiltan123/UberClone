import React from 'react';

const PaymentInfo = () => {
  const earningsData = {
    totalEarnings: '$100',
    recentPayments: [
      { id: 1, amount: '$20', date: '2024-09-25' },
      { id: 2, amount: '$15', date: '2024-09-24' },
      { id: 3, amount: '$30', date: '2024-09-23' },
    ],
  };

  return (
    <div className="payment-info-section">
      <h2>Payment Information</h2>
      <p>Total Earnings: {earningsData.totalEarnings}</p>
      <h3>Recent Payments</h3>
      <ul>
        {earningsData.recentPayments.map((payment) => (
          <li key={payment.id}>
            Amount: {payment.amount}, Date: {payment.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentInfo;
