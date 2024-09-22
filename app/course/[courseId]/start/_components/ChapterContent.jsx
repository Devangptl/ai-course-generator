import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'
import { CopyBlock, dracula } from 'react-code-blocks';
import { Button } from '@/components/ui/button';


const opts = {
    heigh: '390',
    width: '640',
    playerVars: {
        autoplay: 0
    },
}

const ChapterContent = ({ chapter, content ,indexId }) => {

    return (
        <div className='p-10 '>
            <h2 className='text-2xl font-medium'>{chapter?.chapter_name}</h2>
            <p className='text-gray-500'> {chapter?.about} </p>

            {/* video */}
            <div className='flex items-center justify-center my-6'>
                <YouTube videoId={content?.videoId} opts={opts} />
            </div>
            {/* content */}
            <div>
                {content?.content?.map((item, index) => (
                    <div className='p-5 mb-3 rounded-lg bg-sky-50'>
                        <h2 className='text-lg font-medium'>{item?.title}</h2>
                        {/* <p className='whitespace-pre-wrap '> {item?.explanation} </p> */}
                        <ReactMarkdown>{item?.explanation}</ReactMarkdown>
                        {
                            item.code && <div className='my-3 '>
                                <CopyBlock
                                    text={item.code}
                                    showLineNumbers={true}
                                    theme={dracula}
                                // wrapLines
                                codeBlock
                                />
                            </div>
                        }
                    </div>
                ))}
            </div>

           

        </div>
    )
}

export default ChapterContent