import React from "react";
import { motion } from "framer-motion";
import { Container, Loader } from "semantic-ui-react";

function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <Loader active size="huge">
          Loading...
        </Loader>
      </Container>
    </motion.div>
  );
}

export default Loading;
