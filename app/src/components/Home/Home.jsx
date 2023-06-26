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
  const sm = useSelector((state) => state.url);
  console.log(sm);
  const [url, seturl] = useState("");
  console.log("url", url);
  const [shortenedURL, setShortenedURL] = useState("");

  const handleUrl = (e) => {
    seturl(e.target.value);
  };

  const body = {
    longURL: url,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(url, "fr");
    if (!validURL.isWebUri(url)) {
      toast.error("Invalid url", {
        position: "top-right",
        theme: "dark",
      });
    } else {
      dispatch(urlThunk(url))
        .then((res) => {
          console.log(res);
          // console.log(url);
          // console.log(res.payload.data.shortURL);
          setShortenedURL(res.payload.data.shortURL);
          // ${req.baseUrl}/${url.shortID}
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err.response;
        });
    }
  };

  const handleReset = () => {
    seturl("");
    // setShortenedURL("");
  };

  console.log(sm);
  return (
    <>
      <div className="my-5 container text-center">
        <div className="my-5 text-center">
          <form>
            <div className="row text-center d-flex justify-content-center">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-8">
                <input
                  className="form-control form-control-lg"
                  name="url"
                  type="text"
                  placeholder="Enter a URL"
                  // required
                  value={url}
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
            <h1>SHORT URL : </h1>
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
