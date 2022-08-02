const Articles = ({ data, Link }) => {
  return (
    <div className="articles--section">
      <h2>Articles populaires</h2>
      <div className="articles">
        {data.offers.map((elem, index) => {
          return (
            <div className="article--infos" key={index}>
              <div className="article--details">
                {elem.owner && (
                  <div className="article--username">
                    user : {elem.owner.account.username}
                  </div>
                )}
                <div className="article--name">name : {elem.product_name}</div>
              </div>
              <div className="article--picture">
                photo :
                <Link to={`/product/${elem._id}`}>
                  {elem.product_image && (
                    <img src={elem.product_image.url} alt="product" />
                  )}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Articles;
