export default function Animal() {
    return (
        <br />
    );

    // Todos animais já cadastrados serão renderizados em tempo de build
    // novos animais serão renderizados na primeira chamada deles (ISR - Incremental
    // Server Rendering)
    async function getStaticPaths() {
        // Call an external API endpoint to get data
        const res = await fetch('http://.../animais/')
        const animais = await res.json()

        // Get the paths we want to pre-render based on posts
        const paths = animais.map((animal) => ({
            params: { id: animal.id },
        }))

        return { paths, fallback: 'blocking' }
    }

    // This also gets called at build time
    async function getStaticProps({ params }) {
        // params contains the post `id`.
        // If the route is like /posts/1, then params.id is 1
        const res = await fetch(`https://.../posts/${params.id}`)
        const animal = await res.json()

        // Pass post data to the page via props
        return {
            props: { animal },
            // Re-generate the post at most once per second
            // if a request comes in
            revalidate: 1,
        }
    }

}