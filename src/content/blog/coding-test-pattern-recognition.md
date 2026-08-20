---
title: "You don't have a coding problem, you have a pattern problem"
description: "Grinding hundreds of problems and still failing timed assessments is a recognizable failure mode. Here is what is actually going wrong."
date: "2026-07-22"
category: "Coding Tests"
author: "Upveraoffer"
---

Here is a story we hear most weeks. Someone has solved three hundred problems. They can explain binary search. They sit a sixty-minute assessment, read problem one, and their mind goes flat.

This is almost never a knowledge gap. It is a **retrieval** gap.

## Solving is not the same as recognizing

When you work through a curated list, the problem arrives pre-labeled. You are on the dynamic programming page, so you reach for dynamic programming. You solve it. You feel competent.

In a real assessment nothing is labeled. The entire first step — deciding *which* tool this is — has been removed from your practice, and it is the step the clock punishes hardest.

## The two-minute test

Take any problem you have not seen. Set a timer for two minutes. Do not write code. Write down:

- What is the input shape, and what is the output shape?
- What is the brute-force approach, and what is its complexity?
- What structure in the input could let me do better — sortedness, bounds, uniqueness, adjacency?
- Which pattern does that structure suggest?

If you cannot answer these in two minutes, more problems will not help. You need to practice *the two minutes*, not the sixty.

## The patterns that actually recur

Assessments draw from a much smaller pool than problem sites suggest:

| Signal in the problem | Pattern to reach for |
|---|---|
| Sorted array, find a pair or triple | Two pointers |
| Contiguous subarray or substring | Sliding window |
| "Top k" or "k largest / smallest" | Heap |
| Grid, maze, shortest unweighted path | BFS |
| Explore all paths, backtrack on failure | DFS / backtracking |
| Overlapping subproblems, optimal substructure | Dynamic programming |
| Prefix sums, range queries | Cumulative arrays |
| Connectivity, grouping | Union-find |

Eight rows. Most assessments are drawn from them. The work is not learning more rows — it is learning to see the left column fast.

## How to practice retrieval

Change one thing about your practice: **shuffle**. Build a mixed pool of problems from every category, draw at random, and start the two-minute clock before you write anything. Log which pattern you named and whether it was right.

Your error log is the curriculum. The patterns you consistently misname are the ones costing you the assessment — not the ones you have never studied.

## Finishing inside the limit

Recognition buys you time; it does not spend it well. Two habits close the gap:

- **Write the signature and the brute force first.** A working slow solution beats an unfinished fast one, and it often reveals the optimization.
- **Handle edge cases before you optimize.** Empty input, single element, duplicates, negative numbers. Assessments weight correctness far more than elegance.
