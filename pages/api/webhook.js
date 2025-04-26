// pages/api/webhook.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      console.log('✅ New inbound message from LoopMessage:', req.body);
  
      // Always respond immediately to avoid webhook timeouts
      res.status(200).end();
  
      const incomingText = req.body?.text?.toLowerCase() || '';
      const sender = req.body?.sender; // This is the phone number of the person texting you
  
      // Now send a reply if needed
      if (sender) {
        let replyText = '';
  
        if (incomingText.includes('shelter')) {
          replyText = `
  🏠 Shelter Resources:
  - SAFE Alliance: (512) 267-7233
  - Salvation Army: (512) 476-1111
  - Caritas of Austin: (512) 479-4610
          `;
        } else if (incomingText.includes('food')) {
          replyText = `
  🍎 Food Resources:
  - Central Texas Food Bank: (512) 282-2111
  - Mobile Pantries: centraltexasfoodbank.org
          `;
        } else {
          replyText = `🤖 Sorry, I didn't understand. Try texting "shelter" or "food" for help!`;
        }
  
        await sendReply(sender, replyText);
      }
    } else {
      res.status(405).end(); // Only allow POST
    }
  }
  
  // Helper function to send reply back through LoopMessage
  async function sendReply(phoneNumber, textMessage) {
    const LOOPMESSAGE_API_URL = 'https://server.loopmessage.com/api/v1/message/send/';
    const LOOP_AUTH = process.env.LOOP_AUTH;
    const LOOP_SECRET = process.env.LOOP_SECRET;
    const SENDER_NAME = 'YourSenderName'; // Replace with your sender name
  
    try {
      const response = await fetch(LOOPMESSAGE_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': LOOP_AUTH,
          'Loop-Secret-Key': LOOP_SECRET,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: phoneNumber,
          text: textMessage,
          sender_name: SENDER_NAME,
        }),
      });
  
      const data = await response.json();
      console.log('📤 Sent auto-reply:', data);
    } catch (error) {
      console.error('❌ Failed to send auto-reply:', error);
    }
  }
  