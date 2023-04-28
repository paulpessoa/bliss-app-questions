import { useState, useEffect } from "react";

const ConnectionStatus = (): JSX.Element => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    if (typeof window !== 'undefined') {
      setIsOnline(window.navigator.onLine);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      {showNotification && (
        <div className={`notification ${isOnline ? "success" : "error"}`}>
          <span className="text">{isOnline ? 'Online!' : 'Offline!'}</span>
          <button onClick={handleCloseNotification} className="close">X</button>
        </div>
      )}
    </>
  );
};

export default ConnectionStatus;
