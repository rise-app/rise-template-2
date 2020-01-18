// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/site/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
  {
    title: 'FAQ',
    slug: 'faq',
    html: `
      <p>
      Got a question? We’ve got answers. For simple solutions, check out the answers below. For stickier situations, submit a support request to your TAM.
      </p>
		`,
  },
  {
    title: 'Customer Service',
    slug: 'service',
    html: `
        <p>Customer Service</p>
		`,
  },
  {
    title: 'Returns & Exchanges',
    slug: 'returns',
    html: `
        <p>Returns</p>
		`,
  },
  {
    title: 'Product Support',
    slug: 'support',
    html: `
        <p>Product Support</p>
		`,
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy',
    html: `
        <p>Privacy Policy</p>
		`,
  },
]

posts.forEach(post => {
  post.html = post.html.replace(/^\t{3}/gm, '')
})

export default posts
