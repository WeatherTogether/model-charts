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
if MODEL = 'GFS_0.25'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/2_m_above_ground_TMP_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/10_m_above_ground_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/10_m_above_ground_VGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_HGT_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/1000_mb_HGT_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/mean_sea_level_PRMSL_'%FULLH'.ctl'
say '/home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/mean_sea_level_PRMSL_'%FULLH'.ctl'
endif
if MODEL = 'NAM_12'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/2_m_above_ground_TMP_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/10_m_above_ground_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/10_m_above_ground_VGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_HGT_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/1000_mb_HGT_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/mean_sea_level_PRMSL_'%FULLH'.ctl'
endif

***** ***** Define Region ***** *****

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

if REGION='colriver'
    LAT1=44.68
    LAT2=46.7
    LON1='-122.2'
    LON2='-118.9'
    'set xlevs -122 -121 -120 -119 -118'
    'set ylevs 45 46'
    MAP=latlon
endif

if REGION='pacnwzoom'
    LAT1=43.8
    LAT2=49.8
    LON1='-126'
    LON2='-116.2'
    'set xlevs -126 -124 -122 -120 -118 -116'
    'set ylevs 44 45 46 47 48 49 50'
    MAP=latlon
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

*PLOT 2-METER TEMPERATURE
*below freezing
'set rgb 16 248 248 255'
'set rgb 17 248 239 250'
'set rgb 18 249 231 246'
'set rgb 19 249 222 241'
'set rgb 20 250 214 237'
'set rgb 21 250 205 232'
'set rgb 22 251 196 228'
'set rgb 23 251 188 223'
'set rgb 24 251 179 219'
'set rgb 25 252 170 214'
'set rgb 26 252 162 210'
'set rgb 27 253 153 205'
'set rgb 28 253 145 201'
'set rgb 29 253 136 196'
'set rgb 30 254 127 192'
'set rgb 31 254 119 187'
'set rgb 32 255 110 183'
'set rgb 33 255 102 182'
'set rgb 34 255 96 186'
'set rgb 35 255 90 191'
'set rgb 36 255 83 195'
'set rgb 37 255 77 200'
'set rgb 38 255 71 204'
'set rgb 39 255 65 209'
'set rgb 40 255 58 213'
'set rgb 41 255 52 218'
'set rgb 42 255 46 222'
'set rgb 43 255 39 227'
'set rgb 44 255 33 232'
'set rgb 45 255 27 236'
'set rgb 46 255 20 241'
'set rgb 47 255 14 245'
'set rgb 48 255 8 250'
'set rgb 49 255 1 254'
'set rgb 50 250 0 253'
'set rgb 51 243 0 250'
'set rgb 52 237 0 248'
'set rgb 53 231 0 245'
'set rgb 54 224 0 242'
'set rgb 55 218 0 240'
'set rgb 56 211 0 237'
'set rgb 57 205 0 234'
'set rgb 58 198 0 232'
'set rgb 59 192 0 229'
'set rgb 60 185 0 226'
'set rgb 61 179 0 224'
'set rgb 62 172 0 221'
'set rgb 63 166 0 218'
'set rgb 64 160 0 216'
'set rgb 65 153 0 213'
'set rgb 66 147 1 211'
'set rgb 67 142 8 212'
'set rgb 68 137 14 213'
'set rgb 69 132 20 214'
'set rgb 70 127 27 215'
'set rgb 71 122 33 215'
'set rgb 72 117 39 216'
'set rgb 73 112 46 217'
'set rgb 74 107 52 218'
'set rgb 75 102 58 219'
'set rgb 76 97 65 220'
'set rgb 77 92 71 220'
'set rgb 78 87 77 221'
'set rgb 79 82 83 222'
'set rgb 80 77 90 223'
'set rgb 81 72 96 224'
'set rgb 82 67 102 225'
'set rgb 83 63 110 226'
'set rgb 84 59 119 228'
'set rgb 85 55 128 230'
'set rgb 86 51 138 232'
'set rgb 87 47 147 233'
'set rgb 88 43 156 235'
'set rgb 89 39 165 237'
'set rgb 90 35 174 239'
'set rgb 91 31 183 241'
'set rgb 92 27 192 242'
'set rgb 93 23 201 244'
'set rgb 94 20 210 246'
'set rgb 95 16 219 248'
'set rgb 96 12 228 250'
'set rgb 97 8 237 251'
'set rgb 98 4 246 253'
'set rgb 99 0 255 255'
*above freezing
'set rgb 100 0 100 0'
'set rgb 101 3 106 3'
'set rgb 102 6 112 6'
'set rgb 103 9 118 9'
'set rgb 104 11 124 11'
'set rgb 105 14 130 14'
'set rgb 106 17 136 17'
'set rgb 107 20 142 20'
'set rgb 108 23 148 23'
'set rgb 109 26 154 26'
'set rgb 110 28 160 28'
'set rgb 111 31 166 31'
'set rgb 112 34 172 34'
'set rgb 113 37 178 37'
'set rgb 114 40 184 40'
'set rgb 115 43 189 43'
'set rgb 116 45 195 45'
'set rgb 117 48 201 48'
'set rgb 118 55 206 49'
'set rgb 119 66 209 46'
'set rgb 120 78 212 43'
'set rgb 121 90 215 40'
'set rgb 122 101 218 38'
'set rgb 123 113 220 35'
'set rgb 124 125 223 32'
'set rgb 125 136 226 29'
'set rgb 126 148 229 26'
'set rgb 127 159 232 23'
'set rgb 128 171 235 20'
'set rgb 129 183 237 18'
'set rgb 130 194 240 15'
'set rgb 131 206 243 12'
'set rgb 132 218 246 9'
'set rgb 133 229 249 6'
'set rgb 134 241 252 3'
'set rgb 135 253 254 1'
'set rgb 136 253 244 3'
'set rgb 137 251 231 6'
'set rgb 138 249 218 10'
'set rgb 139 247 204 13'
'set rgb 140 245 191 16'
'set rgb 141 243 178 20'
'set rgb 142 241 164 23'
'set rgb 143 239 151 27'
'set rgb 144 238 138 30'
'set rgb 145 236 124 33'
'set rgb 146 234 111 37'
'set rgb 147 232 97 40'
'set rgb 148 230 84 44'
'set rgb 149 228 71 47'
'set rgb 150 226 57 50'
'set rgb 151 224 44 54'
'set rgb 152 222 31 57'
'set rgb 153 219 20 59'
'set rgb 154 214 19 56'
'set rgb 155 209 18 53'
'set rgb 156 203 16 49'
'set rgb 157 198 15 46'
'set rgb 158 193 14 42'
'set rgb 159 188 13 39'
'set rgb 160 182 12 35'
'set rgb 161 177 11 32'
'set rgb 162 172 10 29'
'set rgb 163 167 8 25'
'set rgb 164 161 7 22'
'set rgb 165 156 6 18'
'set rgb 166 151 5 15'
'set rgb 167 146 4 12'
'set rgb 168 141 3 8'
'set rgb 169 135 2 5'
'set rgb 170 130 0 1'
'set rgb 171 132 8 8'
'set rgb 172 140 21 20'
'set rgb 173 147 34 33'
'set rgb 174 154 47 46'
'set rgb 175 161 60 59'
'set rgb 176 168 73 72'
'set rgb 177 176 86 84'
'set rgb 178 183 98 97'
'set rgb 179 190 111 110'
'set rgb 180 197 124 123'
'set rgb 181 204 137 136'
'set rgb 182 212 150 148'
'set rgb 183 219 163 161'
'set rgb 184 226 176 174'
'set rgb 185 233 189 187'
'set rgb 186 241 202 199'
'set rgb 187 248 215 212'
'set rgb 188 255 228 225'
'set rgb 189 255 228 225'
'set rgb 190 255 228 225'

'set clevs -50 -49 -48 -47 -46 -45 -44 -43 -42 -41 -40 -39 -38 -37 -36 -35 -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120'

'set ccols 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188'

*Plot temperature
'set gxout shaded'
'd (TMP2m.1-273.15)*9/5 + 32'
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

**** MAXVAL (Temp)
'd amax((tmp2m.1-273.15)*9/5 +32, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
say result
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
say result
maxval_temp = math_format('%5.1f',maxval)

**** MINVAL (Temp)
'd amin((tmp2m.1-273.15)*9/5 +32, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_temp = math_format('%5.1f',minval)


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

***** ***** plot high and low centers via mfhilo function ***** *****
radius=1000
cint=300

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
    'set strsiz .30'
    'set string 2 c 6'
    'draw string 'x_min' 'y_min' L'

    'set strsiz 0.15'
    'set string 2 c 6'
    'draw string 'x_min' 'y_min-0.3' 'minval
        
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
    'set strsiz .3'
    'set string 4 c 6'
    'draw string 'x_min' 'y_min' H'

    'set strsiz 0.15'
    'set string 4 c 6'
    'draw string 'x_min' 'y_min-0.3' 'minval
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
'draw string .4 8.37 2-Meter Temperature (`ao`nF), Sea-Level Pressure (mb), 10-Meter Wind (mph), 1000-500mb Thickness (dam)'  
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
'set string 4 r'
'draw string 5.46 0.30 Min Temp: 'minval_temp' `ao`nF'
*maxval
'set string 4 l'
'draw string 5.6 0.10 Max Pressure: 'maxval_slp' mb'
'set string 2 l'
'draw string 5.6 0.30 Max Temp: 'maxval_temp' `ao`nF'
*weathertogether.net
'set font 11'
'set strsiz .14'
'set string 11 r'
'draw string 10.37 .15 weathertogether.net'

***** ***** Save output as .png ***** *****
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%MODEL'_'%REGION'_'%FILENAME'_'%FULLH'.png x1100 y850'

'quit'

