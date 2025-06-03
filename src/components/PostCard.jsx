import React from 'react'
import {service} from '../appwrite/dbConfig'
import { Link } from 'react-router-dom'
function PostCard({title,imageUrl,$id}) {
  return (

        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray rounded-xl p-4'>
                <div className='w-4 justify-center mb-4'>
                    <img 
                    className='rounded-xl'
                    src={service.previewFile(imageUrl)} 
                    alt={title} />
                </div>
                <h2>{title}</h2>
            </div>
        </Link>
    
  )
}

export default PostCard