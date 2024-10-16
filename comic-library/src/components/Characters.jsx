// import React from "react";
import PropTypes from "prop-types";
import "../styles/Characters.scss";

export default function Characters({ data = [], onClick, addToFavorites, isFavorite }) {
  return (
    <div className="characters">
      {data.length > 0 && data.map((dataItem) => {
        return (
          <div key={dataItem.id} className="characterCard">
            <div
              className="thumbnail"
              style={{
                background: `url(${dataItem.thumbnail.path}.${dataItem.thumbnail.extension}) no-repeat center`,
                backgroundSize: "cover",
              }}
              onClick={() => onClick(dataItem.id)}
            >
              <div className="caption">{dataItem.name}</div>
              <div className="caption bottom">View Comics</div>
            </div>
            <button onClick={() => addToFavorites(dataItem)}>
              {isFavorite(dataItem.id) ? "★" : "☆"} {/* 별표 표시 */}
            </button>
            
          </div>
        );
      })}
    </div>
  );
}

// PropTypes 정의
Characters.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
};
