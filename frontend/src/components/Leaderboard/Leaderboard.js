import React, { useState, useEffect } from 'react';
import { leaderboardService } from '../../services/api';
import { Trophy, Medal, Award, Crown, User, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true);
      const response = await leaderboardService.getLeaderboard();
      setLeaderboard(response.data.leaderboard || []);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      // Mock data for demo
      setLeaderboard([
        { _id: '1', name: 'Alice Johnson', email: 'alice@example.com', solvedCount: 45, role: 'user' },
        { _id: '2', name: 'Bob Smith', email: 'bob@example.com', solvedCount: 38, role: 'user' },
        { _id: '3', name: 'Charlie Brown', email: 'charlie@example.com', solvedCount: 32, role: 'user' },
        { _id: '4', name: 'Diana Prince', email: 'diana@example.com', solvedCount: 28, role: 'user' },
        { _id: '5', name: 'Eve Wilson', email: 'eve@example.com', solvedCount: 25, role: 'user' },
        { _id: '6', name: 'Frank Miller', email: 'frank@example.com', solvedCount: 22, role: 'user' },
        { _id: '7', name: 'Grace Lee', email: 'grace@example.com', solvedCount: 20, role: 'user' },
        { _id: '8', name: 'Henry Davis', email: 'henry@example.com', solvedCount: 18, role: 'user' },
        { _id: '9', name: 'Ivy Chen', email: 'ivy@example.com', solvedCount: 15, role: 'user' },
        { _id: '10', name: 'Jack Taylor', email: 'jack@example.com', solvedCount: 12, role: 'user' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-secondary-600">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading leaderboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Trophy className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Leaderboard</h1>
        <p className="text-secondary-600">Top performers in our coding challenges</p>
      </div>

      {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <div className="order-2 md:order-1">
            <div className="card p-6 text-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-sm font-bold">2</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                {leaderboard[1].name}
              </h3>
              <p className="text-sm text-secondary-600 mb-2">{leaderboard[1].email}</p>
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-4 w-4 text-primary-600" />
                <span className="text-xl font-bold text-primary-600">
                  {leaderboard[1].solvedCount}
                </span>
                <span className="text-sm text-secondary-600">problems</span>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="order-1 md:order-2">
            <div className="card p-6 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 transform scale-105">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <Crown className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-1">
                {leaderboard[0].name}
              </h3>
              <p className="text-sm text-secondary-600 mb-2">{leaderboard[0].email}</p>
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary-600" />
                <span className="text-2xl font-bold text-primary-600">
                  {leaderboard[0].solvedCount}
                </span>
                <span className="text-sm text-secondary-600">problems</span>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 md:order-3">
            <div className="card p-6 text-center bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-sm font-bold">3</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                {leaderboard[2].name}
              </h3>
              <p className="text-sm text-secondary-600 mb-2">{leaderboard[2].email}</p>
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-4 w-4 text-primary-600" />
                <span className="text-xl font-bold text-primary-600">
                  {leaderboard[2].solvedCount}
                </span>
                <span className="text-sm text-secondary-600">problems</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 bg-secondary-50 border-b border-secondary-200">
          <h2 className="text-xl font-semibold text-secondary-900">Full Rankings</h2>
        </div>
        <div className="divide-y divide-secondary-200">
          {leaderboard.map((user, index) => {
            const rank = index + 1;
            return (
              <div key={user._id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadge(rank)}`}>
                    {rank <= 3 ? getRankIcon(rank) : <span className="font-bold">#{rank}</span>}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{user.name}</h3>
                      <p className="text-sm text-secondary-600">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary-600">{user.solvedCount}</div>
                  <div className="text-sm text-secondary-600">problems solved</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-primary-600 mb-2">
            {leaderboard.length}
          </div>
          <div className="text-sm text-secondary-600">Total Participants</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {leaderboard.length > 0 ? leaderboard[0].solvedCount : 0}
          </div>
          <div className="text-sm text-secondary-600">Highest Score</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-2">
            {leaderboard.length > 0 
              ? Math.round(leaderboard.reduce((acc, user) => acc + user.solvedCount, 0) / leaderboard.length)
              : 0}
          </div>
          <div className="text-sm text-secondary-600">Average Score</div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;