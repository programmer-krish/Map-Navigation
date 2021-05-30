import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import StarIcon from "@material-ui/icons/Star";
import "./app.css";
import axios from "axios";

function App() {
  const [pins, setPins] = useState([]);
  const [currentplaceid, setCurrentplaceId] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100v",
    height: "100vh",
    latitude: 7.8731,
    longitude: 80.7718,
    zoom: 7,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/pins");
        console.log(res.data);
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleMarkClick = (id) => {
    setCurrentplaceId(id);
  };

  // const [showPopup, togglePopup] = useState(false);

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/rkrishnamohan/ckpb49lnb2yk118ow3wy9oc92"
      >
        {pins.map((p) => {
          console.log(p);
          return (
            <div key={p._id}>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <RoomIcon
                  style={{ fontSize: viewport.zoom * 7, color: "slateblue" }}
                  onClick={() => handleMarkClick(p._id)}
                />
              </Marker>
              {p._id === currentplaceid ? (
                <Popup
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setCurrentplaceId(null)}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="desc">{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      <StarIcon className="star" />
                      <StarIcon className="star" />
                      <StarIcon className="star" />
                      <StarIcon className="star" />
                    </div>
                    <label>Information</label>
                    <span className="username">
                      created by <b>Krish</b>
                    </span>
                    <span className="date">1 hour ago</span>
                  </div>
                </Popup>
              ) : (
                "..."
              )}
            </div>
          );
        })}
      </ReactMapGL>
    </div>
  );
}

export default App;
