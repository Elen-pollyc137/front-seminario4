import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

import AddSong from "./AddSong";

export class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: [],
      image: "",
      previewImage: "",
      song: "",

    };
  }

  handleInput = ({ target }) => {
    if (target.name === "image") {
      this.setState({ [target.name]: target.files[0] });

      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          previewImage: reader.result,
        });
      };

      reader.readAsDataURL(target.files[0]);
    } else {
      this.setState({ [target.name]: target.value });
    }
  };

  submitAlbumImage = () => {
    const { album, image } = this.state;

    const formData = new FormData();
    formData.append("album_image", image);

    axios
      .put(`http://127.0.0.1:3330/albums/${album.id}/photo`, formData)
      .then((res) => this.setState({ previewImage: res.data.image, image: "" }))
      .catch((err) => console.log(err));


  };

  onDelete = (id) => {
    let resp = window.confirm("Deseja realmente Excluir?");
    if (!resp) return;
    axios
      .delete(`http://127.0.0.1:3330/songs/${id}`)
      .then((res) =>
        this.setState((prev) => ({
          album: {
            ...prev.album,
            songs: [...prev.album.songs.filter((song) => song.id !== id)],
          },
        }))
      )
      .catch((err) => console.log(err));
  };

  onCreateSong = () => {
    const { song, album } = this.state;

    if (song === "") return;

    axios
      .post(`http://127.0.0.1:3330/albums/${album.id}/song/add`, { song })
      .then((res) =>
        this.setState((prev) => ({
          album: {
            ...prev.album,
            songs: [...prev.album.songs, res.data],
          },
          song: "",
        }))
      )
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    const album = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:3330/albums/${album}`)
      .then((res) => this.setState({ album: res.data }))
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    const { image } = this.state;

    if (image !== "") {
      if (window.confirm("Deseja salvar as alterações?"))
        this.submitAlbumImage();
    }
  }

  render() {
    const { album, image, previewImage, song } = this.state;

    console.log(album);

    let loadImage = previewImage ? previewImage : album.image;

    return (
      <div style={{ padding: '3rem' }} className="box padd">
        <div className="title">

          <Link className="link" to="/">{`< Voltar `}</Link>

          <h2>Detalhes do Album (<p>{album.name}</p>)</h2>
        </div>
        {album && <img className="image" src={album.imagem} alt="" />}

        <div className="columns">
          <div className="column-img mg-r">
            {loadImage ? (<>
              <img className="image" src={loadImage} alt="" />
              <p>New!</p></>)
              : ""
            }
          </div>
          <div className="column-song">
            <AddSong
              handleInput={this.handleInput}
              onCreateSong={this.onCreateSong}
              song={song}
            />
            {album.songs
              ? album.songs.map((song, idx) => (
                <div class="key" key={song.id}>
                  <p>
                    {idx + 1}. {song.name}</p>
                  <span
                    className="icon has-text-danger"
                    onClick={() => this.onDelete(song.id)}
                  >
                    <i className="fas fa-trash-alt" />
                  </span>
                </div>
              ))
              : null}
          </div>
        </div>
        <div className="fileForm">
          <div className="file control">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="image"
                onChange={this.handleInput}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload" />
                </span>
                <div className="file-label">Escolher imagem...</div>
              </span>
              <span className="file-name">
                {image.name !== undefined ? image.name : "Sem imagem"}
              </span>
            </label>
          </div>

          <button
            className="button is-info control"
            onClick={this.submitAlbumImage}
          >
            Atualizar
          </button>
        </div>
      </div>
    );
  }
}

export default Album;
