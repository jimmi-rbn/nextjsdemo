import Head from "next/head";
import styles from "@styles/Home.module.css";
import { Button } from "@components/Button/Button";
import { getAllPostsForHome } from "../pages/api/graphcms";
import Link from "next/link";

export default function Home({ posts }) {
    const heroPost = posts[0];

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Button children="Click me!" />

                <div>title: {heroPost.title}</div>
                <div>date: {heroPost.date}</div>
                <div>author: {heroPost.author.name}</div>
                <div>slug: {heroPost.slug}</div>
                <div>excerpt: {heroPost.excerpt}</div>

                <Link as={`/posts/${heroPost.slug}`} href="/posts/[slug]">
                    <a style={{ textDecoration: "underline" }}>
                        {heroPost.slug}
                    </a>
                </Link>
            </main>
        </div>
    );
}

export async function getStaticProps({ preview = false }) {
    const posts = (await getAllPostsForHome(preview)) || [];
    return {
        props: { posts, preview },
    };
}
