import styles from '../../styles/Feed.module.css'
import { ToolBar } from '../../components/toolbar'
import { useRouter } from "next/router";

const Feed = ({pageNumber, articles}) =>{
    const router = useRouter();
    return(
        <div className="page-content">

            <ToolBar />

            <div className={styles.main}>
                {articles.map((article, index) => (
                    <div key={index} className={styles.post}>
                        <h1 onClick={() => window.location.href = article.url}>{article.title}</h1>
                        <p>{article.description}</p>
                        {!!article.urlToImage && <img src={article.urlToImage} />}
                    </div>
                ))}
            </div>

            <div className={styles.paginator}>

                {/* previos button */}
                <div 
                    onClick={() =>{
                    if (pageNumber > 1){
                        router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0, 0))
                    }
                }}>
                    <div className={pageNumber === 1 ? styles.disabled : styles.active }>
                        Prev
                    </div>
                </div>

                <div>
                    <div>#{pageNumber}</div>
                </div>

                {/* next button */}
                <div 
                    onClick={() =>{
                    if (pageNumber < 7){
                        router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0, 0))
                    }
                }}>
                    <div className={pageNumber === 7 ? styles.disabled : styles.active }>
                        Next
                    </div>
                </div>
            </div>

        </div>
    )
};


export const getServerSideProps = async pageContext =>{
    const pageNumber = pageContext.query.slug;

    if (!pageNumber || pageNumber < 1 || pageNumber > 7){
        return {
            props: {
                articles: [],
                pageNumber: 1
            }
        }
    };

    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=7&page=${pageNumber}`,
        {
            headers:{
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
            }
        }
    );

    const apiJson = await apiResponse.json()

    const { articles } = apiJson;
    
    return {
        props : {
            articles,
            pageNumber: Number.parseInt(pageNumber)
        }
    }
};

export default Feed;
