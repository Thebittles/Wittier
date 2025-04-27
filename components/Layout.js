import Nav from './Nav';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Nav /> */}
      <main className="flex-grow container mx-auto p-8">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
