import React, { useState, useEffect } from 'react';
import { User, loadData } from '../utils/dataLoader';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import { Loader2 } from 'lucide-react';

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userData = await loadData();
      setUsers(userData);
      setFilteredUsers(userData);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.videos.some(video => 
          video.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-[#00aff0] mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No users found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.name} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;