import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Redirect: React.FC = () => {
  const [searchParams] = useSearchParams();
  const videoLink = searchParams.get('video');
  const videoTitle = searchParams.get('title');
  const [countdown, setCountdown] = useState(5);

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
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {videoTitle ? `Loading: ${videoTitle}` : 'Loading Video...'}
          </h1>
          
          <div className="mb-6">
            <div className="text-6xl font-bold text-[#00aff0] mb-2">
              {countdown}
            </div>
            <p className="text-gray-600">
              Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
          </div>

          <div className="text-sm text-gray-500">
            <p>You will be redirected to:</p>
            <p className="text-[#00aff0] break-all mt-1">{videoLink}</p>
          </div>

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
  );
};

export default Redirect;