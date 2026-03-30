export const FOOTER_TABS = [
  { key: 'home', label: 'HOME', icon: '🧥' },
  { key: 'wardrobe', label: 'WARDROBE', icon: '👗' },
  { key: 'declutter', label: 'DECLUTTER', icon: '♻️' },
  { key: 'profile', label: 'PROFILE', icon: '👤' },
];

export default function AppFooterNav({ activeKey, onTabClick }) {
  return (
    <footer className="app-footer">
      {FOOTER_TABS.map(t => (
        <button
          key={t.key}
          type="button"
          className={`footer-tab ${activeKey === t.key ? 'active' : ''}`}
          onClick={() => onTabClick(t.key)}
        >
          <span className="footer-icon">{t.icon}</span>
          <span className="footer-label">{t.label}</span>
        </button>
      ))}
    </footer>
  );
}
