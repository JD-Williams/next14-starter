"use server"

import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { revalidatePath } from "next/cache";

export const sayHello = async () => {
    console.log("hello");
};

export const addPost = async (formData) => {
    // const title = formData.get("title");
    // const desc = formData.get("desc");
    // const postId = formData.get("postId");
  
    const { title, desc, postId, userId } = Object.fromEntries(formData);
  
    try {
      connectToDb();
      const newPost = new Post({
        title,
        desc,
        postId,
        userId,
      });
  
      await newPost.save();
      console.log("saved to db");
      revalidatePath("/blog");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDb();
  
      await Post.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/blog");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };