import React from "react";

const AlbumCreate = ({ handleInput, handleSubmit, artist, album }) => (
  <div className="box">
    <h1 className="title">Adicionar Album</h1>
    <div className="field">
      <div className="control">
        <input
          className="input"
          name="album"
          placeholder="Nome do Album"
          onChange={handleInput}
          value={album}
        />
      </div>
    </div>
    <div className="field">
      <div className="control">
        <input
          className="input"
          name="artist"
          placeholder="Artista/Banda"
          onChange={handleInput}
          value={artist}
        />
      </div>
    </div>
    <div className="field">
      <button className="button" onClick={handleSubmit}>
        Adicionar
      </button>
    </div>
  </div>
);

export default AlbumCreate;
