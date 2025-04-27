import type { Route } from "./+types/blog-post";

const postsRaw = import.meta.glob("../posts/**.mdx", { eager: true });
const blogPosts = Object.entries(postsRaw).map(([path, m]) => {
  const module = m as {
    default: React.ComponentType;
    frontmatter: Record<string, string>;
  };
  const frontmatter = module.frontmatter;
  const slug = path.split("/").pop()?.replace(".mdx", "");
  return {
    id: slug,
    datetime: frontmatter.datetime,
    component: module.default,
  };
});

export default function BlogPost({ params }: Route.ComponentProps) {
  const { slug } = params;
  const post = blogPosts.find((post) => post.id === slug);
  const componentRenderMap = {
    a: (props: React.PropsWithChildren) => (
      <a
        {...props}
        className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      />
    ),
    h1: (props: React.PropsWithChildren) => (
      <h1
        {...props}
        className="py-6 text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-5xl"
      />
    ),
    h2: (props: React.PropsWithChildren) => (
      <h2
        {...props}
        className="py-6 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white"
      />
    ),
    h3: (props: React.PropsWithChildren) => (
      <h3
        {...props}
        className="py-6 text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white"
      />
    ),
    p: (props: React.PropsWithChildren) => <p {...props} className="pb-6" />,
    table: (props: React.PropsWithChildren) => (
      <table {...props} className="pb-6" />
    ),
    th: (props: React.PropsWithChildren) => (
      <th {...props} className="border border-gray-300 p-1" />
    ),
    td: (props: React.PropsWithChildren) => (
      <td {...props} className="border border-gray-300 px-2 py-1" />
    ),
    ul: (props: React.PropsWithChildren) => (
      <ul
        {...props}
        className="max-w-xl text-gray-600 dark:text-gray-400 pb-6"
      />
    ),
  };

  if (!post) {
    // TODO Come up with a better 404 page or redirect
    return (
      <div className="grid place-items-center h-screen">
        <h1>Post Not Found</h1>
      </div>
    );
  }
  // Asserting any to get around components prop type error
  const MDXContent = post.component as any;
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700 dark:text-gray-300 -mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.datetime}>
              {dateFormatter.format(new Date(post.datetime))}
            </time>
          </p>
          <MDXContent components={componentRenderMap} />
        </div>
      </div>
    </div>
  );
}
