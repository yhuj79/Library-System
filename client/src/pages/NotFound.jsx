import React from "react";
import { motion } from "framer-motion";
import { Button, Container, Header } from "semantic-ui-react";

function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container textAlign="center" style={{ marginTop: "100px" }}>
        <Header as="h1">Page Not Found!</Header>
        <Button onClick={() => window.location.replace("/")}>메인 화면</Button>
      </Container>
    </motion.div>
  );
}

export default NotFound;
