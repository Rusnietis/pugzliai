import { useContext } from "react";
import { Stories } from "../Contexts/Stories";
import "./StoriesPreview.scss";

export default function StoriesPreview() {
  const { stories } = useContext(Stories);

  if (!stories || stories.length === 0) {
    return <p>Kol kas nėra istorijų...</p>;
  }

  return (
    <div className="stories-preview">
      {stories.map(story => (
        <div className="story-preview-card" key={story.id}>
          <img
            src={story.image}
            alt={story.title}
            className="preview-image"
          />
          <p className="preview-text">{story.shortDescription}</p>
        </div>
      ))}
    </div>
  );
}
