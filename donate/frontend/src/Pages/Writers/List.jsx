import { useContext } from "react";
import { Stories } from "../../Contexts/Stories";
import { SERVER_URL } from "../../Constants/main";
import "./StoryCard.scss";

export default function StoryCard() {

  const {stories} = useContext(Stories)
  
  console.log('stories', stories)

  return (
    <aside className="preview-col">
      {
      stories.map((story) => (
        <div key={story.id} className="preview-card">
            <div className="preview-title"><h2 id="card-title">{story.title}</h2></div>

          <div className="preview-photo">
           { story?.image && <img src={story?.image} alt={story?.title} />}
           { !story?.image && <img src={`${SERVER_URL}/images/no-image.jpg`} alt="no image" />}
          </div>
          <div>
            <div className="field">{story.story}</div>
          </div>
          <div className="goal">
            <div className="field">🎯 Tikslas</div>
            <div className="amount-pill">€{story.goal}</div>
          </div>
        </div>
      ))
      }
    </aside>
  );
  
}
