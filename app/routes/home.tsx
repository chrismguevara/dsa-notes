import { Link } from "react-router";
import type { Route } from "./+types/home";

const postsRaw = import.meta.glob("../posts/**.mdx", {
  eager: true,
});
const blogPosts = Object.entries(postsRaw).map(([path, module]) => {
  const data = (module as { frontmatter?: any }).frontmatter ?? {};
  const slug = path.split("/").pop()?.replace(".mdx", "");
  return {
    id: slug,
    title: data.title,
    href: `/posts/${slug}`,
    description: data.description,
    datetime: data.datetime,
    category: { title: "Marketing", href: "#" },
  };
});

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DSA Notes" },
    {
      name: "description",
      content: "Chris' notes on data structures and algorithms",
    },
  ];
}

export default function Home() {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex-1 mx-auto max-w-7xl px-6 lg:px-8 pt-24 sm:pt-32">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-5xl">
          DSA Notes
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-400">
          Brushing up on data structures and algorithms.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="flex max-w-xl flex-col items-start justify-between"
          >
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={post.datetime} className="text-gray-500">
                {dateFormatter.format(new Date(post.datetime))}
              </time>
              {/* TODO Support categories */}
              {/* <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  {post.category.title}
                </a> */}
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 dark:text-white group-hover:text-gray-600">
                <Link to={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400">
                {post.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
