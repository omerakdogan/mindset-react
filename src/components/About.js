import { useState, useEffect } from 'react'

const About = () => {
    const restPath = 'https://omera7.sg-host.com/wp-json/wp/v2/pages/7'
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
            <article id={`post-${restData.id}`}>
                <h1>{restData.title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>
            </article>
        )
    }

    return <img src="loading.gif" alt="Loading" className="loading" id="loading" />
}

export default About
