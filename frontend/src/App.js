import {
  createBrowserRouter,
  RouterProvider,Outlet
} from "react-router-dom";
import Textextract from "./components/Textextract";
import Navbar from "./components/Navbar";
import Compress from "./components/Compress";
import ImageWatermarkTool from "./components/Watermark";
import GifMaker from "./components/GifMaker";
import BackgroundRemover from "./components/Backroundremove";
import Img from "./components/Img";
import Arnab from "./components/Arnab"
import Back from "./background/Back";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          {/* Bootstrap class to add margin below the navbar */}
          <div className="container mt-5 pt-5"> 
            <Outlet />
          </div>
        </div>
      ),
      children: [
        { path: "/", element: <Textextract /> },
        { path: "/compress", element: <Compress /> },
        { path: "/watermark", element: <ImageWatermarkTool /> },
        { path: "/gifmaker", element: <GifMaker /> },
        { path: "/remove", element: <BackgroundRemover /> },
        { path: "/img", element: <Img /> },
        { path: "/arnab", element: <Arnab /> },
      ],
    },
  ]);

  return (
    <Back>
      <RouterProvider router={router} />
    </Back>
  );
}

export default App;

// export default App;
