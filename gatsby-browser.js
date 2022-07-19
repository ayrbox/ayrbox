/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import "./src/styles/global.css";

import React from "react";
import Header from './src/components/header'
import Footer from "./src/components/footer";

export const wrapRootElement = ({ element }) => (
  <main>
    <Header />
    {element}
    <Footer />
  </main>
);
