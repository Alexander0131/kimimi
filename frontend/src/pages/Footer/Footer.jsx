import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"; // Importing icons

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Company</h3>
            <ul>
              <li className="mb-1">
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <ul>
              <li className="mb-1">
                <Link to="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/shipping" className="hover:underline">
                  Shipping & Returns
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  <FaFacebookF className="text-2xl" /> {/* Facebook icon */}
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  <FaInstagram className="text-2xl" /> {/* Instagram icon */}
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  <FaTwitter className="text-2xl" /> {/* Twitter icon */}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm">&copy; 2024 KIMIIM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
