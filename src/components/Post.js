import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Post = ({featuredImage}) => {
    const { id } = useParams();
    const restPath = `https://omera7.sg-host.com/wp-json/wp/v2/posts?include=${id}&_embed`
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
    console.log(restData[0]?.previous_post.id)
    if ( isLoaded ) {
        return (
            <>
                <article id={`post-${restData[0]?.id}`}>
                    {restData[0]?._embedded['wp:featuredmedia'][0] &&
                            <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(restData[0]._embedded['wp:featuredmedia'][0])}></figure>
                        }
                    <h1>{restData[0]?.title?.rendered}</h1>
                    <div className="entry-content" dangerouslySetInnerHTML={{__html:restData[0]?.content?.rendered}}></div>
                </article>
                <nav className="posts-navigation">
                    {restData[0]?.previous_post.id &&
                        <Link to={`/blog/${restData[0]?.previous_post.id}`} className="prev-post">Previous: {restData[0]?.previous_post.title}</Link>
                    }
                </nav>
            </>
        )
    }
    // console.log(restData[0]?.next_post.id)
    // if ( isLoaded ) {
    //     return (
    //         <>
    //             <article id={`post-${restData[0]?.id}`}>
    //                 {restData[0]?._embedded['wp:featuredmedia'][0] &&
    //                         <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(restData[0]._embedded['wp:featuredmedia'][0])}></figure>
    //                     }
    //                 <h1>{restData[0]?.title?.rendered}</h1>
    //                 <div className="entry-content" dangerouslySetInnerHTML={{__html:restData[0]?.content?.rendered}}></div>
    //             </article>
    //             <nav className="posts-navigation">
    //                 {restData[0]?.next_post.id &&
    //                     <Link to={`/blog/${restData[0]?.next_post.id}`} className="Next-post">Next: {restData[0]?.next_post.title}</Link>
    //                 }
    //             </nav>
    //         </>
    //     )
    // }
    
    return <img src="../loading.gif" alt="Loading" className="loading" id="loading" />
}

export default Post
