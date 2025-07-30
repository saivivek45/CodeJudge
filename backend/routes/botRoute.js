import express from 'express';
import { sendSubmissionUpdate } from '../bot/botHandler.js';

const router = express.Router();

// Webhook endpoint for submission updates
router.post('/webhook/submission', async (req, res) => {
  try {
    const { submission } = req.body;
    
    if (!submission) {
      return res.status(400).json({ error: 'Submission data is required' });
    }

    // Send notification to Discord
    await sendSubmissionUpdate(submission);
    
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

// Bot status endpoint
router.get('/status', (req, res) => {
  res.json({ 
    status: 'online',
    bot: 'CodeJudge Discord Bot',
    version: '1.0.0'
  });
});

export default router;