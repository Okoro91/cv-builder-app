import Header from "./components/Header";
import Footer from "./components/Footer";
import ControlsPanel from "./components/Editor/ControlsPanel";
import PersonalInfoForm from "./components/Editor/PersonalInfoForm";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="grow container mx-auto px-4 py-6">
        <ControlsPanel />
        <PersonalInfoForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
