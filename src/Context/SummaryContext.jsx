import React,{createContext,useState} from "react";

let SummaryContext = createContext()

const API_KEY = import.meta.env.VITE_RAPID_ARTICLE_KEY
const URL = import.meta.env.VITE_RAPID_ARTICLE_URL

function SummaryContextProvider(props) {

  async function getSummary(link){
    let url = `${URL}${link}` 
    const response = await fetch(url,{
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    })
    const result = await response.json();
    const {summary} = result
    return summary
  };


  return (
    <SummaryContext.Provider value={{getSummary}}>
      {props.children}
    </SummaryContext.Provider>
  )
}

export {SummaryContextProvider, SummaryContext}
