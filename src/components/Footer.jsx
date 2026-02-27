import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">CV Builder Pro</p>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <p className="text-gray-400 text-sm flex items-center">
              Made with{" "}
              <Heart className="h-3 w-3 mx-1 text-red-500 fill-current" /> by
              React Devs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
