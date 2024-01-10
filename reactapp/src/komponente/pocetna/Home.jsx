import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="homepage">
      <header className="header">
        <h1><i className="fas fa-notes-medical"></i> eZdravstveni Karton</h1>
        <p>Dobrodošli u vaš elektronski zdravstveni sistem.</p>
      </header>

      <main className="main-content">
        <section className="features">
          <h2>Funkcionalnosti</h2>
          <ul>
            <li><i className="fas fa-file-medical-alt"></i> Pregled zdravstvenih zapisa</li>
            <li><i className="fas fa-calendar-check"></i> Zakazivanje pregleda</li>
            <li><i className="fas fa-bell"></i> Prijem i upravljanje obaveštenjima</li>
            <li><i className="fas fa-clock"></i> Dostupnost 24/7</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Home;
