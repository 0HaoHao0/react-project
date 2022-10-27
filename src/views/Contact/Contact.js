import React, { Component } from 'react';
import '../../styles/views/Contact/Contact.scss'
import PhoneInput from 'react-phone-number-input';
import { ContactCreate } from '../../services/ApiConnection/contactApi';
import withRouter from '../../components/HOC/withRouter';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    contactData = {
        contactName: null,
        contactEmail: null,
        contactPhone: null,
        contactContent: null,
    }

    handleSubmit = async () => {
        let res = await ContactCreate(this.contactData);

        if (res.status === 200) {
            this.props.navigate('/main');
        }
    }

    render() {
        return (
            <>
                <div className='contact'>
                    <div className='m-5 px-5 row'>
                        <div className='col-lg-5 col-xs-12 p-5 bg-light contact-card'>
                            <h1 className='text-center '>Contact Us</h1>
                            <div className="mb-3">
                                <label htmlFor="contactName" className="form-label">Name:</label>
                                <input type="email" className="form-control" id="contactName"
                                    onChange={(e) => { this.contactData.contactName = e.target.value }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactEmail" className="form-label">Email Address:</label>
                                <input type="email" className="form-control" id="contactEmail" placeholder="name@example.com"
                                    onChange={(e) => { this.contactData.contactEmail = e.target.value }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="registerPhoneNumber" className="form-label">Phone Number:</label>
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    id="registerPhoneNumber"
                                    defaultCountry="VN"
                                    onChange={(e) => { this.contactData.contactPhone = e }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactContent" className="form-label">Content:</label>
                                <textarea className="form-control" id="contactContent" rows="5"
                                    onChange={(e) => { this.contactData.contactContent = e.target.value }}></textarea>
                            </div>
                            <div className='text-left'>
                                <button className='btn btn-primary'
                                    onClick={(e) => { this.handleSubmit(e) }}>Submit</button>
                            </div>
                        </div>
                        <div className='col-lg-7 col-xs-12'>
                            <iframe title='...' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.034505845366!2d105.72955411461562!3d10.014008492841551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0882139720a77%3A0x3916a227d0b95a64!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgQ-G6p24gVGjGoQ!5e0!3m2!1svi!2s!4v1663299609167!5m2!1svi!2s" width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Contact);