// import React from 'react'
import '../App.css'
import {logo} from '../assets'
export default function Hero() {

  function handleClick(){
    window.open('https://example.com', '_blank');
  }
  return (
    <header>
      <nav>
        <img src={logo} alt="sum-logo" className='main-logo' />
        <button className='github-button' onClick={()=>handleClick}>GitHub</button>
      </nav>
      <h1 className='heading'>
        Summarize Articles with <br />
        <span className='openAI'>OpenAI GPT-4</span>
      </h1>
      <p className='desc'>
        Reading a lengthy article for work ? 
        Don&apos;t have the time to read it ? Well 
        with this open-source article summarizer 
        simplifies your reading by transforming lengthy articles into 
        clear and concise summaries  
      </p>
    </header>
  )
}
