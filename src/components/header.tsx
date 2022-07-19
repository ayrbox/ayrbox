import React from "react";
import Link from "gatsby-link";

const Header = ({ siteTitle }: { siteTitle: string }) => (
  <div className="bg-black px-20 py-10">
      <h1 className="text-2xl bold">
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          {siteTitle}
        </Link>
      </h1>
  </div>
);

Header.defaultProps = {
  siteTitle: 'Ayrbox'
}

export default Header;
