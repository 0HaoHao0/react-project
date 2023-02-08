import './Contact.scss'

function Contact() {
    return (<>
        <div className="contact">
            <div className="d-flex align-items-center justify-content-center p-5">
                <div className="row  w-75 py-5">
                    <div className="col-12 col-md-4">
                        <iframe className="w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8066882157186!2d105.77815491435301!3d10.032805192828715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a089b55dda005f%3A0x599cede9036d324a!2zRlBUIEPhuqduIFRoxqE!5e0!3m2!1sen!2s!4v1675849638245!5m2!1sen!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="p-5 bg-light w-100">
                            <h2 className="text-center">Get in Touch</h2>
                            <div class="mb-3">
                                <label for="Name" class="form-label">Name:</label>
                                <input type="email" class="form-control" id="Name" placeholder="Nguyen Van A" />
                            </div>
                            <div class="mb-3">
                                <label for="Email" class="form-label">Email Address:</label>
                                <input type="email" class="form-control" id="Email" placeholder="name@example.com" />
                            </div>
                            <div class="mb-3">
                                <label for="Meassage" class="form-label">Meassage: </label>
                                <textarea class="form-control" id="Meassage" rows="3"></textarea>
                            </div>


                            <div className='text-center'>
                                <button className='btn btn-primary'>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="row text-center bg-dark my-4 py-4 ">
                        <div className='col-12 col-md-4 '>
                            <div className='bg-light  p-4 h-100'>
                                <i class="fa-solid fa-2x fa-location-dot b-2"></i>
                                <p> <strong>Address: </strong> 10 Đ. Phan Văn Trị, An Phú, Ninh Kiều, Cần Thơ, Vietnam</p>
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='bg-light p-4 h-100 '>
                                <i class="fa-solid fa-2x fa-phone mb-2"></i>
                                <p> <strong>Phone: </strong> 0945689xxx</p>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 '>
                            <div className='bg-light  p-4 h-100'>
                                <i class="fa-solid fa-2x fa-envelope mb-2"></i>
                                <p> <strong>Email: </strong> haotvce150521@fpt.edu.vn</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>);
}

export default Contact;