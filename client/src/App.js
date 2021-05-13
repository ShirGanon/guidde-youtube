import './App.css';
import Dashboard from './components/Dashboard';




function App() {

//   axios.get('https://www.googleapis.com/youtube/v3/channelSections', {
//     params:{
//         key: 'AIzaSyAeTVU3v6kCwP1tQABawNJfI5Mwwejmngo',
//         channelId: 'UCUpquzY878NEaZm5bc7m2sQ',
//         part: ['snippet','contentDetails']
//     }
// }).then(res => console.log(res)).catch(err => console.log(err))

  return (
    <div className="App">
      <Dashboard/>
    </div>
  );
}

export default App;
