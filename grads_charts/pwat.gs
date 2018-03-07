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
*    'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/*ISBL_500_HGT_'%FULLH'.ctl'
*    'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/*EATM_0_CWAT_'%FULLH'.ctl'
*endif
if MODEL = 'GFS_0.25'
    'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_HGT_'%FULLH'.ctl'
    'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/entire_atmosphere_%5C%28considered_as_a_single_layer%5C%29_PWAT_'%FULLH'.ctl'
endif
if MODEL = 'NAM_12'
    'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_HGT_'%FULLH'.ctl'
    'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/entire_atmosphere_%5C%28considered_as_a_single_layer%5C%29_PWAT_'%FULLH'.ctl'
endif

***** ***** Define Region ***** *****

if REGION='northamerica'
    LAT1=20
    LAT2=75
    LON1='-160'
    LON2='-70'
    MAP='latlon'
* 'set lon '%LON1' '%LON2
* 'set lat '%LAT1' '%LAT2
* 'set mpvals 20 89 30 160'
* 'set mproj '%MAP
endif

if REGION='pacnw'
    LAT1=40
    LAT2=55
    LON1='-132'
    LON2='-107.45'
    MAP='latlon'
endif

if REGION='conus'
    LAT1=15
    LAT2=54.72
    LON1='-128'
    LON2='-63'
    'set xlevs -120 -110 -100 -90 -80 -70'
    'set ylevs 20 30 40 50'
    MAP='latlon'
endif

if REGION='namconus'
    LAT1=18.5
    LAT2=58.22
    LON1='-129.5'
    LON2='-64.5'
    'set xlevs -120 -110 -100 -90 -80 -70'
    'set ylevs 20 30 40 50'
    MAP='latlon'
endif

if REGION='middleeast'
    LAT1=0
    LAT2=55
    LON1=0
    LON2=90
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
'set mproj '%MAP

***** ***** Begin plotting ***** *****

*PLOT PRECIPITABLE WATER (inches)
'set rgb 16 0 0 0'
'set rgb 17 22 14 7'
'set rgb 18 45 29 14'
'set rgb 19 67 43 21'
'set rgb 20 89 58 27'
'set rgb 21 112 72 34'
'set rgb 22 134 87 41'
'set rgb 23 156 101 48'
'set rgb 24 179 116 55'
'set rgb 25 201 130 62'
'set rgb 26 200 144 71'
'set rgb 27 195 156 81'
'set rgb 28 189 169 90'
'set rgb 29 183 182 100'
'set rgb 30 177 195 110'
'set rgb 31 171 208 119'
'set rgb 32 166 221 129'
'set rgb 33 160 233 139'
'set rgb 34 154 246 148'
'set rgb 35 141 241 141'
'set rgb 36 125 224 125'
'set rgb 37 108 208 108'
'set rgb 38 92 191 92'
'set rgb 39 75 175 75'
'set rgb 40 59 158 59'
'set rgb 41 42 142 42'
'set rgb 42 26 125 26'
'set rgb 43 9 109 9'
'set rgb 44 13 108 0'
'set rgb 45 40 125 0'
'set rgb 46 68 141 0'
'set rgb 47 96 158 0'
'set rgb 48 124 175 0'
'set rgb 49 151 192 0'
'set rgb 50 179 209 0'
'set rgb 51 207 226 0'
'set rgb 52 235 243 0'
'set rgb 53 255 247 0'
'set rgb 54 255 220 0'
'set rgb 55 255 192 0'
'set rgb 56 255 164 0'
'set rgb 57 255 136 0'
'set rgb 58 255 109 0'
'set rgb 59 255 81 0'
'set rgb 60 255 53 0'
'set rgb 61 255 25 0'
'set rgb 62 255 0 3'
'set rgb 63 255 0 30'
'set rgb 64 255 0 58'
'set rgb 65 255 0 86'
'set rgb 66 255 0 114'
'set rgb 67 255 0 141'
'set rgb 68 255 0 169'
'set rgb 69 255 0 197'
'set rgb 70 255 0 225'
'set rgb 71 255 0 252'
'set rgb 72 230 0 255'
'set rgb 73 202 0 255'
'set rgb 74 174 0 255'
'set rgb 75 146 0 255'
'set rgb 76 119 0 255'
'set rgb 77 91 0 255'
'set rgb 78 63 0 255'
'set rgb 79 35 0 255'
'set rgb 80 8 0 255'
'set rgb 81 0 20 255'
'set rgb 82 0 48 255'
'set rgb 83 0 76 255'
'set rgb 84 0 104 255'
'set rgb 85 0 131 255'
'set rgb 86 0 159 255'
'set rgb 87 0 187 255'
'set rgb 88 0 215 255'
'set rgb 89 0 242 255'
'set rgb 90 8 240 247'
'set rgb 91 22 212 234'
'set rgb 92 35 184 220'
'set rgb 93 49 157 206'
'set rgb 94 63 129 192'
'set rgb 95 77 101 178'
'set rgb 96 91 73 164'
'set rgb 97 105 45 151'
'set rgb 98 119 18 137'
'set rgb 99 130 1 124'
'set rgb 100 135 5 114'
'set rgb 101 141 9 104'
'set rgb 102 146 12 94'
'set rgb 103 152 16 83'
'set rgb 104 157 20 73'
'set rgb 105 163 24 63'
'set rgb 106 168 27 53'
'set rgb 107 174 31 42'
'set rgb 108 180 38 38'
'set rgb 109 188 59 59'
'set rgb 110 196 80 79'
'set rgb 111 205 101 100'
'set rgb 112 213 122 121'
'set rgb 113 221 143 142'
'set rgb 114 230 165 163'
'set rgb 115 238 186 183'
'set rgb 116 247 207 204'
'set rgb 117 255 228 225'

'set clevs 0 0.025 0.05 0.075 0.1 0.125 0.15 0.175 0.2 0.225 0.25 0.275 0.3 0.325 0.35 0.375 0.4 0.425 0.45 0.475 0.5 0.525 0.55 0.575 0.6 0.625 0.65 0.675 0.7 0.725 0.75 0.775 0.8 0.825 0.85 0.875 0.9 0.925 0.95 0.975 1 1.025 1.05 1.075 1.1 1.125 1.15 1.175 1.2 1.225 1.25 1.275 1.3 1.325 1.35 1.375 1.4 1.425 1.45 1.475 1.5 1.525 1.55 1.575 1.6 1.625 1.65 1.675 1.7 1.725 1.75 1.775 1.8 1.825 1.85 1.875 1.9 1.925 1.95 1.975 2 2.025 2.05 2.075 2.1 2.125 2.15 2.175 2.2 2.225 2.25 2.275 2.3 2.325 2.35 2.375 2.4 2.425 2.45 2.475 2.5'

'set ccols 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117'

*Plot precipitable water 
'set gxout shaded'
'd PWATclm.2/25.4'
'xcbar.gs -fstep 10 -line off -fwidth 0.11 -fheight 0.12 -direction v 10.4 10.6 .6 8'

*plot the height contours in intervals of 3 decameters
'set gxout contour'
'set cint 3'
'set cthick 5'
'set clab masked'
'd HGT500mb.1/10'

*Plot wind at level
*'set gxout barb'
*'set ccolor 1'
*'set digsiz .05'
*if (MODEL = "GFS_0.25_DEGREE")
*    'd skip(ugrdprs*2.237,15,15);vgrdprs*2.237'
*endif
*if (MODEL = "NAM_CONUS_12KM")
*    'd skip(ugrdprs*2.237,36,36);vgrdprs*2.237'
*endif

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

**** MAXVAL (Height)
'd amax(HGT500mb.1/10, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
say result
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
say result
maxval_height = math_format('%5.1f',maxval)

**** MINVAL (Height)
'd amin(HGT500mb.1/10, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_height = math_format('%5.2f',minval)


**** MAXVAL (PWAT)
'd amax(PWATclm.2/25.4, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_pwat = math_format('%5.1f',maxval)

**** MINVAL (PWAT)
'd amin(PWATclm.2/25.4, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_pwat = math_format('%5.2f',minval)

***** ***** End max and min ***** *****

***** ***** plot high and low centers via mfhilo function ***** *****
radius=1000
cint=300

*   ******************************DRAW L's******************************

'mfhilo hgt500mb.1/10 CL l 'radius', 'cint

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
    'set strsiz 0.15'
    'set string 1 c 5'
    'draw string 'x_min' 'y_min' 'minval      
  endif

  i=i+1
  minmax = sublin(Low_info,i)
endwhile

*   ******************************DRAW H's******************************

'mfhilo hgt500mb.1/10 CL h 'radius', 'cint

High_info=result
if (MODEL = "GFS_0.25_DEGREE")
    i=2         ;*Since the data starts on the 2nd line
    minmax=sublin(High_info,i)
endif
if (MODEL = "NAM_CONUS_12KM")
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
    'set strsiz 0.15'
    'set string 1 c 5'
    'draw string 'x_min' 'y_min' 'minval
  endif

  i=i+1
  minmax = sublin(High_info,i)
endwhile

***** ***** end mfhilo ***** *****

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
'draw string .4 8.37 Total Precipitable Water (inches), 500 mb Height (dam)'  
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
'set string 4 r'
'draw string 5.46 0.10 Min Height: 'minval_height' mb'
'draw string 5.46 0.30 Min PWAT: 'minval_pwat' in'
*maxval
'set string 2 l'
'draw string 5.6 0.10 Max Height: 'maxval_height' mb'
'draw string 5.6 0.30 Max PWAT: 'maxval_pwat' in'
*weathertogether.net
'set font 11'
'set strsiz .14'
'set string 11 r'
'draw string 10.37 .15 weathertogether.net'

***** ***** Save output as .png ***** *****
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%MODEL'_'%REGION'_'%FILENAME'_'%FULLH'.png x1100 y850'

'quit'

