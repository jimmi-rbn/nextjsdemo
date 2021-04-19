import Head from "next/head";
import styles from "@styles/Home.module.css";
import { Button } from "@components/Button/Button";
// import Link from "next/link";

import {
    AllPostsDocument,
    PostOrderByInput,
    useAllPostsQuery,
} from "../queries/posts.graphql";
import { initializeApollo } from "../api/apollo";

export default function Home() {
    const { data, loading, error } = useAllPostsQuery({
        variables: {
            orderBy: PostOrderByInput.DateDesc,
            first: 20,
        },
    });

    console.log("error", error);
    console.log("loading", loading);

    console.log("data", data);

    return (
        <div className={styles.container}>
            <Head>
                slut
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Button children="Click me!" />

                {/* <div>title: {heroPost.title}</div>
                    <div>date: {heroPost.date}</div>
                    <div>author: {heroPost.author.name}</div>
                    <div>slug: {heroPost.slug}</div>
                    <div>excerpt: {heroPost.excerpt}</div>

                    <Link as={`/posts/${heroPost.slug}`} href="/posts/[slug]">
                        <a style={{ textDecoration: "underline" }}>
                            {heroPost.slug}
                        </a>
                    </Link> */}
            </main>
        </div>
    );
}

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: AllPostsDocument,
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    };
}
