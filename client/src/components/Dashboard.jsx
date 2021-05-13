import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Player from './Player';
import Playlist from './Playlist';
import Header from './Header';

export default function Dashboard() {
    const [playlists, setPlaylists] = useState([]);
    const [playlistItems, setPlaylistItems] = useState(null);
    const [playerId, setPlayerId] = useState('');


    useEffect(() => {
        axios.get('http://localhost:8080/getPlaylists').then(res =>setPlaylists(res.data));        
    }, [])


    const getPlaylistItems = async () =>{
        let items = {};
        const requests = [];
        
        for (let i = 0; i < playlists.length; i++) {
            const itemCount = playlists[i].items[0].contentDetails.itemCount;
            const id = playlists[i].items[0].id;
            requests.push(
                axios.get(`http://localhost:8080/getPlaylistItems/${id}`, {params:{count: itemCount}}).then(res =>{
                    items[id] = res.data;
                })
            )
        }
        await Promise.all(requests).catch(err => console.log(err));
        setPlaylistItems(items);
    }

    useEffect(() => {
        playlists.length > 0 && getPlaylistItems();
    }, [playlists])

    const onVideoClick = (id) =>{
        setPlayerId(id);
    }



    return (
        <div className="dashboard">
            <Header playlistItems={playlistItems} onVideoClick={onVideoClick}/>
            <div className="dashboardBody">
                <Player playerId={playerId}/>
                <Playlist playlists={playlists} playlistItems={playlistItems} onVideoClick={onVideoClick}/>
            </div>

        </div>
    )
}
