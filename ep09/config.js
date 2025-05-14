export default {
    build: {
        contents: 'contents',
        pages: 'pages',
        dist: 'dist',
        contenstsSlug: 'post',
        assets: 'assets',
    },
    site: { title: 'My Blog!!!', author: 'taewon' },
    updatePost(post) {
        post.created_at = post.created_at.toLocaleDateString();
        return post;
    },
};
