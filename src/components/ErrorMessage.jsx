const ErrorMessage = ({error}) => {
    return ( 
        <div className="error">
            <h5 className="error-title mb-2">Something went wrong :(</h5>
            <p className="error-text">Error: {error}</p>
        </div>
     );
}
 
export default ErrorMessage;