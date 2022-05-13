import React from "react";
import "./history.css";
import { Link } from "react-router-dom";

export const History = ({ user }) => {
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
          <li>Surt</li>
        </ul>
      </nav>
      {user.history
        ? user.history.map((moment, idx) => {
            return (
              <div key={idx} className="moment">
                <p>{moment[2]}</p>
                <p>text: {moment[1]}</p>
                <p>
                  <a
                    href={`https://www.google.com/search?q=${moment[0][0]}+%2C+${moment[0][1]}`}
                  >
                    {moment[0][0]} , {moment[0][1]}
                  </a>
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
};
