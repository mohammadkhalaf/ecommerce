import { Outlet } from 'react-router-dom';
import {Container} from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
//import HomePage from './pages/HomePage';

const App = () => {
  return <>
    <Header/>
    <main>
      <Container>
        <Outlet/>
      </Container>
    </main>
    <Footer/>
  </>
};

export default App;
