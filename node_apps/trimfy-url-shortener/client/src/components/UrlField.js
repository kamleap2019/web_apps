import React, { useContext } from "react";
import axios from "axios";
import { Context } from "../ContextController";

const UrlField = () => {
  const [state, setState] = useContext(Context);

  const onSubmit = e => {
    e.preventDefault();

    axios
      .post("/api/url/shorten", state)
      .then(res => {
        setState({ ...state, shortUrl: res.data.shortUrl });
      })
      .catch(err => {
        setState({ ...state, errors: err.response.data });
      });
  };

  const onChange = e => {
    setState({ ...state, longUrl: e.target.value });
  };

  let errorText = !state.errors.text
    ? "form-control form-control-lg"
    : "form-control form-control-lg is-invalid";

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <input
          type="text"
          className={errorText}
          placeholder="Drop a URL..."
          name="longUrl"
          value={state.longUrl}
          onChange={onChange}
        />
        <div className="input-group-prepend">
          <button className="btn btn-dark btn-lg btn-block mb-5" type="submit">
            Shorten URL
          </button>
        </div>
        {state.errors.text && (
          <div className="invalid-feedback">{state.errors.text}</div>
        )}
      </div>
    </form>
  );
};

export default UrlField;
