"use client"
import '@/styles/globals.css'
import '@/styles/utils.module.css'
import {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link'
import AnimeDisplay from './animeDisplay.js';
import {Search, Sort} from './sort.js';


export default function App({ Component, pageProps}) {
  const [anime, setAnime] = useState([]);
  const [query, setQuery] = useState('');
  const [showItems, setShowItems] = useState(false);
  const [sortType, setSortType] = useState(null);
  const options = [
    {value: "name", label: "Name"},
    {value: "rating", label: "Rating"},
    {value: "rank", label: "Ranking"}
  ];

  
  useEffect(() => {
    async function fetchData(){
      const rec = await axios.get("https://api.jikan.moe/v4/top/anime");
      setAnime(rec.data.data)
    }
    fetchData();
  }, []);
  
  function showSort(e){
    e.stopPropagation();
    setShowItems(!showItems);
  }

  function determineSort(value) {
    let arrCopy = anime.slice();
    if (value == sortType) {
      arrCopy.reverse();
    }
    else if (value == "Name") {
      arrCopy.sort((a, b) => (a.title > b.title) ? 1 : -1)
      
    }
    else if (value == "Rating") {
      arrCopy.sort((a, b) => (a.score >= b.score) ? 1 : -1)
    }
    else if (value == "Rank") {
      arrCopy.sort((a, b) => (a.rank >= b.rank) ? 1 : -1)
    }
    setSortType(value);
    setAnime(arrCopy);
  }


  function Query(e){
    setQuery(e.target.value); 
  }
  
  async function getData(){
    const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&sfw`);
    setAnime(res.data.data);
  }

  return (
  <>
    
    <Head>
      <title>Anime Rec App</title>
    </Head>
    <div className = "animeSort">
    <Search search={Query} value = {query} handleClick = {getData}/>
    <Sort placeHolder = "Sort by" options = {options} showItems={showItems} 
          showSort = {showSort} determineSort = {determineSort}/>
    </div>
    <AnimeDisplay animeList = {anime}/>
    
  </>
  )
}


