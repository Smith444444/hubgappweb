import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../utils/dataLoader';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Link to={`/profile/${encodeURIComponent(user.name)}`}>
      <div className="bg-[#00aff0] text-white rounded-lg overflow-hidden shadow-md hover:opacity-80 transition-opacity cursor-pointer">
        <div className="aspect-square">
          <img
            src={user.image}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
          <p className="text-sm opacity-90">{user.videos.length} video{user.videos.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;