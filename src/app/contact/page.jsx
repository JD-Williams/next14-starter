import Image from "next/image"
import styles from "./contact.module.css"
import { contact } from "@/../public"

export const metadata = {
  title: 'Contact Page',
  description: 'Contact description',
}

const ContactPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={contact} alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea name="" id="" cols="30" rows="10" placeholder="Message"></textarea>
        </form>
      </div>
    </section>
  )
}

export default ContactPage