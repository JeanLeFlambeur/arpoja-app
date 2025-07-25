import React, { useState, useEffect } from 'react';

// Raw CSV data fetched from the files. This will be parsed into usable patterns.
// This data is embedded directly for simplicity and to make the app self-contained.
const rawCsvPatterns = {
  'Task Shuffler 2.0 - 3 stations.csv': `3,1,2
1,2,3
2,3,1
3,2,1
1,3,2
2,1,3
3,1,2
2,3,1
1,2,3
3,2,1
1,3,2
2,1,3
2,3,1
3,1,2
1,2,3
3,2,1
1,3,2
2,1,3
2,3,1
1,2,3
3,1,2
1,3,2
3,2,1
2,1,3
2,3,1
1,2,3
3,1,2
2,1,3
3,2,1
1,3,2
1,2,3
2,3,1
3,1,2
2,1,3
3,2,1
1,3,2
2,3,1
1,2,3
3,1,2
3,2,1
2,1,3
1,3,2
2,3,1
1,2,3
3,1,2
3,2,1
1,3,2
2,1,3
3,1,2
1,2,3
2,3,1
1,3,2
3,2,1
2,1,3
3,1,2
1,2,3
2,3,1
3,2,1
1,3,2
2,1,3
3,1,2
2,3,1
1,2,3
3,2,1
1,3,2
2,1,3
2,3,1
3,1,2
1,2,3
3,2,1`,
  'Task Shuffler 2.0 - 4 stations.csv': `2,4,1,3
1,3,4,2
3,1,2,4
4,2,3,1
3,4,1,2
1,2,3,4
2,3,4,1
4,1,2,3
3,2,4,1
1,4,2,3
4,3,1,2
2,1,3,4
4,2,1,3
1,3,2,4
2,4,3,1
3,1,4,2
4,3,2,1
2,1,4,3
3,2,1,4
1,4,3,2
2,3,1,4
3,4,2,1
1,2,4,3
4,1,3,2
2,4,1,3
1,3,4,2
3,1,2,4
4,2,3,1
3,4,1,2
1,2,3,4
2,3,4,1
4,1,2,3
3,2,4,1
1,4,2,3
4,3,1,2
2,1,3,4
4,2,1,3
1,3,2,4
2,4,3,1
3,1,4,2
4,3,2,1
2,1,4,3
3,2,1,4
1,4,3,2
2,3,1,4
3,4,2,1
1,2,4,3
4,1,3,2
2,4,1,3
1,3,4,2
3,1,2,4
4,2,3,1
3,4,1,2
1,2,3,4
2,3,4,1
4,1,2,3
3,2,4,1
1,4,2,3
4,3,1,2
2,1,3,4
4,2,1,3
1,3,2,4
2,4,3,1
3,1,4,2
4,3,2,1
2,1,4,3
3,2,1,4
1,4,3,2
2,3,1,4
3,4,2,1
1,2,4,3
4,1,3,2`,
  'Task Shuffler 2.0 - 5 stations.csv': `3,2,5,4,1
5,4,2,1,3
1,5,3,2,4
2,1,4,3,5
4,3,1,5,2
3,1,5,2,4
4,2,1,3,5
2,5,4,1,3
1,4,3,5,2
5,3,2,4,1
4,3,1,2,5
1,5,3,4,2
3,2,5,1,4
2,1,4,5,3
5,4,2,3,1
2,5,1,3,4
4,2,3,5,1
1,4,5,2,3
5,3,4,1,2
3,1,2,4,5
5,2,3,1,4
1,3,4,2,5
4,1,2,5,3
3,5,1,4,2
2,4,5,3,1
3,1,2,5,4
2,5,1,4,3
5,3,4,2,1
4,2,3,1,5
1,4,5,3,2
1,5,4,2,3
2,1,5,3,4
4,3,2,5,1
3,2,1,4,5
5,4,3,1,2
4,2,5,3,1
1,4,2,5,3
3,1,4,2,5
2,5,3,1,4
5,3,1,4,2
3,4,2,5,1
5,1,4,2,3
4,5,3,1,2
1,2,5,3,4
2,3,1,4,5
3,4,5,2,1
5,1,2,4,3
1,2,3,5,4
2,3,4,1,5
4,5,1,3,2
1,2,4,5,3
4,5,2,3,1
3,4,1,2,5
5,1,3,4,2
2,3,5,1,4
1,2,4,3,5
2,3,5,4,1
4,5,2,1,3
3,4,1,5,2
5,1,3,2,4
1,3,2,4,5
4,1,5,2,3
5,2,1,3,4
3,5,4,1,2
2,4,3,5,1
1,5,2,4,3
2,1,3,5,4
3,2,4,1,5
4,3,5,2,1
5,4,1,3,2`,
  'Task Shuffler 2.0 - 6 stations.csv': `4,1,3,5,6,2
6,3,5,1,2,4
5,2,4,6,1,3
3,6,2,4,5,1
2,5,1,3,4,6
1,4,6,2,3,5
2,6,3,5,4,1
3,1,4,6,5,2
5,3,6,2,1,4
1,5,2,4,3,6
4,2,5,1,6,3
6,4,1,3,2,5
2,5,4,3,6,1
5,2,1,6,3,4
6,3,2,1,4,5
4,1,6,5,2,3
3,6,5,4,1,2
1,4,3,2,5,6
2,6,5,4,3,1
5,3,2,1,6,4
4,2,1,6,5,3
1,5,4,3,2,6
6,4,3,2,1,5
3,1,6,5,4,2
6,2,1,3,5,4
5,1,6,2,4,3
4,6,5,1,3,2
1,3,2,4,6,5
3,5,4,6,2,1
2,4,3,5,1,6
1,6,5,3,2,4
3,2,1,5,4,6
6,5,4,2,1,3
5,4,3,1,6,2
2,1,6,4,3,5
4,3,2,6,5,1
6,4,5,3,1,2
4,2,3,1,5,6
5,3,4,2,6,1
2,6,1,5,3,4
3,1,2,6,4,5
1,5,6,4,2,3
2,3,4,1,6,5
4,5,6,3,2,1
5,6,1,4,3,2
3,4,5,2,1,6
6,1,2,5,4,3
1,2,3,6,5,4
3,5,2,4,1,6
2,4,1,3,6,5
1,3,6,2,5,4
5,1,4,6,3,2
6,2,5,1,4,3
4,6,3,5,2,1
1,2,4,3,6,5
2,3,5,4,1,6
4,5,1,6,3,2
3,4,6,5,2,1
5,6,2,1,4,3
6,1,3,2,5,4
1,3,6,2,4,5
2,4,1,3,5,6
6,2,5,1,3,4
4,6,3,5,1,2
5,1,4,6,2,3
3,5,1,2,6,4
1,3,5,6,4,2
2,4,6,1,5,3
5,1,3,4,2,6
4,6,2,3,1,5
6,2,4,5,3,1
3,5,1,2,6,4`,
  'Task Shuffler 2.0 - 7 stations.csv': `4,2,1,5,7,6,3
3,1,7,4,6,5,2
5,3,2,6,1,7,4
2,7,6,3,5,4,1
1,6,5,2,4,3,7
6,4,3,7,2,1,5
7,5,4,1,3,2,6
3,6,7,5,2,1,4
5,1,2,7,4,3,6
7,3,4,2,6,5,1
2,5,6,4,1,7,3
6,2,3,1,5,4,7
1,4,5,3,7,6,2
4,7,1,6,3,2,5
6,1,3,5,4,7,2
3,5,7,2,1,4,6
7,2,4,6,5,1,3
1,3,5,7,6,2,4
4,6,1,3,2,5,7
5,7,2,4,3,6,1
2,4,6,1,7,3,5
5,3,7,4,2,6,1
7,5,2,6,4,1,3
4,2,6,3,1,5,7
2,7,4,1,6,3,5
6,4,1,5,3,7,2
3,1,5,2,7,4,6
1,6,3,7,5,2,4
2,1,4,6,3,5,7
1,7,3,5,2,4,6
4,3,6,1,5,7,2
3,2,5,7,4,6,1
6,5,1,3,7,2,4
7,6,2,4,1,3,5
5,4,7,2,6,1,3
1,7,6,3,5,2,4
4,3,2,6,1,5,7
5,4,3,7,2,6,1
6,5,4,1,3,7,2
2,1,7,4,6,3,5
3,2,1,5,7,4,6
7,6,5,2,4,1,3
3,7,1,4,6,5,2
6,3,4,7,2,1,5
4,1,2,5,7,6,3
5,2,3,6,1,7,4
1,5,6,2,4,3,7
2,6,7,3,5,4,1
7,4,5,1,3,2,6
6,2,4,3,1,7,5
5,1,3,2,7,6,4
4,7,2,1,6,5,3
7,3,5,4,2,1,6
2,5,7,6,4,3,1
1,4,6,5,3,2,7
3,6,1,7,5,4,2
7,2,4,5,6,3,1
2,4,6,7,1,5,3
4,6,1,2,3,7,5
3,5,7,1,2,6,4
5,7,2,3,4,1,6
6,1,3,4,5,2,7
1,3,5,6,7,4,2
4,5,2,7,6,1,3
7,1,5,3,2,4,6
5,6,3,1,7,2,4
6,7,4,2,1,3,5
2,3,7,5,4,6,1
1,2,6,4,3,5,7
3,4,1,6,5,7,2`,
  'Task Shuffler 2.0 - 8 stations.csv': `8,4,3,1,5,2,6,7
2,6,5,3,7,4,8,1
6,2,1,7,3,8,4,5
5,1,8,6,2,7,3,4
3,7,6,4,8,5,1,2
1,5,4,2,6,3,7,8
4,8,7,5,1,6,2,3
7,3,2,8,4,1,5,6
8,6,5,3,7,2,1,4
6,4,3,1,5,8,7,2
5,3,2,8,4,7,6,1
1,7,6,4,8,3,2,5
3,1,8,6,2,5,4,7
7,5,4,2,6,1,8,3
4,2,1,7,3,6,5,8
2,8,7,5,1,4,3,6
4,7,3,8,6,2,5,1
6,1,5,2,8,4,7,3
2,5,1,6,4,8,3,7
7,2,6,3,1,5,8,4
3,6,2,7,5,1,4,8
8,3,7,4,2,6,1,5
1,4,8,5,3,7,2,6
5,8,4,1,7,3,6,2
6,2,3,4,1,5,8,7
8,4,5,6,3,7,2,1
4,8,1,2,7,3,6,5
3,7,8,1,6,2,5,4
1,5,6,7,4,8,3,2
5,1,2,3,8,4,7,6
2,6,7,8,5,1,4,3
7,3,4,5,2,6,1,8
5,2,1,8,6,4,3,7
4,1,8,7,5,3,2,6
3,8,7,6,4,2,1,5
8,5,4,3,1,7,6,2
1,6,5,4,2,8,7,3
6,3,2,1,7,5,4,8
7,4,3,2,8,6,5,1
2,7,6,5,3,1,8,4
5,8,7,6,1,2,4,3
8,3,2,1,4,5,7,6
3,6,5,4,7,8,2,1
7,2,1,8,3,4,6,5
4,7,6,5,8,1,3,2
6,1,8,7,2,3,5,4
2,5,4,3,6,7,1,8
1,4,3,2,5,6,8,7
2,6,7,1,8,4,5,3
3,7,8,2,1,5,6,4
7,3,4,6,5,1,2,8
6,2,3,5,4,8,1,7
8,4,5,7,6,2,3,1
1,5,6,8,7,3,4,2
4,8,1,3,2,6,7,5
5,1,2,4,3,7,8,6
2,7,3,8,5,6,1,4
7,4,8,5,2,3,6,1
4,1,5,2,7,8,3,6
8,5,1,6,3,4,7,2
5,2,6,3,8,1,4,7
6,3,7,4,1,2,5,8
3,8,4,1,6,7,2,5
1,6,2,7,4,5,8,3
5,7,8,3,2,1,6,4
3,5,6,1,8,7,4,2
2,4,5,8,7,6,3,1
1,3,4,7,6,5,2,8
7,1,2,5,4,3,8,6
6,8,1,4,3,2,7,5
4,6,7,2,1,8,5,3
8,2,3,6,5,4,1,7`,
  'Task Shuffler 2.0 - 9 stations.csv': `1,6,2,8,5,3,9,4,7
6,2,7,4,1,8,5,9,3
7,3,8,5,2,9,6,1,4
2,7,3,9,6,4,1,5,8
9,5,1,7,4,2,8,3,6
8,4,9,6,3,1,7,2,5
3,8,4,1,7,5,2,6,9
5,1,6,3,9,7,4,8,2
4,9,5,2,8,6,3,7,1
1,5,8,7,6,9,2,4,3
6,1,4,3,2,5,7,9,8
7,2,5,4,3,6,8,1,9
3,7,1,9,8,2,4,6,5
9,4,7,6,5,8,1,3,2
5,9,3,2,1,4,6,8,7
2,6,9,8,7,1,3,5,4
8,3,6,5,4,7,9,2,1
4,8,2,1,9,3,5,7,6
2,7,5,6,8,4,3,1,9
9,5,3,4,6,2,1,8,7
5,1,8,9,2,7,6,4,3
8,4,2,3,5,1,9,7,6
4,9,7,8,1,6,5,3,2
1,6,4,5,7,3,2,9,8
7,3,1,2,4,9,8,6,5
3,8,6,7,9,5,4,2,1
6,2,9,1,3,8,7,5,4
4,7,8,5,2,6,1,3,9
9,3,4,1,7,2,6,8,5
3,6,7,4,1,5,9,2,8
8,2,3,9,6,1,5,7,4
1,4,5,2,8,3,7,9,6
2,5,6,3,9,4,8,1,7
7,1,2,8,5,9,4,6,3
6,9,1,7,4,8,3,5,2
5,8,9,6,3,7,2,4,1
1,3,2,4,7,6,9,8,5
9,2,1,3,6,5,8,7,4
7,9,8,1,4,3,6,5,2
2,4,3,5,8,7,1,9,6
8,1,9,2,5,4,7,6,3
3,5,4,6,9,8,2,1,7
5,7,6,8,2,1,4,3,9
6,8,7,9,3,2,5,4,1
4,6,5,7,1,9,3,2,8
3,4,9,8,6,1,7,5,2
8,9,5,4,2,6,3,1,7
4,5,1,9,7,2,8,6,3
9,1,6,5,3,7,4,2,8
7,8,4,3,1,5,2,9,6
6,7,3,2,9,4,1,8,5
5,6,2,1,8,3,9,7,4
1,2,7,6,4,8,5,3,9
2,3,8,7,5,9,6,4,1
4,5,6,2,9,3,7,1,8
6,7,8,4,2,5,9,3,1
2,3,4,9,7,1,5,8,6
5,6,7,3,1,4,8,2,9
7,8,9,5,3,6,1,4,2
1,2,3,8,6,9,4,7,5
8,9,1,6,4,7,2,5,3
9,1,2,7,5,8,3,6,4
3,4,5,1,8,2,6,9,7
2,6,8,3,5,1,4,7,9
7,2,4,8,1,6,9,3,5
3,7,9,4,6,2,5,8,1
9,4,6,1,3,8,2,5,7
8,3,5,9,2,7,1,4,6
6,1,3,7,9,5,8,2,4
4,8,1,5,7,3,6,9,2
5,9,2,6,8,4,7,1,3
1,5,7,2,4,9,3,6,8`,
  'Task Shuffler 2.0 - 10 stations.csv': `5,4,7,2,1,6,10,8,3,9
1,10,3,8,7,2,6,4,9,5
10,9,2,7,6,1,5,3,8,4
9,8,1,6,5,10,4,2,7,3
2,1,4,9,8,3,7,5,10,6
8,7,10,5,4,9,3,1,6,2
6,5,8,3,2,7,1,9,4,10
3,2,5,10,9,4,8,6,1,7
4,3,6,1,10,5,9,7,2,8
7,6,9,4,3,8,2,10,5,1
8,1,3,10,6,2,7,5,4,9
6,9,1,8,4,10,5,3,2,7
2,5,7,4,10,6,1,9,8,3
1,4,6,3,9,5,10,8,7,2
3,6,8,5,1,7,2,10,9,4
5,8,10,7,3,9,4,2,1,6
4,7,9,6,2,8,3,1,10,5
9,2,4,1,7,3,8,6,5,10
10,3,5,2,8,4,9,7,6,1
7,10,2,9,5,1,6,4,3,8
2,1,9,5,7,6,8,3,4,10
9,8,6,2,4,3,5,10,1,7
10,9,7,3,5,4,6,1,2,8
5,4,2,8,10,9,1,6,7,3
6,5,3,9,1,10,2,7,8,4
1,10,8,4,6,5,7,2,3,9
8,7,5,1,3,2,4,9,10,6
4,3,1,7,9,8,10,5,6,2
7,6,4,10,2,1,3,8,9,5
3,2,10,6,8,7,9,4,5,1
10,3,4,1,5,9,7,8,2,6
4,7,8,5,9,3,1,2,6,10
3,6,7,4,8,2,10,1,5,9
1,4,5,2,6,10,8,9,3,7
5,8,9,6,10,4,2,3,7,1
2,5,6,3,7,1,9,10,4,8
8,1,2,9,3,7,5,6,10,4
7,10,1,8,2,6,4,5,9,3
9,2,3,10,4,8,6,7,1,5
6,9,10,7,1,5,3,4,8,2
8,4,7,1,2,3,9,6,10,5
2,8,1,5,6,7,3,10,4,9
9,5,8,2,3,4,10,7,1,6
10,6,9,3,4,5,1,8,2,7
1,7,10,4,5,6,2,9,3,8
6,2,5,9,10,1,7,4,8,3
3,9,2,6,7,8,4,1,5,10
7,3,6,10,1,2,8,5,9,4
4,10,3,7,8,9,5,2,6,1
5,1,4,8,9,10,6,3,7,2
9,2,1,6,8,5,10,4,3,7
6,9,8,3,5,2,7,1,10,4
10,3,2,7,9,6,1,5,4,8
4,7,6,1,3,10,5,9,8,2
5,8,7,2,4,1,6,10,9,3
7,10,9,4,6,3,8,2,1,5
2,5,4,9,1,8,3,7,6,10
3,6,5,10,2,9,4,8,7,1
1,4,3,8,10,7,2,6,5,9
8,1,10,5,7,4,9,3,2,6
5,10,8,2,6,3,1,4,9,7
2,7,5,9,3,10,8,1,6,4
7,2,10,4,8,5,3,6,1,9
1,6,4,8,2,9,7,10,5,3
3,8,6,10,4,1,9,2,7,5
8,3,1,5,9,6,4,7,2,10
6,1,9,3,7,4,2,5,10,8
9,4,2,6,10,7,5,8,3,1
4,9,7,1,5,2,10,3,8,6
10,5,3,7,1,8,6,9,4,2`,
  'Task Shuffler 2.0 - 11 stations.csv': `8,5,11,10,2,3,4,7,1,9,6
5,2,8,7,10,11,1,4,9,6,3
1,9,4,3,6,7,8,11,5,2,10
6,3,9,8,11,1,2,5,10,7,4
7,4,10,9,1,2,3,6,11,8,5
2,10,5,4,7,8,9,1,6,3,11
4,1,7,6,9,10,11,3,8,5,2
11,8,3,2,5,6,7,10,4,1,9
3,11,6,5,8,9,10,2,7,4,1
9,6,1,11,3,4,5,8,2,10,7
10,7,2,1,4,5,6,9,3,11,8
11,3,10,8,2,6,9,7,1,4,5
5,8,4,2,7,11,3,1,6,9,10
6,9,5,3,8,1,4,2,7,10,11
4,7,3,1,6,10,2,11,5,8,9
8,11,7,5,10,3,6,4,9,1,2
1,4,11,9,3,7,10,8,2,5,6
2,5,1,10,4,8,11,9,3,6,7
9,1,8,6,11,4,7,5,10,2,3
7,10,6,4,9,2,5,3,8,11,1
3,6,2,11,5,9,1,10,4,7,8
10,2,9,7,1,5,8,6,11,3,4
9,7,4,10,3,11,2,8,5,6,1
2,11,8,3,7,4,6,1,9,10,5
8,6,3,9,2,10,1,7,4,5,11
3,1,9,4,8,5,7,2,10,11,6
5,3,11,6,10,7,9,4,1,2,8
1,10,7,2,6,3,5,11,8,9,4
6,4,1,7,11,8,10,5,2,3,9
4,2,10,5,9,6,8,3,11,1,7
11,9,6,1,5,2,4,10,7,8,3
10,8,5,11,4,1,3,9,6,7,2
7,5,2,8,1,9,11,6,3,4,10
6,7,10,9,2,3,1,5,4,11,8
2,3,6,5,9,10,8,1,11,7,4
5,6,9,8,1,2,11,4,3,10,7
9,10,2,1,5,6,4,8,7,3,11
8,9,1,11,4,5,3,7,6,2,10
3,4,7,6,10,11,9,2,1,8,5
10,11,3,2,6,7,5,9,8,4,1
7,8,11,10,3,4,2,6,5,1,9
4,5,8,7,11,1,10,3,2,9,6
11,1,4,3,7,8,6,10,9,5,2
1,2,5,4,8,9,7,11,10,6,3
10,5,8,2,1,11,9,4,6,3,7
4,10,2,7,6,5,3,9,11,8,1
5,11,3,8,7,6,4,10,1,9,2
3,9,1,6,5,4,2,8,10,7,11
8,3,6,11,10,9,7,2,4,1,5
11,6,9,3,2,1,10,5,7,4,8
1,7,10,4,3,2,11,6,8,5,9
7,2,5,10,9,8,6,1,3,11,4
9,4,7,1,11,10,8,3,5,2,6
2,8,11,5,4,3,1,7,9,6,10
6,1,4,9,8,7,5,11,2,10,3
4,2,1,7,9,10,11,3,8,5,6
11,9,8,3,5,6,7,10,4,1,2
8,6,5,11,2,3,4,7,1,9,10
6,4,3,9,11,1,2,5,10,7,8
7,5,4,10,1,2,3,6,11,8,9
9,7,6,1,3,4,5,8,2,10,11
10,8,7,2,4,5,6,9,3,11,1
5,3,2,8,10,11,1,4,9,6,7
2,11,10,5,7,8,9,1,6,3,4
3,1,11,6,8,9,10,2,7,4,5
1,10,9,4,6,7,8,11,5,2,3
11,9,8,10,7,6,5,4,3,1,2
2,1,3,5,4,8,6,7,9,10,11
7,4,5,11,2,10,9,8,6,3,1
8,5,6,1,3,11,10,9,7,4,2`,
  'Task Shuffler 2.0 - 12 stations.csv': `7,5,1,6,3,11,2,4,10,12,8,9
5,3,11,4,1,9,12,2,8,10,6,7
9,7,3,8,5,1,4,6,12,2,10,11
1,11,7,12,9,5,8,10,4,6,2,3
4,2,10,3,12,8,11,1,7,9,5,6
6,4,12,5,2,10,1,3,9,11,7,8
11,9,5,10,7,3,6,8,2,4,12,1
3,1,9,2,11,7,10,12,6,8,4,5
12,10,6,11,8,4,7,9,3,5,1,2
10,8,4,9,6,2,5,7,1,3,11,12
8,6,2,7,4,12,3,5,11,1,9,10
2,12,8,1,10,6,9,11,5,7,3,4
4,8,9,10,2,5,11,6,12,3,1,7
10,2,3,4,8,11,5,12,6,9,7,1
6,10,11,12,4,7,1,8,2,5,3,9
1,5,6,7,11,2,8,3,9,12,10,4
7,11,12,1,5,8,2,9,3,6,4,10
2,6,7,8,12,3,9,4,10,1,11,5
5,9,10,11,3,6,12,7,1,4,2,8
3,7,8,9,1,4,10,5,11,2,12,6
8,12,1,2,6,9,3,10,4,7,5,11
11,3,4,5,9,12,6,1,7,10,8,2
12,4,5,6,10,1,7,2,8,11,9,3
9,1,2,3,7,10,4,11,5,8,6,12
1,7,10,11,3,9,5,6,2,12,4,8
11,5,8,9,1,7,3,4,12,10,2,6
5,11,2,3,7,1,9,10,6,4,8,12
6,12,3,4,8,2,10,11,7,5,9,1
2,8,11,12,4,10,6,7,3,1,5,9
7,1,4,5,9,3,11,12,8,6,10,2
9,3,6,7,11,5,1,2,10,8,12,4
12,6,9,10,2,8,4,5,1,11,3,7
10,4,7,8,12,6,2,3,11,9,1,5
4,10,1,2,6,12,8,9,5,3,7,11
3,9,12,1,5,11,7,8,4,2,6,10
8,2,5,6,10,4,12,1,9,7,11,3
12,8,6,3,4,7,2,10,5,11,1,9
2,10,8,5,6,9,4,12,7,1,3,11
11,7,5,2,3,6,1,9,4,10,12,8
4,12,10,7,8,11,6,2,9,3,5,1
9,5,3,12,1,4,11,7,2,8,10,6
8,4,2,11,12,3,10,6,1,7,9,5
6,2,12,9,10,1,8,4,11,5,7,3
3,11,9,6,7,10,5,1,8,2,4,12
1,9,7,4,5,8,3,11,6,12,2,10
10,6,4,1,2,5,12,8,3,9,11,7
5,1,11,8,9,12,7,3,10,4,6,2
7,3,1,10,11,2,9,5,12,6,8,4
10,9,6,3,7,1,2,12,4,11,5,8
8,7,4,1,5,11,12,10,2,9,3,6
4,3,12,9,1,7,8,6,10,5,11,2
2,1,10,7,11,5,6,4,8,3,9,12
1,12,9,6,10,4,5,3,7,2,8,11
7,6,3,12,4,10,11,9,1,8,2,5
11,10,7,4,8,2,3,1,5,12,6,9
9,8,5,2,6,12,1,11,3,10,4,7
12,11,8,5,9,3,4,2,6,1,7,10
5,4,1,10,2,8,9,7,11,6,12,3
3,2,11,8,12,6,7,5,9,4,10,1
6,5,2,11,3,9,10,8,12,7,1,4
12,7,5,6,1,3,8,2,4,10,11,9
1,8,6,7,2,4,9,3,5,11,12,10
10,5,3,4,11,1,6,12,2,8,9,7
7,2,12,1,8,10,3,9,11,5,6,4
5,12,10,11,6,8,1,7,9,3,4,2
4,11,9,10,5,7,12,6,8,2,3,1
2,9,7,8,3,5,10,4,6,12,1,11
6,1,11,12,7,9,2,8,10,4,5,3
11,6,4,5,12,2,7,1,3,9,10,8
3,10,8,9,4,6,11,5,7,1,2,12
8,3,1,2,9,11,4,10,12,6,7,5
9,4,2,3,10,12,5,11,1,7,8,6`
};

function App() {
  const [screen, setScreen] = useState('home'); // 'home' or 'results'
  const [participantsInput, setParticipantsInput] = useState('');
  const [stationsInput, setStationsInput] = useState('');
  const [parsedParticipants, setParsedParticipants] = useState([]);
  const [parsedStations, setParsedStations] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [shuffledAssignments, setShuffledAssignments] = useState([]); // [{ name: 'Participant', assignments: [s1, s2, s3] }]
  const [message, setMessage] = useState({ text: '', type: '' }); // { text: '...', type: 'success' | 'error' }
  const [patterns, setPatterns] = useState({});
  const [showResetConfirm, setShowResetConfirm] = useState(false); // State for reset confirmation modal
  const [fontSize, setFontSize] = useState(16); // Default font size for participant names
  const [numColumns, setNumColumns] = useState(3); // Default number of columns for station display
  const [showInfoModal, setShowInfoModal] = useState(false); // New state for info modal
  const [showHomeConfirm, setShowHomeConfirm] = useState(false); // New state for "Home" confirmation modal

  // Effect to parse CSV patterns when the component mounts
  useEffect(() => {
    const parsed = {};
    for (const fileName in rawCsvPatterns) {
      const numStations = parseInt(fileName.match(/(\d+)\sstations\.csv/)[1]);
      if (numStations) {
        parsed[numStations] = rawCsvPatterns[fileName].trim().split('\n').map(row =>
          row.split(',').map(Number)
        );
      }
    }
    setPatterns(parsed);
  }, []);

  // Utility function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Function to display messages to the user
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000); // Clear message after 5 seconds
  };

  // Handles the "Generate groups" button click
  const handleGenerateGroups = () => {
    // 1. Parse inputs - now splitting by line breaks
    const participants = participantsInput.split('\n').map(p => p.trim()).filter(p => p !== '');
    const stations = stationsInput.split('\n').map(s => s.trim()).filter(s => s !== '');

    // 2. Validate inputs
    if (participants.length === 0 || stations.length === 0) {
      showMessage('Please enter participants and stations.', 'error');
      return;
    }
    if (participants.length > 70) {
      showMessage('Maximum 70 participants allowed.', 'error');
      return;
    }
    if (stations.length < 3 || stations.length > 12) {
      showMessage('Please enter between 3 and 12 stations.', 'error');
      return;
    }

    // 3. Get the correct pattern based on the number of stations
    const stationPattern = patterns[stations.length];
    if (!stationPattern) {
      showMessage(`No pattern found for ${stations.length} stations.`, 'error');
      return;
    }

    // 4. Randomize participants
    const shuffledParticipants = shuffleArray(participants);

    // 5. Assign stations to participants based on the pattern
    const assignments = [];
    // The number of rounds is the length of the pattern row, which is equal to the number of stations
    const numRounds = stations.length; // This variable is used here and implicitly in renderResultsScreen via parsedStations.length

    shuffledParticipants.forEach((participant, pIndex) => {
      // Use modulo to cycle through the pattern rows if there are more participants than pattern rows
      const patternRowIndex = pIndex % stationPattern.length;
      const participantPattern = stationPattern[patternRowIndex];

      const participantAssignments = participantPattern.map(stationNumber => {
        // Map the station number from the pattern to the user-defined station name
        // Station numbers in CSV are 1-indexed, so subtract 1 for array index
        return stations[stationNumber - 1];
      });
      assignments.push({ name: participant, assignments: participantAssignments });
    });

    setParsedParticipants(shuffledParticipants); // This state is used in the grouping logic
    setParsedStations(stations);
    setShuffledAssignments(assignments);
    setCurrentRound(1); // Start from round 1
    // Set initial columns based on number of stations, but cap at a reasonable max (e.g., 6)
    setNumColumns(Math.min(stations.length, 4)); // Default to 4 columns or less if fewer stations
    setScreen('results');
    showMessage('Groups generated successfully!', 'success');
  };

  // Handles moving to the next round
  const handleNextRound = () => {
    if (currentRound < parsedStations.length) {
      setCurrentRound(prev => prev + 1);
    } else {
      showMessage('This is the last round!', 'info');
    }
  };

  // Handles moving to the previous round
  const handlePreviousRound = () => {
    if (currentRound > 1) {
      setCurrentRound(prev => prev - 1);
    } else {
      showMessage('This is the first round!', 'info');
    }
  };

  // Function to go back to home screen without clearing data
  const handleGoHomeConfirmed = () => {
    setScreen('home');
    setShowHomeConfirm(false); // Close the modal
    // Data in participantsInput and stationsInput is intentionally retained
    // Other states like parsedParticipants, parsedStations, shuffledAssignments
    // are also kept, so if the user generates groups again, it uses the same data
    // unless inputs are changed.
  };

  // Initiates the "Home" confirmation modal
  const handleBackToHome = () => {
    setShowHomeConfirm(true);
  };

  // Initiates the full reset confirmation modal
  const confirmFullReset = () => {
    setShowResetConfirm(true);
  };

  // Handles the actual full reset if confirmed
  const handleFullReset = () => {
    setScreen('home');
    setParticipantsInput('');
    setStationsInput('');
    setParsedParticipants([]);
    setParsedStations([]);
    setShuffledAssignments([]);
    setCurrentRound(1);
    setMessage({ text: '', type: '' });
    setShowResetConfirm(false); // Close the modal
    setFontSize(16); // Reset font size
    setNumColumns(3); // Reset columns
  };

  // Render the home screen
  const renderHomeScreen = () => (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg max-w-2xl w-full relative"> {/* Added relative for positioning info icon */}
      {/* Info Icon */}
      <button
        onClick={() => setShowInfoModal(true)}
        className="absolute top-4 right-4 p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200"
        aria-label="App Information"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>
      </button>

      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Arpoja</h2>

      {message.text && (
        <div className={`mb-4 p-3 rounded-lg w-full text-center
          ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <div className="w-full mb-6">
        <label htmlFor="participants" className="block text-lg font-semibold text-gray-700 mb-2">
          Participants (max 70, separated by line breaks)
        </label>
        <textarea
          id="participants"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y min-h-[100px]"
          placeholder="e.g., Huey&#10;Dewey&#10;Louie..."
          value={participantsInput}
          onChange={(e) => setParticipantsInput(e.target.value)}
          rows="3"
        ></textarea>
      </div>

      <div className="w-full mb-8">
        <label htmlFor="stations" className="block text-lg font-semibold text-gray-700 mb-2">
          Stations (3-12, separated by line breaks)
        </label>
        <textarea
          id="stations"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y min-h-[80px]"
          placeholder="e.g., Dribbling&#10;Passing&#10;Shooting..."
          value={stationsInput}
          onChange={(e) => setStationsInput(e.target.value)}
          rows="3"
        ></textarea>
      </div>

      <button
        onClick={handleGenerateGroups}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Generate Groups
      </button>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">About Arpoja</h3>
            <p className="text-gray-700 mb-4">
              Arpoja is a special group generator for station-based activities. The participants rotate across stations in a randomized order while interacting with new people in every round. 
            </p>
            <p className="text-gray-700 mb-2 font-semibold">
              Use Arpoja to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Assign students to station activities in PE or sports practice</li>
              <li>Form new groups for team-building games</li>
              <li>Shuffle participants for brainstorming sessions with your team</li>
              <li>Divide household chores randomly</li>
              <li>Any scenario involving up to 70 participants and 12 stations...</li>

            </ul>
          </div>
        </div>
      )}
    </div>
  );

  // Render the results screen
  const renderResultsScreen = () => {
    // Group participants by their assigned station for the current round
    const groupedByStation = parsedStations.reduce((acc, stationName) => {
      acc[stationName] = [];
      return acc;
    }, {});

    shuffledAssignments.forEach(assignment => {
      const stationForCurrentRound = assignment.assignments[currentRound - 1];
      if (groupedByStation[stationForCurrentRound]) {
        groupedByStation[stationForCurrentRound].push(assignment.name);
      }
    });

    // Determine the grid class dynamically
    const getGridColsClass = (cols) => {
      if (cols === 1) return 'grid-cols-1';
      if (cols === 2) return 'grid-cols-2';
      if (cols === 3) return 'grid-cols-3';
      if (cols === 4) return 'grid-cols-4';
      if (cols === 5) return 'grid-cols-5';
      if (cols === 6) return 'grid-cols-6';
      return 'grid-cols-3'; // Default
    };


    return (
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
          Round {currentRound} / {parsedStations.length}
        </h2>

        {message.text && (
          <div className={`mb-4 p-3 rounded-lg w-full text-center
            ${message.type === 'error' ? 'bg-red-100 text-red-700' : message.type === 'info' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        {/* Station Groups */}
        <div className={`w-full grid ${getGridColsClass(numColumns)} gap-6 mb-8`}>
          {parsedStations.map((stationName, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
              <h3 className="text-xl font-bold text-blue-700 mb-3 text-center">{stationName}</h3>
              <div className="w-full bg-white border border-gray-300 rounded-md p-3 min-h-[100px] max-h-[200px] overflow-y-auto">
                {groupedByStation[stationName].length > 0 ? (
                  <ul className="list-none p-0 m-0">
                    {groupedByStation[stationName].map((participant, pIdx) => (
                      <li key={pIdx} className="text-gray-800 mb-1" style={{ fontSize: `${fontSize}px` }}>
                        {participant}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">No participants assigned</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full mb-6">
          <button
            onClick={handlePreviousRound}
            disabled={currentRound === 1}
            className={`flex-1 ${currentRound === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
          >
            ← Back
          </button>
          <button
            onClick={handleNextRound}
            disabled={currentRound === parsedStations.length}
            className={`flex-1 ${currentRound === parsedStations.length ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75`}
          >
            Next Round →
          </button>
          {/* This button will now trigger the confirmation modal */}
          <button
            onClick={handleBackToHome}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            Home
          </button>
          {/* The Reset button is removed as per your request */}
        </div>

        {/* Font Size and Columns Sliders */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full max-w-xl">
          <div className="flex items-center gap-2 w-full sm:w-1/2">
            <label htmlFor="fontSize" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Text Size:
            </label>
            <input
              type="range"
              id="fontSize"
              min="6"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-700 text-sm">{fontSize}px</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-1/2">
            <label htmlFor="numColumns" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Columns:
            </label>
            <input
              type="range"
              id="numColumns"
              min="1"
              max={Math.min(parsedStations.length, 6)} // Max columns up to 6 or number of stations
              value={numColumns}
              onChange={(e) => setNumColumns(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-700 text-sm">{numColumns}</span>
          </div>
        </div>

        {/* Home Confirmation Modal */}
        {showHomeConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
              <p className="text-xl font-semibold text-gray-800 mb-6">Going back home. Are you finished with these stations?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleGoHomeConfirmed}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowHomeConfirm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Confirmation Modal (still exists for internal use if needed, but no button) */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
              <p className="text-xl font-semibold text-gray-800 mb-6">All data will be cleared, do you want to continue?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleFullReset} // Calls the actual reset
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4 font-sans">
      {screen === 'home' ? renderHomeScreen() : renderResultsScreen()}
    </div>
  );
}

export default App;
