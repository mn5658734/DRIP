import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SocialPostAnalyzerCard from '../components/SocialPostAnalyzerCard';

export default function ProfilePage() {
  const { user, setUser, setSocialAccounts } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setSocialAccounts({
      instagram: { connected: false, username: '' },
      facebook: { connected: false, userId: '' },
    });
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="container">
      <h1 className="title">Profile</h1>

      <div className="card">
        <p style={{ fontSize: 12, color: '#8892b0' }}>Name</p>
        <p style={{ marginTop: 4 }}>{user?.name?.trim() || '—'}</p>
        <p style={{ fontSize: 12, color: '#8892b0', marginTop: 12 }}>Phone</p>
        <p style={{ marginTop: 4 }}>{user?.phone || '—'}</p>
      </div>

      <div className="card">
        <SocialPostAnalyzerCard compact />
      </div>

      <div className="card" style={{ cursor: 'pointer' }}>Edit Profile</div>
      <div className="card" style={{ cursor: 'pointer' }}>Style Preference</div>
      <div className="card" style={{ cursor: 'pointer' }}>Favourite Outfits</div>
      <div className="card" style={{ opacity: 0.7 }}>Payments — Coming Soon</div>

      <button className="btn btn-secondary" onClick={handleLogout} style={{ marginTop: 24 }}>
        Log out
      </button>
    </div>
  );
}
