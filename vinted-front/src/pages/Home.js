import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Filter from "../components/filter";
import Articles from "../components/articles";

const Home = () => {
  const [data, setData] = useState();
  console.log("~ data", data);
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState({});
  console.log("~ filter", filter);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.log(error.response);
      }
    };
    fetchData();
  }, []);

  // fetch filter
  useEffect(() => {
    const fetchData = async () => {
      console.log("~ fetchData");

      try {
        let url = `https://lereacteur-vinted-api.herokuapp.com/offers?`;

        Object.keys(filter).forEach((elem, index) => {
          if (index !== 0) {
            url += "&";
          }
          url += `${elem}=${filter[elem]}`;
        });
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [filter]);

  return (
    <>
      <div className="body">
        <div className="content">
          <Filter filter={filter} setFilter={setFilter} />
          {isLoading ? (
            <h2>loading articles ...</h2>
          ) : (
            <Articles data={data} Link={Link} />
          )}
        </div>
      </div>
      <div className="footer"></div>
    </>
  );
};

export default Home;
