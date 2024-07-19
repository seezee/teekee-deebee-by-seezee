---
layout: _main.njk
title: Recipe Index
---

<!-- markdownlint-disable MD025 -->
# {{ title }}
<!-- markdownlint-disable MD025 -->

<!-- markdownlint-disable MD012 -->
{% callout "a note on the recipes" %}
<!-- markdownlint-enable MD012 -->

  Most of the recipes are based on Smuggler's Cove's adaptations, regardless of the source. However, we have made minor changes to some proportions, most notably changing the ratio of grapefruit juice to cinnamon syrup from 1:1 to 2:1 in recipes that would have originally called for Donn's Mix to match the ratio Don the Beachcomber would have deployed.

  You are free to change portions and proportions to suit your own stamina and taste.

{% endcallout %}

<div class="col-2">
  <ul class="index">
    {%- for post in collections.recipesAscending -%}
      <li{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></li>
    {%- endfor -%}
  </ul>
</div>
