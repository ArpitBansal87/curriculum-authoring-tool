import React from 'react'
import './index.scss';
export default function Index({children}) {
    return (
        <div className="modal-container-parent">
            <div className="modal-container">
                {children}
            </div>
        </div>
    )
}
