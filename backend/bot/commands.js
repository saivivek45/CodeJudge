import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from '../config/bot.js';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

// Helper function to make API requests
async function makeAPIRequest(endpoint, method = 'GET', data = null, token = null) {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('API Request Error:', error.response?.data || error.message);
    return null;
  }
}

// Command: List all problems
export async function listProblems() {
  try {
    const problems = await makeAPIRequest('/problems');
    
    if (!problems || !problems.length) {
      return new EmbedBuilder()
        .setColor('#FF6B6B')
        .setTitle('❌ No Problems Found')
        .setDescription('There are no problems available at the moment.')
        .setTimestamp();
    }
    
    const embed = new EmbedBuilder()
      .setColor('#4ECDC4')
      .setTitle('📚 Available Problems')
      .setDescription('Here are the available coding problems:')
      .setTimestamp();
    
    problems.slice(0, 10).forEach((problem, index) => {
      embed.addFields({
        name: `${index + 1}. ${problem.title}`,
        value: `Difficulty: ${problem.difficulty}\nID: ${problem._id}`,
        inline: true
      });
    });
    
    if (problems.length > 10) {
      embed.setFooter({ text: `Showing 10 of ${problems.length} problems` });
    }
    
    return embed;
  } catch (error) {
    console.error('Error listing problems:', error);
    return new EmbedBuilder()
      .setColor('#FF6B6B')
      .setTitle('❌ Error')
      .setDescription('Failed to fetch problems. Please try again later.')
      .setTimestamp();
  }
}

// Command: Get problem details
export async function getProblemDetails(problemId) {
  try {
    const problem = await makeAPIRequest(`/problems/${problemId}`);
    
    if (!problem) {
      return new EmbedBuilder()
        .setColor('#FF6B6B')
        .setTitle('❌ Problem Not Found')
        .setDescription('The problem you requested could not be found.')
        .setTimestamp();
    }
    
    const embed = new EmbedBuilder()
      .setColor('#4ECDC4')
      .setTitle(`📝 ${problem.title}`)
      .setDescription(problem.description)
      .addFields(
        { name: 'Difficulty', value: problem.difficulty, inline: true },
        { name: 'Input Format', value: problem.inputFormat, inline: true },
        { name: 'Output Format', value: problem.outputFormat, inline: true }
      )
      .setTimestamp();
    
    // Add sample test cases
    if (problem.sampleTestCases && problem.sampleTestCases.length > 0) {
      const sampleCase = problem.sampleTestCases[0];
      embed.addFields({
        name: '📋 Sample Test Case',
        value: `**Input:**\n\`\`\`\n${sampleCase.input}\n\`\`\`\n**Expected Output:**\n\`\`\`\n${sampleCase.expectedOutput}\n\`\`\``
      });
    }
    
    return embed;
  } catch (error) {
    console.error('Error getting problem details:', error);
    return new EmbedBuilder()
      .setColor('#FF6B6B')
      .setTitle('❌ Error')
      .setDescription('Failed to fetch problem details. Please try again later.')
      .setTimestamp();
  }
}

// Command: Show leaderboard
export async function showLeaderboard() {
  try {
    const leaderboard = await makeAPIRequest('/leaderboard');
    
    if (!leaderboard || !leaderboard.length) {
      return new EmbedBuilder()
        .setColor('#FF6B6B')
        .setTitle('🏆 Leaderboard')
        .setDescription('No leaderboard data available.')
        .setTimestamp();
    }
    
    const embed = new EmbedBuilder()
      .setColor('#FFD93D')
      .setTitle('🏆 CodeJudge Leaderboard')
      .setDescription('Top performers on the platform:')
      .setTimestamp();
    
    leaderboard.slice(0, 10).forEach((user, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
      embed.addFields({
        name: `${medal} ${user.username}`,
        value: `Solved: ${user.solvedProblems || 0} | Score: ${user.score || 0}`,
        inline: false
      });
    });
    
    return embed;
  } catch (error) {
    console.error('Error showing leaderboard:', error);
    return new EmbedBuilder()
      .setColor('#FF6B6B')
      .setTitle('❌ Error')
      .setDescription('Failed to fetch leaderboard. Please try again later.')
      .setTimestamp();
  }
}

// Command: Help
export function showHelp() {
  const embed = new EmbedBuilder()
    .setColor('#4ECDC4')
    .setTitle('🤖 CodeJudge Bot Commands')
    .setDescription('Here are the available commands:')
    .addFields(
      { name: '📚 `/problems`', value: 'List all available problems', inline: true },
      { name: '📝 `/problem <id>`', value: 'Get details of a specific problem', inline: true },
      { name: '🏆 `/leaderboard`', value: 'Show the current leaderboard', inline: true },
      { name: '❓ `/help`', value: 'Show this help message', inline: true }
    )
    .setFooter({ text: 'Use these commands to interact with CodeJudge!' })
    .setTimestamp();
  
  return embed;
}

// Command: Submit code (placeholder - would need more complex implementation)
export async function submitCode(problemId, code, language, userId) {
  try {
    const submissionData = {
      problemId,
      code,
      language,
      userId
    };
    
    const result = await makeAPIRequest('/code', 'POST', submissionData);
    
    if (!result) {
      return new EmbedBuilder()
        .setColor('#FF6B6B')
        .setTitle('❌ Submission Failed')
        .setDescription('Failed to submit your code. Please try again.')
        .setTimestamp();
    }
    
    const embed = new EmbedBuilder()
      .setColor('#4ECDC4')
      .setTitle('✅ Code Submitted')
      .setDescription('Your code has been submitted successfully!')
      .addFields(
        { name: 'Problem ID', value: problemId, inline: true },
        { name: 'Language', value: language, inline: true },
        { name: 'Status', value: result.status || 'Processing', inline: true }
      )
      .setTimestamp();
    
    return embed;
  } catch (error) {
    console.error('Error submitting code:', error);
    return new EmbedBuilder()
      .setColor('#FF6B6B')
      .setTitle('❌ Error')
      .setDescription('Failed to submit code. Please try again later.')
      .setTimestamp();
  }
}