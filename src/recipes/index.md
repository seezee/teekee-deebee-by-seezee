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

  Most of the recipes are based on Smuggler's Cove's adaptations, regardless of the source. However, we have made minor changes to some proportions. Most notably, we changed the ratio of grapefruit juice to cinnamon syrup from 1:1 to 2:1 in recipes that would have originally called for Donn's Mix; this matches the ratio Don the Beachcomber would have deployed.

  You are free to change portions and proportions to suit your own stamina and taste.

{% endcallout %}

<div class="col-3">
  <dl class="recipe-index">
    <dt id="a">A</dt>
    {%- for post in collections.recipesAscendingA -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="b">B</dt>
    {%- for post in collections.recipesAscendingB -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="c">C</dt>
    {%- for post in collections.recipesAscendingC -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="d">D</dt>
    {%- for post in collections.recipesAscendingD -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="e">E</dt>
    {%- for post in collections.recipesAscendingE -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="f">F</dt>
    {%- for post in collections.recipesAscendingF -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="g">G</dt>
    {%- for post in collections.recipesAscendingG -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="h">H</dt>
    {%- for post in collections.recipesAscendingH -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt id="i">I</dt>
    {%- for post in collections.recipesAscendingI -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%} -->
    <dt id="j">J</dt>
    {%- for post in collections.recipesAscendingJ -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="k">K</dt>
    {%- for post in collections.recipesAscendingK -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="l">L</dt>
    {%- for post in collections.recipesAscendingL -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="m">M</dt>
    {%- for post in collections.recipesAscendingM -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="n">N</dt>
    {%- for post in collections.recipesAscendingN -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt id="o">O</dt>
    {%- for post in collections.recipesAscendingO -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%} -->
    <dt id="p">P</dt>
    {%- for post in collections.recipesAscendingP -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="q">Q</dt>
    {%- for post in collections.recipesAscendingQ -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="r">R</dt>
    {%- for post in collections.recipesAscendingR -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="s">S</dt>
    {%- for post in collections.recipesAscendingS -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="t">T</dt>
    {%- for post in collections.recipesAscendingT -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="u">U</dt>
    {%- for post in collections.recipesAscendingU -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt id="v">V</dt>
    {%- for post in collections.recipesAscendingV -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%} -->
    <dt id="w">W</dt>
    {%- for post in collections.recipesAscendingW -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt id="x">X</dt>
    {%- for post in collections.recipesAscendingX -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="y">Y</dt>
    {%- for post in collections.recipesAscendingY -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%} -->
    <dt id="z">Z</dt>
    {%- for post in collections.recipesAscendingZ -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
  </dl>
</div>
