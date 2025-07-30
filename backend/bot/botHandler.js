import { client, BOT_TOKEN } from '../config/bot.js';
import { 
  listProblems, 
  getProblemDetails, 
  showLeaderboard, 
  showHelp,
  submitCode 
} from './commands.js';

// Bot event handlers
client.once('ready', () => {
  console.log(`🤖 CodeJudge Bot is online! Logged in as ${client.user.tag}`);
  client.user.setActivity('CodeJudge Platform', { type: 'WATCHING' });
});

client.on('messageCreate', async (message) => {
  // Ignore messages from bots and non-command messages
  if (message.author.bot || !message.content.startsWith('/')) {
    return;
  }

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    switch (command) {
      case 'problems':
        const problemsEmbed = await listProblems();
        await message.reply({ embeds: [problemsEmbed] });
        break;

      case 'problem':
        if (!args[0]) {
          await message.reply('❌ Please provide a problem ID. Usage: `/problem <id>`');
          return;
        }
        const problemEmbed = await getProblemDetails(args[0]);
        await message.reply({ embeds: [problemEmbed] });
        break;

      case 'leaderboard':
        const leaderboardEmbed = await showLeaderboard();
        await message.reply({ embeds: [leaderboardEmbed] });
        break;

      case 'help':
        const helpEmbed = showHelp();
        await message.reply({ embeds: [helpEmbed] });
        break;

      case 'submit':
        if (args.length < 3) {
          await message.reply('❌ Please provide problem ID, language, and code. Usage: `/submit <problemId> <language> <code>`');
          return;
        }
        const [problemId, language, ...codeParts] = args;
        const code = codeParts.join(' ');
        const submitEmbed = await submitCode(problemId, code, language, message.author.id);
        await message.reply({ embeds: [submitEmbed] });
        break;

      default:
        await message.reply('❓ Unknown command. Use `/help` to see available commands.');
        break;
    }
  } catch (error) {
    console.error('Error handling command:', error);
    await message.reply('❌ An error occurred while processing your command. Please try again.');
  }
});

// Error handling
client.on('error', (error) => {
  console.error('Discord bot error:', error);
});

client.on('disconnect', () => {
  console.log('Bot disconnected from Discord');
});

// Function to start the bot
export async function startBot() {
  try {
    if (!BOT_TOKEN) {
      console.error('❌ DISCORD_BOT_TOKEN is not set in environment variables');
      return;
    }

    await client.login(BOT_TOKEN);
    console.log('✅ Bot started successfully');
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
  }
}

// Function to send notification to Discord channel
export async function sendNotification(channelId, embed) {
  try {
    const channel = await client.channels.fetch(channelId);
    if (channel) {
      await channel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Function to send submission status updates
export async function sendSubmissionUpdate(submission) {
  const { CHANNEL_ID } = await import('../config/bot.js');
  
  if (!CHANNEL_ID) return;

  const embed = new (await import('discord.js')).EmbedBuilder()
    .setColor(submission.status === 'Accepted' ? '#4ECDC4' : '#FF6B6B')
    .setTitle(`📝 Submission Update`)
    .setDescription(`New submission processed!`)
    .addFields(
      { name: 'Problem ID', value: submission.problemId, inline: true },
      { name: 'Status', value: submission.status, inline: true },
      { name: 'Language', value: submission.language, inline: true },
      { name: 'Execution Time', value: `${submission.executionTime || 'N/A'}ms`, inline: true },
      { name: 'Memory Used', value: `${submission.memoryUsed || 'N/A'}KB`, inline: true }
    )
    .setTimestamp();

  await sendNotification(CHANNEL_ID, embed);
}