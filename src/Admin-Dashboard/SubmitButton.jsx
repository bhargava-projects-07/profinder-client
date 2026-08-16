
import { useEffect } from "react";

const SubmitButton = ({ isSubmitting,setIsSubmitting,btnLable,submitForm }) => {

    const callSubmitForm = async () => {
        setIsSubmitting(true);
    };

    useEffect(()=>{
        if( isSubmitting )
        {
            submitForm();
        }
    },[isSubmitting]);

    return (

        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
            <div className="col-span-full">
                <button 
                    type="button"
                    onClick={callSubmitForm} 
                    disabled={isSubmitting}
                    className={`flex flex-row items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-emerald-500'}`}
                    >
                    {isSubmitting && (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}

                    <span>{isSubmitting ? 'Saving Changes...' : btnLable}</span>
                </button>
            </div>
        </div>

    )

}

export default SubmitButton;
