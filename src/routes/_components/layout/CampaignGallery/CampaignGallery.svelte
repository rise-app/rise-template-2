<script>
  import Campaign from './Campaign.svelte'
  export let
    campaign = {},
    featured_campaigns_query,
    featured_campaigns,
    featured_campaigns_total,
    featured_campaigns_offset,
    featured_campaigns_limit,

    campaign_adjacent_one,
    campaign_adjacent_two

  if (!campaign_adjacent_one && featured_campaigns.length > 3) {
    campaign_adjacent_one = featured_campaigns[3]
  }

  if (!campaign_adjacent_two && featured_campaigns.length > 4) {
    campaign_adjacent_two = featured_campaigns[4]
  }

</script>

<style type="text/scss">
  @import "../../../../theme/variables";

  .carousel-item {
    height: 580px;
    max-height: 580px;
    background: $gray-300;
    position: relative;

    .title {
      height: 100px;
      top: 50%;
      position: absolute;
      width: 100%;
      text-align: center;

      font-size: 2rem;
      font-weight: 700;
    }

    .buttons {
      top: calc(50% + 100px);
      position: absolute;
      width: 100%;
      text-align: center;
    }
  }

  .adjacent {

    &.adjacent--one {
      position: relative;
      margin-bottom: 20px;
      height: 370px;
      background: $gray-300;
    }

    &.adjacent--two {
      position: relative;
      margin-top: 20px;
      height: 190px;
      background: $gray-300;
    }

    .title {
      height: 75px;
      top: 50%;
      position: absolute;
      width: 100%;
      text-align: center;

      font-size: 1.5rem;
      font-weight: 700;
    }

    .buttons {
      top: calc(50% + 75px);
      position: absolute;
      width: 100%;
      text-align: center;
    }
  }

</style>

<div class="container">
  <div class="row mt-5">
    <div class="col-sm-12 { campaign_adjacent_one ? 'col-md-8' : ''} mb-5">
      <div id="carouselCampaignGallery" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          {#each featured_campaigns as slide, i (slide.collection_uuid)}
          <li data-target="#carouselCampaignGallery" data-slide-to="{i}"></li>
          {:else}
          <li data-target="#carouselCampaignGallery" data-slide-to="0" class="active"></li>
          {/each}
        </ol>
        <div class="carousel-inner">
          {#each featured_campaigns as slide, i (slide.collection_uuid)}
            <div class="carousel-item active">
              <Campaign campaign={slide} />
            </div>
          {:else}
            <div class="carousel-item active">
              <div class="title">
                Opps, add campaigns to campaign "{campaign.collection_handle || campaign.handle}".
              </div>
              <div class="buttons">
                <a
                  href="/shop"
                  class="btn btn-primary"
                >
                  Shop Now
                </a>
              </div>
              <img class="d-block w-100" alt="campaign.image_primary">
            </div>
          {/each}
        </div>
      <a class="carousel-control-prev" href="#carouselCampaignGallery" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselCampaignGallery" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
    {#if campaign_adjacent_one}
      <div class="col-sm-12 col-md-4 mb-5">
        <div class="adjacent adjacent--one">
          {#if campaign_adjacent_one}
            <Campaign campaign={campaign_adjacent_one} />
          {/if}
        </div>
        <div class="adjacent adjacent--two">
          {#if campaign_adjacent_two}
            <Campaign campaign={campaign_adjacent_two} />
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
