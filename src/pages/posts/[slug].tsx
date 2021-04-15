import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../api/graphcms";
import Head from "next/head";
import { CMS_NAME } from "../api/constants";

interface Content {
    html: string;
}

interface PostProps {
    title: string;
    slug: string;
    content: Content;
}

interface PostPageProps {
    post: PostProps;
}

export const Post = ({ post }: PostPageProps) => {
    console.log("post", post);
    const router = useRouter();

    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <main>
            <div>
                <header>Header</header>
                {router.isFallback ? (
                    <h2>Loading…</h2>
                ) : (
                    <>
                        <article>
                            <Head>
                                <title>
                                    {post.title} | Next.js Blog Example with{" "}
                                    {CMS_NAME}
                                </title>
                                {/* <meta property="og:image" content={post.ogImage.url} /> */}
                            </Head>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.content?.html,
                                }}
                            />
                        </article>
                    </>
                )}
            </div>
        </main>
    );
};

export async function getStaticProps({ params, preview = false }) {
    const data = await getPostAndMorePosts(params.slug, preview);
    return {
        props: {
            preview,
            post: data.post,
        },
    };
}

export async function getStaticPaths() {
    const posts = await getAllPostsWithSlug();
    return {
        paths: posts.map(({ slug }) => ({
            params: { slug },
        })),
        fallback: true,
    };
}

export default Post;
