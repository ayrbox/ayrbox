import React from 'react'

const Footer = () => (
  <div className="footer-wrapper" id="contact">
    <div className="container">
      <div className="row align-items-end">
        <div className="col-sm-4">
          <h3>&nbsp;</h3>
          <div className="footer-logo">
            <h3>Contact</h3>
            <a href="mailto:beans@ayrbox.com">beans@ayrbox.com</a>
            <ul className="social-contacts">
              <li>
                <a className="icon-wrapper" href="#">
                  <span className="icon icon-social-github" />
                </a>
              </li>
              <li>
                <a className="icon-wrapper" href="#">
                  <i className="icon icon-social-twitter" />
                </a>
              </li>
              <li>
                <a className="icon-wrapper" href="#">
                  <span className="icon icon-social-facebook" />
                </a>
              </li>
              <li>
                <a className="icon-wrapper" href="#">
                  <span className="icon icon-social-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-sm-8 ml-auto text-right">
          &copy; Copyright &nbsp;
          <span id="copyrightYear">{new Date().getFullYear()}</span>. Sabin
          <br />
          Built using <a href="https://www.gatsbyjs.com/">Gatsbyjs</a> and
          powered by <a href="https://pages.github.com/">Github Pages</a>.
        </div>
      </div>
    </div>

    <div className="copyright">
      <div className="container" />
    </div>
  </div>
)

export default Footer
