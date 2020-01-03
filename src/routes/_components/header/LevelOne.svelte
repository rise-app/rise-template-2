<script>
  // MODULES
  import { layout } from 'config'
</script>
<style type="text/scss">
  @import "../../../theme/variables";

  .header-level--1 {
    background: $gray-100;

    nav {
      height: 30px;

      .list-inline {
        margin: 0px;

        .list-inline-item {
          margin-left: $list-inline-padding;
        }
      }

    }
  }

</style>

<div class="header-level--1">
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <nav class="nav d-flex justify-content-between text-muted">
          <div class="nav-item">
            <small>{ layout.headers.callout_one.message }</small>
          </div>
          <div class="nav-item">
            <ul class="list-inline">
              {#each layout.headers.social as s, i}
                <li class="list-inline-item">
                  <a href="{s.link}">
                    <i class="fab {s.src}" title="{s.title}"></i>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</div>
