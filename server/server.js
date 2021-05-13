import express from 'express';
import axios from 'axios';
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.KEY;
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


//
const getPlaylists = async (arr) =>{
    const playlists = [];
    const reqs = [];

    for (let i = 0; i < arr.length; i++) {
        reqs.push(
            axios.get('https://www.googleapis.com/youtube/v3/playlists', {
                params:{
                    key: apiKey,
                    id: arr[i],
                    part: 'snippet,contentDetails'
                }
            }).catch(err => console.log(err))
        )
        
    }
    await Promise.all(reqs).then(data => data.map(x=> playlists.push(x.data))).catch(err => console.log(err));
    return(playlists);
   
}
//

const getPlayListItems = async (id) =>{
    const res = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params:{
            key: apiKey,
            playlistId: id,
            part: 'snippet,contentDetails',
            maxResults: 50
        }
    }).catch(err => console.log(err));
    return(res.data.items);
}

app.get('/getPlaylists', async (req,res) =>{

    axios.get('https://www.googleapis.com/youtube/v3/channelSections', {
    params:{
        key: apiKey,
        channelId: 'UCUpquzY878NEaZm5bc7m2sQ',
        part: 'snippet,contentDetails'
    }
    }).then(async (result) =>{
        const items = result.data.items;
        for (let i = 0; i < items.length; i++) {
            if(items[i].snippet.title === "How Tos"){
                const playlists = items[i].contentDetails.playlists;
                const data = await getPlaylists(playlists);
                res.send(data);
            }
            
        }

    }).catch(err => console.log(err))
})


app.get('/getPlaylistItems/:id', async (req,res) =>{
    // console.log(req.query.count)
    const response = await getPlayListItems(req.params.id);
    res.send(response);
})


app.listen(process.env.PORT || 8080, ()=> console.log("Listening on port 8080")); 