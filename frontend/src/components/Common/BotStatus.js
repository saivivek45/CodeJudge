import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const BotStatus = () => {
  const [botStatus, setBotStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBotStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/bot/status`);
        const data = await response.json();
        setBotStatus(data.status === 'online');
      } catch (error) {
        console.error('Error checking bot status:', error);
        setBotStatus(false);
      } finally {
        setLoading(false);
      }
    };

    checkBotStatus();
    // Check status every 30 seconds
    const interval = setInterval(checkBotStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <Loader className="w-4 h-4 animate-spin" />
        <span className="text-sm">Checking bot status...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {botStatus ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">Discord Bot Online</span>
        </>
      ) : (
        <>
          <XCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-600">Discord Bot Offline</span>
        </>
      )}
    </div>
  );
};

export default BotStatus;