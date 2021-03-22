import React from "react";
import Head from "next/head";

/**
 * Wraps around pages and provides access to modify head data
 * @param {any} props
 */

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>GitSearch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <footer className="footer"></footer>
    </>
  );
};
