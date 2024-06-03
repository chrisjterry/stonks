import WebSocket from 'ws';
import handleComment from './handleComment';
import Channel from '../../../entities/channel';

interface OpenChatData {
  channel: Channel;
}

const openChat = (data: OpenChatData) => {
  try {
    const { channel } = data;
    const host = channel.host.username;
    const ws = new WebSocket(`ws://${process.env.PORT}/${host}`);

    ws.on('open', () => {
      ws.send(`${host} has started the chat!`);
    });

    ws.on('message', async (data) => {
      // Naive implemenation here assumes a JSON object
      // stringified before being sent to the BE via
      // websocket; the keys are sender and message. 
      const { sender, message } = JSON.parse(data);
      await handleComment({ sender, message, channel });
      ws.send(data);
    });

    ws.open();
  } catch (err) {
    throw err;
  }
};

export default openChat
