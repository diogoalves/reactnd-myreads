import React from 'react';
import If from './If';
import ReactLoading from 'react-loading';

const Loading = ({ show }) => (
  <If test={show}>
    <div className="loading">
      <center>
        <ReactLoading type="bubbles" color="#444" delay={0} />
      </center>
    </div>
  </If>
);

export default Loading;
