
import { useEffect,useState } from "react";

const API_KEY=process.env.NEXT_GIPHY_API

const useFetch=({keyword})=>{
    const[gifUrl,setGifUrl]=useState("")
    console.log("api",API_KEY)
    const fetchGifs=async()=>{
        try {
            const response=await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`)
            console.log("try")
            const {data}=await response.json()
            console.log(data[0]?.images?.downsized_medium?.url)
            setGifUrl(data[0]?.images?.downsized_medium?.url)
        } catch (error) {
            console.log("catch")
            setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284")
        }
    }

    useEffect(()=>{
       if(keyword) fetchGifs() 
    },[keyword])
    //console.log(gifUrl)
    return gifUrl
}

export default useFetch