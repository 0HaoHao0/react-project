import { useLocation } from 'react-router-dom';
import './News.scss'

function News() {
    const { state } = useLocation();
    return (<>
        <div className="news p-5">
            <div className='row py-5'>
                <h1 className='text-center new-title'>{state.title}</h1>
                <hr/>
                <div className='row justify-content-center p-1'>
                    <div className='col-auto '>
                        <h6>Related Services:
                            {
                                state.services
                                    ?
                                    <>
                                        {state.services.map((value, index) =>
                                            <span className='mx-1 p-1 border fw-bolder' key={value.id}>
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
                            Publish Date:
                            <span className='new-date fw-bolder'>
                             {state.publishDate.split('T')[0]}
                            </span>
                        </h6>
                    </div>
                </div>
                <div className='row my-5'>
                    <div className="ckeditor new-ck">
                        <div className="ql-editor new-content" dangerouslySetInnerHTML={{ __html: state.content }}></div>

                    </div>
                </div>

            </div>
        </div>
    </>);
}

export default News;