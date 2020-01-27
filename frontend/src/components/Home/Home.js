import React, { Component } from 'react';
import './home.css';
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <header className='masthead'>
          <link rel="stylesheet" href="about.css"></link>

          <p className='masthead-intro'>Welcome to </p>
          <h1 className='masthead-heading'>Host, Post, Compost</h1>
        </header>

        <section className="introduction-section">
          <h1>Have extra room for compost?</h1>
          <p>Whether you're a business owner or homeowner allow your community to contribute to your compost pile! </p>
        </section>

        <section className="location-section">
          <h1>Looking to compost?</h1>
          <p>Become a contributor and you'll have the ability to contribute compost to a host near you!</p>
        </section>

        <section className="location-section">
          <h1>Ready to join the composting community?</h1>
          <p>If you already have an account, <Link to="/login">click here</Link> to login.</p>
          <p>Otherwise, <Link to="register">click here</Link> to register now!</p>
        </section>

        <section className="location-section">
          <section className="questions-section">
            <h1>What to compost</h1>
            <li>Animal Manure from herbivores</li>
            <li>Cardboard rolls, cereal boxes, brown paper bags </li>
            <li>Coffee grounds and filters</li>
            <li>Fruits and vegetables</li>
            <li>Hair and fur</li>

            <h1>What not to compost</h1>
            <li>Meat, fish, egg, or poultry scraps</li>
            <li>Fats, grease, lard, or oils</li>
            <li>Dairy Products</li>
            <li>Coal or charcoal ash</li>
            <li>Yard trimmings treated with pesticides</li>
          </section>

          <footer className="content-footer">
            <p>Find us on:</p>
            <ul className="social">
              <li><a className="css-is-deranged" href="https://www.instagram.com">Instagram</a></li>
              <li><a className="css-is-deranged" href="https://twitter.com/home">Twitter</a></li>
              <li><a className="css-is-deranged" href="https://www.facebook.com">Facebook</a></li>
            </ul>
          </footer>
        </section>
      </div>
    )
  }
}

export default Home;