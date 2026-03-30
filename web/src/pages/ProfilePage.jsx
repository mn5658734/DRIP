import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SocialPostAnalyzerCard from '../components/SocialPostAnalyzerCard';
import AppFooterNav from '../components/AppFooterNav';

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

  const goDashboardTab = (key) => {
    if (key === 'profile') return;
    navigate('/', { state: { dashboardTab: key } });
  };

  return (
    <div className="container page-with-footer-nav">
      <h1 className="title">Profile</h1>

      <div className="card">
        <p className="section-label" style={{ marginBottom: 'var(--space-2)' }}>Name</p>
        <p style={{ marginTop: 0, fontSize: 'var(--text-md)', fontWeight: 600 }}>{user?.name?.trim() || '—'}</p>
        <p className="section-label" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>Phone</p>
        <p style={{ marginTop: 0, fontSize: 'var(--text-md)', fontWeight: 600 }}>{user?.phone || '—'}</p>
      </div>

      <div className="card">
        <SocialPostAnalyzerCard compact />
      </div>

      <div className="card card-row-action">Edit Profile</div>
      <div className="card card-row-action">Style Preference</div>
      <div className="card card-row-action">Favourite Outfits</div>
      <div className="card card-muted">Payments — Coming Soon</div>

      <button className="btn btn-secondary" onClick={handleLogout} style={{ marginTop: 'var(--space-6)' }}>
        Log out
      </button>

      <AppFooterNav activeKey="profile" onTabClick={goDashboardTab} />
    </div>
  );
}
