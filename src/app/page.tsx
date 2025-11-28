import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import About2 from '../components/About2/About2'
import About3 from '../components/About3/About3';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="snap-container">
        <Hero />
        <About />
        <About2 />
        <About3 />
        <Contact />

        {/* Footer dans une section pour qu'il soit une "page" à part entière */}
        <section id="footer">
          <Footer />
        </section>
      </main>
    </>
  );
}
