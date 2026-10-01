import { lazy, Suspense } from "react";
import "./App.css";

const Hero3D = lazy(() => import("./components/Hero3D"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <Hero3D />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
