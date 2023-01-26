import { React, useState } from "react";
import { axios } from "axios";

function Upload() {
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const handleOnSubmit = (e) => {
    console.log("setName,setImageUrl", setName, setImageUrl);
  };
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
            onChange={(e) => {
              setName(e.target.value);
            }}
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
            onChange={(e) => setImageUrl(e.target.value)}
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
          />
        </div>
        <div className="col-md-4">
          <label for="inputState" className="form-label">
            Date of issue
          </label>
          <input placeholder="DD:MM:YYY" className="form-control" />
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
