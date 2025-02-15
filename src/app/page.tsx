
import { StateProvider } from "@/context/state-context";
import MainPage from "./components/main-page";

const App = () => {
  return (
    <StateProvider>
      <div className="min-h-screen   gap-8 py-6 px-4 bg-[radial-gradient(ellipse_at_bottom,_#0E464F_-10%,_#02191D_40%)]">
        <MainPage />
      </div>
    </StateProvider>
  );
};

export default App;
