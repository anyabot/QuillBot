var expTable = [
  [
     32,  33,  35,  35,  37,  39,  39,  41,  42,  85,  88,  92,
     95,  98, 102, 105, 108, 112, 115, 170, 176, 183, 190, 197,
    203, 210, 217, 224, 230,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0
  ],
  [
     35,  37,  38,  39,  40,  43,  43,  45,  46,  94,  97, 101,
    104, 108, 112, 116, 119, 123, 126, 187, 194, 201, 209, 217,
    223, 231, 239, 246, 253, 312, 323, 336, 347, 361, 373, 385,
    398, 409, 424,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0
  ],
  [
     38,   40,   42,   42,   44,   47,  47,  49,  51, 102, 105, 111,
    114,  117,  123,  126,  129,  135, 138, 204, 211, 219, 228, 237,
    243,  252,  261,  269,  276,  339, 353, 366, 379, 394, 407, 420,
    434,  446,  462,  678,  705,  732, 759, 788, 812, 841, 868, 895,
    922, 1017, 1057, 1098, 1140, 1180,   0,   0,   0,   0,   0,   0,
      0,    0,    0,    0,    0,    0,   0,   0,   0,   0,   0,   0,
      0,    0,    0,    0,    0,    0,   0,   0,   0,   0,   0,   0,
      0,    0,    0,    0,    0,    0,   0,   0,   0,   0,   0,   0,
      0,    0
  ],
  [
      42,   43,   45,   46,   48,   50,   51,   53,   55,  110,
     115,  119,  124,  127,  133,  136,  141,  145,  150,  221,
     229,  238,  247,  256,  264,  273,  282,  291,  299,  368,
     382,  397,  410,  427,  440,  455,  471,  484,  500,  735,
     763,  793,  823,  852,  881,  911,  940,  970,  998, 1102,
    1146, 1189, 1235, 1278, 1322, 1365, 1411, 1454, 1498, 1469,
    1527, 1588, 1644, 1705, 1762, 1822, 1879, 1940, 1998, 1836,
    1909, 1983, 2057, 2130, 2204, 2276, 2350, 2424, 2497, 2571,
    2673, 2777, 2879, 2981, 3085, 3188, 3290, 3393, 3497, 2570,
    2674, 2776, 2879, 2983, 3084, 3187, 3291, 3393
  ],
  [
      45,   46,   49,   49,   52,   54,   55,   57,   59,  119,
     123,  129,  133,  137,  143,  147,  151,  157,  161,  238,
     247,  256,  266,  276,  284,  294,  304,  313,  322,  396,
     412,  427,  442,  460,  474,  490,  507,  521,  539,  791,
     822,  854,  886,  918,  948,  981, 1013, 1044, 1075, 1187,
    1234, 1281, 1330, 1376, 1424, 1470, 1519, 1566, 1613, 1582,
    1645, 1710, 1771, 1835, 1898, 1962, 2024, 2089, 2152, 1977,
    2056, 2135, 2215, 2295, 2373, 2451, 2531, 2610, 2689, 2769,
    2879, 2990, 3101, 3210, 3323, 3432, 3544, 3654, 3766, 2768,
    2879, 2989, 3101, 3212, 3322, 3432, 3544, 3654
  ],
  [
      45,   46,   49,   49,   52,   54,   55,   57,   59,  119,
     123,  129,  133,  137,  143,  147,  151,  157,  161,  238,
     247,  256,  266,  276,  284,  294,  304,  313,  322,  396,
     412,  427,  442,  460,  474,  490,  507,  521,  539,  791,
     822,  854,  886,  918,  948,  981, 1013, 1044, 1075, 1187,
    1234, 1281, 1330, 1376, 1424, 1470, 1519, 1566, 1613, 1582,
    1645, 1710, 1771, 1835, 1898, 1962, 2024, 2089, 2152, 1977,
    2056, 2135, 2215, 2295, 2373, 2451, 2531, 2610, 2689, 2769,
    2879, 2990, 3101, 3210, 3323, 3432, 3544, 3654, 3766, 2768,
    2879, 2989, 3101, 3212, 3322, 3432, 3544, 3654
  ],
  [
      48,   50,   52,   53,   55,   59,   58,   62,   63,  127,
     132,  138,  143,  147,  153,  157,  162,  168,  173,  255,
     264,  274,  285,  296,  304,  315,  326,  336,  345,  424,
     441,  458,  474,  492,  508,  525,  543,  558,  578,  847,
     881,  915,  949,  984, 1016, 1051, 1085, 1119, 1152, 1272,
    1321, 1373, 1425, 1474, 1526, 1575, 1627, 1679, 1728, 1695,
    1762, 1832, 1897, 1967, 2034, 2101, 2169, 2238, 2306, 2118,
    2203, 2288, 2373, 2458, 2543, 2626, 2712, 2796, 2882, 2967,
    3084, 3204, 3322, 3440, 3559, 3678, 3797, 3915, 4035, 2965,
    3086, 3202, 3323, 3441, 3559, 3677, 3798, 3915
  ]
]

exports.expTable = expTable;