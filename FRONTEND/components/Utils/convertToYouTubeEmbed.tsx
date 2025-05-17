export function convertToYouTubeEmbed(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    let videoId = '';

    if (parsedUrl.hostname.includes('youtu.be')) {
      // Shortened URL like: https://youtu.be/VIDEO_ID
      videoId = parsedUrl.pathname.slice(1);
    } else if (parsedUrl.hostname.includes('youtube.com')) {
      if (parsedUrl.pathname === '/watch') {
        // Standard URL like: https://www.youtube.com/watch?v=VIDEO_ID
        videoId = parsedUrl.searchParams.get('v') || '';
      } else if (parsedUrl.pathname.startsWith('/embed/')) {
        // Already an embed link: https://www.youtube.com/embed/VIDEO_ID
        videoId = parsedUrl.pathname.split('/embed/')[1];
      }
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  } catch {
    return null;
  }
}
