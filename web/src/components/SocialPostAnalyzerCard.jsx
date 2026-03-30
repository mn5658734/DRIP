import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SocialPostAnalyzerCard({ compact = false }) {
  const { socialAccounts, setSocialAccounts } = useApp();
  const [igInput, setIgInput] = useState(socialAccounts.instagram.username || '');
  const [fbInput, setFbInput] = useState(socialAccounts.facebook.userId || '');

  const normIg = (s) => s.replace(/^@+/, '').trim();

  const connectInstagram = () => {
    const u = normIg(igInput);
    if (!u) return;
    setSocialAccounts((prev) => ({
      ...prev,
      instagram: { connected: true, username: u },
    }));
  };

  const connectFacebook = () => {
    const id = fbInput.trim();
    if (!id) return;
    setSocialAccounts((prev) => ({
      ...prev,
      facebook: { connected: true, userId: id },
    }));
  };

  const disconnectInstagram = () => {
    setIgInput('');
    setSocialAccounts((prev) => ({
      ...prev,
      instagram: { connected: false, username: '' },
    }));
  };

  const disconnectFacebook = () => {
    setFbInput('');
    setSocialAccounts((prev) => ({
      ...prev,
      facebook: { connected: false, userId: '' },
    }));
  };

  const wrapStyle = compact
    ? {}
    : { marginTop: 20, paddingTop: 20, borderTop: '1px solid #16213e' };

  return (
    <div style={wrapStyle}>
      <h3 style={{ fontSize: 16, marginBottom: 8 }}>Post analyzer</h3>
      <p style={{ fontSize: 13, color: '#8892b0', marginBottom: 16, lineHeight: 1.4 }}>
        Connect Instagram or Facebook to analyze recent posts and spot outfits—dresses and accessories you’re wearing (AI rollout next).
      </p>

      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: '#8892b0', marginBottom: 8 }}>Instagram</p>
        {socialAccounts.instagram.connected ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14 }}>@{socialAccounts.instagram.username}</span>
            <button type="button" className="link" style={{ marginTop: 0 }} onClick={disconnectInstagram}>
              Disconnect
            </button>
          </div>
        ) : (
          <>
            <input
              className="input"
              placeholder="@yourusername"
              value={igInput}
              onChange={(e) => setIgInput(e.target.value)}
              autoComplete="username"
              style={{ marginBottom: 8 }}
            />
            <button type="button" className="btn btn-secondary" onClick={connectInstagram}>
              Connect Instagram
            </button>
          </>
        )}
      </div>

      <div>
        <p style={{ fontSize: 12, color: '#8892b0', marginBottom: 8 }}>Facebook</p>
        {socialAccounts.facebook.connected ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14 }}>{socialAccounts.facebook.userId}</span>
            <button type="button" className="link" style={{ marginTop: 0 }} onClick={disconnectFacebook}>
              Disconnect
            </button>
          </div>
        ) : (
          <>
            <input
              className="input"
              placeholder="Profile ID or linked email"
              value={fbInput}
              onChange={(e) => setFbInput(e.target.value)}
              style={{ marginBottom: 8 }}
            />
            <button type="button" className="btn btn-secondary" onClick={connectFacebook}>
              Connect Facebook
            </button>
          </>
        )}
      </div>
    </div>
  );
}
