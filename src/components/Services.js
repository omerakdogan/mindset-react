import { useState, useEffect } from 'react'

const Services = () => {
    const restPath = ''
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    // Create two more constants here:
    // 1) Another API path,
    // 2) Another useState() for the REST data

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

    // Create one more useEffect function here.
    // Use the two new constants in this new useEffect function.
    
    if ( isLoaded ) {
        return (
            <article id={`post-${restData.id}`}>
                <h1>{restData.title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>
                {/* Output all of the Service posts here. Check Posts.js for something similar. */}
            </article>
        )
    }

    return <img src="loading.gif" alt="Loading" className="loading" id="loading" />
}

export default Services
