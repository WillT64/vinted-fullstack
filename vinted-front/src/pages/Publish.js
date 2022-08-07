import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles/publish-styles.scss";
const Publish = ({ userToken }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quality, setQuality] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", quality);
      formData.append("city", location);
      formData.append("price", price);
      formData.append("picture", picture);
      console.log("~ formData", formData);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("responsePublishForm", response.data);
      if (response.data._id) {
        navigate(`/product/${response.data._id}`);
      }
    } catch (error) {
      console.log("errorPublishForm", error.response.data);
    }
  };

  return (
    <>
      {userToken ? (
        <>
          <div className="title--publish">
            <h2>publish page</h2>
          </div>
          <div className="publish--form">
            <form onSubmit={handleSubmit}>
              <div className="file--uploader">
                <label htmlFor="file">+ Ajouter photo</label>
                <input
                  id="file"
                  type="file"
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
              {picture && (
                <>
                  <h4>Photos uploadées :</h4>{" "}
                  <img
                    src={URL.createObjectURL(picture)}
                    alt="la tof"
                    className="uploaded--photos"
                  />
                </>
              )}
              <input
                type="text"
                placeholder="Titre"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Marque"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Taille"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Couleur"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Qualité"
                value={quality}
                onChange={(event) => {
                  setQuality(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Lieu"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Prix"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <input type="submit" />
            </form>
          </div>
        </>
      ) : (
        <Navigate to="/connect" />
      )}
    </>
  );
};

export default Publish;
