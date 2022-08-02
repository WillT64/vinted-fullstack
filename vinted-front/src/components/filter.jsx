const Filters = ({ filter, setFilter }) => {
  return (
    <div className="articles--filter">
      <label for="filterKeywords">Mots-clés:</label>
      <input
        type="input"
        onChange={(e) => {
          let newFilter;
          newFilter = { ...filter };
          newFilter["title"] = e.target.value;
          setFilter(newFilter);
        }}
      />

      <label for="filterPriceMin">Prix min:</label>
      <input
        type="input"
        onChange={(e) => {
          let newFilter;
          newFilter = { ...filter };
          newFilter["priceMin"] = e.target.value;
          setFilter(newFilter);
        }}
      />
      <label for="filterPriceMax">Prix max:</label>
      <input
        type="input"
        onChange={(e) => {
          let newFilter;
          newFilter = { ...filter };
          newFilter["priceMax"] = e.target.value;
          setFilter(newFilter);
        }}
      />

      <label for="priceOrder">Ordre:</label>
      <input list="priceOrder" id="priceOrder" name="priceOrder" />
      <datalist id="priceOrder">
        <option value="croissant" />
        <option value="decroissant" />
      </datalist>

      <label for="filterSkip">Skip:</label>
      <input
        type="input"
        onChange={(e) => {
          let newFilter;
          newFilter = { ...filter };
          newFilter["skip"] = e.target.value;
          setFilter(newFilter);
        }}
      />

      <label for="filterLimit">Limit:</label>
      <input
        type="input"
        onChange={(e) => {
          let newFilter;
          newFilter = { ...filter };
          newFilter["limit"] = e.target.value;
          setFilter(newFilter);
        }}
      />
    </div>
  );
};

export default Filters;
