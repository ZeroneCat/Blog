---
categories: blog


#published: false 
title: LaTeX学习笔记
tags: Research
mathjax: true
#excerpt: 

---

> 「工欲善其事，必先利其器。」

a.k.a. 被虐记录

<!--more-->

## Mendeley与Bibliography

通过Mendeley导出的$$\LaTeX$$ bibliography十分累赘，包含abstract, url, doi, 存储路径等等；其中url和doi，会显示在tex文档的reference里。

形如：

```
@article{Steenken2004,
author = {Steenken, Dirk and Vo{\ss}, Stefan and Stahlbock, Robert},
doi = {10.1007/3-540-26686-0_1},
isbn = {3540223282},
issn = {01716468},
journal = {Container Terminals and Automated Transport Systems: Logistics Control Issues and Quantitative Decision Support},
number = {January},
pages = {3--49},
title = { {Container terminal operation and operations research - A classification and literature review} },
url = {http://link.springer.com/article/10.1007/s00291-003-0157-z{\%}5Cnhttp://dx.doi.org/10.1007/s00291-003-0157-z},
volume = {26},
year = {2005}
}
```

显示效果如下：

![](https://ws1.sinaimg.cn/large/6380a6e5gy1ftxo1y9slkj20t4068mz7.jpg){:height="100px"}



Vim能够批量删除这些不必要的属性。

### vim: bib文件处理

[Vim](https://www.vim.org/)是Unix自带的文本编辑器，可以快捷地使用命令处理Mendeley导出的library.bib文档。

mac OS自带vim，具体步骤如下：打开terminal，输入`vim `+空格+library.bib路径，或者输入`vim`，直接把bib文件拖入terminal，就打开了这份文档。输入`i`进入insert模式，可以编辑文档内容；按esc即可输入命令。

之后很简单，输入以下命令：

```
:g/url/d
```

其中，g/url代表在文档中搜索含url的行，/d则是删除该行。

类似，输入以下命令：

```
:g/abstract/d
:g/file/d
:g/doi/d
:g/isbn/d
:g/issn/d
:g/keywords/d
```

操作结束后，通过`:wq`命令保存并关闭文件。现在，这个条目简洁了很多：

```
@article{Steenken2004,
author = {Steenken, D. and Vo{\ss}, S. and Stahlbock, R.},
journal = {OR Spectrum},
number = {January},
pages = {3--49},
title = { {Container terminal operation and operations research-a classification and literature review} },
volume = {26},
year = {2004}
}
```



**参考**

- [删除Mendeley自动导出bib中的url](http://blog.sina.com.cn/s/blog_6524a6cb0102ww4r.html)
- [在LaTeX文档里去除 Mendeley输出的URL](http://drgan.net/2013/10939/)

---

### 在LaTeX中进行引用

基本的方法：在文末插入如下代码：

```

\bibliographystyle{plain}

\bibliography{library}

```

**`\bibliography{}`中不含bib扩展名。**

以latex - bibtex - latex - latex的顺序编译4次，如果顺利的话，大概就能在文中\cite{}开始引用了。Mac上的TeXmaker需要`Edit-Refresh Bibliography`才可以自动补全。

两种不顺利的解决方案：

**不显示Bibliography**…根据stackexchange，**常见解决方案**是，删除所有\*.aux, \*.bbl等文件，然后重新编译 :cry:。

**相对路径隔得比较远**(报错：找不到bib file):

:x: \bibliography{…/resource/library} : “I couldn’t open database bibtex”

:o: \bibliography{../../resource/library}

### natbib引用格式


使用[natbib](http://ctan.math.illinois.edu/macros/latex/contrib/natbib/natbib.pdf)：`usepackage{natbib}`。

同时修改style:`\bibliographystyle{plainnat}`。

如果**报错**，例如`Bibliography not compatible with author-year citations.`

**解决方案**: 类似，删除tex与bib以外的文件，重新编译。

默认情况下，natbib命令的效果如下：

| Commands                                             | Display                                                      | Comment                |
| ---------------------------------------------------- | :----------------------------------------------------------- | ---------------------- |
| \citep{test}                                         | (author et al., 2018)                                        | textual                |
| \citet{test} or \cite{test}                          | author et al. (2018)                                         | parenthetical          |
| \citep*{test}                                        | (author, author2 and author3, 2018)                          | star \*                |
| \citep\[`para2`]; \citet\[`para2`]                   | (author et al., 2018, `para2`); author et al. (2018, `para2`) | eg. `para2`: chapter 2 |
| \citep\[`para1`][`para2`]; \citet\[`para1`][`para2`] | (`para1` author et al., 2018, `para2`); author et al. (`para1` 2018, `para2`) | eg. `para1`: see       |

在命令后加\*，例如`\citep*{test}`, `\cite*{test}`将会把author et al.换为完整的作者名单。



## 数学



### Basics: Beautiful math

- Basics: [An introduction to beautiful math on Quora](http://math-on-quora.surge.sh/#introduction)
- Vector `\mathbf{u}` $$\mathbf{u}$$
  
- 粗体: 引用bm包， 使用$$\bm u$$

- 数学字体

![](https://i.stack.imgur.com/eZdhj.png)



### 优化方程

{% highlight LaTeX %}

```
\begin{alignat*}{2}
\max~ z=  5x_1&+3x_2+x_3\\
\textup{s.t.}~~  x_1&+x_2+3x_3\leq 6\\
5x_1&+3x_2+6x_3\leq 15\\
\textup{All}&~x_i\geq 0
\end{alignat*}
```

{% endhighlight %}

$$\begin{alignat*}{2}
\max~ z=  5x_1&+3x_2+x_3\\
\text{s.t.}~~  x_1&+x_2+3x_3\leq 6\\
5x_1&+3x_2+6x_3\leq 15\\
\text{All }&~x_i\geq 0
\end{alignat*}$$

### Natations



```

\noindent
\begin{tabular}{p{0.03\textwidth}p{0.94\textwidth}}
	$ z_{ij} $ & Reservation of sub-blocks for vessels (for YTP)\\
	$ x_{ijt} $ & The number of 20-foot containers which are loaded to vessel $j$ and are assigned to sub-block $i$ in shift $t$
\end{tabular}
```



## 表格

一张表格：

```
\begin{table*}[!h]\small
	\centering
	\setlength{\extrarowheight}{1mm} 
	\caption{Waste disposal problem: distance (in miles) between locations }
	\begin{tabular}{ccc}
		\hline 
		\multirow{2}{*}{City}& \multicolumn{2}{c}{Incinerator}\\
		\cline{2-3}
		& 1& 2\\
		\hline
		1 & 30 & 5\\
		2 & 36 & 42\\
		\hline
		\multirow{2}{*}{Incinerator}& \multicolumn{2}{c}{Landfill}\\
		\cline{2-3}
		& 1& 2\\
		\hline
		1 & 5  & 8\\
		2 & 9  & 6\\
		\hline
	\end{tabular}
	\label{hmtable:1}
\end{table*}
```

![](https://ws1.sinaimg.cn/large/6380a6e5gy1fu9a2f7r97j20ds06laa5.jpg)

## 配置

### 包Package

`\usepackage[hmarginratio=1:1,top=32mm,columnsep=20pt]{geometry} % Document margins`

### 其他

`\allowdisplaybreaks` 允许公式跨页



## 屠龙术Tips

a.k.a. 没有什么用的Tips集合

### 作图：inkscape

同时作图、添加数学表达式的首选是TikZ。

但在TikZ从试图入门到放弃之后，我找到了[inkscape](https://inkscape.org/zh/)，以绘制矢量图或者在图片相应位置插入$$\LaTeX$$语句（例如注释或公式）。

Mac可通过通过homebrew下载：`brew cask install inkscape `。

Inkscape作图也很麻烦。在在线平台ProcessOn画好图后，下载svg、导入Inkscape进行调整，并生成tex。

选择`file`-`save as`-格式选择`Portable Document Format(*.pdf)`-`save`-text output option中选择`Omit text in PDF and create LaTeX file`，图片将被保存为一个pdf文档（图片部分）+pdf_tex为后缀的代码（文字部分）的组合。

最后，在tex文档中插入生成的文档：

```latex
\begin{figure}
\def\svgwidth{300px}%设置scale
\input{<filename>.pdf_tex}
\end{figure}
```

\*此处，pdf文档必须和主文件tex在同一目录下，否则会报错。

### 输入罗马数字

**大写** `\uppercase\expandafter{\romannumeral2}`  输出  II

**小写** `\romannumeral2` 输出ii

（其实可以直接输入）。