import React from "react";

const Column = props => (
    <div className={props.size}>
      {props.children}
    </div>
);

export default Column;
