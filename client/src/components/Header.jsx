import React,{useState} from "react";

export default function Header(props) {
    const {onVideoClick, playlistItems} = props;
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const onInput = (e) =>{
      const arr = [];
      const search = e.target.value || '';
      setInput(search);

      if(search != '' && search != ' ' && playlistItems)
      {
        if(Object.keys(playlistItems).length > 0){
          for(let key in playlistItems){
              const list = playlistItems[key];
              for (let i = 0; i < list.length; i++) {
                  const title = list[i].snippet.title;
                  title.toLowerCase().includes(search.toLowerCase()) && arr.push(list[i])      
              }
          }
          setResults(arr);
        }
      }
      else{
        setResults([]);
      }
    }

    const onResultClick = (id) =>{
      onVideoClick(id);
      setResults([])
    }

  return (
    <div className="dashboardHeader">
      <div className="inputDiv">
        <input
          value={input}
          placeholder="Search"
          onChange={(e) => onInput(e)}
        />
      </div>

        {results.length > 0 && (
          <div className="resultsDiv">
            <ul className="resultsList">
              {results.map((x) => {
                return (
                  <li key={x.id}>
                    <p
                      className="resultItem"
                      onClick={() => onResultClick(x.snippet.resourceId.videoId)}
                    >
                      {x.snippet.title}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

    </div>
  );
}
