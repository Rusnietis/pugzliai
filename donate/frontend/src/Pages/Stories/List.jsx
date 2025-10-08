import { useContext } from "react";
import { Stories } from "../../Contexts/Stories";
import { SERVER_URL } from "../../Constants/main";
import "./StoriesCard.scss";

export default function StoryCard() {

  // const { stories } = useContext(Stories)

  // console.log('stories', stories)

  return (
    <div className="page-container">
      <aside className="preview-col">
      
        <div className="preview-card">

          {/* 🔹 Istorijos turinys */}
          <div className="preview-title">
            <h2 id="card-title"></h2>
          </div>

          <div className="preview-photo">
            {/* {story?.image && <img src={story.image} alt={story.title} />}
            {!story?.image && <img src={`${SERVER_URL}/images/no-image.jpg`} alt="no image" />} */}
          </div>

          <div className="field"></div>

          <div className="goal">
            <div className="field">🎯 Tikslas</div>
            <div className="amount-pill">€</div>
          </div>
        </div>
      </aside>

    </div>
    
  );

}
