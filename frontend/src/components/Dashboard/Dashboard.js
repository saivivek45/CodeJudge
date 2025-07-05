import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { problemService, submissionService } from '../../services/api';
import { Code, Trophy, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProblems: 0,
    solvedProblems: 0,
    recentSubmissions: []
  });
  const [recentProblems, setRecentProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [problemsResponse, submissionsResponse] = await Promise.all([
        problemService.getProblems(),
        submissionService.getSubmissions()
      ]);

      const problems = problemsResponse.data.problems || [];
      const submissions = submissionsResponse.data.submissions || [];

      setStats({
        totalProblems: problems.length,
        solvedProblems: user?.solvedCount || 0,
        recentSubmissions: submissions.slice(0, 5)
      });

      // Get recent problems (first 6)
      setRecentProblems(problems.slice(0, 6));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-primary-100">
          Ready to solve some coding challenges today?
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-full">
              <Code className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Total Problems</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.totalProblems}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Solved</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.solvedProblems}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Target className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Success Rate</p>
              <p className="text-2xl font-bold text-secondary-900">
                {stats.totalProblems > 0 
                  ? Math.round((stats.solvedProblems / stats.totalProblems) * 100) 
                  : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Problems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-secondary-900">Recent Problems</h2>
            <Link
              to="/problems"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentProblems.length > 0 ? (
              recentProblems.map((problem, index) => (
                <div key={problem._id || index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex-1">
                    <Link
                      to={`/problems/${problem._id}`}
                      className="text-secondary-900 hover:text-primary-600 font-medium"
                    >
                      {problem.title}
                    </Link>
                    <p className="text-sm text-secondary-600 mt-1">
                      {problem.description?.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-secondary-500 text-center py-4">No problems available</p>
            )}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-secondary-900">Recent Submissions</h2>
            <Link
              to="/submissions"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentSubmissions.length > 0 ? (
              stats.recentSubmissions.map((submission, index) => (
                <div key={submission._id || index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-secondary-900 font-medium">
                      {submission.problemTitle || 'Problem'}
                    </p>
                    <p className="text-sm text-secondary-600 mt-1">
                      {submission.language} • {new Date(submission.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-secondary-500 text-center py-4">No submissions yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/problems"
          className="card p-6 hover:shadow-lg transition-shadow duration-200 group"
        >
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 group-hover:bg-primary-200 rounded-full transition-colors">
              <Code className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-secondary-900">Start Coding</h3>
              <p className="text-secondary-600">Browse and solve problems</p>
            </div>
          </div>
        </Link>

        <Link
          to="/leaderboard"
          className="card p-6 hover:shadow-lg transition-shadow duration-200 group"
        >
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 group-hover:bg-yellow-200 rounded-full transition-colors">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-secondary-900">Leaderboard</h3>
              <p className="text-secondary-600">See top performers</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;