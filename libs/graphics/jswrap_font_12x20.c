/*
 * This file is part of Espruino, a JavaScript interpreter for Microcontrollers
 *
 * Copyright (C) 2013 Gordon Williams <gw@pur3.co.uk>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * ----------------------------------------------------------------------------
 * This file is designed to be parsed during the build process
 *
 * Contains Custom Fonts
 * ----------------------------------------------------------------------------
 */

#include "jswrap_font_12x20.h"
#include "jswrap_graphics.h"

// Generated from "+FONTFILE+" at https://github.com/Tecate/bitmap-fonts
// -xos4-Terminus-Bold-R-Normal--24-240-72-72-C-120-ISO10646-1// BOUNDINGBOX 12 24 0 -5// _ASCENT 19// _DESCENT 5
// Charset ISO10646
// ter-u24b
// Copyright "Copyright (C) 2014 Dimitar Toshkov Zhekov"


static const unsigned char fontBitmap[] = {
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127,
231, 7, 254, 112, 0, 0, 15, 128, 0, 248, 0, 0, 0, 0, 0, 0,
15, 128, 0, 248, 0, 0, 0, 0, 4, 16, 0, 65, 0, 127, 255, 7,
255, 240, 4, 16, 0, 65, 0, 127, 255, 7, 255, 240, 4, 16, 0, 65,
0, 0, 0, 0, 224, 128, 31, 12, 3, 24, 96, 32, 130, 15, 255, 248,
255, 255, 130, 8, 32, 48, 198, 1, 135, 192, 8, 56, 0, 0, 0, 24,
0, 3, 192, 48, 36, 15, 3, 195, 192, 24, 240, 0, 60, 96, 15, 15,
3, 192, 144, 48, 15, 0, 0, 96, 0, 0, 0, 3, 192, 28, 126, 3,
236, 48, 99, 129, 4, 24, 16, 99, 195, 3, 230, 96, 28, 60, 0, 15,
240, 0, 195, 0, 0, 0, 248, 0, 15, 128, 0, 0, 0, 0, 127, 0,
31, 252, 3, 128, 224, 96, 3, 4, 0, 16, 0, 0, 4, 0, 16, 96,
3, 3, 128, 224, 31, 252, 0, 127, 0, 0, 0, 0, 8, 0, 8, 136,
0, 201, 128, 6, 176, 0, 62, 0, 1, 192, 0, 62, 0, 6, 176, 0,
201, 128, 8, 136, 0, 8, 0, 0, 0, 0, 8, 0, 0, 128, 0, 8,
0, 0, 128, 0, 255, 128, 15, 248, 0, 8, 0, 0, 128, 0, 8, 0,
0, 128, 0, 0, 0, 0, 0, 128, 0, 248, 0, 15, 0, 0, 0, 0,
128, 0, 8, 0, 0, 128, 0, 8, 0, 0, 128, 0, 8, 0, 0, 128,
0, 8, 0, 0, 128, 0, 8, 0, 0, 0, 0, 0, 112, 0, 7, 0,
0, 0, 0, 3, 0, 0, 240, 0, 60, 0, 15, 0, 3, 192, 0, 240,
0, 60, 0, 3, 0, 0, 0, 0, 1, 255, 192, 63, 254, 6, 3, 48,
64, 97, 4, 12, 16, 65, 129, 4, 48, 16, 102, 3, 3, 255, 224, 31,
252, 0, 0, 0, 8, 1, 1, 128, 16, 48, 1, 7, 255, 240, 127, 255,
0, 0, 16, 0, 1, 0, 0, 16, 0, 0, 1, 192, 48, 60, 7, 6,
0, 208, 64, 25, 4, 3, 16, 64, 97, 4, 12, 16, 97, 129, 3, 240,
16, 30, 1, 0, 0, 0, 16, 4, 3, 0, 96, 96, 3, 4, 8, 16,
64, 129, 4, 8, 16, 64, 129, 6, 28, 48, 63, 126, 1, 227, 192, 0,
0, 0, 7, 128, 0, 248, 0, 24, 128, 3, 8, 0, 96, 128, 12, 8,
1, 128, 128, 48, 8, 7, 255, 240, 127, 255, 0, 0, 0, 127, 4, 7,
240, 96, 65, 3, 4, 16, 16, 65, 1, 4, 16, 16, 65, 1, 4, 24,
48, 64, 254, 4, 7, 192, 0, 0, 1, 255, 192, 63, 254, 6, 16, 48,
65, 1, 4, 16, 16, 65, 1, 4, 16, 16, 65, 131, 4, 15, 224, 0,
124, 0, 0, 0, 112, 0, 7, 0, 0, 64, 0, 4, 0, 0, 64, 31,
4, 7, 240, 65, 224, 4, 120, 0, 126, 0, 7, 128, 0, 0, 0, 1,
227, 192, 63, 126, 6, 28, 48, 64, 129, 4, 8, 16, 64, 129, 4, 8,
16, 97, 195, 3, 247, 224, 30, 60, 0, 0, 0, 31, 0, 3, 248, 16,
96, 193, 4, 4, 16, 64, 65, 4, 4, 16, 64, 65, 6, 4, 48, 63,
254, 1, 255, 192, 0, 0, 0, 112, 224, 7, 14, 0, 0, 0, 0, 0,
128, 112, 248, 7, 15, 0, 0, 0, 0, 128, 0, 28, 0, 3, 96, 0,
99, 0, 12, 24, 1, 128, 192, 48, 6, 6, 0, 48, 64, 1, 0, 0,
0, 2, 16, 0, 33, 0, 2, 16, 0, 33, 0, 2, 16, 0, 33, 0,
2, 16, 0, 33, 0, 2, 16, 0, 33, 0, 0, 0, 4, 0, 16, 96,
3, 3, 0, 96, 24, 12, 0, 193, 128, 6, 48, 0, 54, 0, 1, 192,
0, 8, 0, 0, 0, 1, 192, 0, 60, 0, 6, 0, 0, 64, 0, 4,
6, 112, 64, 231, 4, 24, 0, 99, 0, 3, 224, 0, 28, 0, 0, 0,
0, 31, 252, 3, 255, 224, 96, 3, 4, 0, 16, 67, 225, 4, 127, 16,
76, 25, 4, 128, 144, 104, 9, 3, 255, 144, 31, 249, 0, 0, 0, 31,
255, 3, 255, 240, 96, 64, 4, 4, 0, 64, 64, 4, 4, 0, 64, 64,
6, 4, 0, 63, 255, 1, 255, 240, 0, 0, 7, 255, 240, 127, 255, 4,
16, 16, 65, 1, 4, 16, 16, 65, 1, 4, 16, 16, 99, 131, 3, 239,
224, 28, 124, 0, 0, 0, 31, 252, 3, 255, 224, 96, 3, 4, 0, 16,
64, 1, 4, 0, 16, 64, 1, 6, 0, 48, 56, 14, 1, 128, 192, 0,
0, 7, 255, 240, 127, 255, 4, 0, 16, 64, 1, 4, 0, 16, 64, 1,
4, 0, 16, 96, 3, 3, 255, 224, 31, 252, 0, 0, 0, 127, 255, 7,
255, 240, 64, 129, 4, 8, 16, 64, 129, 4, 8, 16, 64, 129, 4, 8,
16, 64, 1, 4, 0, 16, 0, 0, 7, 255, 240, 127, 255, 4, 8, 0,
64, 128, 4, 8, 0, 64, 128, 4, 8, 0, 64, 128, 4, 0, 0, 64,
0, 0, 0, 0, 31, 252, 3, 255, 224, 96, 3, 4, 0, 16, 64, 1,
4, 8, 16, 64, 129, 6, 8, 48, 56, 254, 1, 143, 192, 0, 0, 7,
255, 240, 127, 255, 0, 8, 0, 0, 128, 0, 8, 0, 0, 128, 0, 8,
0, 0, 128, 7, 255, 240, 127, 255, 0, 0, 0, 64, 1, 4, 0, 16,
127, 255, 7, 255, 240, 64, 1, 4, 0, 16, 0, 0, 0, 1, 192, 0,
30, 0, 0, 48, 0, 1, 0, 0, 16, 64, 1, 4, 0, 48, 127, 254,
7, 255, 192, 64, 0, 4, 0, 0, 0, 0, 7, 255, 240, 127, 255, 0,
28, 0, 3, 96, 0, 99, 0, 12, 24, 1, 128, 192, 48, 6, 6, 0,
48, 64, 1, 0, 0, 0, 127, 255, 7, 255, 240, 0, 1, 0, 0, 16,
0, 1, 0, 0, 16, 0, 1, 0, 0, 16, 0, 1, 0, 0, 16, 0,
0, 7, 255, 240, 63, 255, 1, 128, 0, 12, 0, 0, 96, 0, 3, 0,
0, 96, 0, 12, 0, 1, 128, 0, 63, 255, 7, 255, 240, 0, 0, 7,
255, 240, 127, 255, 0, 96, 0, 3, 0, 0, 24, 0, 0, 192, 0, 6,
0, 0, 48, 7, 255, 240, 127, 255, 0, 0, 0, 31, 252, 3, 255, 224,
96, 3, 4, 0, 16, 64, 1, 4, 0, 16, 64, 1, 6, 0, 48, 63,
254, 1, 255, 192, 0, 0, 7, 255, 240, 127, 255, 4, 8, 0, 64, 128,
4, 8, 0, 64, 128, 4, 8, 0, 97, 128, 3, 240, 0, 30, 0, 0,
0, 0, 31, 252, 3, 255, 224, 96, 3, 4, 0, 16, 64, 5, 4, 0,
112, 64, 3, 6, 0, 56, 63, 254, 193, 255, 196, 0, 0, 7, 255, 240,
127, 255, 4, 12, 0, 64, 224, 4, 11, 0, 64, 152, 4, 8, 192, 97,
134, 3, 240, 48, 30, 1, 0, 0, 0, 30, 4, 3, 240, 96, 97, 131,
4, 8, 16, 64, 129, 4, 8, 16, 64, 129, 6, 12, 48, 48, 126, 1,
3, 192, 0, 0, 4, 0, 0, 64, 0, 4, 0, 0, 64, 0, 7, 255,
240, 127, 255, 4, 0, 0, 64, 0, 4, 0, 0, 64, 0, 0, 0, 0,
127, 252, 7, 255, 224, 0, 3, 0, 0, 16, 0, 1, 0, 0, 16, 0,
1, 0, 0, 48, 127, 254, 7, 255, 192, 0, 0, 7, 128, 0, 127, 128,
0, 127, 0, 0, 124, 0, 0, 240, 0, 15, 0, 7, 192, 7, 240, 7,
248, 0, 120, 0, 0, 0, 0, 127, 255, 7, 255, 224, 0, 12, 0, 1,
128, 0, 48, 0, 6, 0, 0, 48, 0, 1, 128, 0, 12, 7, 255, 224,
127, 255, 0, 0, 0, 96, 3, 7, 128, 240, 30, 60, 0, 119, 0, 1,
192, 0, 28, 0, 7, 112, 1, 227, 192, 120, 15, 6, 0, 48, 0, 0,
6, 0, 0, 120, 0, 1, 224, 0, 7, 128, 0, 31, 240, 1, 255, 0,
120, 0, 30, 0, 7, 128, 0, 96, 0, 0, 0, 0, 64, 15, 4, 1,
240, 64, 49, 4, 6, 16, 64, 193, 4, 24, 16, 67, 1, 4, 96, 16,
124, 1, 7, 128, 16, 0, 0, 7, 255, 240, 127, 255, 4, 0, 16, 64,
1, 4, 0, 16, 0, 0, 3, 0, 0, 60, 0, 0, 240, 0, 3, 192,
0, 15, 0, 0, 60, 0, 0, 240, 0, 3, 0, 0, 0, 64, 1, 4,
0, 16, 64, 1, 7, 255, 240, 127, 255, 0, 0, 0, 8, 0, 1, 128,
0, 48, 0, 6, 0, 0, 192, 0, 12, 0, 0, 96, 0, 3, 0, 0,
24, 0, 0, 128, 0, 0, 0, 0, 0, 4, 0, 0, 64, 0, 4, 0,
0, 64, 0, 4, 0, 0, 64, 0, 4, 0, 0, 64, 0, 4, 0, 0,
64, 0, 0, 128, 0, 12, 0, 0, 96, 0, 2, 0, 0, 0, 0, 0,
1, 192, 4, 62, 0, 70, 48, 4, 65, 0, 68, 16, 4, 65, 0, 68,
16, 6, 65, 0, 63, 240, 1, 255, 0, 0, 0, 127, 255, 7, 255, 240,
4, 1, 0, 64, 16, 4, 1, 0, 64, 16, 4, 1, 0, 96, 48, 3,
254, 0, 31, 192, 0, 0, 0, 31, 192, 3, 254, 0, 96, 48, 4, 1,
0, 64, 16, 4, 1, 0, 64, 16, 6, 3, 0, 48, 96, 1, 4, 0,
0, 0, 1, 252, 0, 63, 224, 6, 3, 0, 64, 16, 4, 1, 0, 64,
16, 4, 1, 0, 64, 16, 127, 255, 7, 255, 240, 0, 0, 0, 31, 192,
3, 254, 0, 98, 48, 4, 33, 0, 66, 16, 4, 33, 0, 66, 16, 6,
33, 0, 62, 48, 1, 226, 0, 0, 0, 4, 0, 0, 64, 0, 4, 0,
3, 255, 240, 127, 255, 4, 64, 0, 68, 0, 4, 64, 0, 64, 0, 0,
0, 0, 1, 252, 0, 63, 225, 6, 3, 16, 64, 17, 4, 1, 16, 64,
17, 4, 1, 16, 64, 51, 7, 255, 224, 127, 252, 0, 0, 7, 255, 240,
127, 255, 0, 64, 0, 4, 0, 0, 64, 0, 4, 0, 0, 64, 0, 6,
0, 0, 63, 240, 1, 255, 0, 0, 0, 4, 1, 0, 64, 16, 119, 255,
7, 127, 240, 0, 1, 0, 0, 16, 0, 0, 0, 0, 12, 0, 0, 224,
0, 3, 0, 0, 16, 64, 1, 4, 0, 55, 127, 254, 119, 255, 192, 0,
0, 127, 255, 7, 255, 240, 0, 32, 0, 7, 0, 0, 216, 0, 24, 192,
3, 6, 0, 96, 48, 4, 1, 0, 0, 0, 64, 1, 4, 0, 16, 127,
255, 7, 255, 240, 0, 1, 0, 0, 16, 0, 0, 0, 127, 240, 7, 255,
0, 64, 0, 4, 0, 0, 127, 240, 7, 255, 0, 64, 0, 6, 0, 0,
63, 240, 1, 255, 0, 0, 0, 7, 255, 0, 127, 240, 4, 0, 0, 64,
0, 4, 0, 0, 64, 0, 4, 0, 0, 96, 0, 3, 255, 0, 31, 240,
0, 0, 0, 31, 192, 3, 254, 0, 96, 48, 4, 1, 0, 64, 16, 4,
1, 0, 64, 16, 6, 3, 0, 63, 224, 1, 252, 0, 0, 0, 7, 255,
240, 127, 255, 4, 1, 0, 64, 16, 4, 1, 0, 64, 16, 4, 1, 0,
96, 48, 3, 254, 0, 31, 192, 0, 0, 0, 31, 192, 3, 254, 0, 96,
48, 4, 1, 0, 64, 16, 4, 1, 0, 64, 16, 4, 1, 0, 127, 255,
7, 255, 240, 0, 0, 7, 255, 0, 127, 240, 1, 128, 0, 48, 0, 6,
0, 0, 64, 0, 4, 0, 0, 64, 0, 4, 0, 0, 64, 0, 0, 0,
0, 60, 32, 7, 227, 0, 66, 16, 4, 33, 0, 66, 16, 4, 33, 0,
66, 16, 4, 33, 0, 99, 240, 2, 30, 0, 0, 0, 4, 0, 0, 64,
0, 4, 0, 7, 255, 224, 127, 255, 0, 64, 16, 4, 1, 0, 64, 16,
0, 1, 0, 0, 0, 7, 252, 0, 127, 224, 0, 3, 0, 0, 16, 0,
1, 0, 0, 16, 0, 1, 0, 0, 16, 7, 255, 0, 127, 240, 0, 0,
0, 112, 0, 7, 192, 0, 15, 0, 0, 60, 0, 0, 240, 0, 15, 0,
3, 192, 0, 240, 0, 124, 0, 7, 0, 0, 0, 0, 7, 254, 0, 127,
240, 0, 1, 0, 0, 16, 0, 127, 0, 7, 240, 0, 1, 0, 0, 16,
7, 255, 0, 127, 224, 0, 0, 0, 96, 48, 7, 7, 0, 24, 192, 0,
216, 0, 7, 0, 0, 112, 0, 13, 128, 1, 140, 0, 112, 112, 6, 3,
0, 0, 0, 7, 252, 0, 127, 225, 0, 3, 16, 0, 17, 0, 1, 16,
0, 17, 0, 1, 16, 0, 51, 7, 255, 224, 127, 252, 0, 0, 0, 64,
48, 4, 7, 0, 64, 208, 4, 25, 0, 67, 16, 4, 97, 0, 76, 16,
5, 129, 0, 112, 16, 6, 1, 0, 0, 0, 0, 128, 0, 8, 0, 31,
252, 3, 247, 224, 96, 3, 4, 0, 16, 64, 1, 0, 0, 0, 127, 255,
7, 255, 240, 0, 0, 4, 0, 16, 64, 1, 6, 0, 48, 63, 126, 1,
255, 192, 0, 128, 0, 8, 0, 0, 0, 7, 0, 0, 240, 0, 8, 0,
0, 128, 0, 14, 0, 0, 112, 0, 1, 0, 0, 16, 0, 15, 0, 0,
224, 0, 0, 0, 0, 115, 255, 7, 63, 240, 0, 0, 0, 31, 192, 3,
254, 0, 96, 48, 4, 1, 1, 255, 252, 31, 255, 192, 64, 16, 6, 3,
0, 48, 96, 1, 4, 0, 0, 0, 0, 129, 1, 255, 240, 63, 255, 6,
8, 16, 64, 129, 4, 8, 16, 96, 129, 3, 0, 16, 16, 7, 0, 0,
112, 0, 0, 1, 0, 32, 27, 246, 0, 255, 192, 4, 8, 0, 64, 128,
4, 8, 0, 64, 128, 4, 8, 0, 255, 192, 27, 246, 1, 0, 32, 0,
0, 6, 0, 0, 120, 36, 1, 226, 64, 7, 36, 0, 31, 240, 1, 255,
0, 114, 64, 30, 36, 7, 130, 64, 96, 0, 0, 0, 0, 126, 63, 7,
227, 240, 0, 0, 7, 124, 32, 255, 227, 8, 131, 16, 136, 17, 8, 193,
16, 199, 255, 4, 62, 224, 0, 0, 14, 0, 0, 224, 0, 0, 0, 0,
0, 0, 14, 0, 0, 224, 0, 0, 0, 0, 7, 248, 0, 128, 64, 19,
242, 1, 127, 160, 20, 10, 1, 64, 160, 20, 10, 1, 115, 160, 19, 50,
0, 128, 64, 7, 248, 0, 0, 0, 15, 32, 9, 250, 0, 144, 160, 9,
10, 0, 144, 160, 9, 10, 0, 144, 160, 15, 250, 0, 127, 160, 0, 0,
0, 0, 32, 0, 7, 0, 0, 216, 0, 24, 192, 3, 38, 0, 103, 48,
4, 217, 0, 24, 192, 3, 6, 0, 96, 48, 4, 1, 0, 0, 0, 2,
0, 0, 32, 0, 2, 0, 0, 32, 0, 2, 0, 0, 32, 0, 2, 0,
0, 32, 0, 3, 240, 0, 63, 0, 0, 0, 0, 8, 0, 0, 128, 0,
8, 0, 0, 128, 0, 8, 0, 0, 128, 0, 8, 0, 0, 128, 0, 0,
0, 7, 248, 0, 128, 64, 23, 250, 1, 127, 160, 20, 66, 1, 70, 32,
20, 114, 1, 125, 160, 19, 138, 0, 128, 64, 7, 248, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 7, 128, 0, 252, 0, 8, 64, 0, 132, 0, 8,
64, 0, 252, 0, 7, 128, 0, 0, 0, 0, 8, 16, 0, 129, 0, 8,
16, 0, 129, 0, 255, 144, 15, 249, 0, 8, 16, 0, 129, 0, 8, 16,
0, 129, 0, 0, 0, 98, 0, 14, 96, 0, 142, 0, 9, 160, 0, 242,
0, 6, 32, 0, 0, 0, 4, 64, 0, 198, 0, 9, 32, 0, 146, 0,
15, 224, 0, 108, 0, 0, 0, 0, 32, 0, 6, 0, 0, 192, 0, 8,
0, 0, 0, 0, 0, 127, 255, 7, 255, 240, 0, 16, 0, 1, 0, 0,
16, 0, 1, 0, 0, 48, 0, 6, 0, 127, 240, 7, 255, 0, 0, 0,
63, 0, 7, 248, 0, 64, 128, 4, 8, 0, 127, 255, 7, 255, 240, 64,
0, 4, 0, 0, 127, 255, 7, 255, 240, 0, 0, 0, 28, 0, 1, 192,
0, 0, 0, 0, 0, 16, 0, 15, 0, 0, 224, 0, 0, 32, 0, 6,
32, 0, 254, 0, 15, 224, 0, 2, 0, 0, 0, 0, 62, 32, 7, 242,
0, 193, 160, 8, 10, 0, 128, 160, 8, 10, 0, 193, 160, 7, 242, 0,
62, 32, 0, 0, 0, 4, 1, 0, 96, 48, 3, 6, 0, 24, 192, 4,
217, 0, 103, 48, 3, 38, 0, 24, 192, 0, 216, 0, 7, 0, 0, 32,
0, 0, 0, 0, 6, 2, 0, 192, 96, 24, 15, 227, 0, 254, 102, 0,
12, 224, 1, 154, 0, 51, 32, 6, 127, 128, 199, 248, 0, 0, 0, 0,
192, 32, 24, 6, 3, 0, 254, 96, 15, 237, 136, 1, 185, 128, 50, 56,
6, 38, 128, 195, 200, 24, 24, 128, 0, 0, 68, 6, 12, 96, 192, 146,
24, 9, 35, 0, 254, 102, 6, 204, 224, 1, 154, 0, 51, 32, 6, 127,
128, 199, 248, 0, 0, 0, 1, 192, 0, 62, 0, 6, 48, 0, 193, 7,
56, 16, 115, 1, 0, 0, 16, 0, 3, 0, 1, 224, 0, 28, 0, 0,
0, 3, 255, 224, 127, 254, 140, 8, 12, 128, 128, 104, 8, 2, 128, 128,
8, 8, 0, 192, 128, 7, 255, 224, 63, 254, 0, 0, 0, 63, 254, 7,
255, 224, 192, 128, 8, 8, 2, 128, 128, 104, 8, 12, 128, 128, 140, 8,
0, 127, 254, 3, 255, 224, 0, 0, 3, 255, 224, 127, 254, 44, 8, 6,
128, 128, 200, 8, 12, 128, 128, 104, 8, 2, 192, 128, 7, 255, 224, 63,
254, 0, 0, 0, 63, 254, 103, 255, 238, 192, 128, 136, 8, 12, 128, 128,
104, 8, 2, 128, 128, 236, 8, 12, 127, 254, 3, 255, 224, 0, 0, 3,
255, 224, 127, 254, 236, 8, 14, 128, 128, 8, 8, 0, 128, 128, 232, 8,
14, 192, 128, 7, 255, 224, 63, 254, 0, 0, 0, 63, 254, 7, 255, 230,
192, 128, 248, 8, 9, 128, 128, 152, 8, 15, 128, 128, 108, 8, 0, 127,
254, 3, 255, 224, 0, 0, 31, 255, 3, 255, 240, 96, 128, 4, 8, 0,
64, 128, 4, 8, 0, 127, 255, 7, 255, 240, 64, 129, 4, 8, 16, 64,
129, 4, 8, 16, 0, 0, 1, 255, 192, 63, 254, 6, 0, 48, 64, 1,
20, 0, 31, 64, 1, 228, 0, 16, 96, 3, 3, 128, 224, 24, 12, 0,
0, 0, 15, 255, 224, 255, 254, 136, 16, 44, 129, 2, 104, 16, 34, 129,
2, 8, 16, 32, 129, 2, 8, 0, 32, 128, 2, 0, 0, 0, 255, 254,
15, 255, 224, 129, 2, 8, 16, 34, 129, 2, 104, 16, 44, 129, 2, 136,
16, 32, 128, 2, 8, 0, 32, 0, 0, 15, 255, 224, 255, 254, 40, 16,
38, 129, 2, 200, 16, 44, 129, 2, 104, 16, 34, 129, 2, 8, 0, 32,
128, 2, 0, 0, 0, 255, 254, 15, 255, 238, 129, 2, 232, 16, 32, 129,
2, 8, 16, 46, 129, 2, 232, 16, 32, 128, 2, 8, 0, 32, 0, 0,
136, 0, 44, 128, 2, 111, 255, 226, 255, 254, 8, 0, 32, 128, 2, 0,
0, 0, 128, 2, 8, 0, 34, 255, 254, 111, 255, 236, 128, 2, 136, 0,
32, 0, 0, 40, 0, 38, 128, 2, 207, 255, 236, 255, 254, 104, 0, 34,
128, 2, 0, 0, 14, 128, 2, 232, 0, 32, 255, 254, 15, 255, 238, 128,
2, 232, 0, 32, 0, 0, 0, 128, 7, 255, 240, 127, 255, 4, 8, 16,
64, 129, 4, 8, 16, 64, 129, 4, 0, 16, 96, 3, 3, 255, 224, 31,
252, 0, 0, 0, 15, 255, 230, 255, 254, 224, 192, 8, 6, 0, 192, 48,
6, 1, 128, 32, 12, 14, 0, 96, 207, 255, 224, 255, 254, 0, 0, 0,
63, 248, 7, 255, 200, 192, 6, 200, 0, 38, 128, 2, 40, 0, 32, 128,
2, 12, 0, 96, 127, 252, 3, 255, 128, 0, 0, 3, 255, 128, 127, 252,
12, 0, 96, 128, 2, 40, 0, 38, 128, 2, 200, 0, 40, 192, 6, 7,
255, 192, 63, 248, 0, 0, 0, 63, 248, 7, 255, 194, 192, 6, 104, 0,
44, 128, 2, 200, 0, 38, 128, 2, 44, 0, 96, 127, 252, 3, 255, 128,
0, 0, 3, 255, 134, 127, 252, 236, 0, 104, 128, 2, 200, 0, 38, 128,
2, 40, 0, 46, 192, 6, 199, 255, 192, 63, 248, 0, 0, 0, 63, 248,
7, 255, 206, 192, 6, 232, 0, 32, 128, 2, 8, 0, 46, 128, 2, 236,
0, 96, 127, 252, 3, 255, 128, 0, 0, 8, 8, 0, 193, 128, 6, 48,
0, 54, 0, 1, 192, 0, 28, 0, 3, 96, 0, 99, 0, 12, 24, 0,
128, 128, 0, 0, 0, 0, 64, 31, 252, 3, 255, 224, 96, 51, 4, 6,
16, 64, 193, 4, 24, 16, 67, 1, 6, 96, 48, 63, 254, 1, 255, 192,
16, 0, 0, 0, 0, 15, 255, 128, 255, 252, 128, 0, 108, 0, 2, 96,
0, 34, 0, 2, 0, 0, 32, 0, 6, 15, 255, 192, 255, 248, 0, 0,
0, 255, 248, 15, 255, 192, 0, 6, 0, 0, 34, 0, 2, 96, 0, 44,
0, 2, 128, 0, 96, 255, 252, 15, 255, 128, 0, 0, 15, 255, 128, 255,
252, 32, 0, 102, 0, 2, 192, 0, 44, 0, 2, 96, 0, 34, 0, 6,
15, 255, 192, 255, 248, 0, 0, 0, 255, 248, 15, 255, 206, 0, 6, 224,
0, 32, 0, 2, 0, 0, 46, 0, 2, 224, 0, 96, 255, 252, 15, 255,
128, 0, 0, 12, 0, 0, 240, 0, 3, 192, 0, 15, 0, 32, 63, 230,
3, 254, 192, 240, 8, 60, 0, 15, 0, 0, 192, 0, 0, 0, 7, 255,
240, 127, 255, 0, 129, 0, 8, 16, 0, 129, 0, 8, 16, 0, 129, 0,
12, 48, 0, 126, 0, 3, 192, 0, 0, 0, 63, 255, 7, 255, 240, 65,
4, 4, 16, 48, 65, 1, 4, 16, 16, 99, 1, 3, 248, 48, 28, 254,
0, 7, 192, 0, 0, 0, 1, 192, 4, 62, 4, 70, 48, 100, 65, 3,
68, 16, 20, 65, 0, 68, 16, 6, 65, 0, 63, 240, 1, 255, 0, 0,
0, 0, 28, 0, 67, 224, 4, 99, 0, 68, 16, 20, 65, 3, 68, 16,
100, 65, 4, 100, 16, 3, 255, 0, 31, 240, 0, 0, 0, 1, 192, 4,
62, 1, 70, 48, 52, 65, 6, 68, 16, 100, 65, 3, 68, 16, 22, 65,
0, 63, 240, 1, 255, 0, 0, 0, 0, 28, 3, 67, 224, 116, 99, 4,
68, 16, 100, 65, 3, 68, 16, 20, 65, 7, 100, 16, 99, 255, 0, 31,
240, 0, 0, 0, 1, 192, 4, 62, 7, 70, 48, 116, 65, 0, 68, 16,
4, 65, 7, 68, 16, 118, 65, 0, 63, 240, 1, 255, 0, 0, 0, 0,
28, 0, 67, 224, 52, 99, 7, 196, 16, 76, 65, 4, 196, 16, 124, 65,
3, 100, 16, 3, 255, 0, 31, 240, 0, 0, 0, 3, 224, 4, 127, 0,
68, 16, 4, 65, 0, 100, 16, 3, 255, 0, 127, 224, 4, 35, 0, 66,
16, 4, 33, 0, 126, 48, 3, 226, 0, 0, 0, 1, 252, 0, 63, 224,
6, 3, 0, 64, 17, 4, 1, 240, 64, 30, 4, 1, 0, 96, 48, 3,
6, 0, 16, 64, 0, 0, 0, 31, 192, 3, 254, 4, 98, 48, 100, 33,
3, 66, 16, 20, 33, 0, 66, 16, 6, 33, 0, 62, 48, 1, 226, 0,
0, 0, 1, 252, 0, 63, 224, 6, 35, 0, 66, 16, 20, 33, 3, 66,
16, 100, 33, 4, 98, 16, 3, 227, 0, 30, 32, 0, 0, 0, 31, 192,
3, 254, 1, 98, 48, 52, 33, 6, 66, 16, 100, 33, 3, 66, 16, 22,
33, 0, 62, 48, 1, 226, 0, 0, 0, 1, 252, 0, 63, 224, 118, 35,
7, 66, 16, 4, 33, 0, 66, 16, 116, 33, 7, 98, 16, 3, 227, 0,
30, 32, 0, 0, 4, 64, 16, 100, 1, 3, 127, 240, 23, 255, 0, 0,
16, 0, 1, 0, 0, 0, 4, 1, 0, 64, 16, 23, 255, 3, 127, 240,
96, 1, 4, 0, 16, 0, 0, 1, 64, 16, 52, 1, 6, 127, 240, 103,
255, 3, 0, 16, 16, 1, 0, 0, 0, 116, 1, 7, 64, 16, 7, 255,
0, 127, 240, 112, 1, 7, 0, 16, 0, 0, 0, 31, 192, 83, 254, 7,
96, 48, 36, 1, 7, 64, 16, 92, 1, 0, 192, 16, 6, 3, 0, 63,
224, 1, 252, 0, 0, 0, 7, 255, 3, 127, 240, 116, 0, 4, 64, 0,
100, 0, 3, 64, 0, 20, 0, 7, 96, 0, 99, 255, 0, 31, 240, 0,
0, 0, 31, 192, 3, 254, 4, 96, 48, 100, 1, 3, 64, 16, 20, 1,
0, 64, 16, 6, 3, 0, 63, 224, 1, 252, 0, 0, 0, 1, 252, 0,
63, 224, 6, 3, 0, 64, 16, 20, 1, 3, 64, 16, 100, 1, 4, 96,
48, 3, 254, 0, 31, 192, 0, 0, 0, 31, 192, 3, 254, 1, 96, 48,
52, 1, 6, 64, 16, 100, 1, 3, 64, 16, 22, 3, 0, 63, 224, 1,
252, 0, 0, 0, 1, 252, 3, 63, 224, 118, 3, 4, 64, 16, 100, 1,
3, 64, 16, 20, 1, 7, 96, 48, 99, 254, 0, 31, 192, 0, 0, 0,
31, 192, 3, 254, 7, 96, 48, 116, 1, 0, 64, 16, 4, 1, 7, 64,
16, 118, 3, 0, 63, 224, 1, 252, 0, 0, 0, 0, 128, 0, 8, 0,
0, 128, 0, 8, 0, 28, 156, 1, 201, 192, 0, 128, 0, 8, 0, 0,
128, 0, 8, 0, 0, 0, 0, 31, 208, 3, 254, 0, 96, 240, 4, 25,
0, 67, 16, 4, 97, 0, 76, 16, 7, 131, 0, 63, 224, 5, 252, 0,
0, 0, 7, 252, 0, 127, 224, 64, 3, 6, 0, 16, 48, 1, 1, 0,
16, 0, 1, 0, 0, 16, 7, 255, 0, 127, 240, 0, 0, 0, 127, 192,
7, 254, 0, 0, 48, 0, 1, 1, 0, 16, 48, 1, 6, 0, 16, 64,
1, 0, 127, 240, 7, 255, 0, 0, 0, 7, 252, 0, 127, 224, 16, 3,
3, 0, 16, 96, 1, 6, 0, 16, 48, 1, 1, 0, 16, 7, 255, 0,
127, 240, 0, 0, 0, 127, 192, 7, 254, 7, 0, 48, 112, 1, 0, 0,
16, 0, 1, 7, 0, 16, 112, 1, 0, 127, 240, 7, 255, 0, 0, 0,
7, 252, 0, 127, 225, 0, 3, 16, 0, 17, 16, 1, 19, 0, 17, 96,
1, 20, 0, 51, 7, 255, 224, 127, 252, 0, 0, 7, 255, 255, 127, 255,
240, 64, 16, 4, 1, 0, 64, 16, 4, 1, 0, 64, 16, 6, 3, 0,
63, 224, 1, 252, 0, 0, 0, 7, 252, 0, 127, 225, 112, 3, 23, 0,
17, 0, 1, 16, 0, 17, 112, 1, 23, 0, 51, 7, 255, 224, 127, 252,
0, 0, 0,
};

static const unsigned char fontWidths[] = {
6, 3, 7, 11, 11, 11, 11, 3, 6, 6, 12, 11, 4, 11, 3, 9,
11, 9, 11, 11, 11, 11, 11, 11, 11, 11, 3, 4, 10, 11, 10, 11,
12, 11, 11, 11, 11, 11, 11, 11, 11, 7, 12, 11, 11, 12, 11, 11,
11, 11, 11, 11, 11, 11, 11, 12, 11, 11, 11, 6, 9, 6, 11, 11,
5, 11, 11, 11, 11, 11, 10, 11, 11, 7, 9, 10, 7, 11, 11, 11,
11, 11, 11, 11, 10, 11, 11, 11, 11, 11, 11, 8, 3, 8, 11, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 3, 11, 11, 12, 11, 3, 8, 7, 12, 10, 12, 11, 9, 12, 9,
8, 11, 7, 7, 5, 11, 11, 3, 4, 6, 10, 12, 11, 11, 11, 11,
11, 11, 11, 11, 11, 11, 13, 11, 11, 11, 11, 11, 7, 7, 7, 7,
12, 11, 11, 11, 11, 11, 11, 11, 13, 11, 11, 11, 11, 11, 11, 11,
11, 11, 11, 11, 11, 11, 13, 11, 11, 11, 11, 11, 7, 7, 7, 7,
11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,

};


/*JSON{
  "type" : "method",
  "class" : "Graphics",
  "name" : "setFont12x20",
  "generate" : "jswrap_graphics_setFont12x20",
  "params" : [
    ["scale","int","(optional) If >1 the font will be scaled up by that amount"]
  ],
  "return" : ["JsVar","The instance of Graphics this was called on, to allow call chaining"],
  "return_object" : "Graphics",
  "typedef": "setFont12x20(scale: number): Graphics"
}
Set the current font
*/
JsVar *jswrap_graphics_setFont12x20(JsVar *parent, int scale) {
  if (scale<1) scale=1;
  JsVar *bitmap = jsvNewNativeString(fontBitmap, sizeof(fontBitmap));
  JsVar *widths = jsvNewNativeString(fontWidths, sizeof(fontWidths));
  JsVar *r = jswrap_graphics_setFontCustom(parent, bitmap, 32, widths, 20 + (scale<<8)); // 1 bit
  jsvUnLock2(bitmap, widths);
  return r;
}

