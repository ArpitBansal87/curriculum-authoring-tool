import React,{useState} from "react";
import './index.scss';
import Upload from '../LoadSave/Load';
import Save from '../LoadSave/Save';

export default function HeaderButtons() {
const [isUploadModalOpen,setIsUploadModalOpen]=useState(false);
const [isSaveModalOpen,setIsSaveModalOpen]=useState(false);


const handleUploadModalOpen =()=>{
  setIsUploadModalOpen(!isUploadModalOpen)
}
const handleSaveModalOpen=()=>{
  setIsSaveModalOpen(!isSaveModalOpen)
}
  return (
    <>
   {isUploadModalOpen? <Upload handleUploadModalOpen={()=>handleUploadModalOpen()} /> :""}
   {isSaveModalOpen? <Save handleSaveModalOpen={()=>handleSaveModalOpen()} /> :""}
    <div className="header-buttons-wrapper">
      <button className="upload-wrapper" onClick={()=>handleUploadModalOpen()}>Upload</button>
      <button className="save-wrapper" onClick={()=>handleSaveModalOpen()}>Save</button>
    </div>
    </>
  );
}
