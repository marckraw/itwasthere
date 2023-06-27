'use client'

const GlobalErrorPage = ({
                             error,
                             reset,
                         }: {
    error: Error
    reset: () => void
}) => {
    return (
        <html>
        <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
        </body>
        </html>
    )
}

export default GlobalErrorPage