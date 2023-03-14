import { useLocation } from 'react-router-dom';
import './News.scss'
// CkEditor
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

function News() {
    const { state } = useLocation();
    console.log(state);
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
                                            <>
                                                <span className='mx-1 p-1 border'>
                                                    {value.serviceCode}
                                                </span>
                                            </>
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
                        <CKEditor
                            editor={Editor}
                            config={
                                {
                                    toolbar: [undefined]
                                }
                            }
                            data={state.content}
                            disabled={true}
                        />
                    </div>
                </div>

            </div>
        </div>
    </>);
}

export default News;