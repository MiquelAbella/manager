import React, { useEffect, useState } from "react";
import "./history.css";
import { Link } from "react-router-dom";

export const History = ({ user, setUid }) => {
  const [commonPlace, setCommonPlace] = useState(() => {
    let positions = [];
    for (let i = 0; i < user.history.length; i++) {
      positions.push([user.history[i][0][0], user.history[i][0][1]]);
    }

    return positions
      .sort(
        (a, b) =>
          positions.filter((v) => v === a).length -
          positions.filter((v) => v === b).length
      )
      .pop();
  });

  let mostCommonPlace = () => {
    let positions = [];
    for (let i = 0; i < user.history.length; i++) {
      positions.push([user.history[i][0][0], user.history[i][0][1]]);
    }

    return positions
      .sort(
        (a, b) =>
          positions.filter((v) => v === a).length -
          positions.filter((v) => v === b).length
      )
      .pop();
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
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
            <li>Històric</li>
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
      <p className="date">
        <strong>{user.history[0][2]}</strong>
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
                            {distances[idx]} del lloc habitual
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
