import { useEffect } from "react";
import axios from "axios";

function ApiTest() {
  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/admin/bookstat/validate`,
        params: { title: "나의 문화유산 답사기 365일" },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <div>ApiTest</div>;
}

export default ApiTest;
