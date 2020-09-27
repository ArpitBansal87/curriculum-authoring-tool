import React, { useContext } from "react";
import "./index.scss";
import { MyContext } from "../appContext";
export default function HeaderButtons() {
  const getConsumer = useContext(MyContext);
  const { state } = getConsumer;

  return (
    <div className="header-buttons-wrapper">
      <button className="upload-wrapper" >Upload</button>
      <button className="save-wrapper" >
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
      <div className="">
       <form>
         <input type ="file"  requried  name="Upload JSON File" />
       </form>
      </div>
    </div>
  );
}
