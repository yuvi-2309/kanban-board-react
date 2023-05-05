import React from "react";

import { Head, NavContainer, NavLogo } from "./header.style";

function Header() {
  return (
    <Head>
      <NavContainer>
        <NavLogo to="/board">Kanban Board</NavLogo>
      </NavContainer>
    </Head>
  );
}

export default Header;
