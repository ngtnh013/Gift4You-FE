import './index.css';
function HomePage() {
    return ( <div className="HomeForm">
        <main className="main">
            <section className="gift-experience">
              <div className="left-side">
                  <div className="title">
                      <h1 className="create">Create</h1>
                      <p className="subtitle">Unforgettable</p>
                      <p className="subtitle">Gift Experience for</p>
                      <p className="subtitle">Every Occasions</p>
                  </div>
                  <div className="description">
                      <p  className="pdes">Welcome to Gift4U, where you can</p>
                      <p  className="pdes">design and personalize the perfect gift</p>
                      <p  className="pdes">box for any special moments,</p>
                      <p  className="pdes">guaranteed to bring joy to your loved</p>
                      <p  className="pdes">ones.</p>
                  </div>
              </div>
              <div className="right-side">
                  <div className="image">
                  </div>
              </div>
            </section>
  
            <section className="featuresTitle">
              <div className="featureTitle">
                <h1>Choose from a varitey of boc templates to create your perfect gift box</h1>
              </div>
            </section>
  
            <section className="features">
              <div className="feature">
                <h3>Customize your gifts with a personal touch.</h3>
                <p>Customizable templates to make your gift truly unique.</p>
              </div>
              <div className="feature">
                <h3>A variety of decorations to enhance your gift</h3>
                <p>Personalize your gift with a heartfelt messages or cherished memories.</p>
              </div>
              <div className="feature">
                <h3>Add a message or photo to make your gift extra special</h3>
                <p>Explore our selection of extra goodies to make your gift even more special.</p>
              </div>
            </section>
  
            <section className="gift-box">
              <div className="box-image">
                <img src="https://www.foldaboxusa.com/cdn/shop/products/HotPinkSatinonBlackA5Deep_1200x.jpg?v=1700520516" alt="Gift Box" />
              </div>
              <div className="box-content">
                <h2>Discover the</h2>
                <h2>Perfect Gift Box</h2>
                <p>Choose from our wide selection of customizable gift boxes for any occasion.</p>
                <button>Create Now</button>
              </div>
            </section>
  
        </main>
      </div> );
}

export default HomePage;