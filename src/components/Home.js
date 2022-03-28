import { useState, useEffect } from 'react'

const Home = () => {
    const restPath = 'https://omera7.sg-host.com/wp-json/wp/v2/pages/12'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    if ( isLoaded ) {
        return (
            <article>
                <h1>{restData.title.rendered}</h1>
                <div className="entry-content">
                    <div className="left-section">
                        {restData?.acf.left_section_title}
                        {restData?.acf.left_section_content}
                    </div>
                    <div className="right-section">
                        {restData?.acf.right_section_title}
                        {restData?.acf.right_section_content}
                    </div>
                </div>
            </article>
        )
    }

    return <img src="loading.gif" alt="Loading" className="loading" id="loading" />
}

export default Home
