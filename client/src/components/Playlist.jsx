import React from "react";

export default function Playlist(props) {
    const {playlists, playlistItems, onVideoClick} = props;
  return (
    <div>
        <ul className="playLists">
                {playlists.map(x =>{
                    const item = x.items[0];
                    const id = item.id;
                    return (
                        <li className="playlistItem" key={item.id}>
                            <div>
                                <h2>{item.snippet.title}</h2>
                                <h3>{item.contentDetails.itemCount} videos</h3>
                                <img src={item.snippet.thumbnails.medium.url} alt="sample" />
                                {playlistItems !== null &&
                                    <div>
                                        <ul className="subList">
                                            {playlistItems[id].map(y =>{
                                                return(
                                                    <li className="subListItem" key={y.id}>
                                                        <h4>{y.snippet.title}</h4>
                                                        <img src={y.snippet.thumbnails.default.url} alt="sample2" style={{cursor: 'pointer'}} onClick={()=> onVideoClick(y.snippet.resourceId.videoId)}/>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                }
                            </div>
                        </li>
                    )
                })}
            </ul>
    </div>
  );
}
