import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Signin from './components/signin';
import Home from './components/home';
import SetupEvent from './components/setupEvent';
import Receipt from './components/receipt';
import Event from './components/event';
import Profile from './components/profile';
import Manage from './components/manage';
import Verify from './components/signin/verify';
import Provider from './components/provider/UserProvider'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (

      <Provider>
        <div className="App">
          <Router>
            <ToastContainer position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />}/>
              <Route path="/receipt/:activityId" element={<Receipt />} />
              <Route path="/event/:eventId" element={<Event />} />
              <Route path="/setup_event/:id" element={<SetupEvent />} />
              <Route path="/profile/:_id" element={ <Profile /> } />
              <Route path="/manage" element={<Manage />} />
              <Route path="/confirm/:key" element={<Verify />} />
            </Routes>
            <Footer />
          </Router>
        </div >
      </Provider>
  );
}

export default App;
