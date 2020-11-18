import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function ModalElement() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <div className="pt-4 d-flex justify-content-center">
        <button className="btn btn-warning" onClick={() => setModalIsOpen(true)}>Disclaimer</button>
      </div>
      <div className="col-3">
        <Modal isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={
            {
              content: {
                margin: 'auto',
                width: '300px',
                height: '300px',
                padding: '50px',
                overflow: 'auto'
              }
            }
          }
        >
          <div className="text-center">
            <h2>ATTENTION:</h2>
            <h5>This website is not a real store and is intended for demo purposes only. </h5>
            <div>
              <button className="btn btn-dark btn-lg" onClick={() => setModalIsOpen(false)}>Close</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default ModalElement;
// export default class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (

//       <div className={`modal fade ${!this.state.isHidden ? 'show d-block' : 'd-none'}`} tabIndex="-1" role="dialog" tabIndex="-1" aria-hidden="true">
//         <div className="modal-dialog modal-dialog-centered" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h4 className="modal-title">Modal title</h4>
//               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <p>Modal body text goes here.</p>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
