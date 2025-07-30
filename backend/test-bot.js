import dotenv from 'dotenv';
import { startBot } from './bot/botHandler.js';
import { listProblems, showHelp } from './bot/commands.js';

dotenv.config();

console.log('🧪 Testing CodeJudge Bot Integration...\n');

// Test bot startup
console.log('1. Testing bot startup...');
try {
  await startBot();
  console.log('✅ Bot startup test passed');
} catch (error) {
  console.log('❌ Bot startup test failed:', error.message);
}

// Test command functions
console.log('\n2. Testing command functions...');
try {
  const helpEmbed = showHelp();
  console.log('✅ Help command test passed');
  
  const problemsEmbed = await listProblems();
  console.log('✅ Problems command test passed');
  
  console.log('✅ All command tests passed');
} catch (error) {
  console.log('❌ Command test failed:', error.message);
}

console.log('\n🎉 Bot integration test completed!');
console.log('\nTo use the bot:');
console.log('1. Set up your Discord bot token in .env');
console.log('2. Invite the bot to your Discord server');
console.log('3. Use commands like /help, /problems, /leaderboard');
console.log('\nSee BOT_SETUP.md for detailed instructions.');