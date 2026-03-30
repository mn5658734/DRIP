import { useState, useEffect } from 'react';
import { post } from '../api';

export default function AiImageFeedback({ userId, suggestionId, onVoted }) {
  const [vote, setVote] = useState(null);

  useEffect(() => {
    setVote(null);
  }, [suggestionId]);

  const send = async (dir) => {
    setVote(dir);
    if (userId && suggestionId) {
      try {
        await post(`/outfits/${userId}/${suggestionId}/feedback`, { vote: dir });
      } catch (_) {
        /* prototype: ignore network errors */
      }
    }
    onVoted?.(dir);
  };

  return (
    <div className="ai-feedback-bar" role="group" aria-label="Rate this AI suggestion">
      <button
        type="button"
        className={`ai-feedback-btn ${vote === 'up' ? 'is-active' : ''}`}
        aria-pressed={vote === 'up'}
        aria-label="Helpful — thumbs up"
        title="Helpful"
        onClick={() => send('up')}
      >
        👍
      </button>
      <button
        type="button"
        className={`ai-feedback-btn ${vote === 'down' ? 'is-active' : ''}`}
        aria-pressed={vote === 'down'}
        aria-label="Not helpful — thumbs down"
        title="Not helpful"
        onClick={() => send('down')}
      >
        👎
      </button>
    </div>
  );
}
