import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { getSdk } from "../../generated/graphcms-schema";
import { GraphQLClient } from "graphql-request";
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
    // const data = await getPostAndMorePosts(params.slug);
    const client = new GraphQLClient(process.env.GRAPHCMS_PROJECT_API);
    const sdk = getSdk(client);

    const { post } = await sdk.getPostBySlug(
        { slug: params.slug },
        {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GRAPHCMS_DEV_AUTH_TOKEN}`,
        }
    );

    return {
        props: {
            post,
        },
    };
}

export async function getStaticPaths() {
    const client = new GraphQLClient(process.env.GRAPHCMS_PROJECT_API);

    const sdk = getSdk(client);

    const { posts } = await sdk.getAllPostsWithSlug(
        {},
        {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GRAPHCMS_DEV_AUTH_TOKEN}`,
        }
    );

    return {
        paths: posts.map(({ slug }) => ({
            params: { slug },
        })),
        fallback: true,
    };
}

export default Post;
