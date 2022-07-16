import TableGrid from "./components/TableGrid";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ToastContainer />
      <TableGrid />
    </>
  );
}

export default App;
