import type { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';

const downloadVideo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { videoId } = req.query;

  if (!videoId) {
    res.status(400).send('Invalid video ID');
    return;
  }

  try {
    const videoInfo = await ytdl.getInfo(videoId as string);
    const videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestvideo' });
    const title = videoInfo.videoDetails.title.replace(/\s+/g, ' ').replace(/[^\uAC00-\uD7A3a-zA-Z0-9 ]/g, '');
    const encodedTitle = encodeURIComponent(title);

    res.setHeader('Content-Disposition', `attachment; filename=${encodedTitle}.mp4`);
    ytdl(videoId as string, { format: videoFormat }).pipe(res);
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).send('Failed to download the video');
  }
};

export default downloadVideo;
