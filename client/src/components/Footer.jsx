// import React from "react";

// function Footer() {
//   var date = new Date();
//   var year = date.getFullYear();

//   return (
//     <footer>
//       <p>copyright © {year}</p>
//     </footer>
//   );
// }

// export default Footer;
import React from "react";

function Footer() {
  const customStyle={position:"fixed"}
  const year = new Date().getFullYear();
  return (
    <footer>
      <p style={customStyle}>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
