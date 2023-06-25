import React, { useState } from "react";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import validURL from "valid-url";
import "react-toastify/dist/ReactToastify.css";
import * as ReactBootstrap from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
const Home = () => {
  const [url, setUrl] = useState("");
  const [shortenedURL, setShortenedURL] = useState("HJJHIH");
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validURL.isWebUri(url)) {
      //   alert("invalid url");
      toast.error("invalid url", {
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
            <button
              class="my-3 btn btn-dark"
              type="submit"
              onClick={handleSubmit}
            >
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
          <div className="mt-5">
            {shortenedURL}

            <CopyToClipboard text={shortenedURL}>
              <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
                Copy URL to Clipboard
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
