import React, { Component } from "react";
import axios from "axios";
import AlbumCreate from "./AlbumCreate";
import Albums from "./Albums";
import "bulma/css/bulma.min.css";
import "./styles.css"

class AlbumsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      showInfo: false,
      album: "",
      artist: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:3330/albums")
      .then((res) => this.setState({ albums: res.data }))
      .catch((err) => console.log(err));
  }

  handleSubmit = () => {
    const { album, artist } = this.state;

    if (album === "" || artist === "") return;

    axios
      .post("http://127.0.0.1:3330/albums", { album, artist })
      .then((res) =>
        this.setState((prev) => ({
          albums: [res.data, ...prev.albums],
          album: "",
          artist: "",
        }))
      )
      .catch((err) => console.log(err));
  };

  handleInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  onDeleteAlbum = (id) => {
    let resp = window.confirm("Deseja realmente Excluir?");
    if (!resp) return;
    axios
      .delete(`http://127.0.0.1:3330/albums/${id}`)
      .then((res) =>
        this.setState({
          albums: this.state.albums.filter((album) => album.id !== id),
        })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const { albums, album, artist } = this.state;

    console.log(album);
    return (
      <div className="container">
        <AlbumCreate
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          artist={artist}
          album={album}
        />
        <div className="columns">
          <Albums albums={albums} onDeleteAlbum={this.onDeleteAlbum} />
        </div>
      </div>
    );
  }
}

export default AlbumsPage;
