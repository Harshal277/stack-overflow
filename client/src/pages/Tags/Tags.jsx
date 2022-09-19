import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import './Tags.css'

const Tags = () => {
    const tagsList = [{
        id: 1,
        tagName: 'Javascript',
        tagDesc: 'asdasdsad'
    },{
        id: 2,
        tagName: 'Python',
        tagDesc: 'asdasdsad'
    },{
        id: 3,
        tagName: 'React',
        tagDesc: 'asdasdsad asdasdsa   dasdasd  sadasdasds ad asdasdsad'
    },{
        id: 4,
        tagName: 'Java',
        tagDesc: 'asdasdsad'
    },{
        id: 5,
        tagName: 'Sql',
        tagDesc: 'asdasdsad asdasdsa   dasdasd  sadasdasds ad asdasdsad'
    },{
        id: 6,
        tagName: 'Node',
        tagDesc: 'asdasdsad'
    },{
        id: 7,
        tagName: 'C',
        tagDesc: 'asdasdsad'
    },{
        id: 8,
        tagName: 'C++',
        tagDesc: 'asdasdsad'
    },{
        id: 9,
        tagName: 'Javascript',
        tagDesc: 'asdasdsad asdasdsa   dasdasd  sadasdasds ad asdasdsad'
    },{
        id: 10,
        tagName: 'html5',
        tagDesc: 'asdasdsad'
    }]

    return (
    <div>
        <div className="homeContainer1">
            <LeftSidebar />
            <div className="homeContainer2">
                <h1 className='tagsH1'>Tags</h1>
                <p className='tagsP'>A tag is a keyword or label that categorizes your question with other, similar questions.</p>
                <p className='tagsP'>Using the right tags makes it easier for others to find and answer your quesion.</p>

                <div className="tagsListContainer">
                    {
                        tagsList.map((tag) => (
                            <TagsList tag={tag} key={tag.id}/>
                        ))
                    }
                </div>

            </div>
        </div>
    </div>
  )
}

export default Tags