import React, { Component, Fragment } from "react";
import axios from "axios";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  CustomInput,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import { NonceProvider } from "react-select";
import Configuration from "../../../config/urlconfig";

export default class Connection extends Component {
  constructor() {
    super();
    this.config = new Configuration();
    this.state = {
      apiname: "",
      apiid: "",
      conname: "",
      loading: true,
      person: [],
      paramlist: [],
      conparams: {},
      classmd: "col-md-3 col-sm-3",
      childVisible: "none",
      classleft: "row",
      classright: "",
      topclass: "mt-4",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    //   this.inputChangeHandler=this.inputChangeHandler.bind(this);
  }

  async componentDidMount() {
    const url = this.config.API_URL + "/api/apis";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    this.setState({ person: data.result, loading: false });
  }

  async handleClick(event) {
    const idc = event.currentTarget.id;
    const idm = event.currentTarget.name;
    console.log(idc);
    const url = this.config.API_URL + "/api/apiparams?apiid=" + idc;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    this.setState({
      paramlist: data.result,
      childVisible: "block",
      apiname: idm,
      apiid: idc,
      classmd: "col-md-12 col-sm-12",
      classleft: "col-md-3 col-sm-3",
      classright: "col-md-8 col-sm-8",
      topclass: "row mt-4",
    });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  inputChangeHandler(e) {
    debugger;
    e.preventDefault();
    let conparams = { ...this.state.conparams };
    conparams[e.target.name] = e.target.value;
    this.setState({
      conparams,
    });
  }

  handleSubmit = (e) => {
    debugger;
    let url = this.config.API_URL + "/api/cons";
    let data = this.state;
    debugger;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("resp", resp);
      });
      alert("data submited");
      window.location.reload();
    });
  };

  render() {
    const persons = this.state.person.map((item, i) => (
      <div className={this.state.classmd}>
        <a
          className="button-widget-content cardlink"
          id={item.id}
          name={item.name}
          onClick={this.handleClick}
        >
          <div className="card mb-2 widget-content p-2">
            <div className="widget-content-outer">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <img
                    width="45"
                    className="rounded-circle"
                    src={item.logoimage}
                  />
                </div>
                <div className="widget-content-left ml-3">
                  <div className="widget-heading"> {item.name}</div>
                  <div className="widget-subheading"> {item.type}</div>
                  <div className="widget-subheading text-secondary small">
                    {item.plan}
                    <div className="ml-5 widget-subheading badge badge-danger">
                      {item.version}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    ));
    const paramlists = this.state.paramlist.map((item, i) => (
      <div className="col-md-12 mb-3">
        <label className="font-weight-bolder">{item.key}</label>
        {item.key == "password" && (
          <input
            type="password"
            className="form-control"
            placeholder={item.key}
            name={item.key}
            onChange={(e) => this.inputChangeHandler.call(this, e)}
            value={this.state.conparams.test}
            required
          />
        )}
        {item.key != "password" && (
          <input
            type="text"
            className="form-control"
            placeholder={item.key}
            name={item.key}
            onChange={(e) => this.inputChangeHandler.call(this, e)}
            value={this.state.conparams.test}
            required
          />
        )}
        <div className="valid-feedback">Looks good!</div>
      </div>
    ));
    return (
      <Fragment>
        <div>
          {this.state.loading || !this.state.person ? (
            <div>Loading.........</div>
          ) : (
            <Card className="main-card mb-3">
              <CardBody>
                <CardTitle>
                  <center>
                    <h5>Connection</h5>
                  </center>
                </CardTitle>
                <p>
                  <center>
                    List of api shown.. For add connection click on any api
                  </center>
                </p>

                <div className={this.state.topclass}>
                  <div className={this.state.classleft}>{persons}</div>
                  <div
                    className={this.state.classright}
                    style={{ display: this.state.childVisible }}
                  >
                    <div className="main-card card">
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          Configure your {this.state.apiname} Integration
                        </h5>
                        <p className="text-center mb-3 font-size-md">
                          Check out the documentation if you need some help
                          setting up your {this.state.apiname} integration. If
                          you’re not sure where to find this information you can
                          invite a member of your team to help.
                        </p>
                        <div className="needs-validation">
                          <form>
                            <div className="form-row">
                              <div className="col-md-12 mb-3">
                                <label className="font-weight-bolder">
                                  Connection Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Connection Name"
                                  name="conname"
                                  onChange={this.handleInputChange}
                                  required
                                />
                                <div className="valid-feedback">
                                  Looks good!
                                </div>
                              </div>
                              {paramlists}
                              <div className="col-md-12 mb-3">
                                <Button
                                  className="pull-right buttonall"
                                  onClick={this.handleSubmit}
                                >
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </Fragment>
    );
  }
}
