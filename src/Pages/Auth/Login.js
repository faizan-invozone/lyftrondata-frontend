import React, { Component } from "react";

import {
  Button,
  Card,
  CardFooter,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",

      password: "",
      is_staff: false,
      is_active: false,
    };

    this.email = this.email.bind(this);

    this.password = this.password.bind(this);

    // this.password = this.password.bind(this);

    this.login = this.login.bind(this);
  }
  email(event) {
    this.setState({ email: event.target.value });
  }

  password(event) {
    this.setState({ password: event.target.value });
  }

  toggleStaff = () => {
    this.setState({
      is_staff: !this.state.is_staff,
    });
  };

  toggleActive = () => {
    this.setState({
      is_active: !this.state.is_active,
    });
  };

  login(event) {
    // console.log("In Login", payload);
    var apiBaseUrl = "http://127.0.0.1:8000/api/auth/login";
    var self = this;
    var payload = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log("In Login", payload.email);
    axios
      .post(apiBaseUrl, {
        email: this.state.email,
        password: this.state.password,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div
        className="app flex-row align-items-center"
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          style={{
            alignSelf: "center",
            alignContent: "center",
            margin: "200px",
          }}
        >
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <div className="row" className="mb-2 pageheading">
                      <div className="col-sm-12 btn btn-primary">Log In</div>
                    </div>

                    <InputGroup className="mb-3">
                      <Input
                        type="email"
                        onChange={this.email}
                        placeholder="Enter Email"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <Input
                        type="password"
                        onChange={this.password}
                        placeholder="Enter Password"
                      />
                    </InputGroup>

                    <Button onClick={this.login} color="success" block>
                      Login
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
