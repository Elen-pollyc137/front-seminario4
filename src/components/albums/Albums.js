import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const Albums = ({ albums, onDeleteAlbum }) => {
  return (
    <div className="column">
      {albums.map(album => (
        <div className="media box" key={album.id}>
          <div className="media-left">
            <span className="tag is-info">{album.id}</span>
          </div>
          <div className="media-content">
            <p className="title is-4">{album.name} </p>
            <p>Artista: {album.artist}</p>
          </div>
          <div className="media-right btns ">
            <Link to={`/albums/${album.id}`} className="is-success button">
              <i className="fas fa-info-circle" />
            </Link>
            <button
              className="button is-danger"
              onClick={() => onDeleteAlbum(album.id)}>
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Albums;
