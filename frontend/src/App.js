/*import {useState} from 'react';

import  Carousel  from './components/Carousel.js'
import  Counter  from './components/Counter.js'
import  Register  from './components/Register.js'
function App() {

  const appName = "Teacher's Helper";
  let logo = './logo.png'

  let [contador, setContador] = useState(0)
  function plus(){
    setContador(contador++);
  }
  function minus(){
    setContador(contador--);
  }
  const fotos = [
      './foto1.jpg',
      './foto2.jpg',
      './foto3.jpg'
    ];

  return (
    <div>
      <img src={logo} alt="logo" width="80px"></img>
      <h1>
        Welcome to { appName }
      </h1>
      <p>
        Best tool in the market for English Teachers
      </p>
      <Carousel fotos={fotos}></Carousel> 
      <div>
      <button type="button" onClick={()=> minus()}>-</button>
      <button type="button" onClick={()=>plus()}>+</button>

      <Counter contador={contador}></Counter>
      <Register/>
      </div>
    </div>
  );

}

export default App;
*/