import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Redirect: React.FC = () => {
  const [searchParams] = useSearchParams();
  const videoLink = searchParams.get('video');
  const videoTitle = searchParams.get('title');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!videoLink) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = videoLink;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [videoLink]);

  if (!videoLink) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-[#00aff0] hover:underline mb-6">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Video Link</h1>
            <p className="text-gray-600">No video link was provided.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
    <div className="text-center max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* النص الكبير */}
        <h1 className="text-3xl font-extrabold text-[#00aff0] mb-6">
          Redirecting to your video
        </h1>

        {/* العداد */}
        <div className="mb-6">
          <div className="text-6xl font-bold text-gray-900 mb-2">{countdown}</div>
          <p className="text-gray-600">
            Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
          </p>
        </div>

        {/* النص الطويل */}
        <div className="text-justify leading-7 space-y-4 mb-10 text-gray-700">
          <p>
            We are building a collective effort to fight opportunism on OnlyFans. The
            platform has become a place where access is restricted to those who can pay,
            and this has created a culture where intimacy and creativity are treated as
            products to be exploited. We believe this harms both creators and audiences…
          </p>

          <p>
            Opportunism on OnlyFans thrives because people see a chance to make money by
            exploiting desire, attention, and vulnerability…
          </p>

          <p>
            We stand for a vision where all content is free. This is not only about money
            but about freedom…
          </p>

          <p>
            Charging money for human intimacy, conversation, and creative output turns
            personal expression into a market product…
          </p>

          <p>
            We believe in collective action. When people come together to share content,
            to support each other, and to spread knowledge freely, we weaken the grip of
            opportunists…
          </p>

          <p>
            Free platforms, shared libraries, and community-based systems already exist.
            They prove that another way is possible…
          </p>

          <p>
            We need your support. Every contribution matters. By supporting our work, you
            make it possible to challenge opportunism and build a better system…
          </p>

          {/* زر PayPal */}
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="_blank"
            className="mt-6"
          >
            <input type="hidden" name="business" value="YOUR_PAYPAL_EMAIL_OR_ID" />
            <input type="hidden" name="currency_code" value="USD" />
            <input
              type="submit"
              value="Donate with PayPal"
              style={{
                backgroundColor: "#0070ba",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            />
          </form>
        </div>

        {/* Cancel button */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-500 hover:text-[#00aff0] mt-4 text-sm"
        >
          <ArrowLeft size={16} className="mr-1" />
          Cancel and go back
        </Link>
      </div>
    </div>
  </div>
)
;
};

export default Redirect;