<script context="module">
  import { brand } from 'config'
  export function preload({ params, query }) {
    return this.fetch(`help.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts }
      })
  }
</script>

<script>
  export let posts
</script>

<svelte:head>
  <title>Help • { brand.name }</title>
</svelte:head>

<div class="site-page">
  <div class="container page">
    <div class="row justify-content-center mt-5">
      <div class="col-sm-12 col-md-9">
        <h1>{ brand.name } Help</h1>

        <ul>
          {#each posts as post}
            <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
            <li>
              <a rel="prefetch" href="help/{post.slug}">
                {post.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
