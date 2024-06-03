import Channel, { Statuses } from '../../../entities/channel';

interface ChannelData {
  channel: Channel;
  title?: string;
  description?: string;
  status?: Statuses;
}

const updateChannel = async (data: ChannelData) => {
  try {
    const { channel, title, description, status } = data;

    if (title) channel.title = title;
    if (description) channel.description = description;
    if (status) channel.status = status;
    await channel.save();

    return { ...channel };
  } catch (err) {
    throw err;
  }
};

export default updateChannel;
