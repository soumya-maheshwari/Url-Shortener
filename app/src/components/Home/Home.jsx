import React, { useState } from "react";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import validURL from "valid-url";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import * as ReactBootstrap from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { urlThunk } from "../../redux/urlSlice";

const Home = () => {
  const dispatch = useDispatch();
  const sm = useSelector((sm) => sm.url);
  // console.log(sm);
  const [longURL, setLongURL] = useState("");
  // console.log("longurl", longURL);
  const [shortenedURL, setShortenedURL] = useState("HJJHIH");
  const handleUrl = (e) => {
    setLongURL(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(longURL);
    if (!validURL.isWebUri(longURL)) {
      toast.error("Invalid url", {
        position: "top-right",
        theme: "dark",
      });
    } else {
      //

      dispatch(urlThunk(longURL))
        .then((res) => {
          console.log(res);
          console.log(res.payload.data.shortURL);
          setShortenedURL(res.payload.data.shortURL);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err.response;
        });
    }
  };

  const handleReset = () => {
    setLongURL("");
  };
  return (
    <>
      <div className="my-5 container text-center">
        <div className="my-5 text-center">
          <form
            action="/"
            // onSubmit={handleSubmit}
          >
            <div className="row text-center d-flex justify-content-center">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-8">
                <input
                  className="form-control form-control-lg"
                  name="longURL"
                  type="text"
                  placeholder="Enter URL"
                  // autocomplete="off"
                  // autofocus="true"
                  required
                  value={longURL}
                  onChange={handleUrl}
                />
              </div>
            </div>
            <button
              className="my-3 btn btn-dark"
              type="submit"
              onClick={handleSubmit}
            >
              Shorten
            </button>
            <button
              className="my-3 btn btn-danger"
              style={{ marginLeft: "10px" }}
              type="submit"
              onClick={handleReset}
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
