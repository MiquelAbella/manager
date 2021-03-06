import React, { useEffect, useState } from "react";
import "./history.css";
import { Link } from "react-router-dom";

export const History = ({ user, setUid }) => {
  const [commonPlace, setCommonPlace] = useState(() => {
    if (user.history) {
      let positions = [];
      for (let i = 0; i < user.history.length; i++) {
        positions.push([user.history[i][0][0], user.history[i][0][1]]);
      }

      let mf = 1;
      let m = 0;
      let item;

      for (let i = 0; i < positions.length; i++) {
        for (let j = i; j < positions.length; j++) {
          if (
            positions[i][0].toFixed(4) === positions[j][0].toFixed(4) &&
            positions[i][1].toFixed(4) === positions[j][1].toFixed(4)
          )
            m++;
          if (mf < m) {
            mf = m;
            item = positions[i];
          }
        }

        m = 0;
      }

      return item;
    } else {
      return null;
    }
  });

  let mostCommonPlace = () => {
    let positions = [];
    for (let i = 0; i < user.history.length; i++) {
      positions.push([user.history[i][0][0], user.history[i][0][1]]);
    }

    let mf = 1;
    let m = 0;
    let item;

    for (let i = 0; i < positions.length; i++) {
      for (let j = i; j < positions.length; j++) {
        if (
          positions[i][0].toFixed(4) === positions[j][0].toFixed(4) &&
          positions[i][1].toFixed(4) === positions[j][1].toFixed(4)
        )
          m++;
        if (mf < m) {
          mf = m;
          item = positions[i];
        }
      }

      m = 0;
    }

    return item;
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; 
    var dLat = deg2rad(lat2 - lat1); 
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; 
    return d.toFixed(2);
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const [distances, setDistances] = useState(() => {
    let distances = [];
    let commonPlace = mostCommonPlace();
    let positions = [];
    for (let i = 0; i < user.history.length; i++) {
      positions.push([user.history[i][0][0], user.history[i][0][1]]);
    }

    for (let i = 0; i < user.history.length; i++) {
      distances.push(
        getDistanceFromLatLonInKm(
          user.history[i][0][0],
          user.history[i][0][1],
          commonPlace[0],
          commonPlace[1]
        )
      );
    }
    return distances;
  });

  return (
    <div className="history">
      <nav className="nav">
        <ul>
          <Link to="/form">
            <li>Planificador</li>
          </Link>
          <Link to="/history">
            <li>Hist??ric</li>
          </Link>
          <Link to="/chart">
            <li>Gr??fic</li>
          </Link>
          <li
            onClick={() => {
              setUid("");
            }}
          >
            Surt
          </li>
        </ul>
      </nav>
      <p style={{ width: "80%", textAlign: "left", margin: "2vh" }}>
        {" "}
        *El lloc habitual ??s el lloc on m??s vegades ha fet servir l'aplicaci?? la
        persona cuidada.
      </p>
      <p className="date">
        {user.history.length ? (
          <strong>{user.history[0][2]}</strong>
        ) : (
          <p>No hi ha res a mostrar</p>
        )}
      </p>
      {user.history
        ? user.history.map((moment, idx) => {
            return (
              <div key={idx} className="moment">
                {user.history[idx - 1] &&
                user.history[idx][2] !== user.history[idx - 1][2] ? (
                  <>
                    <p className="date">
                      <strong>{moment[2]}</strong>
                    </p>
                    <p>text: {moment[1]}</p>
                    <p>
                      {commonPlace &&
                      commonPlace[0].toFixed(3) === moment[0][0].toFixed(3) &&
                      commonPlace[1].toFixed(3) === moment[0][1].toFixed(3) ? (
                        <a
                          className="google-link"
                          target="_blank"
                          href={`https://www.google.com/search?q=${moment[0][0]}+%2C+${moment[0][1]}`}
                        >
                          Lloc habitual
                        </a>
                      ) : (
                        <a
                          className="google-link"
                          target="_blank"
                          href={`https://www.google.com/search?q=${moment[0][0]}+%2C+${moment[0][1]}`}
                        >
                          Lloc: {moment[0][0]} , {moment[0][1]} -{" "}
                          <span>
                            &nbsp;
                            {distances[idx]}Km del lloc habitual
                          </span>
                        </a>
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <p>text: {moment[1]}</p>
                    <p>
                      {commonPlace &&
                      commonPlace[0].toFixed(3) === moment[0][0].toFixed(3) &&
                      commonPlace[1].toFixed(3) === moment[0][1].toFixed(3) ? (
                        <a
                          className="google-link"
                          target="_blank"
                          href={`https://www.google.com/search?q=${moment[0][0]}+%2C+${moment[0][1]}`}
                        >
                          Lloc habitual
                        </a>
                      ) : (
                        <a
                          className="google-link"
                          target="_blank"
                          href={`https://www.google.com/search?q=${moment[0][0]}+%2C+${moment[0][1]}`}
                        >
                          Lloc: {moment[0][0]} , {moment[0][1]} -{" "}
                          <span>
                            &nbsp;
                            {distances[idx]}Km del lloc habitual
                          </span>
                        </a>
                      )}
                    </p>
                  </>
                )}
              </div>
            );
          })
        : null}
    </div>
  );
};
