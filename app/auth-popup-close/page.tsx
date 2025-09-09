// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/app/auth-popup-close/page.tsx
"use client";

import React, { useEffect } from 'react';

// This component is rendered in the popup window after a successful OAuth login.
// Its only job is to close the popup, which will trigger a session refetch on the main page.
const AuthPopupClose = () => {
  useEffect(() => {
    // When this page loads, we immediately close the popup window.
    // The main window (the "opener") will regain focus.
    // The `useSession` hook in the main window is configured to refetch the session on focus,
    // which will update the UI to show the user as signed in.
    window.close();
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#111',
      color: '#eee'
    }}>
      <p>Authentication successful! This window will now close.</p>
    </div>
  );
};

export default AuthPopupClose;