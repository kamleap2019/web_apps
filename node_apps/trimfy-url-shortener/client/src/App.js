import React from "react";
import Header from "./components/Header";
import UrlField from "./components/UrlField";
import ShortUrlField from "./components/ShortUrlField";

import { ContextController } from "./ContextController";

const App = () => {
  return (
    <ContextController>
      <div className="container card card-body mb-4 p-4">
        <Header />
        <UrlField />
        <ShortUrlField />
      </div>
    </ContextController>
  );
};

export default App;
