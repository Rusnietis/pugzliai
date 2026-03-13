import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, ShieldCheck, Users, Sparkles } from 'lucide-react';
import './Home.scss';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="hero__badge">
            <Sparkles size={16} /> Kiekviena auka keičia gyvenimus
          </span>
          <h1>Padėk kurti geresnį rytojų jau šiandien</h1>
          <p>
            Prisidėk prie svarbių iniciatyvų ir padėk žmonėms, kuriems reikia pagalbos.
            Skaidriai, greitai ir saugiai.
          </p>

          <div className="hero__actions">
            <button className="btn btn--primary">
              Aukoti dabar <ArrowRight size={18} />
            </button>
            <button className="btn btn--secondary">Sužinoti daugiau</button>
          </div>
        </motion.div>

        <motion.div
          className="hero__card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="donation-card">
            <div className="donation-card__icon">
              <Heart size={28} />
            </div>
            <h3>Surinkta šį mėnesį</h3>
            <h2>€24,850</h2>
            <div className="progress">
              <div className="progress__fill"></div>
            </div>
            <p>82% nuo mėnesio tikslo</p>
          </div>
        </motion.div>
      </section>

      <section className="features">
        <div className="feature-card">
          <ShieldCheck size={28} />
          <h3>Saugūs mokėjimai</h3>
          <p>Patikima ir apsaugota aukojimo sistema.</p>
        </div>

        <div className="feature-card">
          <Users size={28} />
          <h3>Bendruomenės parama</h3>
          <p>Tūkstančiai žmonių prisideda kasdien.</p>
        </div>

        <div className="feature-card">
          <Heart size={28} />
          <h3>Realus poveikis</h3>
          <p>Kiekvienas euras pasiekia prasmingą tikslą.</p>
        </div>

      </section>
      <section className="impact-section">
        <div className="impact-card">
          <h2>Jūsų parama kuria realų poveikį</h2>
          <p>
            Daugiau nei 12,000 žmonių jau prisidėjo prie socialinių projektų,
            medicininės pagalbos ir vaikų švietimo iniciatyvų.
          </p>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-box">
          <h3>12K+</h3>
          <p>Aktyvių aukotojų</p>
        </div>

        <div className="stat-box">
          <h3>85</h3>
          <p>Projektai finansuoti</p>
        </div>

        <div className="stat-box">
          <h3>€240K</h3>
          <p>Surinkta pagalbai</p>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-card">
          <p>„Labai aiški ir skaidri platforma — matau, kur keliauja mano parama.“</p>
          <h4>— Rūta, donorė</h4>
        </div>
      </section>
    </div>
  );
}
