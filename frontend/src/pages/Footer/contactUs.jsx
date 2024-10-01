import React from "react";
import Footer from "./Footer";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our products, services, pricing, or anything else, our team is ready to answer all your questions.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="email">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300"
            >
              Send Message
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">Contact Information</h2>
          <ul className="space-y-4 text-lg">
            <li>
              <strong>Address:</strong> 11 Angelica Street Dansoman, Accra
            </li>
            <li>
              <strong>Phone:</strong> +233 (55) 594-5959
            </li>
            <li>
              <strong>Email:</strong> kimimiluv@kimimi.com
            </li>
            <li>
              <strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM. Sat, 10:00 AM - 4:00 PM.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Location</h2>
        <div className="h-64 bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9968733467736!2d-0.27443402478441825!3d5.567477233533724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf99da1c13ef81%3A0xc66239923eda452e!2sKimimi%20Fabrics%20and%20Accessories!5e0!3m2!1sen!2sgh!4v1724872528417!5m2!1sen!2sgh"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <div className="mx-0 px-0">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
