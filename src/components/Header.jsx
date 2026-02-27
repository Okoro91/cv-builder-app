import { FileText } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-linear-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">CV Builder Pro</h1>
              <p className="text-blue-100 text-sm">
                Create your professional CV in minutes
              </p>
            </div>
          </div>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors">
            Export PDF
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
