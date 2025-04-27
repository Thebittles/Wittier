import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-grow mx-auto p-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
