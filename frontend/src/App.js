import Test from './components/Test';

// 1. npm init react-app bemiyya
// 2. cd bemiyya
// 3. npm start

function App() {
  return (
    <div className="App">
      <h1>Hello world</h1>

      <Test>
        <h2>This is child tag</h2>
      </Test>
    </div>
  );
}

export default App;
