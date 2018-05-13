*Import arguments from bash script
function script(args)

INIT_STRINGDATE = subwrd(args,1)
INIT_INTDATE = subwrd(args,2)
INITHOUR = subwrd(args,3)
REGION = subwrd(args,4)
FULLH = subwrd(args,5)
H=subwrd(args,6)
MODEL = subwrd(args,7)
MODELFORTITLE = subwrd(args,8)
FILENAME = subwrd(args,9)

***** Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area. 
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 12 file /usr/share/fonts/type1/gsfonts/n019023l.pfb'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea 0.37 10.4 0.6 8'

***** ***** Open control file ***** *****

*if MODEL = 'GDPS'
*'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/ISBL_500_HGT_'%FULLH'.ctl'
*'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/ISBL_500_ABSV_'%FULLH'.ctl'
*endif

'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/2_m_above_ground_DPT_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/10_m_above_ground_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/10_m_above_ground_VGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_HGT_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/1000_mb_HGT_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/mean_sea_level_PRMSL_'%FULLH'.ctl'

***** ***** Define Region ***** *****

if REGION='northamerica'
    LAT1=20
    LAT2=75
    LON1='-150'
    LON2='-60.5'
    MAP='latlon'
endif

if REGION='nepacific'
    LAT1=18
    LAT2=70
    LON1='-190'
    LON2='-80'
    MAP='nps'
    MPVALSLON1='-166'
    MPVALSLON2='-115'
    MPVALSLAT1='23'
    MPVALSLAT2='60'
endif

if REGION='antarctica'
    LAT1=-90
    LAT2=-60
    LON1='0'
    LON2='360'
    MAP='sps'
    MPVALSLON1='0'
    MPVALSLON2='360'
    MPVALSLAT1='-90'
    MPVALSLAT2='-60'
endif

if REGION='pacnw'
    LAT1=40
    LAT2=55
    LON1='-132'
    LON2='-107.6'
    MAP='latlon'
endif

if REGION='conus'
    LAT1=15
    LAT2=55
    LON1='-128.05'
    LON2='-63'
    'set xlevs -120 -110 -100 -90 -80 -70'
    'set ylevs 20 30 40 50'
    MAP='latlon'
endif

if REGION='namconus'
    LAT1=18.3
    LAT2=58.2
    LON1='-129.5'
    LON2='-64.5'
    'set xlevs -120 -110 -100 -90 -80 -70'
    'set ylevs 20 30 40 50'
    MAP='latlon'
endif

if REGION='pacnwzoom'
    LAT1=43.07
    LAT2=49.15
    LON1='-126'
    LON2='-116.1'
    'set xlevs -126 -124 -122 -120 -118 -116'
    'set ylevs 44 45 46 47 48 49 50'
    MAP=latlon
endif

if REGION='middleeast'
    LAT1=0
    LAT2=55.3
    LON1=0
    LON2=90
    MAP=latlon
endif

if REGION='colriver'
    LAT1=44.68
    LAT2=46.71
    LON1='-122.2'
    LON2='-118.9'
    'set xlevs -122 -121 -120 -119 -118'
    'set ylevs 45 46'
    MAP=latlon
endif

if REGION='hrrrconus'
    LAT1=15
    LAT2=65
    LON1=-150
    LON2=-50
    MAP='nps'
    MPVALSLAT1='23'
    MPVALSLAT2='53.5'
    MPVALSLON1='-118.7'
    MPVALSLON2='-76.1'
endif

if REGION='world'
    LAT1=-90
    LAT2=90
    LON1=0
    LON2=359.99
    MAP=latlon
endif

***** ***** set map parameters ***** ***** 

'set mpdset hires'
'set mpt 0 1 1 6'
'set mpt 1 1 1 6'
'set mpt 2 1 1 3'
'set grid off'
'set lon '%LON1' '%LON2
'set lat '%LAT1' '%LAT2
if MAP!='latlon'
    'set mpvals '%MPVALSLON1' '%MPVALSLON2' '%MPVALSLAT1' '%MPVALSLAT2
endif
'set mproj '%MAP

***** ***** Begin plotting ***** *****

*PLOT 2-METER DEWPOINT

'set rgb 16 102 255 178'
'set rgb 17 96 243 171'
'set rgb 18 90 232 164'
'set rgb 19 85 220 156'
'set rgb 20 79 209 149'
'set rgb 21 73 197 142'
'set rgb 22 67 185 135'
'set rgb 23 61 174 127'
'set rgb 24 56 162 120'
'set rgb 25 50 151 113'
'set rgb 26 44 139 106'
'set rgb 27 38 127 98'
'set rgb 28 32 116 91'
'set rgb 29 27 104 84'
'set rgb 30 21 92 77'
'set rgb 31 15 81 70'
'set rgb 32 9 69 62'
'set rgb 33 3 58 55'
'set rgb 34 6 56 56'
'set rgb 35 21 68 66'
'set rgb 36 35 79 77'
'set rgb 37 50 91 88'
'set rgb 38 64 102 99'
'set rgb 39 79 114 109'
'set rgb 40 93 126 120'
'set rgb 41 108 137 131'
'set rgb 42 122 149 142'
'set rgb 43 137 160 152'
'set rgb 44 151 172 163'
'set rgb 45 166 184 174'
'set rgb 46 180 195 185'
'set rgb 47 195 207 195'
'set rgb 48 209 219 206'
'set rgb 49 224 230 217'
'set rgb 50 238 242 228'
'set rgb 51 253 253 238'
'set rgb 52 255 248 237'
'set rgb 53 255 239 233'
'set rgb 54 255 230 230'
'set rgb 55 255 221 226'
'set rgb 56 255 213 223'
'set rgb 57 255 204 219'
'set rgb 58 255 195 216'
'set rgb 59 255 187 212'
'set rgb 60 255 178 209'
'set rgb 61 255 169 205'
'set rgb 62 255 160 202'
'set rgb 63 255 152 198'
'set rgb 64 255 143 195'
'set rgb 65 255 134 191'
'set rgb 66 255 126 188'
'set rgb 67 255 117 184'
'set rgb 68 255 108 181'
'set rgb 69 252 100 177'
'set rgb 70 240 95 172'
'set rgb 71 228 89 168'
'set rgb 72 217 83 164'
'set rgb 73 205 77 159'
'set rgb 74 194 71 155'
'set rgb 75 182 66 151'
'set rgb 76 170 60 146'
'set rgb 77 159 54 142'
'set rgb 78 147 48 138'
'set rgb 79 136 42 134'
'set rgb 80 124 36 129'
'set rgb 81 112 31 125'
'set rgb 82 101 25 121'
'set rgb 83 89 19 116'
'set rgb 84 78 13 112'
'set rgb 85 66 7 108'
'set rgb 86 54 2 103'
'set rgb 87 58 8 108'
'set rgb 88 68 20 117'
'set rgb 89 78 32 126'
'set rgb 90 89 43 134'
'set rgb 91 99 55 143'
'set rgb 92 109 66 152'
'set rgb 93 119 78 160'
'set rgb 94 129 90 169'
'set rgb 95 139 101 178'
'set rgb 96 149 113 187'
'set rgb 97  160 124 195'
'set rgb 98  170 136 204'
'set rgb 99  180 148 213'
'set rgb 100  190 159 221'
'set rgb 101  200 171 230'
'set rgb 102  210 182 239'
'set rgb 103  220 194 248'
'set rgb 104  227 203 254'
'set rgb 105  214 194 245'
'set rgb 106  201 185 236'
'set rgb 107  188 177 228'
'set rgb 108  175 168 219'
'set rgb 109  162 159 210'
'set rgb 110  149 151 202'
'set rgb 111  136 142 193'
'set rgb 112  123 133 184'
'set rgb 113  110 124 175'
'set rgb 114  97 116 167'
'set rgb 115  84 107 158'
'set rgb 116  71 98 149'
'set rgb 117  58 90 141'
'set rgb 118  45 81 132'
'set rgb 119  32 72 123'
'set rgb 120  19 63 114'
'set rgb 121  6 55 106'
'set rgb 122  7 58 107'
'set rgb 123  18 69 116'
'set rgb 124  30 81 124'
'set rgb 125  41 92 133'
'set rgb 126  53 104 142'
'set rgb 127  65 116 151'
'set rgb 128  76 127 159'
'set rgb 129  88 139 168'
'set rgb 130  100 151 177'
'set rgb 131  111 162 185'
'set rgb 132  123 174 194'
'set rgb 133  134 185 203'
'set rgb 134  146 197 211'
'set rgb 135  158 209 220'
'set rgb 136  169 220 229'
'set rgb 137  181 232 238'
'set rgb 138  192 243 246'
'set rgb 139  204 255 255'
*above freezing
'set rgb 140  204 255 204'
'set rgb 141  194 245 194'
'set rgb 142  183 234 183'
'set rgb 143  173 224 173'
'set rgb 144  162 213 162'
'set rgb 145  152 203 152'
'set rgb 146  142 193 142'
'set rgb 147  131 182 131'
'set rgb 148  121 172 121'
'set rgb 149  110 161 110'
'set rgb 150  100 151 100'
'set rgb 151  90 141 90'
'set rgb 152  79 130 79'
'set rgb 153  69 120 69'
'set rgb 154  58 109 58'
'set rgb 155  48 99 48'
'set rgb 156  37 88 37'
'set rgb 157  27 78 27'
'set rgb 158  17 68 17'
'set rgb 159  6 57 6'
'set rgb 160  5 55 3'
'set rgb 161  18 66 11'
'set rgb 162  31 76 19'
'set rgb 163  44 86 27'
'set rgb 164  57 97 34'
'set rgb 165  70 107 42'
'set rgb 166  83 118 50'
'set rgb 167  96 128 58'
'set rgb 168  109 138 66'
'set rgb 169  122 149 73'
'set rgb 170  135 159 81'
'set rgb 171  148 170 89'
'set rgb 172  161 180 97'
'set rgb 173  174 190 105'
'set rgb 174  187 201 112'
'set rgb 175  200 211 120'
'set rgb 176  213 222 128'
'set rgb 177  226 232 136'
'set rgb 178  239 243 144'
'set rgb 179  252 253 151'
'set rgb 180  249 245 147'
'set rgb 181  241 232 139'
'set rgb 182  233 219 131'
'set rgb 183  225 206 123'
'set rgb 184  218 193 116'
'set rgb 185  210 180 108'
'set rgb 186  202 167 100'
'set rgb 187  194 154 92'
'set rgb 188  186 141 84'
'set rgb 189  179 128 77'
'set rgb 190  171 114 69'
'set rgb 191  163 101 61'
'set rgb 192  155 88 53'
'set rgb 193  147 75 45'
'set rgb 194  139 62 37'
'set rgb 195  132 49 30'
'set rgb 196  124 36 22'
'set rgb 197 116 23 14'
'set rgb 198  108 10 6'
'set rgb 199  104 3 3'
'set rgb 200  111 16 16'
'set rgb 201  119 29 29'
'set rgb 202  127 42 42'
'set rgb 203  135 55 55'
'set rgb 204  143 68 68'
'set rgb 205  150 81 81'
'set rgb 206  158 94 94'
'set rgb 207  166 107 107'
'set rgb 208  174 120 120'
'set rgb 209  182 133 133'
'set rgb 210  189 146 146'
'set rgb 211  197 159 159'
'set rgb 212  205 172 172'
'set rgb 213  213 185 185'
'set rgb 214  221 198 198'
'set rgb 215  228 211 211'
'set rgb 216  236 224 224'
'set rgb 217  244 237 237'
'set rgb 218  252 250 250'
'set rgb 219  250 247 249'
'set rgb 220  240 234 238'
'set rgb 221  231 221 228'
'set rgb 222  222 208 218'
'set rgb 223  213 195 207'
'set rgb 224  204 182 197'
'set rgb 225  195 169 186'
'set rgb 226  186 156 176'
'set rgb 227  176 143 165'
'set rgb 228  167 130 155'
'set rgb 229  158 117 145'
'set rgb 230  149 104 134'
'set rgb 231  140 91 124'
'set rgb 232  131 78 113'
'set rgb 233  122 65 103'
'set rgb 234  113 52 93'
'set rgb 235  103 39 82'
'set rgb 236  94 26 72'
'set rgb 237  85 13 61'
'set rgb 238  76 0 51'

'set clevs -90 -89 -88 -87 -86 -85 -84 -83 -82 -81 -80 -79 -78 -77 -76 -75 -74 -73 -72 -71 -70 -69 -68 -67 -66 -65 -64 -63 -62 -61 -60 -59 -58 -57 -56 -55 -54 -53 -52 -51 -50 -49 -48 -47 -46 -45 -44 -43 -42 -41 -40 -39 -38 -37 -36 -35 -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130'

'set ccols 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 190 191 192 193 194 195 196 197 198 199 200 201 202 203 204 205 206 207 208 209 210 211 212 213 214 215 216 217 218 219 220 221 222 223 224 225 226 227 228 229 230 231 232 233 234 235 236 237 238' 

*'color.gs 33 120 1 -verbose -kind lightgreen->darkgreen->yellow->darkred->mistyrose->purple'
*'color.gs -50 32 1 -verbose -kind teal->aquamarine->deeppink->plum->navy->aqua'

*Plot temperature
'set gxout shaded'
'd (DPT2m.1-273.15)*9/5 + 32'
'set gxout contour'
'set clevs 32'
'set ccolor 2'
'set clab off'
'd (DPT2m.1-273.15)*9/5 + 32'
'xcbar.gs -fstep 10 -line off -fwidth 0.11 -fheight 0.12 -direction v 10.4 10.6 .6 8'

*plot 1000-500hPa thickness in intervals of 6 decameters
*** CHANGE THICKNESS SETTINGS HERE
'set clevs 476 480 486 492 498 504 510 516 522 528 534 540 546 552 558 564 570 576 582 588 594 600'
'set ccols 4 4 4 4 4 4 4 4 4 4 4 4 2 2 2 2 2 2 2 2 2 2'
'set gxout contour'
'set cint 6'
'set cthick 3'
'set cstyle 3'
'set clab masked'
'd (hgt500mb.4-hgt1000mb.5)/10'

*plot the SLP contours in intervals of 3 hPa
'set gxout contour'
'set cint 3'
'set ccolor 1'
'set cstyle 1'
'set cthick 2'
if REGION='pacnw'
    'set cint 1'
    'set cthick 5'
endif
'set clab masked'
'd prmslmsl.6/100'

*Plot 10m wind barbs
'set gxout barb'
'set ccolor 1'
'set digsiz .04'
if (MODEL = "GFS_0.25")
    if REGION='pacnw'
        'd skip(ugrd10m.2*2.237,5,5);vgrd10m.3*2.237'
    else
        'd skip(ugrd10m.2*2.237,10,10);vgrd10m.3*2.237'
    endif
endif
if (MODEL = "NAM_12")
    if REGION='pacnw'
        'd skip(ugrd10m.2*2.237,10,10);vgrd10m.3*2.237'
    else
        'd skip(ugrd10m.2*2.237,24,24);vgrd10m.3*2.237'
    endif
endif

***** ***** plot high and low centers via mfhilo function ***** *****
radius=1000
cint=300

'set font 11'
*   ******************************DRAW L's******************************

'mfhilo prmslmsl.6/100 CL l 'radius', 'cint

Low_info=result
if (MODEL = "GFS_0.25")
    i=2         ;*Since the data starts on the 2nd line
    minmax=sublin(Low_info,i)
endif
if (MODEL = "NAM_12")
    i=3         ;*Since the data starts on the 3rd line
    minmax=sublin(Low_info,i)
endif

while(subwrd(minmax,1) = 'L') 

  min_lat = subwrd(minmax, 2)
  min_lon = subwrd(minmax, 3)
  min_val = subwrd(minmax, 5)
  minval = math_nint(min_val)

  'q w2xy 'min_lon' 'min_lat      ;*Translate lat/lon to page coordinates
   x_min = subwrd(result,3)
   y_min = subwrd(result,6)


  'q gxinfo'                      ;*Get area boundaries
  xline=sublin(result,3)
  yline=sublin(result,4)
  xs=subwrd(xline,4)' 'subwrd(xline,6)
  ys=subwrd(yline,4)' 'subwrd(yline,6)

  if(y_min > subwrd(ys,1)+0.3 & y_min < subwrd(ys,2)-0.3 & x_min > subwrd(xs,1)+0.3 & x_min < subwrd(xs,2)-0.3)
    'set strsiz .15'
    'set string 2 c 8'
    'draw string 'x_min' 'y_min' L'

    'set strsiz 0.1'
    'set string 2 c 10'
    'draw string 'x_min' 'y_min+0.15' 'minval
        
  endif

  i=i+1
  minmax = sublin(Low_info,i)
endwhile


*   ******************************DRAW H's******************************

'mfhilo prmslmsl.6/100 CL h 'radius', 'cint

High_info=result
if (MODEL = "GFS_0.25")
    i=2         ;*Since the data starts on the 2nd line
    minmax=sublin(High_info,i)
endif
if (MODEL = "NAM_12")
    i=3         ;*Since the data starts on the 3rd line
    minmax=sublin(High_info,i)
endif

while(subwrd(minmax,1) = 'H') 

  min_lat = subwrd(minmax, 2)
  min_lon = subwrd(minmax, 3)
  min_val = subwrd(minmax, 5)
  minval = math_nint(min_val)

  'q w2xy 'min_lon' 'min_lat      ;*Translate lat/lon to page coordinates
   x_min = subwrd(result,3)
   y_min = subwrd(result,6)


  'q gxinfo'                      ;*Get area boundaries
  xline=sublin(result,3)
  yline=sublin(result,4)
  xs=subwrd(xline,4)' 'subwrd(xline,6)
  ys=subwrd(yline,4)' 'subwrd(yline,6)

  if(y_min > subwrd(ys,1)+0.3 & y_min < subwrd(ys,2)-0.3 & x_min > subwrd(xs,1)+0.3 & x_min < subwrd(xs,2)-0.3)
    'set strsiz .15'
    'set string 4 c 8'
    'draw string 'x_min' 'y_min' H'

    'set strsiz 0.1'
    'set string 4 c 10'
    'draw string 'x_min' 'y_min+0.15' 'minval
  endif

  i=i+1
  minmax = sublin(High_info,i)
endwhile

***** ***** end mfhilo ***** *****

***** ***** End plotting ***** *****

***** ***** Get max and min ***** *****

if MODEL = 'NAM_12'
    i=2
endif
if MODEL = 'GFS_0.25'
    i=1
endif
if MODEL = 'GDPS'
    i=1
endif

**** MAXVAL (Dewpoint)
'd amax((DPT2m.1-273.15)*9/5 +32, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
say result
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
say result
maxval_dewpoint = math_format('%5.1f',maxval)

**** MINVAL (Dewpoint)
'd amin((DPT2m.1-273.15)*9/5 +32, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_dewpoint = math_format('%5.1f',minval)


**** MAXVAL (SLP)
'd amax(prmslmsl.6/100, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_slp = math_format('%5.1f',maxval) 

**** MINVAL (SLP)
'd amin(prmslmsl.6/100, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_slp = math_format('%5.1f',minval)

***** ***** End max and min ***** *****

***** ***** Get time of forecast ***** *****
'q time'
forecastutc=substr(result, 24, 3)
forecastdate=substr(result, 27, 2)
forecastmonth=substr(result, 29, 3)
forecastyear=substr(result, 32, 4)
forecastday=substr(result, 45, 3)

***** ***** Draw shapefiles ***** ***** 
'set line 1 1 1'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Canada/PROVINCE.shp'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Mexico/mexstates.shp'

***** ***** draw titles and strings for map! ***** *****
*title
'set string 1 l'
'set strsiz .13'
'set font 11'
'draw string .4 8.37 2-Meter Dewpoint (`ao`nF), Sea-Level Pressure (mb), 10-Meter Wind (mph), 1000-500mb Thickness (dam)'  
*hour
'set strsiz .14'
'set string 1 r'
'draw string 10.37 8.12 Hour: '%H
*valid
'set strsiz .13'
'set string 1 l'
'set font 10'
'draw string .4 8.12 Valid: '%forecastutc' '%forecastday' '%forecastdate''%forecastmonth''%forecastyear
*Init
'set string 1 l'
'draw string .4 .15 'INITHOUR%'Z '%INIT_STRINGDATE' '%MODELFORTITLE
*separator
'set strsiz .11'
'draw string 5.5 .3 |'
'draw string 5.5 .10 |'
*minval
'set string 2 r'
'draw string 5.46 0.10 Min Pressure: 'minval_slp' mb'
'draw string 5.46 0.30 Min Dewpoint: 'minval_dewpoint' `ao`nF'
*maxval
'set string 4 l'
'draw string 5.6 0.10 Max Pressure: 'maxval_slp' mb'
'draw string 5.6 0.30 Max Dewpoint: 'maxval_dewpoint' `ao`nF'
*weathertogether.net
'set font 11'
'set strsiz .14'
'set string 11 r'
'draw string 10.37 .15 weathertogether.net'

***** ***** Save output as .png ***** *****
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%MODEL'_'%REGION'_'%FILENAME'_'%FULLH'.png x1100 y850'

'quit'

