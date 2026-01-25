import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Smart Inventory
          </h1>
          <p className="text-gray-500">Real-time stock management</p>
        </header>

        <main>
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
