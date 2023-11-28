//Components
import Header from '../components/Header'



export default function Home(){

    return(
        <>
            <Header></Header>
            <main>
                <div className='row w-100'>
                    <div className='col-12 col-lg-4 banner'>
                        <img src='../logo.png' alt="Teacher's Helper Logo" className="banner-logo"></img>
                        <div className='banner-text'>
                            <h1>Teacher's Helper</h1>
                            <h2>Best tool in the market for English Teachers</h2>
                        </div>
                    </div>
                    <div className='col-12 col-lg-8'>
                       <div className='banner-img'>
                        
                        </div> 
                        
                    </div>
                </div>
            </main>
        </>
    )
}

//export default Home;