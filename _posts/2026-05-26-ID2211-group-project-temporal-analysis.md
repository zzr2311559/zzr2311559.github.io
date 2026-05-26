---
layout: post
title: "ID2211 Group Project中用到的算法：Time Decayed HITS的核心原理拆解（draft）"
date: 2026-05-26
topic: "研究"
tags: ["研究", "HITS"]
summary: "None"
---

简单分析一下Time Decayed HITS算法的原理。
## HITS算法的收敛性分析

在获得了adjacency matrix $W$ 之后，HITS算法以迭代的形式更新两个值直到趋近被认可的收敛：

$$
\begin{aligned}
a &= W^T h \\
h &= W a
\end{aligned}
$$

单独分析$h$，不难看出，当$h$被认为是近似的$h^*$时，有：

$$
\begin{aligned}
h^* = WW^T h^*
\end{aligned}
$$

令$M = WW^T$，则有：

$$
h^* = M h^*
$$

由于此前$a$和$h$的每次在更新后都需要进行一次正则化：

$$
\begin{aligned}
a \leftarrow \frac{a}{\Vert a \Vert_2} \\
h \leftarrow \frac{h}{\Vert h \Vert_2}
\end{aligned}
$$

因此实际上可以将$h$视为$M$的**特征向量**。

所以，考虑到在hub值的更新过程中会逐渐放大最大特征值对应特征向量的权重，最终会收敛到最大特征值所在的特征向量。因此求hub值$h$的过程实际上就是在找矩阵$M$的最大特征值$\lambda_1$对应的特征向量。同时，最大特征值和次大特征值相差越多，收敛速度就越快，因此通过对比谱间隙（$\lambda_1 - \lambda_2$或$1 - \frac{\lambda_2}{\lambda_1}$）可以分析收敛速度的相对快慢，即：

$$
\Vert h - h^* \Vert = \mathcal{O}(|\frac{\lambda_2}{\lambda_1}|)
$$

总结来说谱间隙越大，收敛越快。

根据这个逻辑，不难发现当最大特征值不唯一时，迭代本身的收敛性无法保证，比如，相等的的两个最大特征值对应的特征向量会对迭代施加相同的影响力，导致发散。

## Time Decayed HITS
Time Decayed HITS只是在HITS的基础之上对adjacency matrix进行了修改：

$$
W^{TD}_t = \frac{\sum^{K-1}_{k=0}\delta^kW_t}{\sum^{K-1}_{k=0}\delta^k}
$$

具体来说，就是按照时间加权叠加了当前年份与前k-1年的adjacency matrix之后对权重做归一化，这里的k称为时间窗口。

单从公式本身就能看出来，多个时间节点叠加后的结果从直觉上来说应该是要比单一时间节点的结果更为稳定，因此这里引入稳定性检查实验。具体来说，使用算法前一年给出的rank和后一年的rank做对比，计算spearman相关性系数来分析一致性。

并且，由于注意到了HITS算法本身并不能够保证收敛性这一点，设计收敛性检查实验，通过观察算法的谱间隙来分析收敛性，不过需要注意的是，谱间隙仅能表达收敛与否与收敛快慢，并不能保证得到的结果是稳定的。




