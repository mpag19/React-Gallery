import React, { Component } from "react";
import "./App.css";
import PictureContainer from "./Components/PictureContainer";
import PictureByArtist from "./Components/PictureByArtist";

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
      paintingName: "",
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
          option: false,
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

  handleChange = (event) => {
    let eTarget = event.target.value;
    this.setState((prevState, props) => {
      return {
        selectedArtist: eTarget,
      };
    });

    console.log(this.state.selectedArtist);
  };

  getPaintingsByArtist = () => {
    const api = "https://www.wikiart.org/en/api/2/PaintingsByArtist?id=";
    const query = this.state.selectedArtist;
    fetch(api + query)
      .then((res3) => res3.json())
      .then((json3) => {
        this.setState({
          picsByArtist: json3.data,
          option: true,
        });

        console.log(this.state.picsByArtist);
      });
  };

  render() {
    return (
      <div className="App">
        <h1>THE GALLERY REACT APP</h1>

        <div>
          <p>
            would you like to see some Paintings from you favorite Artist
            then...
          </p>
          <label>
            Select an Artist:
            <select onChange={this.handleChange}>
              {this.state.artists.map((artist, key) => (
                <option key={key} value={artist.id}>
                  {artist.artistName}
                </option>
              ))}
            </select>
            <button onClick={this.getPaintingsByArtist}>Search</button>
          </label>
          <div>
            {this.state.option && (
              <PictureByArtist picsByArtist={this.state.picsByArtist} />
            )}
          </div>
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
