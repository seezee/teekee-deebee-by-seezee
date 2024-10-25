---
layout: _main.njk
title: Recipe Index
index: true
eleventyExcludeFromCollections: true
---

<!-- markdownlint-disable MD025 -->
# {{ title }}
<!-- markdownlint-disable MD025 -->

<tiki-callout title="a note on the recipes" type="note">

  For recipes previously published in <cite>Smuggler's Cove&colon; Exotic Cocktails, Rum, and the Cult of Tiki</cite>, we reprint the Smuggler's Cove adaptation, regardless of their cited source. However, we have made minor changes to some proportions. Most notably, we changed the ratio of grapefruit juice to cinnamon syrup from 1:1 to 2:1 in recipes that would have originally called for Donn's Mix; this matches the ratio Don the Beachcomber would have deployed.

  We have adapted all other recipes to use the Smuggler's Cove rum taxonomy. For example, instead of calling for white Puerto Rican rum, we specify [blended lightly aged rum](/rums/04-rum-blended-lightly-aged/)<icon-l space="1em" class="bigger" label="(2)"><span class="with-icon"><svg class="icon"><use href="/assets/images/icons/circle-2.svg#circle-2"></use></svg></span></icon-l>.

  You are free to change portions and proportions to suit your own stamina and taste.

</tiki-callout>

<div class="col-3">
  <dl class="recipe-index">
    <dt id="a"><a href="#recipes-a" class="app-link--heading govuk-link"><span id="recipes-a">A</span></a></dt>
    {%- for post in collections.recipesAscendingA -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="b"><a href="#recipes-b" class="app-link--heading govuk-link"><span id="recipes-b">B</span></a></dt>
    {%- for post in collections.recipesAscendingB -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="c"><a href="#recipes-c" class="app-link--heading govuk-link"><span id="recipes-c">C</span></a></dt>
    {%- for post in collections.recipesAscendingC -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="d"><a href="#recipes-d" class="app-link--heading govuk-link"><span id="recipes-d">D</span></a></dt>
    {%- for post in collections.recipesAscendingD -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="e"><a href="#recipes-e" class="app-link--heading govuk-link"><span id="recipes-e">E</span></a></dt>
    {%- for post in collections.recipesAscendingE -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="f"><a href="#recipes-f" class="app-link--heading govuk-link"><span id="recipes-f">F</span></a></dt>
    {%- for post in collections.recipesAscendingF -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="g"><a href="#recipes-g" class="app-link--heading govuk-link"><span id="recipes-g">G</span></a></dt>
    {%- for post in collections.recipesAscendingG -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="h"><a href="#recipes-h" class="app-link--heading govuk-link"><span id="recipes-h">H</span></a></dt>
    {%- for post in collections.recipesAscendingH -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt id="i"><a href="#recipes-i" class="app-link--heading govuk-link"><span id="recipes-i">I</span></a></dt>
    {%- for post in collections.recipesAscendingI -%}
      {% if not (index) %}
        <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
      {% endif %}
    {%- endfor -%} -->
    <dt id="j"><a href="#recipes-j" class="app-link--heading govuk-link"><span id="recipes-j">J</span></a></dt>
    {%- for post in collections.recipesAscendingJ -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="k"><a href="#recipes-k" class="app-link--heading govuk-link"><span id="recipes-k">K</span></a></dt>
    {%- for post in collections.recipesAscendingK -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="l"><a href="#recipes-l" class="app-link--heading govuk-link"><span id="recipes-l">L</span></a></dt>
    {%- for post in collections.recipesAscendingL -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="m"><a href="#recipes-m" class="app-link--heading govuk-link"><span id="recipes-m">M</span></a></dt>
    {%- for post in collections.recipesAscendingM -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="n"><a href="#recipes-n" class="app-link--heading govuk-link"><span id="recipes-n">N</span></a></dt>
    {%- for post in collections.recipesAscendingN -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt id="o"><a href="#recipes-o" class="app-link--heading govuk-link"><span id="recipes-o">O</span></a></dt>
    {%- for post in collections.recipesAscendingO -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%} -->
    <dt id="p"><a href="#recipes-p" class="app-link--heading govuk-link"><span id="recipes-p">P</span></a></dt>
    {%- for post in collections.recipesAscendingP -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="q"><a href="#recipes-q" class="app-link--heading govuk-link"><span id="recipes-q">Q</span></a></dt>
    {%- for post in collections.recipesAscendingQ -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="r"><a href="#recipes-r" class="app-link--heading govuk-link"><span id="recipes-r">R</span></a></dt>
    {%- for post in collections.recipesAscendingR -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="s"><a href="#recipes-s" class="app-link--heading govuk-link"><span id="recipes-s">S</span></a></dt>
    {%- for post in collections.recipesAscendingS -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="t"><a href="#recipes-t" class="app-link--heading govuk-link"><span id="recipes-t">T</span></a></dt>
    {%- for post in collections.recipesAscendingT -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="u"><a href="#recipes-u" class="app-link--heading govuk-link"><span id="recipes-u">U</span></a></dt>
    {%- for post in collections.recipesAscendingU -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="v"><a href="#recipes-v" class="app-link--heading govuk-link"><span id="recipes-v">V</span></a></dt>
    {%- for post in collections.recipesAscendingV -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="w"><a href="#recipes-w" class="app-link--heading govuk-link"><span id="recipes-w">W</span></a></dt>
    {%- for post in collections.recipesAscendingW -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <!-- <dt id="x"><a href="#recipes-x" class="app-link--heading govuk-link"><span id="recipes-x">X</span></a></dt>
    {%- for post in collections.recipesAscendingX -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%} -->
    <dt id="y"><a href="#recipes-y" class="app-link--heading govuk-link"><span id="recipes-y">Y</span></a></dt>
    {%- for post in collections.recipesAscendingY -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
    <dt id="z"><a href="#recipes-z" class="app-link--heading govuk-link"><span id="recipes-z">Z</span></a></dt>
    {%- for post in collections.recipesAscendingZ -%}
      <dd><a href="{{ post.url }}">{{ post.data.title }}</a></dd>
    {%- endfor -%}
  </dl>
</div>
