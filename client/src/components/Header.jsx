
import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
function Header(props) {
  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      <h2>{"Hi, " + props.heading}</h2>
      <button onClick={()=>{
        props.logout()
      }}>LOGOUT</button>
    </header>
  );
}

export default Header;
