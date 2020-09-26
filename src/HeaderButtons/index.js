import React, { useState, useContext } from "react";
import "./index.scss";
import Upload from "../LoadSave/Load";
import { MyContext } from "../appContext";
export default function HeaderButtons() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const getConsumer = useContext(MyContext);
  const { state } = getConsumer;
  const handleUploadModalOpen = () => {
    setIsUploadModalOpen(!isUploadModalOpen);
  };

  return (
    <>
      {isUploadModalOpen ? (
        <Upload handleUploadModalOpen={() => handleUploadModalOpen()} />
      ) : (
        ""
      )}

      <div className="header-buttons-wrapper">
        <button
          className="upload-wrapper"
          onClick={() => handleUploadModalOpen()}
        >
          Upload
        </button>
        <button className="save-wrapper">
          {" "}
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(state)
            )}`}
            download="API.json"
          >
            Save
          </a>
        </button>
      </div>
    </>
  );
}
