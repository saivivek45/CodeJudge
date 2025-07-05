import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { problemService } from '../../services/api';
import { Search, Filter, Code, Clock, ChevronRight } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProblems();
  }, []);

  useEffect(() => {
    filterProblems();
  }, [problems, searchQuery, selectedDifficulty]);

  const loadProblems = async () => {
    try {
      setIsLoading(true);
      const response = await problemService.getProblems();
      const problemsData = response.data.problems || [];
      setProblems(problemsData);
    } catch (error) {
      console.error('Error loading problems:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProblems = () => {
    let filtered = problems;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by difficulty
    if (selectedDifficulty) {
      filtered = filtered.filter(problem =>
        problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    setFilteredProblems(filtered);
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

  const difficulties = ['easy', 'medium', 'hard'];

  if (isLoading) {
    return <LoadingSpinner text="Loading problems..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Problems</h1>
          <p className="text-secondary-600">
            {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary flex items-center space-x-2 sm:hidden"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className={`space-y-4 ${showFilters ? 'block' : 'hidden sm:block'}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-secondary-400" />
            </div>
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="sm:w-48">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="input-field"
            >
              <option value="">All Difficulties</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem, index) => (
            <div key={problem._id || index} className="card p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-secondary-900">
                      {problem.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-secondary-600 mb-4">
                    {problem.description.length > 200 
                      ? `${problem.description.substring(0, 200)}...` 
                      : problem.description}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-secondary-500">
                    <div className="flex items-center space-x-1">
                      <Code className="h-4 w-4" />
                      <span>Multiple Languages</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>30 mins</span>
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex-shrink-0">
                  <Link
                    to={`/problems/${problem._id}`}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <span>Solve</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Code className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">
              No problems found
            </h3>
            <p className="text-secondary-600">
              {searchQuery || selectedDifficulty 
                ? 'Try adjusting your search or filters' 
                : 'No problems are available at the moment'}
            </p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      {filteredProblems.length > 0 && (
        <div className="border-t border-secondary-200 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {filteredProblems.filter(p => p.difficulty === 'easy').length}
              </p>
              <p className="text-sm text-secondary-600">Easy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredProblems.filter(p => p.difficulty === 'medium').length}
              </p>
              <p className="text-sm text-secondary-600">Medium</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {filteredProblems.filter(p => p.difficulty === 'hard').length}
              </p>
              <p className="text-sm text-secondary-600">Hard</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problems;