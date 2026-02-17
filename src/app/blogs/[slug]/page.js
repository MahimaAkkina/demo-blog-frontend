// Next.js automatically passes dynamic route values through `params`
// We use it to access values like id, slug etc from the URL

export default async function BlogPage({params}) {
  const { slug } = await params;

  const response = await fetch(
    `https://tidy-attraction-06e886b553.strapiapp.com/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[blocks][populate]=*`, //filtering blog posts - encodeURIComponent() converts special characters into a URL-safe format.
    {cache:"no-store"} //Always fetch fresh data from the server.
  );
  const result=await response.json(); // changing data into readable format
  const blog=result.data[0]; //extracting blog posts
  if (!blog) return <div>Blog not found</div>; 
  return (
    <div>
      <h1 className="text-4xl font-bold">{blog.attributes.title}</h1>

      {blog.attributes.blocks?.map((block, index) => {
        if (block.__component === "shared.rich-text") {
          return (
            <div key={index}>
              <p>{block.body}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
