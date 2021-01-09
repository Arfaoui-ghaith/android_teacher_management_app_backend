import React from 'react'
import {Link, BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';

export default function Teaching() {

    const [edit,setEdit] = React.useState(false);

        function deleletconfig() {
           // eslint-disable-next-line no-restricted-globals
           var del=confirm("Are you sure you want to delete this record?");
           if (del){
               alert ("record deleted")
           } else {
               alert("Record Not Deleted")
           }
        }
       
       function openEditDialog(){
           setEdit(true);
           document.getElementById("mail-compose").click();
       }
   
       function closeDialog(){
           setEdit(false);
           document.getElementById("dialogF").click();
       }
   
       React.useEffect(() => {
           $(document).ready(function() {
           
               $('#mail-compose').on('click', function(e) {
                   $('.mailbox-compose').toggleClass('show');
                   $('body').toggleClass('mailbox-compose-show');
           
                   e.preventDefault();
               });
           
               $('.mailbox-compose-overlay').on('click', function() {
                   if(!edit){setEdit(false);}
                   $('.mailbox-compose').toggleClass('show');
                   $('body').toggleClass('mailbox-compose-show');
               });
           
           });
       },[]);
       return (
           <React.Fragment>
           <Router>
               <div className="page-content">
                   <div className="page-info">
                       <nav aria-label="breadcrumb">
                           <ol className="breadcrumb">
                               <li className="breadcrumb-item"><Link to="#">Management</Link></li>
                               <li className="breadcrumb-item active" aria-current="page">Teachings</li>
                           </ol>
                       </nav>
                       <div className="page-options">
                           <Link to="#" className="btn btn-primary" id="mail-compose">Add</Link>
                       </div>
                   </div>
                   <div className="main-wrapper">
                        <div class="row">
                            <div class="col-xl">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">All Teachings</h5>
                                       
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Teaching ID</th>
                                                        <th scope="col">Teacher</th>
                                                        <th scope="col">Classe</th>
                                                        <th scope="col">Course</th>
                                                        
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Cell</td>
                                                        <td>Cell</td>
                                                        <td>Cell</td>
                                                        <td>Cell</td>
                                                       
                                                        <td>
                                                            <Link className="dropdown-toggle" href="#" style={{borderBottomWidth: "0px", borderTopWidth: "0px"}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            </Link>
                                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <Link className="dropdown-item" to="" onClick={openEditDialog}>Edit</Link>
                                                            <Link className="dropdown-item" to="" onClick={deleletconfig}>Delete</Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                
                                                </tbody>
                                            </table>
                                        </div>      
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                   <div className="mailbox-compose" style={{"bottom": "0px", "height": "290px", "top": "0px"}}>
                       <div className="mailbox-compose-content">
                           <div className="mailbox-compose-header">
                               <h5>{ edit ? 'edit' : 'add' } Teaching</h5>
                           </div>
                           <div className="mailbox-compose-body">
                               <form>
                                    <div className="form-group">
                                        <select class="custom-select form-control">
                                            <option selected>Select Teacher</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>

                                   <div className="form-group">
                                        <select class="custom-select form-control">
                                            <option selected>Select Classe</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                   </div>

                                   <div className="form-group">
                                        <select class="custom-select form-control">
                                            <option selected>Select Course</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                   </div>
                                   
                                   <div className="compose-buttons">
                                       <button className="btn btn-block btn-success">Save</button>
                                       <Link to="" className="btn btn-block btn-danger" onClick={closeDialog}>Cancel</Link>
                                   </div>
                               </form>
                           </div>
                       </div>
                   </div>
               </div>
               <div className="page-footer">
                   <div className="row">
                       <div className="col-md-12">
                           <span className="footer-text">{new Date().getFullYear()} © Iset App</span>
                       </div>
                   </div>
               </div>
               <div id="dialogF" className="mailbox-compose-overlay"></div>
           </Router>
           </React.Fragment>
       );
}