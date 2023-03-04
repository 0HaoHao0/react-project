export function ErrorPage({ errorCode }) {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <h1>
                Some thing went wroong!
            </h1>
            <strong>Code: {errorCode}</strong>
        </div>
    );
}

