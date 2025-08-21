import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import './index.css';

function App() {
  return (
    <>
      <Hero />
      <div style={{ height: '100vh' }} />
      <div className="scrollable-content">
        <About />
        <Skills />
        <Projects />
        <ContactForm />
      </div>
    </>
  );
}

export default App;