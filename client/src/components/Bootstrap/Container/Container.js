import React from "react";

const Container = props => (
    <div className={props.size}>
      {props.children}
    </div>
);

export default Container;
