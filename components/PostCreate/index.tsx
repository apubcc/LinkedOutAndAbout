import { MouseEvent } from "react";

export default function PostCreate(props : { show: boolean, setShow: Function }) {
    const { show, setShow } = props;

    function handleCancelOnClick() {
        setShow(true);
    }

    function handleSubmitOnClick(e: any) {
        e.preventDefault();
    }

    return (
        <>
            {show &&
                <div 
                    className="formCreate absolute h-screen w-screen top-0 left-0 flex items-center justify-center"
                    onClick={() => handleCancelOnClick()}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        className="formCard flex flex-col w-[50%] bg-white/30 rounded-xl p-10"
                    >
                        <div className="formTitle ">Post</div>
                        <form>
                            <textarea 
                                name="postContent"  
                                id="postContent" 
                                cols={30} 
                                rows={10}
                            />
                            <div className="formButton">    
                                <button onClick={() => handleCancelOnClick()} className="formButtonCancel px-8 py-3 text-lg bg-[red]">Cancel</button>
                                <button onClick={(e) => handleSubmitOnClick(e)} className="formButtonSubmit px-8 py-3 text-lg bg-[red]">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}