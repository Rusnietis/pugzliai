import { useContext } from "react";
import { Stories } from "../../Contexts/Stories";
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
            <img src={story.img} alt={story.title} />
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
