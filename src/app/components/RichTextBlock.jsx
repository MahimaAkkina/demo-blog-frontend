import {marked} from "marked";
export default function RichTextBlock({data}){
    return(
        <div className="prose prose-lg max-w-none mb-8 prose-table:my-6
            
            prose-li:my-0
            prose-th:border
            prose-td:border
            prose-th:bg-green-100
            prose-th:p-3
            prose-td:p-3
            prose-th:text-center
            prose-td:text-center
            prose-th:border-green-600
            prose-td:border-green-500
            
            prose-blockquote:border-l-5
            prose-blockquote:border-r-5
            prose-blockquote:border-t-1
            prose-blockquote:border-b-1
            prose-blockquote:border-blue-500
            prose-blockquote:pl-4
            prose-blockquote:italic
            prose-blockquote:text-gray-600
            
            
            prose-blockquote:py-2
            prose-blockquote:rounded-lg"> {/* prose adds default typography styles for long-form content like blogs or articles.*/}
            <div
                dangerouslySetInnerHTML={{ //It allows you to insert HTML content directly into a component.
                    __html: marked(data.body || ""), //converts markdown to HTML
                }}
            />
        </div>
    );
}

