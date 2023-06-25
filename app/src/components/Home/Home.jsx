import React, { useState } from "react";
import "./home.css";
import * as ReactBootstrap from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import validURL from "valid-url";
const Home = () => {
  const [url, setUrl] = useState("");

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validURL.isWebUri(url)) {
      //   alert("invalid url");
      toast.error("inalid url", {
        position: "top-right",
        theme: "dark",
      });
    } else {
      //
    }
  };

  const handleReset = () => {
    setUrl("");
  };
  return (
    <>
      <div class="my-5 container text-center">
        <div class="my-5 text-center">
          <form action="/" onSubmit={handleSubmit}>
            <div class="row text-center d-flex justify-content-center">
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-8">
                <input
                  class="form-control form-control-lg"
                  name="longURL"
                  type="text"
                  placeholder="Enter URL"
                  // autocomplete="off"
                  // autofocus="true"
                  required
                  value={url}
                  onChange={handleUrl}
                />
              </div>
            </div>
            <button class="my-3 btn btn-dark" type="submit">
              Shorten
            </button>
            <button
              class="my-3 btn btn-danger"
              style={{ marginLeft: "10px" }}
              type="submit"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
