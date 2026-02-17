import Link from "next/link"; // for not reloading the page, for fast navigation

export default async function Home() { // timetaken for fetching data from strapi so async
  const response = await fetch(
    "https://tidy-attraction-06e886b553.strapiapp.com/api/articles?populate=*" // populate=* it gives all fields
  );
  const result = await response.json(); // turning raw data in readable json format
  const blogs = result.data;
  console.log(blogs) // loop

  return (
    <div>
      <h1 className="text-3xl font-bold">All Blogs</h1>

      {blogs.map((blog) => ( // arrow func - map method checks each and every blog in array of blogs
        <div key={blog.id} className="my-4">
          <Link href={`/blogs/${blog.slug}`}> 
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

