const ErrorMessage = ({error}) => {
    return ( 
        <div className="border-2 rounded-md px-3 py-2 my-3 border-red-600">
            <h5 className="text-red-500 text-lg mb-2">Something went wrong :(</h5>
            <p className="font-light text-sm tracking-tight">Error: {error}</p>
        </div>
     );
}
 
export default ErrorMessage;