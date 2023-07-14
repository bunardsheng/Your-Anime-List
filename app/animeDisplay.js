import axios from 'axios';

function AnimeDisplay({animeList}) {
    
    if (!animeList) { 
        return <p>Loading...</p>;
    }
    const showAnime = animeList.map(anime => {
      return <Anime {...anime} />;
    })
    return (
      <>
        <div className = "animeDisplay">
          {showAnime}
        </div>
      </>
    );
  }
  
  function Anime(props) {
    return (
      <div className = "anime" key = {props.id}>
        <h3>{props.title}</h3>
        <img className = "anime-img" src = {props.images.jpg.large_image_url}></img>
        <p><a href = {props.url}>See Full Description</a></p>
        <p>Rating: {props.score ? props.score : "N/A" }</p>
        <button>Add!</button>
      </div>)
  }
  
//   export async function getServerSideProps() {
//     const rec = await axios.get("https://api.jikan.moe/v4/top/anime");
//     const res = [1, 2, 3]
    
//     return {
//         props: { res }
//     }
//   }

  export default AnimeDisplay;