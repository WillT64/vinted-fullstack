import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./styles/product-styles.scss";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  console.log("~ data", data);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      voici la page produit de l'id : {id}
      {isLoading ? (
        <span>loading data ...</span>
      ) : (
        <div className="product--page">
          {/* pas le plus optimisé */}
          {data.offers.map((elem, index) => {
            if (elem._id === id) {
              return (
                <div className="product--content" key={index}>
                  <div className="product--photos">
                    {elem.product_pictures.length === 0 ? (
                      <img
                        src={elem.product_image.url}
                        alt="vetement"
                        key={index}
                        style={{
                          height: "300px",
                        }}
                      ></img>
                    ) : (
                      <>
                        {elem.product_pictures.map((elem, index) => {
                          return (
                            <img
                              src={elem.url}
                              alt="vetement"
                              key={index}
                              style={{
                                height: "300px",
                              }}
                            ></img>
                          );
                        })}
                      </>
                    )}
                  </div>
                  <div className="product--details">
                    <div className="product--infos">
                      <div>Titre : {elem.product_name}</div>
                      <div>Prix : {elem.product_price}</div>
                      <div>Description : {elem.product_description}</div>
                      <div>Marque : {elem.product_details[0]?.MARQUE}</div>
                      <div>Taille : {elem.product_details[1]?.TAILLE}</div>
                      <div>Etat : {elem.product_details[2]?.ÉTAT}</div>
                      <div>Couleur : {elem.product_details[3]?.COULEUR}</div>
                      <div>
                        Location : {elem.product_details[4]?.EMPLACEMENT}
                      </div>
                    </div>
                    <div className="product--buy">
                      <button
                        onClick={() => {
                          navigate(
                            `/buy/${elem.product_price}/${elem.product_name}`
                          );
                        }}
                      >
                        Acheter !
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      )}
    </>
  );
};

export default Product;
