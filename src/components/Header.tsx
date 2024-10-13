import React from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import MyNavbar from "./MyNavbar";

const Header: React.FC = () => {
  const navbarLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/map", label: "Map" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="app-header">
      <Container fluid className="bg-dark text-white py-2">
        <Row className="align-items-center justify-content-between">
          <Col xs={8} className="d-flex align-items-center">
            {/* Logo or Title */}
            {/* <img
              src={require("../logo.svg").default}
              alt="App Logo"
              className="app-logo"
              width="50"
            /> */}
            <span className="app-title ml-3">Dynamico</span>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            {/* React Bootstrap Navbar */}
            <MyNavbar
              logoSrc={require("../logo.svg").default}
              brandName=""
              links={navbarLinks}
            />
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
