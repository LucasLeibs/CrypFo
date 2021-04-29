import React from 'react'
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useLocation} from "react-router-dom";
export default function Chart() {
    const { state } = useLocation();
    console.log(state)
    return (
   <div>
       <h1>hey{state.asset.id} </h1>
   </div>
    )
}

