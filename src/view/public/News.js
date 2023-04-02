import { useLocation } from 'react-router-dom';
import './News.scss'

function News() {
    const { state } = useLocation();
    return (<>
        <div className="news p-5">
            <div className='row py-5'>
                <h1 className='text-center'>{state.title}</h1>
                <div className='row justify-content-center'>
                    <div className='col-auto '>
                        <h6>Tag:
                            {
                                state.services
                                    ?
                                    <>
                                        {state.services.map((value, index) =>
                                            <span className='mx-1 p-1 border' key={value.id}>
                                                {value.serviceCode}
                                            </span>
                                        )}
                                    </>
                                    :
                                    <>
                                        <span className='mx-1 p-1 border'>
                                            None
                                        </span>
                                    </>
                            }
                        </h6>
                    </div>
                    <div className='col-auto'>
                        <h6>
                            Publish Date: {state.publishDate.split('T')[0]}
                        </h6>
                    </div>
                </div>
                <div className='row my-5'>
                    <div className="ckeditor ">
                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: state.content }}></div>

                    </div>
                </div>

            </div>
        </div>
    </>);
}

export default News;