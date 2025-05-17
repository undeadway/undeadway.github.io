[目录](./)
# 【英翻】为什么说 PostgresSQL 是数据库界的 Linux

## 译文

### PostgreSQL 会像 Linux 改变操作系统那样改变数据库市场

从小事成长为大事！回到 1989 年，我完全不知道在大学里教授一种叫 MINIX 的操作系统（我用软驱把它装进了我的电脑），这个操作系统就是 Linux 的开端。

我从来没有想到过这个叫 Linux 的操作系统会成长为世界上装机量最高的服务器平台，并取代了当时使用者最多的私有 Unix 。我理所当然地认为操作系统的下一个大事件不会是开源。但事实上，那时候互联网都还没有走出大学的实验室。

Linux 从 MINIX 中诞生，一个得到了很多人支持的个人创造。一个由来自发行版开发商、硬件开发商、大型企业的开发者以及其他零散的自由职业程序员（freelance programmers）<sup id="a0"><a href="#f0">注0</a></sup>所组成的社区，希望把 Linux 打造为从头 X86 到大型机都成为第一的服务平台。今天，Linux 还是充满活力以及进取心，不断的去适配如：新的硬件、云端环境、物联网、嵌入式系统等等。Linux 被很多保守的银行部署到了云端，以支持核心业务的操作。

这些成功都是因为有庞大的市场的支持。一个多元化的且有共同目标的社区被组织地很好，有创新新，还尊重成员。Linux 不是一个只有少数人赞助或者拥有的开源项目。它是一个真正的全球化、全民化以及有吸引力的社区。这些参与者都认为这个平台一定会成功，且把上面这些至于盈利之前。

### PostgreSQL 会改变数据库市场，就像 Linux 在操作系统市场中做过的那样

来自企业的销售空间这对 Postgres 家族来说是全新的，加入了富士通的企业 Postgres 项目并且可以让我们自己沉浸于 PostgreSQL 的技术和业务后，这很快就让我发现了 PostgreSQL 和 Linux 间相似的地方。

PostgreSQL 是一种关系型数据库，可以作为提供标准 SQL RDBMS 和 NoSQL 任务的服务于企业常用业务级 RDBMS 应用程序和混合了 传统 SQL 和 NoSQ 任务的 Business 4.0下一代应用程序工作的平台。

Linux 也有过相似的经历，PostgresSQL 诞生于大学项目，还有一个组织良好的社区来为它服务，以及来自世界各地的贡献者。依然和 Linux 很像，它有着各种各样销售商和 ISV ，添加功能和支持，让它成为一个多彩的生态系统，可以满足从某些最大银行到最小的公司。

### PostgreSQL 正以市场需求的高速发展

PostgreSQL 可插拔/可扩展（pluggable/extensible）的特点可以很自然的扩展到商业应用，可以满足各种各种各样的数据类型和工作任务。包括地理、时间序列、深度分析、机器学习等等。这些满足企业即想要管理过去的解决方案，也想要发展满足未来商务4.0的动态需求，全部是由社区开发和维护的。

作为一个发行版，Fujitsu Enterprise Postgres ，还为 Postgres 添加了下面的功能

* Hybrid Transactional Analytical Workloads (HTAP)
* Data Masking
* Data Redaction (implementing data governance capabilities) <sup id="a0"><a href="#f0">注1</a></sup>

这些功能来源于客户的需求，希望发行版可以有别于市场中的其他产品，就像 Linxux 发行版可以为他们的操作系统做的那样。

PostgreSQL，就像是 Linux，给数据库市场带来了新的活力，因为它是竞争性的、开放支持的平台，由很多发行渠和维护渠道。没有谁可以拥有决定平台未来方向的权力。

### PostgreSQL 正在成长为完美的风暴



这意味着改变。

### 所有 CIO / CTO 和 CFO 都要有 PostgreSQL 战略的时间到了

让时间来告诉我们答案。如果这种势头有作用，那么 PostgreSQL 社区早晚会突破那层玻璃天花板。

## 注释

* <span id="f0"><a href="#a0">注0</a></span> 这里的原文“freelance programmers”，查看资料发现应该说的是自由职业的程序员。但因为这里前面提到了大厂商，这里应该是想有个对比，所以翻译成了“零散的自由职业程序员”。
MD，这什么长难句！

* <span id="f0"><a href="#a0">注1</a></span> 这里这些不知道具体含义，保持原文。

----------
\
话虽如此，这还是在互联网还只是大学实验的时候。

## 原文

[https://www.postgresql.fastware.com/blog/why-postgresql-is-the-linux-of-databases](https://www.postgresql.fastware.com/blog/why-postgresql-is-the-linux-of-databases)