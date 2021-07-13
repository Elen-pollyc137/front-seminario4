import React from "react";

const AddSong = ({ handleInput, song, onCreateSong }) => (
  <div>
    <div className="field has-addons ">
      <div className="control is-expanded">
        <input
          className="input"
          type="text"
          placeholder="Adicionar uma musica"
          value={song}
          name="song"
          onChange={handleInput}
        />
      </div>
      <div className="control">
        <button className="button is-success" onClick={onCreateSong}>
          <i className="fas fa-plus" />
        </button>
      </div>
    </div>
  </div>
);

export default AddSong;
