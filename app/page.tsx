import Header from './components/Header';
import SearchBar from './components/SearchBar';

export default function HomePage() {
  return (
    <main>
      <Header />
      <div className="max-w-5xl mx-auto mt-8 px-4">
        <SearchBar />
      </div>
    </main>
  );
}
