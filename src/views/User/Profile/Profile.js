import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import withRouter from '../../../components/HOC/withRouter';
import { updateImageURL } from '../../../features/user/userSlice';
import { updateAvatar, updateMedicalRecord, updatePassword } from '../../../services/UserApiConnection/userApi';

import defaultFile from '../../../assets/file/MedicalRecord.pdf';


import '../../../styles/views/User/Profile/Profile.scss'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderComponent: 'about',
        }
    }
    innitState = {
        updateImage: null,
        file: null,
        oldPassword: null,
        newPassword: null,
        newPasswordConfirm: null
    }



    hanldeLogic = (e) => {
        if (e === "about") {
            document.getElementById('btn-about').className = 'btn btn-secondary me-2'
            document.getElementById('btn-change-password').className = 'btn me-2'
            document.getElementById('update-avatar').className = 'btn me-2'
            document.getElementById('update-medical-record').className = 'btn me-2'
            this.setState(
                {
                    renderComponent: 'about'
                }
            )
        }
        else if (e === "changePassword") {
            document.getElementById('btn-about').className = 'btn me-2'
            document.getElementById('btn-change-password').className = 'btn btn-secondary me-2'
            document.getElementById('update-avatar').className = 'btn me-2'
            document.getElementById('update-medical-record').className = 'btn me-2'

            this.setState(
                {
                    renderComponent: 'changePassword'
                }
            )
        }
        else if (e === 'updateAvatar') {
            document.getElementById('btn-about').className = 'btn me-2'
            document.getElementById('btn-change-password').className = 'btn me-2'
            document.getElementById('update-avatar').className = 'btn btn-secondary me-2'
            document.getElementById('update-medical-record').className = 'btn me-2'

            this.setState(
                {
                    renderComponent: 'updateAvatar'
                }
            )
        }
        else if (e === 'updateMedicalRecord') {
            document.getElementById('btn-about').className = 'btn me-2'
            document.getElementById('btn-change-password').className = 'btn me-2'
            document.getElementById('update-avatar').className = 'btn me-2'
            document.getElementById('update-medical-record').className = 'btn btn-secondary me-2'

            this.setState(
                {
                    renderComponent: 'updateMedicalRecord'
                }
            )
        }
    }

    hanldeUpdateAvatar = async () => {

        let updateImage = new FormData();
        updateImage.append('image', this.innitState.updateImage);


        let res = await updateAvatar(this.props.user.id, updateImage)

        this.props.dispatch(updateImageURL(res.data.newImage));

    }

    hanldeUpdatePassword = async (e) => {
        e.preventDefault();

        let newPassword = document.getElementById('newPassword');
        let confirmNewPassword = document.getElementById('confirmNewPassword');

        if (newPassword.value !== confirmNewPassword.value) {
            confirmNewPassword.setCustomValidity("Passwords Don't Match");
        }
        else {
            let data = {
                userId: this.props.user.id,
                oldPassword: this.innitState.oldPassword,
                newPassword: this.innitState.newPassword
            }
            let response;
            await updatePassword(data, (res) => { response = res })
            if (response.status === 200) {
                toast.success(response.data);
            }
            else if (response.status === 400) {
                toast.error(response.data[0].description)
            }
        }
    }
    hanldeUpdateMedicalRecord = (e) => {
        let data = new FormData()
        data.append('id', this.props.user.id);
        data.append('file', this.innitState.file);
        updateMedicalRecord(data, (response) => {
            toast.success("Update Medical Record Successful")
        })
    }
    render() {
        return (
            <>
                <div className='user-profile d-flex justify-content-center align-items-center my-5'>
                    <div className="card w-50">
                        <div className="card-img-top d-flex justify-content-center align-items-center p-5">
                            <img src={this.props.user.imageURL} className='w-25 rounded-circle' alt="..." />
                        </div>
                        <div className="card-body">
                            <strong className='text-center'> <h5>Hi</h5> </strong>
                            <div>
                                <hr />
                                <div>
                                    <button id='btn-about' className='btn btn-secondary me-2' onClick={() => this.hanldeLogic("about")}>
                                        <i className="fa-solid fa-user"></i> <span><strong> About</strong></span>
                                    </button>
                                    <button id='btn-change-password' className='btn me-2' onClick={() => this.hanldeLogic('changePassword')}>
                                        <i className="fa-solid fa-lock"></i> <span><strong> Change Password</strong></span>
                                    </button>
                                    <button id='update-avatar' className='btn me-2' onClick={() => this.hanldeLogic('updateAvatar')}>
                                        <i className="fa-solid fa-lock"></i> <span><strong>Update Avatar</strong></span>
                                    </button>
                                    <button id='update-medical-record' className='btn me-2' onClick={() => this.hanldeLogic('updateMedicalRecord')}>
                                        <i className="fa-solid fa-file"></i> <span><strong>Update Medical Record</strong></span>
                                    </button>
                                </div>
                                <hr />
                                {
                                    this.state.renderComponent === 'about'
                                        ?
                                        <>
                                            {/* User Information */}
                                            <div className='row'>
                                                <div >
                                                    <p className='text-center text-muted fst-italic'>User Information</p>
                                                </div>
                                                <div className='row my-2'>
                                                    <div className='col-3'>
                                                        <h6 >Fullname:  </h6>
                                                    </div>
                                                    <div className='col-9'>
                                                        <h6 className='user-information'> {this.props.user.fullName} </h6>
                                                    </div>
                                                </div>
                                                <div className='row my-2'>
                                                    <div className='col-3'>
                                                        <h6 >Email:  </h6>
                                                    </div>
                                                    <div className='col-9'>
                                                        <h6 className='user-information'> {this.props.user.email} </h6>
                                                    </div>
                                                </div>
                                                <div className='row my-2'>
                                                    <div className='col-3'>
                                                        <h6 >Username:  </h6>
                                                    </div>
                                                    <div className='col-9'>
                                                        <h6 className='user-information'> {this.props.user.userName} </h6>
                                                    </div>
                                                </div>
                                            </div></>
                                        :
                                        this.state.renderComponent === 'changePassword'
                                            ?
                                            <>
                                                {/* Change Password */}
                                                <div className='row'>
                                                    <div >
                                                        <p className='text-center text-muted fst-italic'>Change Password</p>
                                                    </div>
                                                    <div>
                                                        <form onSubmit={(e) => this.hanldeUpdatePassword(e)}>
                                                            <div className="mb-3">
                                                                <label htmlFor="currentPassword" className="form-label">Current Password: </label>
                                                                <input type="password" className="form-control" id="currentPassword"
                                                                    onChange={(e) => this.innitState.oldPassword = e.target.value} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="newPassword" className="form-label">New Password: </label>
                                                                <input type="password" className="form-control" id="newPassword"
                                                                    onInput={(e) => e.target.setCustomValidity('')}
                                                                    onChange={(e) => this.innitState.newPassword = e.target.value} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password: </label>
                                                                <input type="password" className="form-control" id="confirmNewPassword"
                                                                    onInput={(e) => e.target.setCustomValidity('')}
                                                                    onChange={(e) => this.innitState.newPasswordConfirm = e.target.value} required />
                                                            </div>
                                                            <button className="btn btn-primary" type='submit' value='submit' >Submit</button>
                                                        </form>
                                                    </div>

                                                </div>
                                            </>
                                            : this.state.renderComponent === 'updateAvatar'
                                                ?
                                                // Update Avatar
                                                <div className='row'>
                                                    <div >
                                                        <p className='text-center text-muted fst-italic'>Update Avatar</p>
                                                    </div>
                                                    <div>
                                                        <div className="mb-3">
                                                            <label htmlFor="updateAvatar" className="form-label">Input Avatar </label>
                                                            <input className="form-control" type="file" id="updateAvatar"
                                                                onChange={(e) => this.innitState.updateImage = e.target.files[0]} />
                                                        </div>
                                                        <button className="btn btn-primary" onClick={() => { this.hanldeUpdateAvatar() }}>Submit</button>
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                    {/* Update Medical Record */}
                                                    <div className='row'>
                                                        <div >
                                                            <p className='text-center text-muted fst-italic'>Update Medical Record</p>
                                                        </div>
                                                        <div>
                                                            <div className="mb-3">
                                                                <label htmlFor="updateAvatar" className="form-label">Input Medical Record: </label> <a href={defaultFile} className='btn btn-success' download={true}> <i className="fa fa-download"></i> </a>
                                                                <input className="form-control my-2" type="file" accept=".pdf" id="updateAvatar"
                                                                    onChange={(e) => this.innitState.file = e.target.files[0]} />
                                                            </div>
                                                            <button className="btn btn-primary" onClick={(e) => { this.hanldeUpdateMedicalRecord(e) }}>Submit</button>
                                                        </div>
                                                    </div>


                                                </>

                                }
                                <hr />
                                <Link to={'/main'} className='btn btn-danger'>Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default connect(null)(withRouter(Profile));