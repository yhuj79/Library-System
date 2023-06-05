import React, { useEffect, useState } from "react";
import { Grid, Item } from "semantic-ui-react";
import styles from "../style/List.module.css";
import imgDefault from "../assets/book/imgDefault.png";
import { useNavigate } from "react-router-dom";
import imgStyles from "../style/Image.module.css";

function BookThumb({ data }) {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Grid relaxed columns={width > 1000 ? 4 : width > 600 ? 2 : 1}>
      {data.slice(0, 4).map((data, index) => {
        return (
          <Grid.Column
            onClick={() => navigate(`/book/${data.title}`)}
            className={styles.list}
            textAlign="center"
            key={index}
          >
            <Item>
              {data.bookImg === "imgDefault" ? (
                <img
                  alt=""
                  className={imgStyles.bookImg}
                  style={{ height: "303px" }}
                  src={imgDefault}
                />
              ) : (
                <img
                  alt=""
                  className={imgStyles.bookImg}
                  style={{ height: "303px" }}
                  src={data.bookImg}
                />
              )}
              <Item.Content style={{ marginTop: "10px" }}>
                <Item.Header as="h3">{data.title}</Item.Header>
                <Item.Description>{data.author}</Item.Description>
              </Item.Content>
            </Item>
          </Grid.Column>
        );
      })}
    </Grid>
  );
}

export default BookThumb;
