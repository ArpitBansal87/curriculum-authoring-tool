import React from 'react'
import Modal from '../Modal';
import CloseSvg from './SVG/close.svg';
import './load.scss';
export default function Load({handleUploadModalOpen}) {
    return (
        <Modal>
            <div className="load-modal-wrapper">
                <div className="close-header">
                    <img className="cursor-pointer" src={CloseSvg} alt="close" onClick={()=>handleUploadModalOpen()} />
                </div>

               <div>
                   <button>
                       Ok <span role="img" aria-label="buy">✅</span>
                   </button>
                   <button>
                       Cancel <span role="img" aria-label="buy">✗</span>
                   </button>
               </div>
            </div>
        </Modal>
    )
}
