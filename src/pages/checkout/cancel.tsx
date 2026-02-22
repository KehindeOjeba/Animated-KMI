/**
 * Checkout Cancel Page
 * When customer cancels Stripe payment
 */

'use client';

import { useNavigate } from 'react-router-dom';

export default function CheckoutCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        {/* Error Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-8">Your checkout was cancelled. Your cart items are still saved.</p>

        {/* Why section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-left max-w-md mx-auto">
          <h2 className="font-bold text-gray-900 mb-4">What happened?</h2>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li>✓ No payment was processed</li>
            <li>✓ Your cart items are still saved</li>
            <li>✓ You can review and checkout again anytime</li>
            <li>✓ Cart expires in 30 days</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/cart')}
            className="flex-1 bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Return to Cart
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 border border-gray-300 text-gray-900 text-center px-6 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Continue Shopping
          </button>
        </div>

        {/* Support */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-gray-600 mb-3">Having trouble?</p>
          <a href="mailto:support@kensmadeit.com" className="text-blue-600 hover:underline">
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
}
