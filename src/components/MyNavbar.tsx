import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface NavbarLink {
  href: string;
  label: string;
}

interface MyNavbarProps {
  logoSrc?: string;
  brandName: string;
  links: NavbarLink[];
}

const MyNavbar: React.FC<MyNavbarProps> = ({ logoSrc, brandName, links }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {logoSrc && (
          <Navbar.Brand href="/">
            <img
              src={logoSrc}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />{" "}
            {brandName}
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map((link, index) => (
              <Nav.Link as={Link} key={index} to={link.href}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
