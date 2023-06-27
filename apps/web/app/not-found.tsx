import Link from 'next/link'

const NotFoundPage = () => {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <p>
                View <Link href="/">home</Link>
            </p>
        </div>
    )
}

export default NotFoundPage