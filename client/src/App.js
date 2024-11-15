import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Restaurant from "./components/getrestaurant/Restaurant"
import Add from "./components/addrestaurant/Add";
import Edit from "./components/updaterestaurant/Edit";
import './App.css';
// import GetOneById from './components/getrestaurant/GetOneById';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Restaurant />,
      index: true,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
    {
      path:"/getOne",
      element:<Restaurant/>
    }
    
  ]);

  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
