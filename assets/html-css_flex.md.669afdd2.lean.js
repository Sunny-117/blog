import{_ as n,o as a,c as l,a as p}from"./app.f9cf8683.js";const o="/blog/assets/2024-04-15-16-29-04.a6a9af91.png",e="/blog/assets/2024-04-15-16-29-22.7bb9f883.png",t="/blog/assets/2024-04-15-16-30-16.8834c182.png",c="/blog/assets/2024-04-15-16-32-00.7b8a2c55.png",r="/blog/assets/2024-04-15-16-32-46.4ffe7e55.png",B="/blog/assets/2024-04-15-16-33-30.53b81e69.png",y="/blog/assets/2024-04-15-16-34-19.29fd84eb.png",F="/blog/assets/2024-04-15-16-37-04.e38b03b0.png",i="/blog/assets/2024-04-15-16-38-36.b5c1eb05.png",A="/blog/assets/2024-04-15-16-38-54.d9fefeed.png",d="/blog/assets/2024-04-15-16-40-03.8b67fcb7.png",b="/blog/assets/2024-04-15-16-40-30.c5b0dc7e.png",u="/blog/assets/2024-04-15-16-40-38.28de0ed4.png",x="/blog/assets/2024-04-15-16-41-42.7d56b4af.png",g="/blog/assets/2024-04-15-16-42-00.7e19cb0b.png",k=JSON.parse('{"title":"一文搞懂 flex:0,1,auto,none","description":"","frontmatter":{},"headers":[{"level":2,"title":"flex 属性介绍","slug":"flex-属性介绍","link":"#flex-属性介绍","children":[{"level":3,"title":"flex-grow","slug":"flex-grow","link":"#flex-grow","children":[]},{"level":3,"title":"flex-shrink","slug":"flex-shrink","link":"#flex-shrink","children":[]},{"level":3,"title":"flex-basis","slug":"flex-basis","link":"#flex-basis","children":[]}]},{"level":2,"title":"flex 缩写的等值","slug":"flex-缩写的等值","link":"#flex-缩写的等值","children":[{"level":3,"title":"flex: initial","slug":"flex-initial","link":"#flex-initial","children":[]},{"level":3,"title":"适用场景","slug":"适用场景","link":"#适用场景","children":[]},{"level":3,"title":"flex:0 和 flex:none","slug":"flex-0-和-flex-none","link":"#flex-0-和-flex-none","children":[]},{"level":3,"title":"适用场景 flex-0","slug":"适用场景-flex-0","link":"#适用场景-flex-0","children":[]},{"level":3,"title":"适用场景 flex-none","slug":"适用场景-flex-none","link":"#适用场景-flex-none","children":[]},{"level":3,"title":"flex:1 和 flex:auto","slug":"flex-1-和-flex-auto","link":"#flex-1-和-flex-auto","children":[]}]}],"relativePath":"html-css/flex.md","lastUpdated":1740908463000}'),f={name:"html-css/flex.md"};function m(h,s,v,C,D,E){return a(),l("div",null,s[0]||(s[0]=[p('<h1 id="一文搞懂-flex-0-1-auto-none" tabindex="-1">一文搞懂 flex:0,1,auto,none <a class="header-anchor" href="#一文搞懂-flex-0-1-auto-none" aria-hidden="true">#</a></h1><h2 id="flex-属性介绍" tabindex="-1">flex 属性介绍 <a class="header-anchor" href="#flex-属性介绍" aria-hidden="true">#</a></h2><p>首先， flex 属性其实是一种简写，是 flex-grow ， flex-shrink 和 flex-basis 的缩写形式。 默认值为 0 1 auto 。后两个属性可选。</p><h3 id="flex-grow" tabindex="-1">flex-grow <a class="header-anchor" href="#flex-grow" aria-hidden="true">#</a></h3><p>flex-grow 属性定义项目的放大比例，默认为 0 ，即如果存在剩余空间，也不放大。 如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间（如果有的话）。 如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。</p><p><img src="'+o+'" alt=""></p><h3 id="flex-shrink" tabindex="-1">flex-shrink <a class="header-anchor" href="#flex-shrink" aria-hidden="true">#</a></h3><p>flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。 如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。 如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。</p><p><img src="'+e+'" alt=""></p><h3 id="flex-basis" tabindex="-1">flex-basis <a class="header-anchor" href="#flex-basis" aria-hidden="true">#</a></h3><p>flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。 浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。 它可以设为跟 width 或 height 属性一样的值（比如 350px），则项目将占据固定空间。</p><h2 id="flex-缩写的等值" tabindex="-1">flex 缩写的等值 <a class="header-anchor" href="#flex-缩写的等值" aria-hidden="true">#</a></h2><p>了解了三个属性各自的含义之后，可以看下三个属性对应的等值。</p><p><img src="'+t+'" alt=""></p><h3 id="flex-initial" tabindex="-1">flex: initial <a class="header-anchor" href="#flex-initial" aria-hidden="true">#</a></h3><p>flex:initial 等同于设置 flex: 0 1 auto ，是 flex 属性的默认值。</p><p>举例，外容器是红色，内里元素蓝色边框，比较少，会有下图效果，剩余空间仍有保留。剩余空间有，但是因为 flex-grow 属性是 0，所以没有填补空白。</p><p><img src="'+c+`" alt=""></p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;container&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;item&quot;</span><span style="color:#ABB2BF;">&gt;嘿嘿&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;item&quot;</span><span style="color:#ABB2BF;">&gt;哈哈&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#D19A66;">.container</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    width: </span><span style="color:#D19A66;">200</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    display: </span><span style="color:#D19A66;">flex</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    border: </span><span style="color:#D19A66;">2</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">dashed</span><span style="color:#ABB2BF;"> crimson;</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#D19A66;">.container</span><span style="color:#C678DD;"> </span><span style="color:#D19A66;">.item</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    border: </span><span style="color:#D19A66;">2</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">solid</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">blue</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#B392F0;">&lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;container&quot;</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  &lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;item&quot;</span><span style="color:#B392F0;">&gt;嘿嘿&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  &lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;item&quot;</span><span style="color:#B392F0;">&gt;哈哈&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">&lt;</span><span style="color:#FFAB70;">style</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  .container {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">width</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">200px</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">display</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">flex</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">border</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">2px </span><span style="color:#79B8FF;">dashed</span><span style="color:#F8F8F8;"> </span><span style="color:#79B8FF;">crimson</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">  .container .item {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">border</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">2px </span><span style="color:#79B8FF;">solid</span><span style="color:#F8F8F8;"> </span><span style="color:#79B8FF;">blue</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  }</span></span>
<span class="line"><span style="color:#B392F0;">&lt;/</span><span style="color:#FFAB70;">style</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>如果子项内容很多，由于 flex-shrink:1 ，因此，会缩小，表现效果就是文字换行，效果如下图所示。</p><p><img src="`+r+'" alt=""></p><h3 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-hidden="true">#</a></h3><p><code>initial</code> 表示 CSS 属性的初始值，通常用来还原已经设置的 CSS 属性。因此日常开发不会专门设置 flex:initial 声明。flex:initial 声明适用于下图所示的布局效果。</p><p><img src="'+B+'" alt=""></p><p>上图所示的布局效果常见于按钮、标题、小图标等小部件的排版布局，因为这些小部件的宽度都不会很宽，水平位置的控制多使用 justify-content 和 margin-left:auto/margin-right:auto 实现。</p><p>除了上图所示的布局效果外， flex:initial 声明还适用于一侧内容宽度固定，另外一侧内容宽度任意的两栏自适应布局场景，布局轮廓如图下图所示（点点点表示文本内容）。</p><p><img src="'+y+`" alt=""></p><p>此时，无需任何其他 Flex 布局相关的 CSS 设置，只需要容器元素设置 display:flex 即可。</p><p><strong>总结下就是那些希望元素尺寸收缩，同时元素内容万一较多又能自动换行的场景可以不做任何 flex 属性设置。</strong></p><h3 id="flex-0-和-flex-none" tabindex="-1">flex:0 和 flex:none <a class="header-anchor" href="#flex-0-和-flex-none" aria-hidden="true">#</a></h3><p>flex:0 等同于设置 flex: 0 1 0% 。</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;container&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;item&quot;</span><span style="color:#ABB2BF;">&gt;嘿嘿&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;item&quot;</span><span style="color:#ABB2BF;">&gt;哈哈&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#D19A66;">.container</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    width: </span><span style="color:#D19A66;">200</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    display: </span><span style="color:#D19A66;">flex</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    border: </span><span style="color:#D19A66;">2</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">dashed</span><span style="color:#ABB2BF;"> crimson;</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#D19A66;">.container</span><span style="color:#C678DD;"> </span><span style="color:#D19A66;">.item</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    border: </span><span style="color:#D19A66;">2</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">solid</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">blue</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    flex: </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#B392F0;">&lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;container&quot;</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  &lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;item&quot;</span><span style="color:#B392F0;">&gt;嘿嘿&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  &lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;item&quot;</span><span style="color:#B392F0;">&gt;哈哈&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">&lt;</span><span style="color:#FFAB70;">style</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  .container {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">width</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">200px</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">display</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">flex</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">border</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">2px </span><span style="color:#79B8FF;">dashed</span><span style="color:#F8F8F8;"> </span><span style="color:#79B8FF;">crimson</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">  .container .item {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">border</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">2px </span><span style="color:#79B8FF;">solid</span><span style="color:#F8F8F8;"> </span><span style="color:#79B8FF;">blue</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">flex</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">0</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  }</span></span>
<span class="line"><span style="color:#B392F0;">&lt;/</span><span style="color:#FFAB70;">style</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>flex:none 等同于设置 flex: 0 0 auto 。只是把 css 中的 flex 属性设置为 none ，不再展示代码。</p><p><img src="`+F+'" alt=""></p><p><strong>对比看来可以看到 flex-0 时候会表现为最小内容宽度，会将高度撑高（当前没有设置高度，如果设置高度文字会超过设置的高度，如下图）flex-none 时候会表现为最大内容宽度，字数过多时候会超过容器宽度。</strong></p><p><img src="'+i+'" alt=""></p><h3 id="适用场景-flex-0" tabindex="-1">适用场景 flex-0 <a class="header-anchor" href="#适用场景-flex-0" aria-hidden="true">#</a></h3><p>由于应用了 flex:0 的元素表现为最小内容宽度，因此，适合使用 flex:0 的场景并不多。</p><p><img src="'+A+`" alt=""></p><p>其中上图左侧部分的矩形表示一个图像，图像下方会有文字内容不定的描述信息，此时，左侧内容就适合设置 flex:0 ，这样，无论文字的内容如何设置，左侧内容的宽度都是图像的宽度。</p><h3 id="适用场景-flex-none" tabindex="-1">适用场景 flex-none <a class="header-anchor" href="#适用场景-flex-none" aria-hidden="true">#</a></h3><p>flex-none 比 flex-0 的适用场景多，如<strong>内容文字固定不换行，宽度为内容宽度</strong>就适用该属性。</p><p>没设置 flex-none 代码如下：</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;aa&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">img</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">src</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;a.png&quot;</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">p</span><span style="color:#ABB2BF;">&gt;右侧按钮没有设置flex-none&lt;/</span><span style="color:#E06C75;">p</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">button</span><span style="color:#ABB2BF;">&gt;按钮&lt;/</span><span style="color:#E06C75;">button</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#D19A66;">.aa</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    width: </span><span style="color:#D19A66;">300</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    border: </span><span style="color:#D19A66;">1</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">solid</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">#000</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    display: </span><span style="color:#D19A66;">flex</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#D19A66;">.aa</span><span style="color:#C678DD;"> </span><span style="color:#E06C75;">img</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    width: </span><span style="color:#D19A66;">100</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    height: </span><span style="color:#D19A66;">100</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#D19A66;">.aa</span><span style="color:#C678DD;"> buttton</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    height: </span><span style="color:#D19A66;">50</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    align-self: </span><span style="color:#D19A66;">center</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#B392F0;">&lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;aa&quot;</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  &lt;</span><span style="color:#FFAB70;">img</span><span style="color:#B392F0;"> src</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;a.png&quot;</span><span style="color:#B392F0;"> /&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  &lt;</span><span style="color:#FFAB70;">p</span><span style="color:#B392F0;">&gt;右侧按钮没有设置flex-none&lt;/</span><span style="color:#FFAB70;">p</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  &lt;</span><span style="color:#FFAB70;">button</span><span style="color:#B392F0;">&gt;按钮&lt;/</span><span style="color:#FFAB70;">button</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">&lt;</span><span style="color:#FFAB70;">style</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  .aa {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">width</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">300px</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">border</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">1px </span><span style="color:#79B8FF;">solid</span><span style="color:#F8F8F8;"> #000</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">display</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">flex</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">  .aa </span><span style="color:#FFAB70;">img</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">width</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">100px</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">height</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">100px</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">  .aa buttton {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">height</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">50px</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">align-self</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">center</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  }</span></span>
<span class="line"><span style="color:#B392F0;">&lt;/</span><span style="color:#FFAB70;">style</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><img src="`+d+`" alt=""></p><h3 id="flex-1-和-flex-auto" tabindex="-1">flex:1 和 flex:auto <a class="header-anchor" href="#flex-1-和-flex-auto" aria-hidden="true">#</a></h3><p>flex:1 时代码如下</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;container&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;item&quot;</span><span style="color:#ABB2BF;">&gt;嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;item&quot;</span><span style="color:#ABB2BF;">&gt;哈哈&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;item&quot;</span><span style="color:#ABB2BF;">&gt;呵呵&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#D19A66;">.container</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    width: </span><span style="color:#D19A66;">200</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    display: </span><span style="color:#D19A66;">flex</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    border: </span><span style="color:#D19A66;">2</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">dashed</span><span style="color:#ABB2BF;"> crimson;</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#D19A66;">.container</span><span style="color:#C678DD;"> </span><span style="color:#D19A66;">.item</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    border: </span><span style="color:#D19A66;">2</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">solid</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">blue</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    flex: </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#B392F0;">&lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;container&quot;</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  &lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;item&quot;</span><span style="color:#B392F0;">&gt;嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  &lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;item&quot;</span><span style="color:#B392F0;">&gt;哈哈&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  &lt;</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;"> class</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">&quot;item&quot;</span><span style="color:#B392F0;">&gt;呵呵&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">&lt;/</span><span style="color:#FFAB70;">div</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">&lt;</span><span style="color:#FFAB70;">style</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  .container {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">width</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">200px</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">display</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">flex</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">border</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">2px </span><span style="color:#79B8FF;">dashed</span><span style="color:#F8F8F8;"> </span><span style="color:#79B8FF;">crimson</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">  .container .item {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">border</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">2px </span><span style="color:#79B8FF;">solid</span><span style="color:#F8F8F8;"> </span><span style="color:#79B8FF;">blue</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">flex</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">1</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  }</span></span>
<span class="line"><span style="color:#B392F0;">&lt;/</span><span style="color:#FFAB70;">style</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><img src="`+b+'" alt=""></p><p><img src="'+u+'" alt=""></p><p>虽然都是充分分配容器的尺寸，但是 flex:1 的尺寸表现更为内敛（优先牺牲自己的尺寸）， flex:auto 的尺寸表现则更为霸道（优先扩展自己的尺寸）。</p><h4 id="适合使用-flex-1-的场景" tabindex="-1">适合使用 flex:1 的场景 <a class="header-anchor" href="#适合使用-flex-1-的场景" aria-hidden="true">#</a></h4><p>当希望元素充分利用剩余空间，同时不会侵占其他元素应有的宽度的时候，适合使用 flex:1 ，这样的场景在 Flex 布局中非常的多。</p><p>例如所有的等分列表，或者等比例列表都适合使用 flex:1 或者其他 flex 数值，适合的布局效果轮廓如下图所示。</p><p><img src="'+x+'" alt=""></p><h4 id="适合使用-flex-auto-的场景" tabindex="-1">适合使用 flex:auto 的场景 <a class="header-anchor" href="#适合使用-flex-auto-的场景" aria-hidden="true">#</a></h4><p>当希望元素充分利用剩余空间，但是各自的尺寸按照各自内容进行分配的时候，适合使用 flex:auto 。例如导航栏。整体设置为 200px，内部设置 flex:auto,会自动按照内容比例进行分配宽度。</p><p><img src="'+g+'" alt=""></p>',58)]))}const _=n(f,[["render",m]]);export{k as __pageData,_ as default};
