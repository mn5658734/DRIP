import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { post } from '../api';
import AiImageFeedback from '../components/AiImageFeedback';

export default function RushModePage() {
  const navigate = useNavigate();
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    post('/outfits/user-1/rush-mode', {})
      .then(d => { setOutfit(d.outfit); setLoading(false); })
      .catch(() => { setOutfit({ aiExplanation: 'Blue shirt + navy pants. Quick & professional!' }); setLoading(false); });
  }, []);

  if (loading) return <div className="container"><p>Picking your outfit...</p></div>;

  return (
    <div className="container">
      <h1 className="title">Your outfit is ready! 🎉</h1>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="ai-suggestion-media">
          <img src="https://picsum.photos/seed/rush/400/500" alt="AI rush outfit suggestion" style={{ width: '100%', height: 350, objectFit: 'cover', display: 'block' }} />
          <AiImageFeedback userId={userId} suggestionId={outfit?.id ? `rush-${outfit.id}` : 'rush'} />
        </div>
        <div style={{ padding: 16 }}>
          <p style={{ color: '#8892b0' }}>{outfit?.aiExplanation}</p>
        </div>
      </div>
      <button className="btn" onClick={() => navigate('/')}>Got it, stepping out!</button>
    </div>
  );
}
