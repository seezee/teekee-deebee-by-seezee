---
layout: _main.njk
title: Recipe Index
---

<!-- markdownlint-disable MD025 -->
# {{ title }}
<!-- markdownlint-disable MD025 -->

<div class="col-3">
  <ul class="index">
    {%- for post in collections.recipesAscending -%}
      <li{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></li>
    {%- endfor -%}
  </ul>
</div>
