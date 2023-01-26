import { React, useState } from "react";
import axios from "axios";

function Upload() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [degreePeriod, setDegreePeriod] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "process.env.REACT_PINATA_APP_JWT",
      process.env.REACT_PINATA_APP_JWT
    );
    console.log(
      "Name,imageUrl,degreePeriod,dateOfIssue",
      name,
      imageUrl,
      degreePeriod,
      dateOfIssue
    );
    const data = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: "Certificate",
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2",
        },
      },
      pinataContent: {
        description: "Proof of Education",
        image:
          "https://gateway.pinata.cloud/ipfs/QmZ6iJbUpEfKxUodwx4DgaF9zquvRjJEMXAkH8EJtWPLKm",
        name: `${name}`,
        attributes: [
          {
            trait_type: "Date of issue",
            value: `${dateOfIssue}`,
          },
          {
            trait_type: "Name of the organisation",
            value: "SRMIST",
          },
          {
            trait_type: "Duration of the degree",
            value: `${degreePeriod}`,
          },
        ],
      },
    });
    console.log(
      "process.env.REACT_APP_PINATA_API_KEY",
      process.env.REACT_APP_PINATA_API_KEY
    );
    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log("config.headers", config.headers.Authorization);

    const res = await axios(config).catch((err) => {
      console.log("err", err);
    });

    console.log(res.data);
  };
  const handelName = (e) => setName(e.target.value);
  const handleImageUrl = (e) => setImageUrl(e.target.value);
  return (
    <div className="p-5">
      <form
        className="d-flex justify-content-center row g-3"
        onSubmit={handleOnSubmit}
      >
        <div className="col-md-6 flex">
          <label for="studentName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="studentName"
            placeholder="enter student name .."
            onChange={handelName}
          />
        </div>
        <div className="col-10">
          <label for="imputImageUrl" className="form-label">
            Image Url
          </label>
          <input
            type="text"
            className="form-control"
            id="imputImageUrl"
            placeholder="https://pinata.com/..."
            onChange={handleImageUrl}
          />
        </div>
        <div className="col-md-6">
          <label for="degreePeriod" className="form-label">
            Degree Period
          </label>
          <input
            type="text"
            className="form-control"
            id="degreePeriod"
            placeholder="eg. 2019-23"
            onChange={(e) => setDegreePeriod(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label for="inputState" className="form-label">
            Date of issue
          </label>
          <input
            placeholder="DD:MM:YYY"
            className="form-control"
            onChange={(e) => setDateOfIssue(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
