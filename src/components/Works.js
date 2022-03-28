import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Works = ( {featuredImage} ) => {
    const restPath = 'https://omera7.sg-host.com/wp-json/wp/v2/fwd-work?_embed'
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
    console.log(restData)
    if ( isLoaded ) {
        return (
            <>
                <h1>Works</h1>
                {restData.map(post => {
                    // const { title } = Object.entries();
                    // {title}
                    console.log(post.title)
                    return (
                        <article key={post.id} id={`post-${post.id}`}>
                            {post.title.rendered}
                            {post._embedded['wp:featuredmedia'][0] &&
                                <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
                            }
                            <Link to={`/blog/${post.id}`}><h2>{post.title.rendered}</h2></Link>
                            <div className="entry-content" dangerouslySetInnerHTML={{__html:post.excerpt.rendered}}></div>
                            {post._embedded['author'][0] && <>{post._embedded['author'][0].name}</>}
                        </article>
                    )
                }
                )}
            </>
        )
    }

    return <img src="loading.gif" alt="Loading" className="loading" id="loading" />
}

export default Works;
