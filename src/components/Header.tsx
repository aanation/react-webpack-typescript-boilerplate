
import * as React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

export default () => (
  <header className="header">
    <div className="header__logo">
      <img src={require('@/assets/logo.png')} />
    </div>
    <div className="header__slogan">
      ReactJS HMR boilerpate with Typescript & SCSS
    </div>
    <nav className="header__nav-block">
      <ul className="header__nav-list">
        <li className="header__nav-item"><Link className="link" to="/">Home</Link></li>
        <li className="header__nav-item"><Link className="link" to="/foo">Foo</Link></li>
        <li className="header__nav-item"><Link className="link" to="/bar">Bar</Link></li>
      </ul>
    </nav>
  </header>
);
