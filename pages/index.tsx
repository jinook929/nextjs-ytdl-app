import { FormEvent, ChangeEvent, useState } from "react";

const Home = () => {
  const [videoId, setVideoId] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (videoId) {
      window.location.href = `/api/download?videoId=${videoId}`;
      setVideoId("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    function extractVideoId(url: string): string | null {
      const regex =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?$/;
      const match = url.match(regex);
      return match ? match[1] : null;
    }
    
    const extractedId = extractVideoId(e.target.value);
    setVideoId(extractedId !== null ? extractedId : e.target.value);
  };

  return (
    <div>
      <h1>Download YouTube Video</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="videoId">Video ID:</label>
        <input
          type="text"
          id="videoId"
          value={videoId}
          onChange={handleChange}
        />
        <button type="submit">Download</button>
      </form>
    </div>
  );
};

export default Home;
