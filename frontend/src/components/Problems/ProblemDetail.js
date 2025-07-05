import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problemService, submissionService } from '../../services/api';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Play, Send, Clock, Target, Code2 } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import Editor from '@monaco-editor/react';

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [submissionResult, setSubmissionResult] = useState(null);
  const [activeTab, setActiveTab] = useState('problem');

  const languages = [
    { value: 'javascript', label: 'JavaScript', defaultCode: '// Write your solution here\nfunction solution() {\n    // Your code here\n}\n' },
    { value: 'python', label: 'Python', defaultCode: '# Write your solution here\ndef solution():\n    # Your code here\n    pass\n' },
    { value: 'cpp', label: 'C++', defaultCode: '// Write your solution here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}\n' }
  ];

  useEffect(() => {
    loadProblem();
  }, [id]);

  useEffect(() => {
    // Set default code when language changes
    const language = languages.find(lang => lang.value === selectedLanguage);
    if (language && !code) {
      setCode(language.defaultCode);
    }
  }, [selectedLanguage]);

  const loadProblem = async () => {
    try {
      setIsLoading(true);
      const response = await problemService.getProblem(id);
      setProblem(response.data.problem);
      
      // Set initial code
      const defaultLang = languages.find(lang => lang.value === selectedLanguage);
      if (defaultLang) {
        setCode(defaultLang.defaultCode);
      }
    } catch (error) {
      console.error('Error loading problem:', error);
      toast.error('Problem not found');
      navigate('/problems');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('Please write some code before submitting');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await submissionService.submitCode(id, code, selectedLanguage);
      
      if (response.data.success) {
        setSubmissionResult(response.data.result);
        toast.success('Code submitted successfully!');
        setActiveTab('result');
      } else {
        toast.error(response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRunCode = () => {
    // Mock run functionality
    toast.info('Running code... (This is a demo)');
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
    return <LoadingSpinner text="Loading problem..." />;
  }

  if (!problem) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Problem not found</h2>
        <button
          onClick={() => navigate('/problems')}
          className="btn-primary"
        >
          Back to Problems
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/problems')}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">{problem.title}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className="text-sm text-secondary-600">•</span>
              <span className="text-sm text-secondary-600">Problem #{problem._id?.slice(-6)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <div className="card p-6">
          <div className="flex space-x-1 mb-4">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'problem'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Problem
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'result'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Result
            </button>
          </div>

          {activeTab === 'problem' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Description</h3>
                <p className="text-secondary-700 leading-relaxed">{problem.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Input Format</h3>
                <p className="text-secondary-700 leading-relaxed">{problem.inputFormat}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Output Format</h3>
                <p className="text-secondary-700 leading-relaxed">{problem.outputFormat}</p>
              </div>

              {problem.sampleTestCases && problem.sampleTestCases.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">Sample Test Cases</h3>
                  <div className="space-y-4">
                    {problem.sampleTestCases.map((testCase, index) => (
                      <div key={index} className="bg-secondary-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-secondary-900 mb-2">Input:</h4>
                            <pre className="text-sm text-secondary-700 bg-white p-2 rounded border">
                              {testCase.input}
                            </pre>
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary-900 mb-2">Expected Output:</h4>
                            <pre className="text-sm text-secondary-700 bg-white p-2 rounded border">
                              {testCase.expectedOutput}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'result' && (
            <div className="space-y-4">
              {submissionResult ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${
                    submissionResult.status === 'Accepted' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        submissionResult.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className={`font-medium ${
                        submissionResult.status === 'Accepted' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {submissionResult.status}
                      </span>
                    </div>
                    {submissionResult.message && (
                      <p className="mt-2 text-sm text-secondary-700">
                        {submissionResult.message}
                      </p>
                    )}
                  </div>

                  {submissionResult.testResults && (
                    <div>
                      <h4 className="font-medium text-secondary-900 mb-2">Test Results:</h4>
                      <div className="space-y-2">
                        {submissionResult.testResults.map((result, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className={`w-2 h-2 rounded-full ${
                              result.passed ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span>Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Code2 className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                  <p className="text-secondary-600">Submit your code to see results</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Code Editor */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-secondary-900">Code Editor</h3>
            <div className="flex items-center space-x-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-sm border border-secondary-300 rounded px-2 py-1"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border border-secondary-300 rounded-lg overflow-hidden">
            <Editor
              height="400px"
              language={selectedLanguage}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
              }}
            />
          </div>

          <div className="flex items-center space-x-3 mt-4">
            <button
              onClick={handleRunCode}
              className="btn-secondary flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>Run Code</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;