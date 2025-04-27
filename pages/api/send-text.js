
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { phoneNumber, messageText } = req.body;
  
    if (!phoneNumber || !messageText) {
      return res.status(400).json({ message: 'Missing phoneNumber or messageText' });
    }
  
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
          text: messageText,
          sender_name: SENDER_NAME,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(500).json({ success: false, error: data });
      }
    } catch (error) {
      console.error('Error sending text:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }