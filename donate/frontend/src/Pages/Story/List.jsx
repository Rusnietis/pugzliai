// StoryCard.jsx
import React from "react";
import "./StoryCard.scss";

export default function StoryCard() {
  const stories = [
    {
      id: 1,
      title: "Pagalba beglobiams gyvūnams",
      desc: "Prisidėk prie prieglaudos, kuri rūpinasi šimtais kačių ir šunų kasmet.",
      img: "https://ve.lt/sites/default/files/2018-09/photo_15_97629145.jpg",
      goal: 1500,
    },
    {
      id: 2,
      title: "Pagalba vaikams moksluose",
      desc: "Padėk vaikams įsigyti mokymosi priemonių ir gauti kokybišką išsilavinimą.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTarnM-kHjaxxTo2VGhGT5wfnQMPzu9P7I3Nw&s",
      goal: 2000,
    },
    {
      id: 3,
      title: "Miško atkūrimo iniciatyva",
      desc: "Sodinkime medžius kartu ir kurkime švaresnę bei žalesnę aplinką ateities kartoms.",
      img: "https://bilis.lt/assets/nuotraukos/_desktop_small/963144/photo-967632333.avif",
      goal: 3000,
    },
  ];

  return (
    <aside className="preview-col">
      {stories.map((story) => (
        <div key={story.id} className="preview-card">
          <div className="preview-photo">
            <img src={story.img} alt={story.title} />
          </div>
          <div>
            <div className="preview-title">{story.title}</div>
            <div className="preview-body">{story.desc}</div>
          </div>
          <div className="goal">
            <div className="meta">🎯 Tikslas</div>
            <div className="amount-pill">€{story.goal}</div>
          </div>
        </div>
      ))}
    </aside>
  );
}
