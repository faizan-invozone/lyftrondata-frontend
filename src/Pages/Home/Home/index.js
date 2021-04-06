import React, { Component, Fragment, useState } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  NavLink,
  FormGroup,
  Label,
  Input,
  Button,
  Image,
} from "reactstrap";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Configuration from "../../../config/urlconfig";
// import IntByBatchGrapdh from './intByBatchGrapdh';

import Postgres from "../../Integrations/components/image/Postgre-icon.svg";

const HomePage = (props) => {
  return (
    <div>
      <div className="preloader">
        <div className="loader">
          <div className="ytp-spinner">
            <div className="ytp-spinner-container">
              <div className="ytp-spinner-rotator">
                <div className="ytp-spinner-left">
                  <div className="ytp-spinner-circle"></div>
                </div>
                <div className="ytp-spinner-right">
                  <div className="ytp-spinner-circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="navbar-area">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#">
                  <img
                    src="https://randomuser.me/api/portraits/men/17.jpg"
                    alt="Logo"
                  />
                </a>

                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarTwo"
                  aria-controls="navbarTwo"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                </button>

                <div
                  class="collapse navbar-collapse sub-menu-bar"
                  id="navbarTwo"
                >
                  <ul class="navbar-nav m-auto">
                    <li class="nav-item active">
                      <a class="page-scroll" href="#home">
                        home
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#services">
                        Services
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#portfolio">
                        Portfolio
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#pricing">
                        Pricing
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#about">
                        About
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#team">
                        Team
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#contact">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="navbar-btn d-none d-sm-inline-block">
                  <ul>
                    <li>
                      <a class="solid" href="#">
                        Download
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section id="home" class="slider_area">
        <div id="carouselThree" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li
              data-target="#carouselThree"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselThree" data-slide-to="1"></li>
            <li data-target="#carouselThree" data-slide-to="2"></li>
          </ol>

          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="slider-content">
                      <h1 class="title">Business is Now Digital</h1>
                      <p class="text">
                        We blend insights and strategy to create digital
                        products for forward-thinking organisations.
                      </p>
                      <ul class="slider-btn rounded-buttons">
                        <li>
                          <a class="main-btn rounded-one" href="#">
                            GET STARTED
                          </a>
                        </li>
                        <li>
                          <a class="main-btn rounded-two" href="#">
                            DOWNLOAD
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slider-image-box d-none d-lg-flex align-items-end">
                <div class="slider-image">
                  <img src="assets/images/slider/1.png" alt="Hero" />
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="slider-content">
                      <h1 class="title">Crafted for Business</h1>
                      <p class="text">
                        We blend insights and strategy to create digital
                        products for forward-thinking organisations.
                      </p>
                      <ul class="slider-btn rounded-buttons">
                        <li>
                          <a class="main-btn rounded-one" href="#">
                            GET STARTED
                          </a>
                        </li>
                        <li>
                          <a class="main-btn rounded-two" href="#">
                            DOWNLOAD
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slider-image-box d-none d-lg-flex align-items-end">
                <div class="slider-image">
                  <img src="assets/images/slider/2.png" alt="Hero" />
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="slider-content">
                      <h1 class="title">Based on Bootstrap 4</h1>
                      <p class="text">
                        We blend insights and strategy to create digital
                        products for forward-thinking organisations.
                      </p>
                      <ul class="slider-btn rounded-buttons">
                        <li>
                          <a class="main-btn rounded-one" href="#">
                            GET STARTED
                          </a>
                        </li>
                        <li>
                          <a class="main-btn rounded-two" href="#">
                            DOWNLOAD
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slider-image-box d-none d-lg-flex align-items-end">
                <div class="slider-image">
                  <img src="assets/images/slider/3.png" alt="Hero" />
                </div>
              </div>
            </div>
          </div>

          <a
            class="carousel-control-prev"
            href="#carouselThree"
            role="button"
            data-slide="prev"
          >
            <i class="lni lni-arrow-left"></i>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselThree"
            role="button"
            data-slide="next"
          >
            <i class="lni lni-arrow-right"></i>
          </a>
        </div>
      </section>
      <section id="services" class="features-area">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-10">
              <div class="section-title text-center pb-10">
                <h3 class="title">Our Services</h3>
                <p class="text">
                  Stop wasting time and money designing and managing a website
                  that doesn’t get results. Happiness guaranteed!
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-7 col-sm-9">
              <div class="single-features mt-40">
                <div class="features-title-icon d-flex justify-content-between">
                  <h4 class="features-title">
                    <a href="#">Graphics Design</a>
                  </h4>
                  <div class="features-icon">
                    <i class="lni lni-brush"></i>
                    <img
                      class="shape"
                      src="assets/images/f-shape-1.svg"
                      alt="Shape"
                    />
                  </div>
                </div>
                <div class="features-content">
                  <p class="text">
                    Short description for the ones who look for something new.
                    Short description for the ones who look for something new.
                  </p>
                  <a class="features-btn" href="#">
                    LEARN MORE
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-7 col-sm-9">
              <div class="single-features mt-40">
                <div class="features-title-icon d-flex justify-content-between">
                  <h4 class="features-title">
                    <a href="#">Website Design</a>
                  </h4>
                  <div class="features-icon">
                    <i class="lni lni-layout"></i>
                    <img
                      class="shape"
                      src="assets/images/f-shape-1.svg"
                      alt="Shape"
                    />
                  </div>
                </div>
                <div class="features-content">
                  <p class="text">
                    Short description for the ones who look for something new.
                    Short description for the ones who look for something new.
                  </p>
                  <a class="features-btn" href="#">
                    LEARN MORE
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-7 col-sm-9">
              <div class="single-features mt-40">
                <div class="features-title-icon d-flex justify-content-between">
                  <h4 class="features-title">
                    <a href="#">Digital Marketing</a>
                  </h4>
                  <div class="features-icon">
                    <i class="lni lni-bolt"></i>
                    <img
                      class="shape"
                      src="assets/images/f-shape-1.svg"
                      alt="Shape"
                    />
                  </div>
                </div>
                <div class="features-content">
                  <p class="text">
                    Short description for the ones who look for something new.
                    Short description for the ones who look for something new.
                  </p>
                  <a class="features-btn" href="#">
                    LEARN MORE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
