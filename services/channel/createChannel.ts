import validateInputs from '../../validators/createChannel';
import verifyProfile from '../../validators/verifyProfile';
import Channel from '../../entities/channel';
import openChat from './subServices/openChat';

interface ChannelData {
  token: string;
  title: string;
  description: string;
}

const createChannel = async (data: ChannelData) => {
  try {
    const host = await verifyProfile(data);
    const { message, isValid } = validateInputs(data);

    if (!host) {
      throw new Error('Invalid Profile');
    }
    if (!isValid) {
      throw new Error(message);
    }

    const { title, description } = data;

    const channel = new Channel();
    console.log(host)
    channel.host = host;
    channel.title = title;
    channel.description = description;
    await channel.save();

    openChat({ channel: channel });

    return { ...channel };
  } catch (err) {
    throw err;
  }
};

export default createChannel;
