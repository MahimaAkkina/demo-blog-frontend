export default function QuoteBlock({data}){
    return(
        <blockquote className="border-l-4 border-green-800 pl-5 py-4 my-10 bg-green-100 rounded-r-2xl transition duration-300 
            hover:shadow-lg">
            
            <h3 className="text-lg font-semibold mb-4">
                {data.title}
            </h3>

            <p className="italic text-gray-700">
                "{data.body}"
            </p>

        </blockquote>
    );
}