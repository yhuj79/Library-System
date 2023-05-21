import React from "react";
import { Button, Container, Header } from "semantic-ui-react";

function NotFound() {
  return (
    <Container textAlign="center" style={{ marginTop: "100px" }}>
      <Header as="h1">Page Not Found!</Header>
      <Button onClick={() => window.location.replace("/")}>메인 화면</Button>
    </Container>
  );
}

export default NotFound;
