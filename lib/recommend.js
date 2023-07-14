import axios from 'axios';

export default async function getStaticProps() {
    const rec = await axios.get("https://api.jikan.moe/v4/recommendations/anime");
    return {
        props: {recList: rec.data}
    }
}