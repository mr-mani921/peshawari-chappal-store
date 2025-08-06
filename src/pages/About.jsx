import React from 'react';
import './TheBrand.css';
import Header from '../components/Header';

const About = () => {
  return (
    <div className="the-brand" style={{marginTop:"20px"}}>
      {/* Hero Section */}
      

      {/* Brand Story */}
      <section className="brand-story py-5" style={{width:"100%"}}>
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2010, PeshawariChappals.pk began as a small family business with a simple mission: 
                to preserve and share the authentic craftsmanship of traditional Pakistani footwear with the world. 
                What started as a local workshop in Peshawar has grown into Pakistan's most trusted online destination 
                for handmade chappals.
              </p>
              <p>
                Our journey is rooted in respect for the artisans who have passed down their skills through generations. 
                Each pair of chappals we create tells a story of heritage, quality, and the timeless appeal of 
                traditional Pakistani craftsmanship.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Traditional Craftsmanship" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="brand-values py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🏺</div>
              <h3>Heritage</h3>
              <p>We honor traditional craftsmanship techniques passed down through generations of skilled artisans.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>Every chappal is meticulously crafted using premium leather and time-tested construction methods.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Authenticity</h3>
              <p>We guarantee genuine, handmade products that represent the true spirit of Pakistani footwear.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Accessibility</h3>
              <p>Making traditional Pakistani chappals available to customers worldwide with reliable service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="craftsmanship py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Craftsmanship Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Material Selection</h3>
                <p>We carefully select the finest quality leather, ensuring durability and comfort for every pair.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Traditional Cutting</h3>
                <p>Master craftsmen cut each piece by hand, following patterns perfected over generations.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Hand Stitching</h3>
                <p>Every chappal is stitched by hand using traditional techniques that ensure longevity and comfort.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Quality Inspection</h3>
                <p>Each finished product undergoes rigorous quality checks before reaching our customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission py-5">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              To preserve and promote the rich heritage of Pakistani traditional footwear while providing 
              customers worldwide with authentic, high-quality chappals that combine comfort, durability, 
              and timeless style. We are committed to supporting local artisans and keeping traditional 
              craftsmanship alive for future generations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;