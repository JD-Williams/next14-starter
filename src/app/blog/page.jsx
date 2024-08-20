import { PostCard } from "@/components"
import styles from "./blog.module.css"
import { getPosts } from "@/lib/data"

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch("https://localhost:3000/api/blog", {next:{revalidate:3600}})

  if(!res.ok){
    throw new Error("Something went wrong")
  }

  return res.json()
}

const BlogPage = async () => {

  // FETCH DATA WITH AN API
  const posts = await getData()

  // // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();
  
  console.log(posts)
  console.log("Retrieves posts on BlogPage")

  return (
    <section className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post}/>
        </div>
      ))}
    </section>
  )
}

export default BlogPage