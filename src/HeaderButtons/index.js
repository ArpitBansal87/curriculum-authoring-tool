import React, { useContext, useState } from "react";
import "./index.scss";
import { MyContext } from "../appContext";
export default function HeaderButtons() {
  const [isUploadHidden, setUploadHidden] = useState(true);
  const getConsumer = useContext(MyContext);

  const { state, getJSONData } = getConsumer;

  const handleFileChange = async (e) => {
    const { name } = e.target.files[0];
    if (name.endsWith(".json")) {
      e.preventDefault();
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        getJSONData(JSON.parse(text));
      };

      reader.readAsText(e.target.files[0]);
    } else {
      alert(
        "It is not a JSON file. kindly Upload a file having .json extension."
      );
    }
  };
  return (
    <div className="header-buttons-wrapper">
      <button
        className="upload-wrapper"
        onClick={() => setUploadHidden(!isUploadHidden)}
      >
        Upload
      </button>{" "}
      <a
        className="save-wrapper"
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(state)
        )}`}
        download="API.json"
      >
        Save
      </a>
      <div className="upload-file-wrapper" hidden={isUploadHidden}>
        <label htmlFor="fusk">Browse JSON</label>
        <input
          id="fusk"
          type="file"
          name="JSONFile"
          style={{ display: "none" }}
          onChange={handleFileChange}
        ></input>
      </div>
    </div>
  );
}
