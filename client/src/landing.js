import React from 'react';

const LandingPage = () => {
      return (
        <div>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" /> {/*load all styles */}
          <link href="assets/style/fontawesome.min.css" rel="stylesheet" /> {/*load all styles */}
          <link rel="stylesheet" href="assets/style/test-style.css" />
          <div className="hero-image">
            <nav>
              <div className="container">
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">about</a></li>
                  <li><a href="#service">service</a></li>
                  <li><a href="#team">team</a></li>
                  <li><a href="#advertising">advertising</a></li>
                </ul>
                <h1 className="logo">The Copywriter</h1>
              </div>
            </nav>
          </div>
          <div className="hero-text">
            <h1>Lorem Ipsum is simply dummy</h1>
            <h3>Lorem Ipsum has been the</h3>
            <div className="hero-buttons">
              <a className="button">CONTACT US</a>
              <a className="button blog">BLOG</a>
            </div>
          </div>
          <section className="features-section">
            <div className="content">
              <h1 className="section-title">FEATURES DISPLAY SECTION</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer</p>
            </div>
            <div className="container">
              <ul className="features">
                <li>
                  <i className="fas fa-desktop" />
                  <h4>WE ARE CREATIVE</h4>
                  <p className="info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                </li>
                <li>
                  <i className="fas fa-desktop" />
                  <h4>WE ARE CREATIVE</h4>
                  <p className="info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                </li>
                <li>
                  <i className="fas fa-desktop" />
                  <h4>WE ARE CREATIVE</h4>
                  <p className="info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                </li>
                <li>
                  <i className="fas fa-desktop" />
                  <h4>WE ARE CREATIVE</h4>
                  <p className="info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                </li>
              </ul>
            </div>
          </section>
          <section className="team-section">
            <div className="content">
              <h1 className="section-title">FEATURES DISPLAY SECTION</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer</p>
            </div>
            <div className="container">
              <ul className="team">
                <li>
                  <div className="img">
                    <img width="200px" height="200px" src="https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/75594418_1011084179284564_8670414230358327296_o.jpg?_nc_cat=106&_nc_sid=174925&_nc_eui2=AeH8KopMFB3vGOQ79Q_IikAF5ZvFfbHfHULlm8V9sd8dQtkJg7AT5mRlMIfwxFLtsP_B8CD5bLOJYlIP1_oiNiPG&_nc_ohc=FXEKrlAfNpUAX8XQ1l_&_nc_ht=scontent-mxp1-1.xx&oh=c31cb6084ff4fbf0a850667246370d0d&oe=5EC0423B" />
                  </div>
                  <h4>Rand Moataz</h4>
                  <p>Founder and CEO</p>
                  <p className="info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                  <div className="icon-bar">
                    <a href="#" className="facebook"><i className="fab fa-facebook-square" /></a>
                    <a href="#" className="twitter"><i className="fab fa-twitter-square" /></a>
                    <a href="#" className="linkedin"><i className="fab fa-linkedin" /></a>
                  </div>
                </li>
                <li>
                  <div className="img">
                    <img width="200px" height="200px" src="https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/75594418_1011084179284564_8670414230358327296_o.jpg?_nc_cat=106&_nc_sid=174925&_nc_eui2=AeH8KopMFB3vGOQ79Q_IikAF5ZvFfbHfHULlm8V9sd8dQtkJg7AT5mRlMIfwxFLtsP_B8CD5bLOJYlIP1_oiNiPG&_nc_ohc=FXEKrlAfNpUAX8XQ1l_&_nc_ht=scontent-mxp1-1.xx&oh=c31cb6084ff4fbf0a850667246370d0d&oe=5EC0423B" />
                  </div>
                  <h4>Rand Moataz</h4>
                  <p>Founder and CEO</p>
                  <p className="info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                  <div className="icon-bar">
                    <a href="#" className="facebook"><i className="fab fa-facebook-square" /></a>
                    <a href="#" className="twitter"><i className="fab fa-twitter-square" /></a>
                    <a href="#" className="linkedin"><i className="fab fa-linkedin" /></a>
                  </div>
                </li>
                <li>
                  <div className="img">
                    <img width="200px" height="200px" src="https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/75594418_1011084179284564_8670414230358327296_o.jpg?_nc_cat=106&_nc_sid=174925&_nc_eui2=AeH8KopMFB3vGOQ79Q_IikAF5ZvFfbHfHULlm8V9sd8dQtkJg7AT5mRlMIfwxFLtsP_B8CD5bLOJYlIP1_oiNiPG&_nc_ohc=FXEKrlAfNpUAX8XQ1l_&_nc_ht=scontent-mxp1-1.xx&oh=c31cb6084ff4fbf0a850667246370d0d&oe=5EC0423B" />
                  </div>
                  <h4>Rand Moataz</h4>
                  <p>Founder and CEO</p>
                  <p className="info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                  <div className="icon-bar">
                    <a href="#" className="facebook"><i className="fab fa-facebook-square" /></a>
                    <a href="#" className="twitter"><i className="fab fa-twitter-square" /></a>
                    <a href="#" className="linkedin"><i className="fab fa-linkedin" /></a>
                  </div>
                </li>
                <li>
                  <div className="img">
                    <img width="200px" height="200px" src="https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/75594418_1011084179284564_8670414230358327296_o.jpg?_nc_cat=106&_nc_sid=174925&_nc_eui2=AeH8KopMFB3vGOQ79Q_IikAF5ZvFfbHfHULlm8V9sd8dQtkJg7AT5mRlMIfwxFLtsP_B8CD5bLOJYlIP1_oiNiPG&_nc_ohc=FXEKrlAfNpUAX8XQ1l_&_nc_ht=scontent-mxp1-1.xx&oh=c31cb6084ff4fbf0a850667246370d0d&oe=5EC0423B" />
                  </div>
                  <h4>Rand Moataz</h4>
                  <p>Founder and CEO</p>
                  <p className="info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                  <div className="icon-bar">
                    <a href="#" className="facebook"><i className="fab fa-facebook-square" /></a>
                    <a href="#" className="twitter"><i className="fab fa-twitter-square" /></a>
                    <a href="#" className="linkedin"><i className="fab fa-linkedin" /></a>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section className="client-section">
            <div className="content">
              <h1 className="section-title">OUR CLIENT</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer</p>
            </div>
            <div className="container">
              <ul className="client">
                <li>
                  <div className="img">
                    <img width="100%" height="200px" src="https://cdn.motor1.com/images/mgl/GwZbJ/s3/logo-story-volkswagen.jpg" />
                  </div>
                  <h4>Brand Name</h4>
                </li>
                <li>
                  <div className="img">
                    <img width="100%" height="200px" src="https://www.logodesignlove.com/images/symbols/mastercard-symbol-03.jpg" />
                  </div>
                  <h4>Brand Name</h4>
                </li>
                <li>
                  <div className="img">
                    <img width="100%" height="200px" src="https://static.rfstat.com/renderforest/images/v2/logo-homepage/flat_3.png" />
                  </div>
                  <h4>Brand Name</h4>
                </li>
                <li>
                  <div className="img">
                    <img width="100%" height="200px" src="https://i.pinimg.com/736x/dd/be/40/ddbe404d0b32016f41717891daa602a1.jpg" />
                  </div>
                  <h4>Brand Name</h4>
                </li>
                <li>
                  <div className="img">
                    <img width="100%" height="200px" src="https://clipartart.com/images/clipart-logo-editor-2.png" />
                  </div>
                  <h4>Brand Name</h4>
                </li>
                <li>
                  <div className="img">
                    <img width="100%" height="200px" src="https://lh3.googleusercontent.com/proxy/D1TUVQBwr9AfZWpYUcMAnAliaEDuCDD3-23DJOlhgmPn_dxDfcqITPvJpdHGuhhVEc3xt6Exavf3ePuAxpsvE9M5GqYwfhyHIXZbC7bN8SB7RJC_QXk6Kg" />
                  </div>
                  <h4>Brand Name</h4>
                </li>
                <li>
                  <div className="img">
                    <img width="100%" height="200px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTVzN3v5YpARBrAKToxtUZEWEXXjlQ92IEVp9jgqayZj3jIgig&usqp=CAU" />
                  </div>
                  <h4>Brand Name</h4>
                </li>
                <li>
                  <div className="img">
                    <img width="100%" height="200px" src="https://geeksterminal.com/wp-content/uploads/2019/05/firefox-logo.png" />
                  </div>
                  <h4>Brand Name</h4>
                </li>
              </ul>
            </div>
          </section>
          <section className="contact-us">
            <div className="content">
              <h1 className="section-title">CONTACT US</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer</p>
            </div>
            <div className="container">
              <div className="contact-form">
                <div className="form-container">
                  <form action="/action_page.php">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="Your name.." />
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" name="lastname" placeholder="Your email.." />
                    <label htmlFor="subject">Subject</label>
                    <textarea id="subject" name="subject" placeholder="Write something.." style={{height: '200px'}} defaultValue={""} />
                    <div className="submit">
                      <input type="submit" defaultValue="Send Message" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div className="container">
              <div className="footer-content">
                <h1>The Copywriter</h1>
                <p className="content"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took </p>
                <div className="icon-bar">
                  <a href="#" className="facebook"><i className="fab fa-facebook-square" /></a>
                  <a href="#" className="twitter"><i className="fab fa-twitter-square" /></a>
                  <a href="#" className="linkedin"><i className="fab fa-linkedin" /></a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
    }


export default LandingPage;    