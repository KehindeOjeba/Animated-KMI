/**
 * Checkout Success Page
 * After successful Paystack payment
 */

'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const reference = queryParams.get('reference');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setError('No payment reference found');
      setLoading(false);
      return;
    }

    // Verify transaction and fetch order details
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/checkout?reference=${reference}`);
        if (!response.ok) throw new Error('Failed to fetch order details');
        const data = await response.json();
        setOrderDetails(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [reference]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Processing your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => navigate('/')} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            {/* Payment Reference */}
            <div className="mb-6 pb-6 border-b">
              <p className="text-gray-600 text-sm">Payment Reference</p>
              <p className="text-2xl font-bold text-gray-900 break-all">{orderDetails.reference}</p>
            </div>

            {/* Payment Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-6 pb-6 border-b">
              <div>
                <p className="text-gray-600 text-sm mb-1">Amount Paid</p>
                <p className="text-gray-900 font-medium">₦{(orderDetails.amount / 100).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Email</p>
                <p className="text-gray-900 font-medium">{orderDetails.customer?.email}</p>
              </div>
            </div>

            {/* Payment Status */}
            <div className="mb-6 pb-6 border-b">
              <p className="text-gray-600 text-sm mb-1">Payment Status</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-900 font-medium capitalize">{orderDetails.status}</span>
              </div>
            </div>

            {/* Transaction Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">Transaction Date</p>
              <p className="text-gray-900 font-medium">
                {new Date(orderDetails.paid_at).toLocaleDateString('en-NG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3">What's Next?</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Check your email for order confirmation</li>
            <li>✓ Your order will be processed within 24 hours</li>
            <li>✓ You'll receive a tracking number once shipped</li>
            <li>✓ Your payment has been successfully received</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
          <a
            href="mailto:support@kensmadeit.com"
            className="flex-1 border border-gray-300 text-gray-900 text-center px-6 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
