# 🤖 CodeJudge Discord Bot Setup Guide

This guide will help you set up the Discord bot integration for the CodeJudge platform.

## 📋 Prerequisites

1. **Discord Application & Bot**
   - Create a Discord application at [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a bot for your application
   - Get the bot token

2. **Discord Server (Guild)**
   - Create or use an existing Discord server
   - Get the server (guild) ID
   - Create a channel for bot notifications
   - Get the channel ID

## 🔧 Setup Steps

### 1. Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give it a name (e.g., "CodeJudge Bot")
4. Go to the "Bot" section
5. Click "Add Bot"
6. Copy the bot token (you'll need this later)

### 2. Configure Bot Permissions

In the Bot section, enable these permissions:
- ✅ Send Messages
- ✅ Use Slash Commands
- ✅ Embed Links
- ✅ Read Message History
- ✅ Add Reactions

### 3. Invite Bot to Your Server

1. Go to the "OAuth2" → "URL Generator" section
2. Select "bot" under scopes
3. Select the permissions mentioned above
4. Copy the generated URL
5. Open the URL in a browser and invite the bot to your server

### 4. Get Server and Channel IDs

1. **Enable Developer Mode** in Discord:
   - Go to User Settings → Advanced → Developer Mode
   
2. **Get Server ID**:
   - Right-click on your server name
   - Select "Copy Server ID"

3. **Get Channel ID**:
   - Right-click on the channel where you want bot notifications
   - Select "Copy Channel ID"

### 5. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. Edit `backend/.env` and add your Discord credentials:
   ```env
   # Discord Bot Configuration
   DISCORD_BOT_TOKEN=your_actual_bot_token_here
   DISCORD_GUILD_ID=your_actual_guild_id_here
   DISCORD_CHANNEL_ID=your_actual_channel_id_here
   ```

### 6. Install Dependencies

```bash
cd backend
npm install
```

### 7. Start the Application

```bash
npm run dev
```

## 🎯 Available Bot Commands

Once the bot is running, users can use these commands in Discord:

### `/problems`
Lists all available coding problems on the platform.

### `/problem <id>`
Shows detailed information about a specific problem.

**Example:** `/problem 507f1f77bcf86cd799439011`

### `/leaderboard`
Displays the current leaderboard with top performers.

### `/help`
Shows all available commands and their usage.

### `/submit <problemId> <language> <code>`
Submit code for a problem (basic implementation).

**Example:** `/submit 507f1f77bcf86cd799439011 python "print('Hello World')"`

## 🔔 Real-time Notifications

The bot will automatically send notifications to the configured Discord channel when:

- New submissions are processed
- Submissions are evaluated
- Results are available

## 🛠️ Bot Features

### ✅ Implemented Features
- **Problem Browsing**: View all available problems
- **Problem Details**: Get detailed information about specific problems
- **Leaderboard**: View top performers
- **Real-time Notifications**: Get updates on submissions
- **Help System**: Built-in command help

### 🔄 Integration Points
- **API Integration**: Bot communicates with CodeJudge API
- **WebSocket Support**: Real-time updates via Discord
- **Error Handling**: Graceful error handling and user feedback
- **Rate Limiting**: Respects API rate limits

## 🚨 Troubleshooting

### Bot Not Responding
1. Check if the bot token is correct
2. Verify the bot has proper permissions
3. Ensure the bot is online in your server

### Commands Not Working
1. Check server logs for errors
2. Verify API endpoints are accessible
3. Ensure MongoDB and Redis are running

### Permission Errors
1. Make sure the bot has all required permissions
2. Check if the bot can see the channel
3. Verify the channel ID is correct

## 📊 Monitoring

### Bot Status Endpoint
Check bot status at: `GET /api/bot/status`

### Webhook Endpoint
Send submission updates to: `POST /api/bot/webhook/submission`

## 🔒 Security Considerations

1. **Token Security**: Never share your bot token publicly
2. **Environment Variables**: Keep `.env` file secure and never commit it
3. **API Security**: Ensure API endpoints are properly secured
4. **Rate Limiting**: Bot respects existing rate limits

## 🎨 Customization

### Changing Bot Appearance
Edit the embed colors and styling in `backend/bot/commands.js`

### Adding New Commands
1. Add command logic in `backend/bot/commands.js`
2. Add command handler in `backend/bot/botHandler.js`
3. Update help command with new command info

### Custom Notifications
Modify `sendSubmissionUpdate` function in `backend/bot/botHandler.js`

## 📝 API Integration

The bot integrates with these CodeJudge API endpoints:

- `GET /api/problems` - List all problems
- `GET /api/problems/:id` - Get problem details
- `GET /api/leaderboard` - Get leaderboard
- `POST /api/code` - Submit code

## 🚀 Deployment

### Environment Variables for Production
```env
DISCORD_BOT_TOKEN=your_production_bot_token
DISCORD_GUILD_ID=your_production_guild_id
DISCORD_CHANNEL_ID=your_production_channel_id
API_BASE_URL=https://your-api-domain.com/api
```

### Docker Deployment
The bot will start automatically with the main application when using Docker.

## 📞 Support

If you encounter issues:
1. Check the server logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all services (MongoDB, Redis) are running
4. Check Discord bot permissions and server access

---

**Happy Coding! 🎉**