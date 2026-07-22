import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import InteractiveExperience from "./components/InteractiveExperience";
import InteractivePlans from "./components/InteractivePlans";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="inicio">
        <Hero />
        <InteractiveExperience />
        <InteractivePlans />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}