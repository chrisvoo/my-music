import React from 'react';
import './Main.css';

export function Main() {
  return (
    <main role="main" className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <h5 className="card-header">Stats</h5>
            <div className="card-body">
              <h5 className="card-title">Info about your music collection</h5>
              <p className="card-text">
                Last scan occurred on Dec 28<sup>th</sup>&nbsp;
                2020 pointed out <b>120 files</b> for <b>1.097 GB</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          Main content here
        </div>
        <div className="col">
          Other info maybe?
        </div>
      </div>
    </main>
  );
}
