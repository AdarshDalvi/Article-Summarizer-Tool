import './App.css'
import Hero from './components/Hero'
import Summary from './components/Summary'

function App() {

  return (
    <main>
      <div className='main'>
        <div className='gradient'/>
      </div>
      <div className='app'>
        <Hero/>
        <Summary/>
      </div>
    </main>
  )
}

export default App
