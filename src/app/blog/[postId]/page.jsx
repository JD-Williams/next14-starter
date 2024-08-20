import Image from "next/image"
import styles from "./singlePost.module.css"
import PostUser from "@/components/postUser/postUser"
import { Suspense } from "react"
import { getPost } from "@/lib/data"

// FETCH DATA WITH AN API
const getData = async (postId) => {
  const res = await fetch(`https://localhost:3000/api/blog/${postId}`)

  if(!res.ok){
    throw new Error("Something went wrong")
  }
  
  return res.json()
}

export const generateMetadata = async ({ params }) => {
  const {postId} = params
  const post = await getPost(postId)
  
  return {
    title: post.title,
    description: post.desc,
  };
};

const SinglePostPage = async ({params}) => {

  const {postId} = params;

  // FETCH DATA WITH AN API
  const post = await getData(postId);

  // // FETCH DATA WITHOUT AN API
  // const post = await getPost(postId);

  console.log(post)
  console.log("Retrieves post on postId page")

  return (
    <section className={styles.container}>
      <div className={styles.imgContainer}>
        <Image 
          src={post.img}
          alt="" 
          fill
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            {/* <span className={styles.detailValue}>{post.createdAt.toString().slice(4,16)}</span> */}
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          {post.desc}
        </div>
      </div>
    </section>
  )
}

export default SinglePostPage