---
layout: post
title: "ID2211 slides内容回顾"
date: 2026-05-31
topic: "研究"
tags: ["研究", "graph", "network"]
summary: "None"
---


## Lec 01

节点与连接：

Vertex(Nodes)与Edge(links)其实都是在指代点和边，只是network领域和数学领域不同的称呼习惯。

### Complexity of the networks

这里非常常见的概念是，给定节点数$N$，那么存在多少种可能的link数$M$？

计算方式非常简单：

$$
M = \frac{N(N-1)}{2}
$$

### Ramsey's number

拉姆齐数$R(r,s)$就是说，现在有两种关系，$A$和$B$，$r$和$s$表示分别满足这两种关系的link的数量，我们有一个群组，群组里有$x$个人，拉姆齐数表示能够使得满足$r=s=n$个人的关系都是同一种关系不成立的最小群组人数$x$

举例来说，$R(3,3)=6$，也就是说，至少有6个人，才能保证至少存在三个人之间是相同的关系。

R(5,5)可能还能有机会算算（43-46之间），R(6,6)直接无解，因为光46个节点就已经有超多可能了：

$$
\text{number of possible  combination} =2^{\frac{46\times45}{2}} = 2^{1035}
$$

这无法通过穷举得到结果。

## Lec 02

### 超基础概念

nodes：点

links：连接点的线

neighbours：两个被相同link连接起来的节点被称为一对neighbours

graph：$G = (V,E)$



directed and undirected 方向性



weighted graph



### Node Degrees

+ 对于undirected graph来说，

  node degree就是与该点有直接连接的点的数量

  **Average Degree**：
  
  $$
  \bar{k} = \frac{1}{N}\sum^N_{i=0}k_i = \frac{2E}{N}
  $$
  
  （这里第二个等号这样理解，每个边实际上都会被计算两次，因此最终加和一定是两倍的edge值）

+ 对于directed graph来说，

  我们定义两种degree：

  + in-degree
  + out-degree

  不难发现，in和out的定义是相对的，因此一根箭头既需要被counted是出发点的out-degree，又要被counted是终点的in-degree，因此有：
  
  $$
  \bar{k}_{in} = \bar{k}_{out} = \frac{E}{N}
  $$
  
  同时：
  
  $$
  \bar{k}_{all} = \bar{k}_{in} + \bar{k}_{out} = \frac{2E}{N}
  $$
  

### Dense vs. Sparse Graphs

图的稠密与稀疏是相对模糊的概念，强烈依赖于context。

对于：

+ Undirected graph（无self-loop）：最大可能edge数为：$\frac{N(N-1)}{2}$
+ Directed graph（无self-loop）：最大可能edge数为：$\frac{N(N-1)}{2}\times2 = N(N-1)$（因为A到B和B到A算两个）

因此一般来说，Dense graph的边数接近最大可能边数。Sparse graph的边数远小于最大可能边数。

习惯上，

+ Sparse graph: $E = O(N log N)$ 

+ Dense graph: $E \text{ close to } O(N^2)$ 

### Complete graph 

指的是 undirected graph 中所有节点两两相连。它的平均 degree 是：
$$
\text{Avg. node degree} = \frac{2E}{N} = \frac{2\times\frac{N(N-1)}{2}}{N} = N-1
$$

### Bipartite Graphs

如果一个图中的节点可以分为两个子集U、V，满足：

+ edge only between U and V
+ no edge within U
+ no edge within V

那么就可以说这是一个Bipartite Graphs

**Complete bipartite graph** 指 U 中每个节点都连接 V 中每个节点。

这种结构的图在现实生活中往往出现在人和物的对应关系上，比如Authors-to-papers、Actors-to-Movies

### Adjacency Matrix

$$
\begin{align}
A_{ij} &= 1 \quad \text{if there is a link between 'i' and 'j'} \\
A_{ij} &= 0 \quad \text{otherwise}
\end{align}
$$

+ 如果图是无向图，那么它的adj matrix必然是symmetric的，即$A_{ij} = A_{ji}$

+ 而如果是有向图，那么如果把矩阵的第 i 行加起来，是从 i 出发的边。如果把第 i 列加起来，是进入 i 的边。即通过sum行或列可以找到某点的in/out-degree

+ 如果图有self-loop，那么对角线上的对应点就是1

+ 对于一个无向图，adj matrix的对角线非零元素个数 + 任意一个三角块种非零元素的个数就是edge数。

### Paths

多个node连接起来的一条路径

**simple path：**就是路径中没有重复的点

### Distances（Shortest Path）

graph中的距离使用最小距离来衡量，即连接两点的最短path中的edge数

如果两个点没有连通，那么他俩之间的距离就是无穷大

需要注意，在有向图中，计算距离是需要考虑方向的，因此$h_{A,C}$不一定等于$h_{C,A}$（所以严格意义上来说这个定义方式不能称之为距离）

### Breadth-First Search（BFS）

是用来检索某点到其他点的最短路径的：
```
distance 0: starting node
distance 1: direct neighbors
distance 2: neighbors of distance-1 nodes not seen before
distance 3: neighbors of distance-2 nodes not seen before
```

算法的直觉是，当第一次遇到某点时，获得的距离就是他俩之间的shortest path distance。

### Graph Diameters

图的半径可以用两种方式衡量：

1. Largest shortest path
2. Average of shortest paths among all the nodes

前者的问题在于对于outliers太敏感了，一旦出现一个离谱的outlier，那么就会导致一个被过高估计的diameter

后者则解决了这个问题，但是如果图不连通，有些节点之间 distance 是 infinity，这会导致计算值飞掉，所以通常的做法是不计入这些值

Average path length for **directed graph**（假设这个有向图是连通性很强的）：
$$
\bar{h} = \frac{\sum_{i,j \neq i}h_{ij}}{N(N-1)}
$$
实际上就是所有节点之间的最短路径之和 / 节点对的数量

> [!NOTE]
>
> P19有一个图可以了解一下，一个圆环的diameter是$O(N)$，一个树结构的diameter则是$O(\log N)$

通常来说小于$O(\log N)$的diameter就被认为是小的

### Cycles

简单来说就是一个首尾相连的path，拥有这种结构的图具有鲁棒性强的优点

### Connectivity

如果一个图中任意两个点组成的pair都可以有路径连接，就说这个图是connected的

如果不是 connected，就由多个（至少是两个） connected components 组成。

> [!NOTE]
>
> 参考Lec02 P21



**bridge**：

就是这样一个edge，如果去掉他，那么图就会从connected变得disconnected，同时bridge直接连接的两个点称为**articulation node**



**Local bridge**：

A and B have no common neighbors, but there exists another path from A to B

所以相当于一个局部存在的bridge



**Embeddedness of the edge**(不是那么直观，需要记忆一下):

两个点共同neighbour的数量，因此容易看出来，(local/global) bridge的embeddedness是0

> [!NOTE] 
>
> P23中提到了连通性反应在adj matrix中是怎样体现的，需要注意的是一个看似杂乱的adj matrix是可能通过一定的排列恢复成一个结构清晰的disconnected graph的范式的。

**Connectivity of Directed Graph**：

如果我们忽略有向图中的方向，此时所有点满足任意两点有路径，那么图是weakly connected的，而如果在有方向的前提下仍然能保证这点，那么是strongly connected的。



### Giant Component

Connected component 定义：

一个节点集合满足：

1. 集合内任意两个节点之间有 path
2. 它不是某个更大连通集合的一部分

换句话说整个图是一个disconnected的图，并且其中有一些connected的子图，子图就被称为component。

**Giant component** 是最大 connected component，通常包含大量节点。

现实网络中经常出现一个特别大的 component，再加上一些很小的 isolated components。



## Lec 03

### Centrality

现在我们从图的连通性走出来，观察如何来衡量一个点的重要程度，中心度Centrality就是用来衡量它的指标

#### Degree Centrality

一个自然的想法就是使用点的degree来衡量中心度：
$$
C_D(i) = k(i)
$$
以及它的normalized版本：
$$
C^*_D(i) = \frac{1}{N-1}k(i)
$$
(因为一个节点最多有N-1个edge)

但是它问题在于，degree中心度在每张图中表达的数值意义是不一样的，同时，它对图的拓扑结构信息的捕捉能力也较弱

#### Closeness Centrality

也可以考虑使用距离来表达中心程度，也被称为Closeness Centrality：
$$
C_C(i) = \frac{1}{\sum_{j\neq i}d(i,j)}
$$
因为距离越远中心度越低，因此需要变成倒数

同样也有normalized版本：
$$
C^*_C(i) = \frac{N-1}{\sum_{j\neq i}d(i,j)}
$$
因为一个图中可能存在的最远的距离就是$N-1$

同样的，由于距离的计算本身存在Infinity的可能（disconnected graph），因此这种方法也存在缺陷

补救方法是使用**Harmonic Centrality**：
$$
C_H(i) = \sum_{j\neq i} \frac{1}{d(i,j)}
$$
其实就是把sum拿到外面，这样通过一个倒数操作，不能连通的情况的数值就近似为0了，

#### Betweenness Centrality

Betweenness Centrality的直觉是，有多少个节点间的最短路径经过了你，也就是说，愈多的shortest path经过你，说明你越重要：
$$
C_B(v) = \sum_{s\neq v \neq t \in V}\frac{\sigma_{st}(v)}{\sigma_{st}}
$$
$\sigma_{st}$ 表示 s 到 t 的 shortest paths 数量
$\sigma_{st}(v)$表示 s 到 t 的 shortest paths 中经过 v 的数量

它的normalized版本是：
$$
C^*_B(v) = \frac{C_B(v)}{(n-1)(n-2)/2}
$$
实际上就是比上去掉v点后的图的最高edge数

类似的，**Edge Betweenness**就是把node换成了edge。

> [!IMPORTANT] 
>
> Lec03 P5有一张图很好的提供了这种中心度的直觉，P6中的example需要注意（重要！）

#### Finding Clusters in the network(betweenness centrality 的应用)

Girvan-Newman 是一种基于 edge betweenness 的 community detection 方法。

核心思想：

communities 内部边很多，communities 之间的 bridge edges 会出现在很多 shortest paths 上，所以 bridge edges 的 edge betweenness 高。

#### Recursive Centrality

核心思想是，节点的重要性不只是由邻居数量决定，还由邻居的重要性决定。

类似的还有**Katz centrality**考虑所有长度路径，但长路径被衰减

Eigenvector centrality 就是一种recursive centrality

？？？

#### Metrics Comparison

那么介绍了这么多的中心度计算方式，如何对比他们的效果呢。

不同 centrality measure 可能给出不同排名，有时候我们关心绝对值，有时候更关心 rank。

比如搜索结果中，Google 和 Bing 给出两个排序，怎么比较它们是否相似？答案是使用 **Kendall tau rank correlation**。

Kendall tau 比较的是 pairwise ordering。

对任意两个元素 A 和 B：

- 如果两个 ranking 都认为 A 在 B 前面，这是 concordant pair。
- 如果一个 ranking 认为 A 在 B 前面，另一个认为 B 在 A 前面，这是 discordant pair。

$$
\tau = \frac{n_c - n_d}{n(n-1)/2}
$$

nc表示所有concordant pair的数量，nd代表所有discordant pair的数量，当tau=1，说明完美吻合，当tau=-1，说明完全不吻合。

### Clustering Coefficient（朋友们也是朋友吗）

> [!NOTE]
>
> *用于衡量你的邻居之间有多大的比例也是邻居*

#### Local clustering coefficient

$$
C(v) = \frac{e(v)}{deg(v)(deg(v)-1)/2}
$$

即实际上邻居连通的edge数 / 邻居之间可能的最大edge数

#### Network average clustering coefficient

$$
\tilde{C} = \frac{1}{N}\sum^N_{i=1}C(i)
$$

这其实就是计算图中每个点的Local clustering coefficient，相加之后取平均

那么我们该如何比较一个图中存在较多的“朋友们是朋友”（即triangle）这种结构呢？答案是我们将Network average clustering coefficient与一个图中两点之间存在edge的概率相比较：
$$
\text{Compare: }P = \frac{E}{N(N-1)/2} \text{ with } \tilde{C}
$$
这里的E表示图中存在的全部edge数量，因此P的物理意义就是某图中任选两点，他俩中间有一个edge的概率。

也就是说，我们比较的是，平均来说，“每个节点的朋友们是朋友的概率”与“在（图中的连通度的情况下）茫茫人海中随便挑俩人是朋友的概率”。

如果:
$$
C(G) >> P
$$
那就说明“朋友们也是朋友”比“随机挑俩人是朋友”更靠谱，专业上说，我们认为这样的图是**clustered**的。

> [!IMPORTANT]
>
> **Bipartite graph 的 clustering coefficient 是 0，因为 bipartite graph 没有 triangle。**(其实这很显然，因为bipartite图要求每一个subset内部不可以有edge，因此无法构造一个三角形)



### Degree Distribution

Degree Distribution描述的是，随机选一个节点，它的 degree 是 k 的概率。
$$
P(K) = \frac{N_k}{N}
$$
$N$是节点总数，$N_k$自然就是degree是$k$的节点总数

## Lec 04

### 迈向真实世界

在现实中，很多网络不是 normal distribution，而是 **heavy-tailed / power-law-like (linear in loglog scale)**。

> [!Note]
>
> Lec03 P19-22 附近都是这个power law distribution的直观图，形状非常像半个normal distribution，但是有个很长的小尾巴（heavy tailed），小尾巴的部分都是一些**superpower**，也就是那种有很多link的node，这种superpower虽然数量少，但是也是存在的（hubs），大多数node的link都比较少

在MSN的例子中，我们能够了解到，在现实世界的Network中，非常容易存在一个**giant component**，并且triangle的概率很高（即clustering coefficient相对较大【在这个例子中约等于11%】）

不仅是在这个例子中，其他现实世界的例子也共同印证了他们存在的共性：

> [!IMPORTANT]
>
> Real-world networks are often: 
>
> 1. sparse, 
> 2. low diameter, 
> 3. with hubs (one giant component), 
> 4. non-random clustering (large clustering coefficient), 
> 5. power law degree distributions.

### Erdos-Renyi Random Graphs

在见识过真实世界的network之后，我们来尝试构建一个简单的network模型，这里提供两种方法：

1. $G(n,m)$模型：

   给定n个点，然后在这些点中随机安排m个edge

2. $G(n,p)$模型：

   给定n个点，然后通过一个给定的概率p来决定两点之间是否存在egde

第二种模型也被称为**Erdos-Renyi random graph**，由于这种模型使用了概率，因此他在每次提供的模型可以说是由一个概率分布采样得到的，不唯一。

+ 对于第一种模型，它的Avg. degree显然是：
  $$
  \frac{2E}{N} = \frac{2m}{n}
  $$

+ 对于Erdos-Renyi模型，它的期望Avg. degree可以这样计算：
  $$
  \frac{2E}{N} = \frac{2 \times \frac{1}{2}p(n-1)n}{n} = p(n-1)
  $$
  且它的clustering coefficient为$C \approx p$，因为显然triangle形成所需要的那个edge和任选两个点存在edge的概率一致。

#### p from 0 to 1

当 p 从 0 增加到 1，图结构会发生突变式变化。

```
p = 0: no edges all nodes isolated no giant component
p = 1: complete graph all nodes connected diameter = 1
```

中间会发生 **phase transition**。

这里发生phase transition的关键阈值是
$$
p = \frac{1}{N}
$$

+ $p < 1/N$: probability of giant component goes to 0
+ $p > 1/N$: probability of giant component goes to 1, and all other components will have size at most $\log (N)$

**这是因为在$p \sim 1/N$时，平均 degree有$p(N-1) ≈ 1$，因此这就是 giant component 出现的临界点。**

另一个阈值是：

$$
p \sim  \frac{2log(N)}{N}
$$

**这时没有 isolated nodes**。

一般来说，当 p 到 log(N)/N 量级时，isolated nodes 消失、图趋向连通。

ER graph 的 diameter 近似：

$$
\text{diameter} \approx \frac{\log(N)}{\log(d)}
$$

其中d表示average degree

#### Degree Distribution of ER model

ER模型$G(n,p)$的degree distribution实际上是一个binomial：
$$
P(k)=
\begin{pmatrix}
n-1 \\k
\end{pmatrix}
p^k(1-p)^{n-1-k}
$$
Mean：$\bar{k} = p(n-1)$

Variance：$\sigma^2 = p(1-p)(n-1)$

> [!IMPORTANT]
>
> 这里通过推导可以得到，当p固定，随着n的增大，整个分布变得更加narrow，使得更多的点落在均值附近的概率变大。换句话说，当 N 很大、p 固定时，每个节点的 degree 会高度集中在平均 degree 附近。

 #### Clustering Coefficient of ER model

回想一下我们是如何计算一个点的clustering coefficient的：
$$
C_i = \frac{e_i}{k_i(k_i-1)/2}
$$

> [!NOTE]
>
> 这里的直觉是，点i周围真实存在的triangle数量 / 身边所有朋友可能构造出的triangle数量

而在ER model中，由于两个点之间有没有连接是完全独立的，只收到p的影响，因此:
$$
C_i = p
$$
因此联上述二式得：
$$
\begin{align}
p &= \frac{e_i}{k_i(k_i-1)/2} \\

\Leftrightarrow e_i &= p\frac{k_i(k_i-1)}{2}
\end{align}
$$
带回到第一个式子，得到：
$$
C = p = \frac{\bar{k}}{n-1} \approx \frac{\bar{k}}{n}
$$
也就是说，**当average degree固定的时候（为什么要固定？因为要拟真，现实世界是sparse的，导致avg degree本来就不大），节点数n越大，clustering越少，即triangle越少**，所以从这个意义上来说ER model的clustering很弱



#### Diameter in large ER graphs

##### Intuition on Diameter Calculation

> [!NOTE]
>
> Lec04 P23，有比较完整的介绍。
>
> 基本来说就是对于一个树结构，假设root的degree是$d$，那么在第$k$次BFS搜索下，能到达的节点数量是：
> $$
> 1 + d + d^2 + \cdots + d^k \approx d^k
> $$
> 那么如果我们要问，什么时候到达$N$个node：
> $$
> N = d^k
> $$
> 取对数并通过换底公式换底得到：
> $$
> k = \log _d N = \frac{\log N}{\log d}
> $$

而当N增大时，ER model的结构与树非常类似。这是因为$C=p=k/(n-1)$，当k固定时，p趋近于0，因此整体非常类似一个树结构，因此ER model的diameter是$\frac{\log N}{\log d}$

#### Can ER model explain real-world networks?

Degree distribution ❌

Avg. Path length (Distance/Diameter) ✅

Avg. Clustering coefficient ❌

Largest connected component ✅

> [!IMPORTANT]
>
> + Degree distribution：一个是power law分布，一个是binomial分布，不吻合
> + Avg. Path length (Distance/Diameter)：两个都是很短，ER model的diameter近似$\frac{\log N}{\log d}$，吻合
> + Avg. Clustering coefficient：真实世界中的三角形分布其实很多，但是ER模型中的C=p，在保证sparse的情况下，增大n会导致p近似0（$k=p(n-1)$），不吻合
> + Largest connected component：ER model存在**phase transition**($P = \frac{1}{N}$)的现象，存在Giant Component，吻合

### Preferential Attachment Model

是一种模拟power law distribution的模型，

rich get richer，已有 degree 越高的节点，越容易获得新边；获得新边后 degree 更高，之后更容易继续获得新边。这种方式使得更加容易出现superpower

略



### Configuration Model

它的重要用途是 **null model**：

Compare real network G with random graph G' having the same degree sequence.

略

> [!NOTE]
>
> Lec04 P27很直观

### Watts-Strogatz small-world model（如何修正ER model存在的问题）

我们知道对比现实世界，ER模型一个很重要的问题在于clustering太弱，triangle太少

一个真实的世界应该同时具备以下两点特征：

+ high clustering
+ low diameter

一个著名的**Milgram送信实验**告诉我们，大概人和人之间的社交距离只有6个hop，这再次说明了真实世界中既存在很强的local连接性质，又从世界范围来说是小diameter的。

#### Construct Watts-Strogatz Small-World Model

我们依然从n个node开始：

1. 首先我们对每个点做这样的处理，每个点连接到k个它最近的邻居；
2. 然后，对每个点，按照概率p将自己之前的线重新接到随机除开自己的任意一点

> [!IMPORTANT]
>
> Lec04 P35
>
> 当p=0，图退化成没有进行第二步操作的样子，即一个简单的类似线圈的circle**【high clustering and high diameter】**
>
> 当p=1，图是一个类似ER模型的随机图（random graph）**【Low clustering and low diameter】**

**当我们调整p的时候，会发现在某些p下，能够得到low diameter和high clustering的图。**

#### Diameter of the Watts-Strogatz

这里使用了一个小的grid模型的例子，用于证明watts-strogatz的small world model的diameter也是一个对数函数，从而说明它的diameter是小的。
$$
Diameter = \log N
$$

> [!NOTE]
>
> Lec04 P39

#### 如何解释Small World中出现的一些问题

值得注意的是，在送信实验中，送信的人并不知道全球的社交关系网络，他们只有自己的local信息，并且在这种情况下，他们却能够在很小的hops成功完成任务，这背后还隐藏了一个问题，即我们依赖的不仅仅是社交网络，而是还存在对网络本身的其他标签的度量，比如职业、国籍、兴趣等。这些 labels 形成某种 metric space，使得人可以根据目标 label 选择“看起来更接近目标”的朋友。

**因此，根据这个逻辑，存在很多labeling spaces，并且是可以使用distance metrics来度量这个labeling spaces的！**

一种自然的想法就是，最小化labeling spaces中的距离，这就是经典的**decentralized search**方法。

这里举一个例子，P2P系统也面临着类似的问题，每个P2P系统都可以被理解成一个directed graph，每个**peer**对应一个node，这个系统需要在没有中心服务器的情况下，想办法从任意节点 A 把消息路由到任意目标节点 B，这些node完全是去中心化的，并且需要想办法减少传递过程中的hop数量。这个任务是一个small world落地的完美案例。

#### Decentralized Navigation(Search)

> [!IMPORTANT]
>
> + 起始点$s$只知道他的朋友的**location**和目标点$t$的**location**，
>
> + $s$只知道自己的links，对于别人的links一无所知
>
> + **ID-spaces（比方说地理距离） Navigation：**$s$导航到一个他所知道的距离$t$（地理位置上）最近的距离
>
> + 迭代这个过程



>  [!WARNING]
>
> 总结一下，Watts-Strogatz Small Worlds模型满足了low diameter和high clustering；在构建上，涉及到**“ID-space”**的观念和一个**“distance”** function。
>
> 同时`Short Paths exist in Watts-Strogatz model, but decentralized greedy routing can not find them! `**最短路径**在small world模型中是**存在的**，但是使用这种去中心化贪心导航算法是**无法找到**的，因为没有全局知识。
>
> 从直观上解释，这是因为 `random long-range links can reduce diameter, but if their distribution does not match the underlying metric space, greedy decentralized search remains inefficient. `换句话说，最短路径是存在的，但是去中心化贪心导航算法很难找到最短路径。
>
> 从搜索速度上来说：
>
> |               Navigable               |              Not navigable              |
> | :-----------------------------------: | :-------------------------------------: |
> |      **多项式对数**的Search Time      |          **指数**的Search time          |
> | **Kleinberg's model $O((\log n)^2)$** | **Watts-Strogatz $O(n^{\frac{2}{3}})$** |
> |                                       |         **Erdos-Renyi $O(n)$**          |
>
> Kleinberg's model是后续提出的对去中心化贪心算法的优化算法，拥有多项式对数的搜索时间。



## Lec 05 

### Kleinberg's model of Small-Worlds

回顾一下Watts-Strogatz小世界模型，它确实成功为模型注入了low diameter和high clustering coefficient的特性，但是却没有办法解释为什么去中心化节点在没有全局知识的情况下可以通过贪心算法找到两个节点之间的最（较）短路径。

原因很简单，节点在进行long range 连接（我们称它为shortcuts）的时候，是随机的而非根据距离衰减的，这不符合现实世界的特性。

因此Kleinberg的小世界模型就在回答这样一个问题，**怎样的long range links可以使得去中心化贪心导航算法更加高效（速度快）**

#### Construction

Kleinberg的小世界模型通常建立在一个lattice，也就是网格化世界上，以二维世界为例，距离选用**manhattan距离**：
$$
d((x_1,y_1),(x_2,y_2)) = |x_1 - x_2| + |y_1 - y_2|
$$

> [!NOTE]
>
> Lec05 P13有图

模型中的每个节点都有两种edge：

+ short range links：连接附近的 lattice neighbors，作用是保证即使没有 shortcut，也总能一步步朝目标走。（**reachability 和 local progress**）

+ long range links：连接远处节点，但不是均匀随机，而是使得连接概率按距离衰减：
  $$
  P(u \rightarrow v) \propto \frac{1}{ d(u,v)^r}
  $$
  其中r为distance exponent，用于控制long range links的距离偏好

  而为了构造概率，我们还需要进行正则化操作：
  $$
  P(u \rightarrow v) = \frac{1}{ d(u,v)^r} / Z \\Z = \sum_{i != u} \frac{1}{ d(u,v)^r}
  $$


> 我认为Kleinberg的模型最重要的就是将edge分为两类，并且将long-term links的连接方式从随机变为概率随着距离增大而衰减，这为模型注入了对距离的敏感性。

#### Distance Exponent `r`的影响

+ 当$r=0$时，long range links去所有节点的概率都一样，因此模型退化到类似Watts-Strogatz的小世界模型

+ 当$r < dim$时，模型对于远距离的惩罚相对较弱，long-range links 太偏向远处。你可能很快跳到目标的大概区域，但接近目标后缺少中短距离 links，于是最后一段很慢。

+ 当$r > dim$时，模型对于远距离的惩罚很强，long range links 偏向近处。局部搜索很好，但如果目标很远，你缺少远距离 shortcut，开始阶段很慢。

+ 当$r = dim$时，模型最优。

#### 为什么$r = dim$是最优的？

从原理上来分析，我们可以将A点到B点的距离拆解成一个个scale的组别：

```
distance 1-2
distance 2-4
distance 4-8
distance 8-16
...
distance N/2 - N
```

观察一下这个结构，一共有$\log N$层，此时如果:

+ 每层都是$\log N$个long-range links，那么相当于每走一步都能碰到一个shortcut，搜索时间即为层数$O(\log N)$
+ 每层只有1个long-range links，那么每层都需要花$\log N$步才能遇到shortcut，搜索时间为层数✖️每层时间$\log^2 N$

因此我们得到结论：
$$
O(\frac{\log^2 N}{k})
$$
k为每层的shortcut数量。

而Kleinberg模型的结论正是：

当r=dim的时候，long range links的连接符合上述分析模式，当每个节点只有1条long range links，每层平均要花$O(\log N)$步才能找到一个跳转到下个阶段的shortcut，这同时也是层数，因此最终的时间是$\log^2 N$

> [!NOTE]
>
> 再回到之前所说的P2P的例子，大多数的P2P系统是适配Kleinberg的模型的，也被称为对数方法，比如randomized chord模型:
>
> 1. 有 ID space 和 distance。
> 2. 有 local/ring structure 保证能前进。
> 3. 有 long-range links 保证快速前进。
>
> 这就是 Chord / Symphony 等系统背后的思想。

> [!IMPORTANT]
>
> 我们把Kleinberg模型与Watts-Strogatz模型对比一下：
>
> 后者虽然能降低 diameter，因为随机 shortcut 让图整体有短路径。但 decentralized greedy search 看不到全局路径。也无法解读这种随机化的long-range links
>
> 前者则制造了一种按照距离衰减的long-range links，使得去中心化贪心算法能够寻迹查找。
>
> > Watts-Strogatz: small-world but not navigable
> > Kleinberg: small-world and navigable（**这里的navigable指的不是能否完成，而是能否高效完成**）

最终总结一下，这种方法的有效性由以下元素提供：

1. 一个globaly agreed ID space，和一个distance function，这使得我们可以通过最小化和目标的距离来做local decision
2. underlying lattice，保证我们总是能够向着减小和目标的距离前进
3. Kleinberg long-range links，使我们能够以多项式对数的时间搜索到目标（构造了能够enable去中心化导航算法的shortcuts）

### Random Walks on Graph

random walk的基本想法是，站在某一个节点上，每次往能走的邻居那里走一步。

那么很显然，每一步如何走和前一步没有关系，只取决于当下的状态，因此这是符合马尔可夫性质的。我们可以说random walk是**markov chain**

#### 移动的概率

一个自然的想法是，从一个点出发，我们到邻居们那里去的概率是多少？

> [!NOTE]
>
> 这里直接参考Lec05 P27的例子为讲例

假设一开始在节点1:
$$
P_0 = [1,0,0,0,0]
$$
根据图结构，你下一步去其他节点的概率为：
$$
P_1 = [0,0.5,0.5, 0,0]
$$
再走一步，以此类推。这里的$P_t$表示的就是走了t步之后，落在每个节点上的概率有多少。

#### 收敛与静态分布

容易观察到，给定任何**connected non-bipartite bidirectional graph**和一个初始点，$P_t$最终会收敛到一个稳定的静态分布上。对于讲例，即：
$$
P_T = [0.17,0.17,0.25, 0.25, 0.17]
$$
我们称这个静态分布为$\pi(v)$，满足：
$$
\pi(v) = \frac{d(v)}{2m}
$$
$v$代表图中不同的node，$d(v)$为每个$v$对应的degree，$m$表示的是整个图的edge数

> [!TIP]
>
> 不难发现，如果图是d-regular的（每个节点都是d的degree），那么这个静态分布最后会变成uniform分布，即$\pi(v) = \frac{1}{n}$，n表示全部的node数量。

> [!IMPORTANT]
>
> 很显然bipartite图不存在静态分布，而是会一直在两个子集中震荡，而绝大多数有向图由于两个节点之间的箭头只有一个，因此容易跳进去出不来，这就使得最后的分布情况与初始位置强相关了。

**那么这里的take away是，静态分布是与每个点的degree成正比的**，直觉是，你的degree越大，邻居越多，你就有更大的概率被访问。

#### Transition Matrix

为了更好地计算每一步最后的概率，我们引入转移矩阵的概念，它记录从一个点转移到其他点的概率，在讲例中，为：
$$
M = 
\begin{pmatrix}
0 & \frac{1}{2} & \frac{1}{2} & 0 & 0 \\
\frac{1}{2} & 0 & 0 & \frac{1}{2} & 0 \\
\frac{1}{3} & 0 & 0 & \frac{1}{3} & \frac{1}{3} \\
0&\frac{1}{3}&\frac{1}{3}&0&\frac{1}{3}\\
0 & 0 & \frac{1}{2} & \frac{1}{2} & 0
\end{pmatrix}
$$
原则上，转移矩阵也可以直接使用对角矩阵$D$和Adjacency矩阵$A$算出来：
$$
M = DA, D_{i,i} = \frac{1}{d(i)}
$$
Adjacency矩阵其实就是表达了网络的整体结构，如果某一行对应的点和其他点有连接，就置对应列为1。在讲例中为：
$$
A = \begin{pmatrix}
0 & 1 & 1 & 0 & 0 \\
1 & 0 & 0 & 1 & 0 \\
1 & 0 & 0 & 1 & 1 \\
0 & 1 & 1 & 0 & 1 \\
0 & 0 & 1 & 1 & 0
\end{pmatrix}
$$
如果单独对Adj矩阵做乘法，比如：
$$
A^2,A^3, \cdots, A^k
$$
其表示某行表示的节点对某列表示的节点有几条hop=k的walk。

比如，取一个初始位置$v=(1,0,0,0,0)$的点，可以有：
$$
vA = \begin{pmatrix} 1 & 0 & 0 & 0 & 0 \end{pmatrix}
\begin{pmatrix}
0 & 1 & 1 & 0 & 0 \\
1 & 0 & 0 & 1 & 0 \\
1 & 0 & 0 & 1 & 1 \\
0 & 1 & 1 & 0 & 1 \\
0 & 0 & 1 & 1 & 0
\end{pmatrix}
 = \begin{pmatrix} 0 & 1 & 1 & 0 & 0 \end{pmatrix}
$$
表示从第一个点出发，经过一个hop后落在所有点的**路径**有几条。

而如果使得$v$与转移矩阵相乘，则代表的是从v点出发，经过一个hop到达所有点的**概率**：
$$
\begin{pmatrix} 1 & 0 & 0 & 0 & 0 \end{pmatrix}
\begin{pmatrix}
0 & 1/2 & 1/2 & 0 & 0 \\
1/2 & 0 & 0 & 1/2 & 0 \\
1/3 & 0 & 0 & 1/3 & 1/3 \\
0 & 1/3 & 1/3 & 0 & 1/3 \\
0 & 0 & 1/2 & 1/2 & 0
\end{pmatrix}
= \begin{pmatrix} 0 & 1/2 & 1/2 & 0 & 0 \end{pmatrix}
$$
因此有：
$$
P_t = P_0M^t
$$
**$M^t$单独可以用来表示t个hop之后落在各个点的概率。**

显然当P到达静态分布$\pi$时，有：
$$
\pi = \pi M
$$
这恰好符合特征值分解$vM = \lambda v$的形式，因此可以说，我们在找的静态分布实际上就是矩阵M的值为1的特征值对应的特征向量。

#### Graph Spectrum

对于一个特征值分解，如果矩阵本身是实数对称矩阵，那么它有n个正交特征向量和对应的n个特征值。满足：
$$
\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n
$$
而如果图是一个d-regular图，那么$\lambda_1 = d$

**对于一个random walk的转移矩阵M，显然它的最大特征值$\lambda_1 = 1$，我们称这些lambda为图G的spectrum，定义$\lambda_1 - \lambda_2$为spectral gap/eigen gap。**

> [!IMPORTANT]
>
> 当两个图是disconnected的时候，说明静态分布只能在component内收敛，因此有：
> $$
> \lambda_1 = \lambda_2
> $$

$\lambda_1 - \lambda_2$即谱间隙越大，说明收敛越快，越小则收敛越慢（当然在random walk中是$1 - \lambda_2$）

#### Graph Laplacian

Laplacian矩阵：
$$
L = D - A
$$
其中，D = degree diagonal matrix，A = adjacency matrix

> [!IMPORTANT]
>
> 注意这个 D 不是前面 D_ii = 1/d(i) 的那个。
> 这里的 D 是：$D_{ii} = d(i)$

它有一个重要的性质，L矩阵的为0特征值的数量 = 图中的connected components的数量

比如说，如果图是connected的，那么L只有1个0值特征值；如果有两个component，那么L就有2个0值特征值。

> [!IMPORTANT]
>
> 只要是普通的graph laplacian，最小的特征值就是0

L矩阵还有一种normalized的形式：
$$
L_{norm} = D^{-1/2} L D^{-1/2} = I - D^{-1/2} A D^{-1/2}
$$
为什么要 normalize？

因为普通 Laplacian 会受 degree 大小影响。Normalized Laplacian 更适合比较 degree 不均匀的图。

#### Expanders

expander是一种很特别的图，它具有sparse但是well-connected的特征。

直觉问题是：能不能通过删很少的边，隔离很多节点？如果可以，说明不是 expander。

一个好的 expander要切出 $k$ 个节点，必须删掉至少 $\alpha k$ 条边：

Expansion α 可以粗略理解为：

```
每个节点集合 S，有多少边从 S 连到外面。
```

如果对于任何一组 k 个节点，都至少有：

```
α * k
```

条边连到外部，那么这个图 expansion 好。

> [!NOTE]
>
> Lec05 P43、45有一个图来展示直觉

**通常来说，树、grid都不是好的expander，random graph的expansion通常很好。**

> [!IMPORTANT]
>
> 如果expansion性好，会有以下优点：
>
> + Sparse yet very well-connected (no small cuts, no bottlenecks)
>
> + Large eigengap
>
> + Rapid convergence of random walk

这里的直觉是：

如果图没有 bottleneck，random walk 很快就能扩散到全图。

如果图有 bottleneck，比如两个 dense clusters 中间只有一条边：

```
cluster A -- bridge -- cluster B
```

random walk 会在一个 cluster 里待很久，很难过桥。
所以 convergence 慢。

#### Mixing time（基本上就是收敛时间）

mixing time表示random walk 走到接近 stationary distribution 需要多少步。spectral gap 越大，mixing time 越小；spectral gap 越小，mixing time 越大

expander的spectral gap 是常数级别：

```
1 - λ2 = constant
```

因此有mixing time近似为$O(log N)$。

## Lec 06

在此前我们了解了network模型的基础概念和一些描述方法，并且介绍了random walk方法，分析了网络结构导致的收敛性能。在这一讲中我们要学习一个实例网络：web网络，并尝试分析random walk在web网络中的应用。

### Web Graph

在web图中，网页就是nodes，网页中的超链接就是edges

在这个定义上，很容易判断出来：

+ Directed：显然超链接和网页本身是一种指向关系
+ Not fully connected：不是所有网站都能够连接在一起（比如一个非常小的网站，没有别人引用他，他也不会引用别人）
+ Has cycles（Not a DAG）：网站之间可能存在环的结构
+ not one giant strongly connected graph：web的结构是高度碎片化的，不是一个巨大的强连通性的网络

#### 一些概念方便描述

为了后续更好的描述web，我们定义两个概念：

+ $In(v) = \{w|\text{w can reach v} \}$：能够到达v的点的集合
+ $Out(v) = \{w|\text{v can reach w} \}$：点v能够到达的点的集合

对于directed graph，通常来说有两种：

+ Strongly connected：

  之前介绍过，即在有方向的情况下仍然可以从任意点出发连接到任意点。
  $$
  In(x) = Out(x),\forall x \in \{x|A,\cdots, x, \cdots \}
  $$

+ Directed Acyclic Graph (DAG)：

  有向无环图，换句话说如果可以从u到v，那就无法从v到u。

> [!NOTE]
>
> 参考Lec06 P4的直观图例，这里的直觉是，如果图是有向的，那么想要strongly connected，这个图必然是拥有很多环结构的，反之如果没有环，那么图就不是strongly connected的。

**任意的有向图（比如我们讨论的web）都可以被这两种类型涵盖**

接下来我们介绍一下**Strongly Connected Component**（SCC），它是有向图中的这样一组节点，满足任意两个节点互相可达，且无法再添加别的满足如此性质的节点进去。

> 换句话说就是component内部strongly connected，且是“极大”的，加入其他节点会破坏这个连通性。

如果我们把图中的所有SCC都算做一个supernode，那么最后会得到一个一定是DAG的“SCC图”。



>  [!TIP]
>
> 如何找到一个点所在的SCC？
> $$
> SCC(v) = In(V) \cap Out(v)
> $$
> 也就是说，既能进入v又能被v访问的节点就是包含了v的SCC

> [!IMPORTANT] 
>
> 在绝大多数情况下，一个graph中只会有一个giant SCC存在，因为如果存在两个体量相等的SCC，实际上只需要两个互相的edges就能连通这两个SCC。而当单个SCC中存在大量的link时，很难不达成这一假设。

#### web graph的基本轮廓

+ SCC: large strongly connected core
+ IN: can reach SCC, but SCC cannot reach them
+ OUT: reachable from SCC, but cannot reach back to SCC
+ Tendrils: reachable from IN or can reach OUT, but do not pass through SCC（In的有出去的，Out的又进来的，但是都不经过SCC）
+ Tubes: paths from IN to OUT without going through SCC
+ Disconnected Components: Cannot be visited by all the parts mentioned before

> [!NOTE]
>
> Lec06 P14 有直观图

### PageRank

> Believe what people say about you, not what you say about yourself.

pagerank是一种早期的有效的对page排名的算法，是google创立初期的中流砥柱。它的基本思想是：A page is important if many pages link to it. Links from important pages count more.

#### Recursive Formulation

PageRank的基本递归公式：
$$
r_j = \sum_{i\rightarrow j}\frac{r_i}{d_i}
$$

> [!NOTE]
>
> Lec06 P23有很直观的图例

简单来说每个节点都会有一个rank值 $r$ ，计算方式是把所有指向该节点的值相加。同时他也要指向别的节点，计算方式是看看自己有多少out degree，然后给出被out degree平均掉的 $r$ 值。

#### Matrix Formulation

这里我们从矩阵的角度来计算静态分布，类似的，我们定义转移矩阵为$M$：
$$
\begin{align}
M_{ji} &= \frac{1}{d_i}, \quad \text{if } i \rightarrow j \\
& = 0, \quad \text{otherwise}
\end{align}
$$

> [!WARNING]
>
> 参考Lec06 P24的计算实例图，按照这样的定义方式，$M$是一个**column Stochastic Matrix**，列之和而不是行之和为1，和之前在计算random walk时的部分有些差别。（比如下式，之前是行向量乘以矩阵，现在是矩阵乘以列向量）但是基本的逻辑是类似的。

更新方式为：
$$
Mr^{old} = r^{new}
$$
通常来说，初始的排名 $r^{init}$ 可以任取（sum是1保证归一化就行），在本例中是分配了一个节点为1，其他都是0:
$$
r^{init} = 
\begin{pmatrix}
0 \\
0 \\
0 \\
0 \\
1 \\
0 \\
\end{pmatrix}
$$
以上是针对unweighted的情况的，是直接按照out-degree平均的方式计算转移概率的，如果图是一个weighted的图，那就直接按照weight作为概率填入转移矩阵就可以。

当然，如果从特征值分解的角度来分析$Mr^{old} = r^{new}$的话，与random walk非常类似的，可以将$r^*$视作$M$的dominant eigenvector（对应于最大的eigenvalue 1）

#### Connectivity 引发的几个问题

在之前的random walk中，我们使用的是undirected图，因此没有太多的问题，似乎总是能够找到唯一的静态分布，但是web是一个directed图，这引发了几个问题，导致了收敛失败或收敛不唯一。

> [!NOTE]
>
> 可以参考Lec06 P30-34 有直观的例子

##### Spider traps

问题：这样一种情况，一旦进入某个区域，就只能在这个区域内访问了，会导致**收敛到局部静态分布**，其他的非trap部分被访问的概率会最终变成0

解决：让图strongly connected，或者增加一条路打破这个trap

##### Disconnected Components

问题：图不是连通的，这样的话最后的**静态分布不唯一**，高度依赖于初始r的选择

解决：让图strongly connected，或者增加两个（来回）路

##### Dead ends

问题：有一个点只能进不能出，"Leakage" of rank，**无法收敛**，r的所有值全部趋近于0（像一个黑洞只进不出，最终把所有的rank值吸收掉，只剩0了）

解决：把这个dead end扔掉，或者从这个点拉个出去的link到别的点去

##### Periodic Behavior

问题：图的结构存在多个节点数的最大公约数不为的环，**静态分布震荡**

解决：打破这种周期性（最简单的就是构造一个self-loop）

举个例子，web网络存在两个环，节点数分别为6和3，这就是周期性，会导致静态分布震荡。

> [!IMPORTANT]
>
> 综上所述，Random walk always converges to unique stationary distribution if:
>
> • The graph is strongly connected
>
> • The graph is aperiodic

#### PageRank算法的构造（来解决上述问题）

在真实的web网络中，我们面对的网络完全不是一个strongly connected的网络，而是之前介绍过的，有很多个组成部分构成的零碎结构。那么面对这种结构存在的很多问题，之前描述的pagerank算法完全无法收敛，那么如何解决这些问题呢？

Google的想法是给原来的网络结构加权叠加一个节点数相同的但是非常complete的网络。在保留原始网络结构的同时增加一堆小links（每个点连接所有点（包括自己））

> [!NOTE]
>
> 参考Lec06 P37有直观的图例

在这样的思想下，PageRank的rank计算公式为：
$$
r_j = \sum_{i \to j} \beta \frac{r_i}{d_i} + \sum_i (1 - \beta) \frac{r_i}{N}
$$
其中$\beta$为控制二者比例的系数，通常在0.8-0.9。如果访问到了dead ends，由于无法按照原来的网络结构继续传递，直接传送到随机节点就行。

这种传送的方法是PageRank算法最核心的特征。

##### Transition Matrix with Teleportation

之前是看的单个节点的rank值更新，现在来看看如何构造有传送的转移矩阵
$$
M_{PageRank} = \beta M + \frac{(1-\beta) \mathbf{ee}^T}{n}
$$
实际上就是构造了一个里面的值都是$\frac{1}{n}$的$n\times n$的矩阵，在被$1-\beta$加权后加给被$\beta$加权的原来的转移矩阵。

> [!NOTE]
>
> 参考Lec06 P40

##### 新的转移矩阵带来的问题

这样构造的新的转移矩阵存在一个重要的问题，即它是dense的，有N^2个非零元素，导致其的存储非常困难，因此实际上不会显式地构造一个转移矩阵，而是计算：
$$
r^{new} = \beta (M r^{old}) + c, c = \frac{1-\beta}{N}
$$
直接对值进行叠加。

如果有dead ends，还需要把leak出去的rank重新分配，并renormalize，使得rank vector的和始终为1。

重复这个过程直到：
$$
\Vert r_{new} - r_{old}\Vert _1 < \epsilon
$$

+ 当beta较大，原结构保存良好，收敛速度较慢，局部结构影响力更强。
+ 当beta较小，原结构被破坏，使得分布更接近uniform，但是提高了收敛速度。

> [!IMPORTANT]
>
> PageRank算法带来的非常独特的一点是，rank的高低不仅取决于输送节点的**数量**，也取决于输送节点的**质量**，因此会存在输送节点数量少，但是由于输送节点的rank很高，使得被输送节点的rank也很高。这也是他和纯粹地按照degree来看的算法的差异最大的地方。

> [!NOTE]
>
> 参考Lec06 P42

#### Topic-Specific PageRank

基础的PageRank是one-size-fits-all的，也就是说，传送是不加以筛选地传送到所有节点的。但是实际上不同的查询具备不同的topic倾向。

Topic-Specific PageRank的思想就是：teleport 不再均匀到所有节点，而是 teleport 到 topic-relevant pages。

> [!NOTE]
>
> 参考Lec06 P44-45

节点rank更新公式：
$$
\mathbf{r} = (\beta M + (1 - \beta)\mathbf{v}\mathbf{e}^T) \mathbf{r}
$$
或者迭代形式：
$$
r^{new} = β M r^{old} + (1-β) v
$$
转移矩阵更新公式：
$$
M_{\text{topic}} = (\beta M + (1 - \beta)\mathbf{v}\mathbf{e}^T)
$$
其中的v是topic-specfic teleport vector，也就是一个列向量，sum列的和为1。

> 核心就是，不传送到所有点了，只传送到跟这个搜索话题相关的点。

#### Random Walk with Restarts / Rooted PageRank

思想是如果teleport的节点只有1个的话，物理意义就是寻找和这个节点相关性很高，关系很密切的节点。可以用于graph proximity/recommendation的识别

此时的v是一个one-hot vector。

举个例子，考虑一个bipartite，用户-产品的网络图，从某个 user 出发做 rooted PageRank，高分但未购买的 product 可以推荐

这种算法的缺点是，如果要从每个节点分别算 proximity，需要为每个 source 重新计算。

#### SimRank

略

SimRank是上述rooted PageRank算法的延伸，它用随机游走衡量结构相似性，例如 authors-conferences-tags 这种 k-partite graph 上的 similarity

## Lec07 Clustering

在之前的学习中我们结束了对网络图模型的探索，本讲的内容主要聚焦于clustering上。

### 围绕Clustering的基本问题

聚类的主要目标是了解给定的数据的内在结构。具体来说，把一堆数据点分成若干组，使得同一组内的点彼此相似 / 距离近；不同组之间的点不相似 / 距离远。

Clustering的一大问题在于，由于数据通常是高维数据，因此我们需要在高维空间重新定义**距离**（比如Euclidean distance，Cosine distance，Jaccard distance，Edit distance）

> [!IMPORTANT] 
>
> 距离这个概念在Clustering中非常重要，因为我们需要一个概念来衡量数据点之间的相似程度。这是我们能够对他们加以区分的基础

高维度带来了一个问题，即我们常说的Curse of Dimensionality：高维度下，空间变得异常sparse，使得每个点之间的距离非常接近（区分度太低），因此普通的距离度量在高维度失去意义。

#### 如何定义距离

不同的数据适合不同的距离度量手段，也就是**distance measure depends on representation and application. **最适合的才是好的。

> [!NOTE]
>
> Lec07 P11有样例

#### Method of Clustering

+ Hierachical
  + Agglomerative（bottom up）：一开始每个点都是一个cluster，然后不断融合最近的cluster
  + Divisive（top down）：一开始所有数据是一个cluster，然后不断split这个cluster
+ Point Assignment：维护一系列clusters，每个点分给最近的cluster（K-means就是这种方法）

### Hierarchical Agglomerative (bottom up) Clustering

+ 核心：**repeatedly combine two nearest clusters**

+ 三个问题：

  + 如何表示一个 cluster？

    在Euclidean Space中，cluster可以用centroid来表示：
    $$
    centroid = cluster 中所有点坐标的平均值
    $$

  + 如何定义两个 clusters 的距离？

    distance between centroids

  + 什么时候停止合并？

    不断合并会得到一个 **dendrogram**，也就是层次树。即使最后合成一个 cluster，dendrogram 仍保留了整个合并层次。

> [!NOTE]
>
> Lec07 P16有样例

#### Non-Euclidean Case

##### 表征cluster

如果距离不是 Euclidean，例如 edit distance，那么可能没有“平均点”。比如两个单词之间的 edit distance，你不能自然地算出两个单词的平均值。此时要如何表征这个cluster呢？

这时不能用 centroid，而用 **clustroid**：
$$
clustroid = cluster 里真实存在的一个点，它到其他点整体上最接近。
$$
而这里的**“最接近”**常用的定义是：

+ minimize maximum distance to others
+ minimize average distance to others
+ minimize sum of squared distances to others

> [!NOTE]
>
> Lec07 P18 样例

之后我们可以假装这个clustroid是centroid，从而后续可以计算cluster之间的距离

##### 定义clusters之间的nearness

几种常见的方法：

+ centroid distance
+ minimum pairwise distance：clusters之间的所有可能的点构成的link的最短距离
+ **cohesion of merged cluster**：挑选一种cohesion的观念

##### Termination Condition

两种方法

+ stop when k clusters remain：直接人工选择一个k来作为最后的组数，这种方式的问题是你必须对数据集有所了解，知道最后数据集可以大致分为几组
+ stop when merging would create bad/low-cohesion clusters：这种方法选择在cluster里的cohesion不好时自动终止

##### Cohesion

那如何来衡量这个cohesion呢？常见的指标有四种

+ diameter：cluster内部中任意选择两个点最大的距离（比方说如果新加入的点使得这个最大距离超出某个阈值，就终止融合过程）
+ radius：centroid或者clustroid间的最大距离
+ average pairwise distance：cluster内部中的点两两之间的平均距离
+ density：单位空间下的点的数量（比如divide number of points in the cluster by diameter or radius）

#### 复杂度

Naive hierarchical clustering 很贵，差不多是$O(N^3)$

用 priority queue 可以降到$O(N^2 log N)$

但这个复杂度还是太高，如果数据太多的话无法使用这种方法。

而kmeans聚类方法可以解决这种问题。

### k-means clustering (Point-assignment Method)

> [!IMPORTANT] 
>
> k-means的复杂度很低，这是它的优势

**kmeans需要假设Euclidean space/distance**

算法：

1. 初始化 k 个 centroids。（k是人为给定的）
2. 把每个点分配给最近的 centroid。
3. 对每个 cluster 重新计算 centroid。
4. 重复分配和更新，直到收敛。（收敛指Points don’t move between clusters and centroids stabilize）

每一轮的复杂度是$O(kN)$

> [!NOTE]
>
> Lec07 P26-28有图例

#### 如何选择k

之前说了kmeans需要提前选择一个k，那么如何合理地挑选这个值呢？

> [!NOTE]
>
> Lec07 P30-32是图例，P33告诉你如何选择k的

k 太小：

```
clusters 太粗，很多点离 centroid 很远 average distance to centroid 大
```

k 太大：

```
clusters 太碎，增加 k 后 improvement 很小
```

常用方法是 elbow method：

```
try different k, plot average distance to centroid vs k, choose where curve starts flattening
```

P33的曲线一开始下降很快，到合适的 k 后下降变慢。
这个转折点就是 “elbow”。

换句话说就是从k比较小开始，一开始的cluster中的点平均到centriod的距离很大，随着k的增大，会逐渐减小，当 到达elbow时，再增加k已经不会降低太多这个距离。选择此时的k就可以了

#### 如何初始化centroids

kmeans方法的好坏严重依赖于初始化

比如说初始点全在同一个 natural cluster；或者初始点是 outliers，都很糟糕。

那么如何避免一个坏的初始化结果呢？这里提供了两种方法

+ Sampling：使用hierarchical clustering方法先找到k个clusters，每个cluster选一个代表点作为初始的centroid
+ pick dispersed set of points：先随机选一个点，之后每次选离“已选点集合”最远的点，直到选出k个点

#### 复杂度

每一轮都需要遍历k个clusters下每个点（N points ），因此每一轮的复杂度是：
$$
O(kN)
$$
**问题是实践中通常收敛很快，但理论上最坏情况可能很慢。**

能否有一个算法可以在一轮搜索中把所有数据点全部分好cluster？还真有，就是我们要介绍的BFR算法。

### The BFR Algorithm

> [!TIP]
>
> **Bradley-Fayyad-Reina (BFR)是kmeans的大数据变种版本**，目标是解决数据集过大的问题，减少存储压力。

#### BFR对数据分布的假设

BFR需要做一个很强的假设，即假设所有的cluster中的点在一个Euclidean space中，以centroid为均值，服从正态分布（normally distributed），且每一个维度都有自己的mean和std，这导致cluster呈现为一个主轴和坐标轴平行的椭圆，也正因为这种概率假设，给定一个点和一个cluster的centroid的距离，我们可以描述这个点的位置属于这个cluster的概率。

> [!NOTE]
>
> Lec07 P38

#### BFR Algorithm

**思想：使用充分统计量来统一表征cluster中所有点的总体特征，而非单个保有每个点。**

BFR维护三类点的集合

+ Discard Set （DS）：已经足够靠近某个主 cluster（可以认为是就在cluster里，近到可以被认为是属于这个cluster）的点。这些点可以直接丢掉**（点被cluster的统计量提取信息）**
+ Comparison Set（CS）：一些点彼此很近，但还不够靠近任何主 cluster。它们形成小 subclusters。可以被 summary，但暂时不分配给最终 cluster。**（点被非k的cluster统计量提取信息）**
+ Retained Set（RS）：孤立点 / outliers。暂时不能 summary，必须保留原始点。**（直接储存点本身）**

具体来说，DS中的数据被以下数据summarized：

+ cluster内部的点的总数N
+ 向量SUM：内部所有点的第i维坐标总和
+ 向量SUMSQ：内部所有点的第i维坐标平方总和

> 实际上就是用于还原多维高斯分布的所有参数。$样本总数n$；$各维度的均值\times n$；$各维度的方差\times n$，也就是说，表达一个cluster需要的参数数量是：
> $$
> 2n_{dim} + 1
> $$
> 为什么不直接保存均值和方差呢？因为要保证可更新性：加入一个点之后，需要重新计算这个cluster的centroid的多维概率分布，如果只有均值和方差是没办法更新的。

> [!NOTE]
>
> Lec07 P42有图例

> [!TIP]
>
> 来解释一下为什么椭圆的主轴都是平行于坐标轴的，因为如果不这样的，那么方差就不再是一个长度为$n_{dim}$的向量，而是一个$n_{dim} \times n_{dim}$的协方差矩阵，这会显著增加存储占用，因此被放弃了。

那么算法具体如何计算呢？

首先，算法通过某些合理的方法选择k个centroids（这使得算法容易收到初始点的好坏的影响）

然后在每次读取数据的时候，

1. 找到足够接近某个 DS cluster centroid 的点，把它加入该 DS。
2. 更新该 cluster 的 N, SUM, SUMSQ。
3. 剩下没有归入 DS 的点，与旧 RS 一起做内存内 clustering（比如使用kmeans方法）。
4. 形成的小 cluster 放入 CS，孤立点放入 RS。
5. 尝试合并 CS 中相近的小 clusters。
6. 最后一轮，把 CS 和 RS 都合并到最近的最终 cluster。

> [!IMPORTANT]
>
> 如何判断一个点与cluster之间的距离？
>
> 因为这里使用的是概率来表达cluster，因此无法使用普通的手段来衡量距离。
>
> 方案是使用**Mahalanobis distance**：
> $$
> d_{M}(x,c) = \sqrt{\sum^d_{i=1}(\frac{x_i-c_i}{\sigma_i})^2}
> $$
> 直觉上，就是衡量这个点与centroid的距离有几个标准差。
>
> 如果这个距离小于一个阈值，那么就认为是属于这个cluster的。
>
> 注意到如果在每个维度的差距都是一个标准差，也就是说公式中的根号下有维数个1，此时$d_M(x,c) = \sqrt{n_{dim}}$
>
> 一般来说，三个标准差$3\sigma$以内可视为包含，即小于$3\sqrt{n_{dim}}$的都视为包含在这个cluster中。

> [!IMPORTANT] 
>
> 如何判断两个CS subclusters是否应该被合并？
>
> 可以看combined variance 是否低于 threshold，因为 CS 也用 N, SUM, SUMSQ来summarize的，所以合并两个 CS 很容易：
> $$
> N = N1 + N2 \\SUM = SUM1 + SUM2\\ SUMSQ = SUMSQ1 + SUMSQ2
> $$
> 然后重新算 variance。

#### BFR的限制

1. 假设在Euclidean空间
2. 做了一个很强的假设，即所有cluster都满足高斯分布
3. 而且只能是正交的多维高斯分布（主轴必须平行于坐标轴）

### The CURE Algorithm

Clustering Using REpresentatives (CURE)是为了解决BFR的形状限制。

它的基本思想是：使用一系列具有代表性的点来表示clusters。

算法有两个pass

1. + sample data into memory 从整个数据中采样一些点
   + use hierarchical clustering on sample 对这些点使用之前介绍的层级方法
   + for each cluster, choose k dispersed representative points 对每个cluster，选择k个尽量散开的代表性的点
   + move representatives 20% toward centroid 将这些点向cluster的centroid移动20%（这是为了减弱 outliers / boundary noise 的影响。）
2. + scan all data 遍历原数据集中的**所有数据**
   + assign each point to closest representative's cluster 找到距离每个点最近的representative的点，然后将这个点分给这个representative点属于的cluster。

> [!NOTE]
>
> Lec07 P56-58 图例

## Lec 08 Label Propogation

label propogation要解决的问题是，网络结构中的一部分节点已经存在标签，如何利用网络本身的结构特征，将这些标签预测给剩下无标签的节点。这种算法和random walk/PageRank非常相关。

### 问题定义

给定 graph G = (V,E)，一部分节点$V_l$ 有已知标签 $Y_l$，另一部分节点$V_u$没有标签。目标是预测未标记节点的标签$ Y_u$

### 核心假设

linked nodes tend to have related labels：

+ homophily: 相似的人更容易连接
+ influence: 连接的人会互相影响

不过前提是初始标签必须是有意义且数量足够的，不然结果没有意义。

### Label Propogation through Random-Walks with absorbing states

想法是，使得random walker从一个无标签节点出发，在图上随机走，一旦走到 labeled node，就停在那里。（labeled node 是 absorbing state / trap）

观察多少 walker 最后停在 green label？多少 walker 最后停在 red label？

比如：

+ 85 walkers end at green
+ 15 walkers end at red

那这个节点属于 green 的概率就是0.85

总结一下，就是：未标记节点的标签 = random walk 最终被哪类 labeled node 吸收的概率。

####  **如何修改 graph 来表示 absorbing state**

> [!NOTE] 
>
> Lec08 P7有很好的例子

使得有标签节点只能被访问，没有出去的路，再为其添加一个self loop，这样就出不去了

这里的直觉是，一旦 random walker 到达 labeled node，就永久停在那里。

#### Absorption Matrix P

略







 Label propagation: Classification Problem

• Initial labeling is very important for having meaningful classes

• Initially labeled nodes can never change their label!

• Is it good or bad?

• What if you have noisy labeled data?

• That brings us to Diffusion

## Lec 09

### Graph Communities

在之前的label propogation中我们解决了在只有部分label的情况下如何propogate label到其他没有标签的节点的问题，那如果我们没有任何标签，只有网络本身，此时该如何分辨网络中的cluster？

这里的直觉是，相同的cluster/community中的节点具有类似的特征，具体来说，一个 community 内部连接更密，而和外部连接更少。

> [!NOTE]
>
> Lec09 P4有图例

不过对于community并不存在一个公认的定义，对其的解释严重依赖于不同领域与不同的网络结构。

在绝大多数情况下，我们讨论的是sparse bidirectional graphs，但是换成dense、weighted、directional的都是可以的。

而且很多社区检测目标函数是 NP-hard 的，所以通常靠近似算法。

#### community的好坏程度的度量

一种被广泛使用的度量方式是group内部的edge的数量与外部不同group之间的edge的数量的对比。

也就是说，一个好的community意味着：more intra-cluster edges；fewer inter-cluster edges

> 这种衡量方式非常直觉

#### Community Detection/Extraction

分为两步：

1. 定义 quality measure / objective function
2. 用算法把节点分到 communities，优化这个 objective

#### Community Evaluation measures

我们可以根据以下指标来组织community evaluation的度量方式：

+ Evaluation based on **internal** connectivity (#of edges within community)
+ Evaluation based on **external** connectivity (# of edges across communities)
+ Evaluation based on **internal and external** connectivity
+ Evaluation based on **network model**

#### Notations

> [!NOTE] 
>
> 参考Lec09 P9，notation非常直观

#### 几种evaluation方式

> [!NOTE]
>
> 参考Lec09 P10-16

##### internal connectivity

衡量内部连接有多紧密

##### external connectivity

衡量外部链接有多松弛

##### internal and external connectivity

被称为**Conductance**，同时考虑了内部和外部，直觉是从 S 连到外面的边，占 S 总边量的比例。

##### network model based

介绍了两种方法：

+ average out degree fraction：
+ modularity：比较实际 community 内部边数 vs 随机图模型中期望的内部边数，这里的直觉是，如果一个 group 内部边比随机情况下多很多，那么它就是一个强 community。



> [!IMPORTANT]
>
> 在很多带 ground-truth community 的真实网络中，conductance 和 triangle participation ratio的表现较好。
>
> 不过，没有绝对最好的measure方式，还是得看面对的是什么任务，比如：
>
> + 想找容易被攻击隔离的区域 -> cut/expansion 相关 measure
> + 想找社交圈 -> conductance/triangles 可能更自然



### Spectral Partitioning

L=D-A的特征值从小到大排列，第一个一定是0，因此在做bisection的时候，我们需要选取次小的那个特征值对应的特征向量，这个特征向量也叫Fiedler vector，然后用 Fiedler vector 的每个分量给节点排序或分组，直觉是：

```
Fiedler vector 给每个节点一个一维坐标。 连接紧密的节点倾向于坐标接近； 弱连接的两侧会被拉开。
```

所以它适合做 graph bisection。

TODO：理解那个图是什么意思

### Link Prediction

网络在很多时候并不是一个静态的网络，而是会随着时间改变其自身结构的。

因此link prediction做的就是，给你一个时间节点 $t$ 的网络，让你预测 $t'$ 时刻的网络结构（删减和增加带来的变化）。

又或者是给你一个不是很全的网络（缺少一些links），让你根据图本身的结构，将这些missing links预测出来

再比如可以估计观测到的links是否可靠

预测的类型有：

+ binary：links的存在与否
+ regression：links的weight
+ multi-class（classification）：links的type

#### Link Prediction by Similarity/Proximity Scoring

直观的想法是，如果两个节点间的相似度越高，说明他俩越有可能存在links

因此重点是如何衡量两个节点的相似度。

这里提供了4大类方法：

+ **Local Neighbourhood Scores：**

  这些只看局部邻居，非常常用。

  1. Preferential Attachment

  ```
  sim(u,v) = d(u) * d(v)
  ```

  degree 高的节点更可能形成新边。

  2. Common Neighbors

  ```
  sim(u,v) = |Γ(u) ∩ Γ(v)|
  ```

  共同邻居越多，越可能连边。

  3. Jaccard coefficient

  ```
  sim(u,v) = |Γ(u) ∩ Γ(v)| / |Γ(u) ∪ Γ(v)|
  ```

  共同邻居占总邻居比例。

  4. Adamic-Adar（**比较重要的link predictor之一**）

  ```
  sim(u,v) = sum_{w in Γ(u) ∩ Γ(v)} 1 / log d(w)
  ```

  共同邻居中，低 degree 的共同邻居权重更高。
  因为如果一个共同邻居连接很多人，它不那么有信息量；如果一个共同邻居很专一，说明关系更强。

  Slide 说 Adamic-Adar 是很强的 link predictor。

+ **Path-Based Scores**：

  不只看共同邻居，而看路径。

  **Shortest path**

  距离越短，越可能连边。

  **Katz Score**

  考虑所有路径：

  ```
  sum over all paths between u and v
  ```

  长路径用衰减因子惩罚：

  ```
  β^{path_length}
  ```

  所以短路径贡献大，长路径贡献小。

  Katz score 收敛条件：

  ```
  β < 1 / λ1
  ```

  其中：

  ```
  λ1 = adjacency matrix A 的最大 eigenvalue
  ```

+ **Random-Walk-Based Scores**：

  包括：

  ```
  hitting time commute time PageRank variants SimRank Rooted PageRank
  ```

  **Hitting time H_ij**

  ```
  random walk from i first reaches j 的期望步数
  ```

  越小越相似。
  作为 similarity 可以用负号：

  ```
  sim(i,j) = -H_ij
  ```

  **Commute time**

  ```
  H_ij + H_ji
  ```

  从 i 到 j 再从 j 回 i 的期望步数。

  **Rooted PageRank / Personalized PageRank**

  从某个节点频繁 restart，分数高的节点更接近它。
  这可以作为 link prediction / recommendation 的 proximity score。

+ **Low-Rank Approximations**：

  对 adjacency matrix 做 eigen-decomposition / truncated SVD：

  ```
  A ≈ X Λ X^T
  ```

  用低维 embedding 表示节点，再预测 link。

  直觉：

  ```
  真实网络的连接模式可能由少数 latent factors 决定。
  ```

  比如 recommendation 里：

  ```
  user/movie latent preferences
  ```

  低秩近似可以捕捉这些隐含结构。



> [!IMPORTANT]
>
> 值得注意的是，local neighbourhood方法的计算成本很低，而基于random walk的算法的计算成本相对较高
















