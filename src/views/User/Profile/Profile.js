import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withRouter from '../../../components/HOC/withRouter';
import { setUserData, updateImageURL } from '../../../features/user/userSlice';
import { updateAvatar } from '../../../services/UserApiConnection/userApi';

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
    }

    hanldeLogic = (e) => {
        if (e === "about") {
            document.getElementById('btn-about').className = 'btn btn-secondary me-2'
            document.getElementById('btn-change-password').className = 'btn me-2'
            document.getElementById('update-avatar').className = 'btn me-2'
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

            this.setState(
                {
                    renderComponent: 'updateAvatar'
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
    render() {
        return (
            <>
                <div className='user-profile d-flex justify-content-center align-items-center my-5'>
                    <div className="card w-50">
                        <div className="card-img-top d-flex justify-content-center align-items-center p-5">
                            <img src={this.props.user.imageURL} className='w-25 rounded-circle' alt="..." />
                        </div>
                        <div className="card-body">
                            <strong className='text-center'> <h5>Hi, {this.props.user.id}</h5> </strong>
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
                                                        <div className="mb-3">
                                                            <label htmlFor="currentPassword" className="form-label">Current Password: </label>
                                                            <input type="password" className="form-control" id="currentPassword" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="newPassword" className="form-label">New Password: </label>
                                                            <input type="password" className="form-control" id="newPassword" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password: </label>
                                                            <input type="password" className="form-control" id="confirmNewPassword" />
                                                        </div>
                                                        <button className="btn btn-primary">Submit</button>
                                                    </div>

                                                </div>
                                            </>
                                            :
                                            <>
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