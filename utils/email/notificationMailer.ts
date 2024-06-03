import transporter from './smtp';

interface NotificationMailerData {
  senderUsername: string;
  recipient: string;
  content: string;
}

const sendNotificationEmail = async (data: NotificationMailerData) => {
  const { senderUsername, recipient, content } = data;

  try {
    const mailData = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: `You have a notification from ${senderUsername}`,
      text: content,
    };
      
    transporter.sendMail(mailData, (err, res) => {
      if (err) {
        throw err;
      } else {
        return { res };
      }
    })
  
  } catch (err) {
    throw err;
  }
};

export default sendNotificationEmail;
