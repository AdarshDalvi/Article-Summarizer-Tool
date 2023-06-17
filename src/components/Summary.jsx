import {useState, useEffect,useContext} from 'react'
import {copy, linkIcon, loader, tick } from '../assets'
import '../App.css'
import { SummaryContext } from '../Context/SummaryContext'

export default function Summary() {

  const [article, setArticle] = useState({
    url: '',
    summary : ''
  })
  const [allArticles,setAllArticles] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState({})
  const [copied,setCopied] = useState("")
  const {getSummary } = useContext(SummaryContext)


  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
    }
  },[])

  async function handleSubmit(e){
    e.preventDefault()
    try{
      setLoading(true)
      const result = await getSummary(article.url)
      if(result!==null){
        const newArticle = {...article, summary: result}
        const updatedAllArticles = [newArticle,...allArticles]
        setArticle(newArticle)
        setAllArticles(updatedAllArticles)
        localStorage.setItem('articles',JSON.stringify(updatedAllArticles))
      }
      setLoading(false)
    }catch(e){
      setLoading(false)
      setError(e)
    }
    
  }

  function handleChange(e){
    let {name, value} = e.target
    setArticle(prevUrl=>{
      return {
        ...article,
        [name] : value
      }
    })
  }


  function handleCopy(copyUrl){
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(()=>setCopied(false),3000)
  }

  return (
    <section className='summary-section'>
      <div className='input-container'>
        <form className='link-form' onSubmit={handleSubmit}>
          <img src={linkIcon} alt="Link-Icon" className='link-icon'/>
          <input 
            type="url" 
            value={article.url} 
            name='url' required  
            className='input-field' 
            onChange={handleChange}
            placeholder='Paste the article link'
          />
          <button type='submit' className='link-submit'>↵</button>
        </form>
      </div>
      <div className='history-container'>
        {allArticles.length!=0 && allArticles.map((article,index)=>{
          return (
            <div className='history-link-box' key={index} onClick={()=>setArticle(article)}>
              <div className='copy-btn' onClick={()=>handleCopy(article.url)}>
                <img src={copied===article.url? tick: copy} alt="copy-link" className='copy-link'/>
              </div>
              <p className='copy-url'>
                {article.url}
              </p>
            </div>
          )
        })}
      </div>
      <div className='summary-container'>
        {
          loading? 
            <img src={loader} alt="loader" style={{width:'40px',height:'40px' , objectFit:'contain'}}/>
          : error.message ? 
            <p className='error-text'>
              Well, that wasn't supposed to happen...
              <br />
              <span>Please try again later or check the URL you provided. If the issue persists, feel free to contact me at <span style={{textDecoration:'underline'}}>adarshdalvi197@gmail.com</span>. Thank you!</span>
            </p>
          :article.summary&&
            <div className='summary-wrapper'>
              <h2 className='summary-heading'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='summary'>
                  {article.summary}
                </p>
              </div>
            </div>
        }
      </div>
    </section>
  )
}
