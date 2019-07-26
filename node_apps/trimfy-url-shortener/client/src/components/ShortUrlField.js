import React, { useContext } from "react";
import { Context } from "../ContextController";

const ShortUrlField = () => {
  const [state, setState] = useContext(Context);

  const copyToClipboard = () => {
    let copyText = document.getElementById("shortUrl");
    copyText.select();
    document.execCommand("copy");
  };

  return (
    <div className="row">
      <div className="input-group col-md-2" />
      <div className="input-group col-md-8">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Shortened URL..."
          name="shortUrl"
          id="shortUrl"
          defaultValue={state.shortUrl}
        />
        <div className="input-group-prepend">
          <button
            className="btn btn-dark btn-lg btn-block mb-5"
            onClick={copyToClipboard}
          >
            <i className="fas fa-copy" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortUrlField;
