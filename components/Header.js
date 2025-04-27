import Head from 'next/head';
import Script from 'next/script';

export default function Header() {

    return (
        <>
        <Head>
            <title>City of Austin Community Resource Dashboard</title>
            <meta name="description" content="Find resources in Austin, TX" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/images/favicon.ico" />
        </Head>

        <Script src="https://cdn.userway.org/widget.js" data-account="jDb68IU5tq"></Script>
        </>
    )
}