export default async function Home() {
  const response=await fetch( //fetching data
    "https://tidy-attraction-06e886b553.strapiapp.com/api/articles?populate[blocks][populate]=*"
  ); 

  const result=await response.json(); // changing data into readable format
  const blogs=result.data; //extracting blog posts
  //const blogs = result?.data || []; 
  return (
    <div>
      {blogs.map((blog_post)=>( //displaying each blog
        <div key={blog_post.id}>
          <h1 className="text-yellow-300 text-center font-bold text-4xl my-4">{blog_post.title}</h1>
          
          <p>Category: {blog_post.category?.name}</p>
          <p>Author: {blog_post.author?.name}</p>
          <p className="mb-4">Description: {blog_post.description}</p>

          {blog_post.blocks?.map((block, ind) => {
            <div key={ind}>
              <p>{block.body}</p>
            </div>
            if (block.__component === "shared.rich-text") {
              return (
                <div key={ind} className="mb-4">
                  <p>{block.body}</p>
                </div>
              );
            }

             if (block.__component === "shared.quote") {
              return (
                <div key={ind} className="border-l-4 pl-4 italic my-4">
                  <p>"{block.body}"</p>
                  <p className="text-sm font-bold mt-2">- {block.title}</p>
                </div>
              );
            }


             if (block.__component === "shared.media") {
              return (
                <div key={ind} className="my-4">
                  <img
                    src={block.file?.url}
                    alt="media"
                    className="rounded-lg"
                  />
                </div>
              );
            }
            if (block.__component === "shared.slider") {
              return (
                <div key={ind} className="my-4">
                  {block.files?.map((image, i) => (
                    <img
                      key={i}
                      src={image.url}
                      alt="slider"
                      className="mb-2 rounded-lg"
                    />
                  ))}
                </div>
              );
            }
            return null; // important  
})}
          
        </div>
      ))}
      
    </div>
  );
}
