import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, loadData } from '../utils/dataLoader';
import { ArrowLeft, Play } from 'lucide-react';

const Profile: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userName) return;
      
      setLoading(true);
      const users = await loadData();
      const foundUser = users.find(u => u.name === decodeURIComponent(userName));
      setUser(foundUser || null);
      setLoading(false);
    };

    fetchUser();
  }, [userName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00aff0] mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-[#00aff0] hover:underline mb-6">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">User Not Found</h1>
            <p className="text-gray-600">The requested user could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-[#00aff0] hover:underline mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h1>
                <p className="text-gray-600">{user.videos.length} video{user.videos.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Videos</h2>
            <div className="space-y-3">
              {user.videos.map((video, index) => (
                <Link
                  key={index}
                  to={`/redirect?video=${encodeURIComponent(video.link)}&title=${encodeURIComponent(video.title)}`}
                  className="block p-4 border-2 border-[#00aff0] rounded-lg hover:bg-[#00aff0] hover:text-white transition-colors group"
                >
                  <div className="flex items-center">
                    <Play size={20} className="mr-3 text-[#00aff0] group-hover:text-white" />
                    <h3 className="font-medium">{video.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;