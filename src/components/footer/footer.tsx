import logo from 'assets/img/logo.png';

import './footer.scss';

const Footer = () => (
  <div className="footer">
    <div className="details">
      <a href="#" className="option">
        <span>CONTACT US</span>
      </a>
      <a href="#" className="option">
        <span>PRIVACY POLICY</span>
      </a>
      <a href="#" className="option">
        <span>TERMS</span>
      </a>
    </div>

    <img src={logo} alt="Logo" className="logo" />

    <div className="credit">
      &copy; 2024 by Iakab Fineas. All rights reserved.
    </div>
  </div>
);

export default Footer;
