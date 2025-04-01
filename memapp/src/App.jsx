import { createContext } from "react";
import Index from "@src/content/Index";

export const STATE = createContext();

function App() {
  const title = "MEMPOOL"
  const values = {title};

  return (
    <>
      <STATE.Provider value={values}>
        <Index />
      </STATE.Provider>
    </>
  );
}

export default App;
