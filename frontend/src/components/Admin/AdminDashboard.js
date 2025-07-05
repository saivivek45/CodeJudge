import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Settings, 
  Users, 
  Code, 
  Activity,
  Save,
  X
} from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';

const AdminDashboard = () => {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'easy',
    inputFormat: '',
    outputFormat: '',
    sampleTestCases: [{ input: '', expectedOutput: '' }],
    hiddenTestCases: [{ input: '', expectedOutput: '' }]
  });

  useEffect(() => {
    loadProblems();
  }, []);

  const loadProblems = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getProblems();
      setProblems(response.data.problems || []);
    } catch (error) {
      console.error('Error loading problems:', error);
      // Mock data for demo
      setProblems([
        {
          _id: '1',
          title: 'Two Sum',
          description: 'Given an array of integers, return indices of two numbers that add up to a target.',
          difficulty: 'easy',
          inputFormat: 'Array of integers and target sum',
          outputFormat: 'Array of two indices',
          sampleTestCases: [{ input: '[2,7,11,15], 9', expectedOutput: '[0,1]' }]
        },
        {
          _id: '2',
          title: 'Binary Tree Traversal',
          description: 'Implement inorder traversal of a binary tree.',
          difficulty: 'medium',
          inputFormat: 'Binary tree root node',
          outputFormat: 'Array of node values',
          sampleTestCases: [{ input: '[1,null,2,3]', expectedOutput: '[1,3,2]' }]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProblem = async (e) => {
    e.preventDefault();
    try {
      const response = await adminService.createProblem(formData);
      if (response.data.success) {
        toast.success('Problem created successfully!');
        setShowCreateModal(false);
        resetForm();
        loadProblems();
      } else {
        toast.error(response.data.message || 'Failed to create problem');
      }
    } catch (error) {
      console.error('Error creating problem:', error);
      toast.error('Failed to create problem');
    }
  };

  const handleUpdateProblem = async (e) => {
    e.preventDefault();
    try {
      const response = await adminService.updateProblem(editingProblem, formData);
      if (response.data.success) {
        toast.success('Problem updated successfully!');
        setEditingProblem(null);
        resetForm();
        loadProblems();
      } else {
        toast.error(response.data.message || 'Failed to update problem');
      }
    } catch (error) {
      console.error('Error updating problem:', error);
      toast.error('Failed to update problem');
    }
  };

  const handleDeleteProblem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this problem?')) return;
    
    try {
      await adminService.deleteProblem(id);
      toast.success('Problem deleted successfully!');
      loadProblems();
    } catch (error) {
      console.error('Error deleting problem:', error);
      toast.error('Failed to delete problem');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      difficulty: 'easy',
      inputFormat: '',
      outputFormat: '',
      sampleTestCases: [{ input: '', expectedOutput: '' }],
      hiddenTestCases: [{ input: '', expectedOutput: '' }]
    });
  };

  const handleEditProblem = (problem) => {
    setEditingProblem(problem._id);
    setFormData({
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      inputFormat: problem.inputFormat,
      outputFormat: problem.outputFormat,
      sampleTestCases: problem.sampleTestCases || [{ input: '', expectedOutput: '' }],
      hiddenTestCases: problem.hiddenTestCases || [{ input: '', expectedOutput: '' }]
    });
    setShowCreateModal(true);
  };

  const addTestCase = (type) => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], { input: '', expectedOutput: '' }]
    }));
  };

  const removeTestCase = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const updateTestCase = (type, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((testCase, i) => 
        i === index ? { ...testCase, [field]: value } : testCase
      )
    }));
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

  if (isLoading) {
    return <LoadingSpinner text="Loading admin dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Admin Dashboard</h1>
          <p className="text-secondary-600">Manage problems and monitor platform activity</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Problem</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-full">
              <Code className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Total Problems</p>
              <p className="text-2xl font-bold text-secondary-900">{problems.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Active Users</p>
              <p className="text-2xl font-bold text-secondary-900">156</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Activity className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Submissions</p>
              <p className="text-2xl font-bold text-secondary-900">2,341</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Success Rate</p>
              <p className="text-2xl font-bold text-secondary-900">78%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 bg-secondary-50 border-b border-secondary-200">
          <h2 className="text-xl font-semibold text-secondary-900">Problems</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Problem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Test Cases
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {problems.map((problem) => (
                <tr key={problem._id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-secondary-900">{problem.title}</div>
                      <div className="text-sm text-secondary-500">
                        {problem.description.substring(0, 100)}...
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-500">
                    {problem.sampleTestCases?.length || 0} sample, {problem.hiddenTestCases?.length || 0} hidden
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditProblem(problem)}
                        className="text-primary-600 hover:text-primary-700 p-1"
                        title="Edit"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProblem(problem._id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Problem Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-secondary-900">
                {editingProblem ? 'Edit Problem' : 'Create New Problem'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingProblem(null);
                  resetForm();
                }}
                className="text-secondary-400 hover:text-secondary-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={editingProblem ? handleUpdateProblem : handleCreateProblem} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="input-field"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Input Format
                  </label>
                  <textarea
                    value={formData.inputFormat}
                    onChange={(e) => setFormData({ ...formData, inputFormat: e.target.value })}
                    className="input-field h-24"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Output Format
                  </label>
                  <textarea
                    value={formData.outputFormat}
                    onChange={(e) => setFormData({ ...formData, outputFormat: e.target.value })}
                    className="input-field h-24"
                    required
                  />
                </div>
              </div>

              {/* Sample Test Cases */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-secondary-700">
                    Sample Test Cases
                  </label>
                  <button
                    type="button"
                    onClick={() => addTestCase('sampleTestCases')}
                    className="btn-secondary text-sm"
                  >
                    Add Sample Test Case
                  </button>
                </div>
                {formData.sampleTestCases.map((testCase, index) => (
                  <div key={index} className="border border-secondary-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-secondary-900">Test Case {index + 1}</h4>
                      {formData.sampleTestCases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTestCase('sampleTestCases', index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Input
                        </label>
                        <textarea
                          value={testCase.input}
                          onChange={(e) => updateTestCase('sampleTestCases', index, 'input', e.target.value)}
                          className="input-field h-20"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Expected Output
                        </label>
                        <textarea
                          value={testCase.expectedOutput}
                          onChange={(e) => updateTestCase('sampleTestCases', index, 'expectedOutput', e.target.value)}
                          className="input-field h-20"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hidden Test Cases */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-secondary-700">
                    Hidden Test Cases
                  </label>
                  <button
                    type="button"
                    onClick={() => addTestCase('hiddenTestCases')}
                    className="btn-secondary text-sm"
                  >
                    Add Hidden Test Case
                  </button>
                </div>
                {formData.hiddenTestCases.map((testCase, index) => (
                  <div key={index} className="border border-secondary-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-secondary-900">Hidden Test Case {index + 1}</h4>
                      {formData.hiddenTestCases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTestCase('hiddenTestCases', index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Input
                        </label>
                        <textarea
                          value={testCase.input}
                          onChange={(e) => updateTestCase('hiddenTestCases', index, 'input', e.target.value)}
                          className="input-field h-20"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Expected Output
                        </label>
                        <textarea
                          value={testCase.expectedOutput}
                          onChange={(e) => updateTestCase('hiddenTestCases', index, 'expectedOutput', e.target.value)}
                          className="input-field h-20"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingProblem(null);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingProblem ? 'Update' : 'Create'} Problem</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;