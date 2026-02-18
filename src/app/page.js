import Link from "next/link"; // for not reloading the page, for fast navigation

export default async function Home() { // timetaken for fetching data from strapi so async
  const response = await fetch(
    "https://tidy-attraction-06e886b553.strapiapp.com/api/articles?populate=*", // populate=* it gives all fields
    {cache:"no-store"}
  );

  const result = await response.json(); // turning raw data in readable json format
  const blogs = result.data;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* for different size of screens*/}
        {blogs.map((blog) => ( //goes through each blog, for each blog create one card
          <div
            key={blog.id}
            className="border rounded-xl p-5 shadow hover:shadow-lg transition duration-300 bg-white"
          > {/*applied properties for our card*/}
          <Link href={`/blogs/${blog.slug}`}> {/*link prevents full page reload - dynamic routing happens here */}
            <h2 className="text-xl text-black font-bold mb-3">
              {blog.title}
            </h2>
          </Link>

          <p className="text-gray-500 mb-4">
            {blog.description}
          </p>

          <div className="text-sm text-black font-bold">
            {blog.author?.name} {/* Only displays name if author exists.*/}
          </div>

          <div className="text-sm text-gray-400">
            {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      ))}
    </div>
      
    </div>
    
  );
  
}

