---
layout: _main.njk
title: Recipe Index
eleventyExcludeFromCollections: true
---

<!-- markdownlint-disable MD025 -->
# {{ title }}
<!-- markdownlint-disable MD025 -->

<!-- markdownlint-disable MD012 -->
{% callout "a note on the recipes" %}
<!-- markdownlint-enable MD012 -->

  Most of the recipes are based on Smuggler's Cove's adaptations, regardless of the source. However, we have made minor changes to some proportions, most notably changing the ratio of grapefruit juice to cinnamon syrup from 1:1 to 2:1 in recipes that would have originally called for Donn's Mix; this matches the ratio Don the Beachcomber would have deployed.

  You are free to change portions and proportions to suit your own stamina and taste.

{% endcallout %}

<div class="col-3">
  <dl class="recipe-index">
    <dt>A</dt>
    {%- for post in collections.recipesAscendingA -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>B</dt>
    {%- for post in collections.recipesAscendingB -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>C</dt>
    {%- for post in collections.recipesAscendingC -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>D</dt>
    {%- for post in collections.recipesAscendingD -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>E</dt>
    {%- for post in collections.recipesAscendingE -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>F</dt>
    {%- for post in collections.recipesAscendingF -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>G</dt>
    {%- for post in collections.recipesAscendingG -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>H</dt>
    {%- for post in collections.recipesAscendingH -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt>I</dt>
    {%- for post in collections.recipesAscendingI -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%} -->
    <dt>J</dt>
    {%- for post in collections.recipesAscendingJ -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>K</dt>
    {%- for post in collections.recipesAscendingK -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>L</dt>
    {%- for post in collections.recipesAscendingL -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>M</dt>
    {%- for post in collections.recipesAscendingM -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>N</dt>
    {%- for post in collections.recipesAscendingN -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt>O</dt>
    {%- for post in collections.recipesAscendingO -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%} -->
    <dt>P</dt>
    {%- for post in collections.recipesAscendingP -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt>Q</dt>
    {%- for post in collections.recipesAscendingQ -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%} -->
    <dt>R</dt>
    {%- for post in collections.recipesAscendingR -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>S</dt>
    {%- for post in collections.recipesAscendingS -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>T</dt>
    {%- for post in collections.recipesAscendingT -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>U</dt>
    {%- for post in collections.recipesAscendingU -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt>V</dt>
    {%- for post in collections.recipesAscendingV -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>W</dt>
    {%- for post in collections.recipesAscendingW -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>X</dt>
    {%- for post in collections.recipesAscendingX -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt>Y</dt>
    {%- for post in collections.recipesAscendingY -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%} -->
    <dt>Z</dt>
    {%- for post in collections.recipesAscendingZ -%}
      <dd{% if page.url == post.url %} aria-current="page"{% endif %}><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
  </dl>
</div>
