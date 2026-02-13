import Link from "next/link";

export default async function Home() {
  const response = await fetch(
    "https://tidy-attraction-06e886b553.strapiapp.com/api/articles?populate=*"
  );
  const result = await response.json();
  const blogs = result.data;

  return (
    <div>
      <h1 className="text-3xl font-bold">All Blogs</h1>

      {blogs.map((blog) => (
        <div key={blog.id} className="my-4">
          <Link href={`/blog/${blog.slug}`}>
            <h2 className="text-xl text-blue-500 cursor-pointer">
              {blog.title}
            </h2>
          </Link>
          <p>{blog.description}</p>
        </div>
      ))}
    </div>
  );
}
