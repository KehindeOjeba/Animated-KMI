/**
 * Checkout Success Component
 */

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export function CheckoutSuccess() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    // Fetch order details from session
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/checkout/success?session_id=${sessionId}`
        );
        if (!response.ok) throw new Error('Failed to fetch order details');
        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

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
          <button
            onClick={() => navigate('/')}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
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
            {/* Order Number */}
            <div className="mb-6 pb-6 border-b">
              <p className="text-gray-600 text-sm">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">{orderDetails.orderNumber}</p>
            </div>

            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-6 pb-6 border-b">
              <div>
                <p className="text-gray-600 text-sm mb-1">Order Placed</p>
                <p className="text-gray-900 font-medium">
                  {new Date(orderDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Email</p>
                <p className="text-gray-900 font-medium">{orderDetails.customerEmail}</p>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6 pb-6 border-b">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-2">
                {orderDetails.items?.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-gray-800">
                    <span>
                      {item.productName} × {item.quantity}
                    </span>
                    <span>${((item.productPrice * item.quantity) / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="mb-6">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${(orderDetails.totalAmount / 100).toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">Shipping To</p>
              <p className="text-gray-900 font-medium">{orderDetails.customerName}</p>
              <p className="text-gray-700">{orderDetails.shippingAddress}</p>
              <p className="text-gray-700">
                {orderDetails.shippingCity}, {orderDetails.shippingState}{' '}
                {orderDetails.shippingZip}
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
