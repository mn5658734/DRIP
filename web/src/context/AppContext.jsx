import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const defaultPrefs = () => {
  try {
    const s = localStorage.getItem('drape_outfit_prefs');
    return s ? JSON.parse(s) : {};
  } catch { return {}; }
};

const defaultSocial = () => {
  try {
    const s = localStorage.getItem('drape_social');
    const p = s ? JSON.parse(s) : {};
    return {
      instagram: { connected: !!p.instagram?.connected, username: p.instagram?.username || '' },
      facebook: { connected: !!p.facebook?.connected, userId: p.facebook?.userId || '' },
    };
  } catch {
    return { instagram: { connected: false, username: '' }, facebook: { connected: false, userId: '' } };
  }
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem('drape_user');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });
  const [outfitPrefs, setOutfitPrefs] = useState(defaultPrefs);
  const [selectedOccasion, setSelectedOccasion] = useState(() => {
    try {
      const p = JSON.parse(localStorage.getItem('drape_outfit_prefs') || '{}');
      return p.occasion || null;
    } catch { return null; }
  });
  const [socialAccounts, setSocialAccounts] = useState(defaultSocial);

  useEffect(() => {
    if (user) localStorage.setItem('drape_user', JSON.stringify(user));
    else localStorage.removeItem('drape_user');
  }, [user]);

  useEffect(() => {
    const prefs = { ...outfitPrefs, occasion: selectedOccasion };
    localStorage.setItem('drape_outfit_prefs', JSON.stringify(prefs));
  }, [outfitPrefs, selectedOccasion]);

  useEffect(() => {
    localStorage.setItem('drape_social', JSON.stringify(socialAccounts));
  }, [socialAccounts]);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      selectedOccasion,
      setSelectedOccasion,
      outfitPrefs,
      setOutfitPrefs,
      socialAccounts,
      setSocialAccounts,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
