import React from 'react';
import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaYoutube,
    FaInstagram,
    FaPhoneAlt,
    FaHandshake
} from 'react-icons/fa';
import contactImg from '../assets/contact-banner.jpg'; // Replace with your actual image

function ContactUs() {
    return (
        <section id="contact-section" className="py-5 bg-light">
            <div className="container">
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-md-6">
                        <h2 className="fw-bold text-danger mb-4">Contact Us</h2>
                        <p className="text-muted mb-2">
                            Contact us with any questions or inquiries or call <strong>{process.env.REACT_APP_CONTACT_PHONE || '+91-9632492563'}</strong>.
                        </p>
                        <p className="text-muted">
                            We would be happy to answer your questions and set up a meeting with you. We assure you, <span className="text-danger">{process.env.REACT_APP_COMPANY_NAME || 'Champions HR Services'}</span> can set you apart from the flock.
                        </p>

                        {/* Social Icons */}
                        <div className="d-flex gap-3 mt-4">
                            <a href={process.env.REACT_APP_FACEBOOK_URL || "https://facebook.com/championshservices"} className="text-dark fs-5" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                            <a href={process.env.REACT_APP_LINKEDIN_URL || "https://linkedin.com/company/championshservices"} className="text-dark fs-5" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                            <a href={process.env.REACT_APP_TWITTER_URL || "https://twitter.com/championshservices"} className="text-dark fs-5" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                            <a href={process.env.REACT_APP_YOUTUBE_URL || "https://youtube.com/@championshservices"} className="text-dark fs-5" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                            <a href={process.env.REACT_APP_INSTAGRAM_URL || "https://instagram.com/championshservices"} className="text-dark fs-5" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="col-md-6 text-center">
                        <img src={contactImg} alt="Contact" className="img-fluid rounded shadow-sm" />
                    </div>
                </div>

                {/* Info Cards */}
                <div className="row mt-5 g-4 justify-content-center">
                    <div className="col-md-4">
                        <div className="border p-4 text-center bg-white rounded shadow-sm">
                            <FaHandshake className="text-danger fs-3 mb-2" />
                            <h5 className="text-danger fw-bold mb-1">Need Help?</h5>
                            <p className="mb-0">{process.env.REACT_APP_CONTACT_EMAIL || 'info@championshservices.com'}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="border p-4 text-center bg-white rounded shadow-sm">
                            <FaPhoneAlt className="text-danger fs-3 mb-2" />
                            <h5 className="text-danger fw-bold mb-1">Feel Like Talking</h5>
                            <p className="mb-0">{process.env.REACT_APP_CONTACT_PHONE || '+91-9632492563'}</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form in a separate row */}
                <div className="row mt-5">
                    <div className="col-md-10 mx-auto">
                        <h2 className="text-danger mb-3 text-center fw-bold">Get in Touch</h2>
                        <form className="p-4 border rounded shadow-sm bg-white">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="col-md-6 mt-3 mt-md-0">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <select className="form-select">
                                        <option>Choose your option</option>
                                        {/* <option>I am looking for IT Staffing</option> */}
                                        <option>Looking for a Job</option>
                                        <option>Looking for Staffing Servicess</option>
                                        <option>Looking for HR Compliance Services</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mt-3 mt-md-0">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Your phone number"
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Message"
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-danger px-5">
                                    CONNECT WITH US
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Google Map in a separate row */}
                <div className="row mt-5">
                    <div className="col-md-10 mx-auto">
                        <h4 className="text-danger mb-3">Our Location</h4>
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248858.9742794366!2d77.29763248671873!3d12.944860399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158e6c2d3f31%3A0x2d7790b715ec6cc0!2sASHOKA%20HEIGHTS!5e0!3m2!1sen!2sin!4v1745931237182!5m2!1sen!2sin"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default ContactUs;
