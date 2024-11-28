---
layout: _main.njk
excerpt: Index of syrups, batters, mixes, and other preparations for exotic (tiki) drinks
---

<!-- markdownlint-disable MD025 -->
# Syrups & Mixes Index
<!-- markdownlint-disable MD025 -->

<div class="col-3" data-pagefind-ignore>
  <ul class="index">
    {%- for post in collections.mixesAscending -%}
      <li{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></li>
    {%- endfor -%}
  </ul>
</div>
