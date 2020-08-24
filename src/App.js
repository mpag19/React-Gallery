import React, { Component } from "react";
import "./App.css";
import PictureContainer from "./Components/PictureContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pics: [],
      artists: [],
      isLoaded: false,
      option: "",
      selectedArtist: "",
      picsByArtist: [],
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(
        "https://www.wikiart.org/en/api/2/MostViewedPaintings?imageFormat=PinterestSmall"
      ),
      fetch("https://www.wikiart.org/de/api/2/UpdatedArtists"),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([json1, json2]) => {
        this.setState({
          isLoaded: true,
          option: "viewed",
          pics: json1.data,
          artists: json2.data,
        });
        console.log(this.state.pics);
        console.log(this.state.artists);
      })

      .catch((err) => {
        throw Error(err.message);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>THE GALLERY REACT APP</h1>
        <div>
          <label>
            Select an Artist:
            <select>
              {this.state.artists.map((artist, key) => (
                <option key={artist.id} value={artist.artistName}>
                  {artist.artistName}
                </option>
              ))}
            </select>
          </label>
          <input id="byArtist" type="submit" value="search" />
        </div>
        <div>
          <h1>Most Viewed Paintings</h1>
          <div>
            <PictureContainer pics={this.state.pics} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
