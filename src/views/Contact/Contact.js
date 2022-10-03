import React, { Component } from 'react';
import '../../styles/views/Contact/Contact.scss'
import PhoneInput from 'react-phone-number-input';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    contactData = {
        contactTopic: null,
        contactEmail: null,
        contactPhone: null,
        contactContent: null,
    }
    render() {
        return (
            <>
                <div className='contact'>
                    <div className='m-5 px-5 row'>
                        <div className='col-lg-5 col-xs-12 p-5 bg-light contact-card'>
                            <h1 className='text-center '>Contact Us</h1>
                            <div class="mb-3">
                                <label for="contactTopic" class="form-label">Topic:</label>
                                <input type="email" class="form-control" id="contactTopic" />
                            </div>
                            <div class="mb-3">
                                <label for="contactEmail" class="form-label">Email Address:</label>
                                <input type="email" class="form-control" id="contactEmail" placeholder="name@example.com" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="registerPhoneNumber" className="form-label">Phone Number:</label>
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    id="registerPhoneNumber"
                                    defaultCountry="VN"
                                    onChange={(e) => { this.contactData.contactPhone = e.target.value; }}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="contactContent" class="form-label">Content:</label>
                                <textarea class="form-control" id="contactContent" rows="5"></textarea>
                            </div>
                            <div className='text-left'>
                                <button className='btn btn-primary'>Submit</button>
                            </div>
                        </div>
                        <div className='col-lg-7 col-xs-12'>
                            <iframe title='...' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.034505845366!2d105.72955411461562!3d10.014008492841551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0882139720a77%3A0x3916a227d0b95a64!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgQ-G6p24gVGjGoQ!5e0!3m2!1svi!2s!4v1663299609167!5m2!1svi!2s" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Contact;