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

originalH=H

*Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 12 file /usr/share/fonts/type1/gsfonts/n019023l.pfb'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea 0.37 10.4 0.6 8'

*Open control file

'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/925_mb_TMP_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/mean_sea_level_PRMSL_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/925_mb_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/925_mb_VGRD_'%FULLH'.ctl'


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
    LON2='359.99'
    MAP='sps'
    MPVALSLON1='0'
    MPVALSLON2='359.99'
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

*Plot 925mb temps shading
*set color
*'color.gs -60 0 1 -verbose -kind (102,255,178)->(0,51,51)->(255,255,240)->(255,102,178)->(51,0,102)->(229,204,255)->(0,51,102)->(204,255,255)'
*'color.gs 1 50 1 -verbose -kind (204,255,204)->(0,51,0)->(255,255,153)->(102,0,0)->(255,255,255)->(76,0,51)'

'set rgb 16  102 255 178'
'set rgb 17  90 232 163'
'set rgb 18  79 208 149'
'set rgb 19  67 185 134'
'set rgb 20  55 161 120'
'set rgb 21  43 138 105'
'set rgb 22  32 115 91'
'set rgb 23  20 91 76'
'set rgb 24  8 68 61'
'set rgb 25  8 58 57'
'set rgb 26  38 81 79'
'set rgb 27  67 105 101'
'set rgb 28  96 128 122'
'set rgb 29  125 151 144'
'set rgb 30  155 175 166'
'set rgb 31  184 198 187'
'set rgb 32  213 222 209'
'set rgb 33  242 245 231'
'set rgb 34  255 245 236'
'set rgb 35  255 227 229'
'set rgb 36  255 210 222'
'set rgb 37  255 192 215'
'set rgb 38  255 175 207'
'set rgb 39  255 157 200'
'set rgb 40  255 140 193'
'set rgb 41  255 122 186'
'set rgb 42  255 105 179'
'set rgb 43  235 92 171'
'set rgb 44  212 80 162'
'set rgb 45  188 69 153'
'set rgb 46  165 57 144'
'set rgb 47  141 45 136'
'set rgb 48  118 33 127'
'set rgb 49  94 22 118'
'set rgb 50  71 10 109'
'set rgb 51  54 3 105'
'set rgb 52  74 27 122'
'set rgb 53  95 50 140'
'set rgb 54  115 74 157'
'set rgb 55  136 97 175'
'set rgb 56  156 120 192'
'set rgb 57  176 144 210'
'set rgb 58  197 167 227'
'set rgb 59  217 191 245'
'set rgb 60  218 196 247'
'set rgb 61  191 179 230'
'set rgb 62  165 161 212'
'set rgb 63  139 144 195'
'set rgb 64  113 126 177'
'set rgb 65  86 109 160'
'set rgb 66  60 91 142'
'set rgb 67  34 74 125'
'set rgb 68  8 56 107'
'set rgb 69  17 68 115'
'set rgb 70  40 91 132'
'set rgb 71  64 115 150'
'set rgb 72  87 138 167'
'set rgb 73  110 161 185'
'set rgb 74  134 185 202'
'set rgb 75  157 208 220'
'set rgb 76  181 232 237'
'set rgb 77  204 255 255'
'set rgb 78  204 255 204'
'set rgb 79  184 235 184'
'set rgb 80  163 214 163'
'set rgb 81  143 194 143'
'set rgb 82  122 173 122'
'set rgb 83  102 153 102'
'set rgb 84  82 133 82'
'set rgb 85  61 112 61'
'set rgb 86  41 92 41'
'set rgb 87  20 71 20'
'set rgb 88  0 51 0'
'set rgb 89  26 71 15'
'set rgb 90  51 92 31'
'set rgb 91  77 112 46'
'set rgb 92  102 133 61'
'set rgb 93  128 153 77'
'set rgb 94  153 173 92'
'set rgb 95  179 194 107'
'set rgb 96  204 214 122'
'set rgb 97  230 235 138'
'set rgb 98  255 255 153'
'set rgb 99  240 230 138'
'set rgb 100  224 204 122'
'set rgb 101  209 179 107'
'set rgb 102  194 153 92'
'set rgb 103  179 128 77'
'set rgb 104  163 102 61'
'set rgb 105  148 77 46'
'set rgb 106  133 51 31'
'set rgb 107  117 26 15'
'set rgb 108  102 0 0'
'set rgb 109  117 26 26'
'set rgb 110  133 51 51'
'set rgb 111  148 77 77'
'set rgb 112  163 102 102'
'set rgb 113  179 128 128'
'set rgb 114  194 153 153'
'set rgb 115  209 179 179'
'set rgb 116  224 204 204'
'set rgb 117  240 230 230'
'set rgb 118  255 255 255'
'set rgb 119  237 230 235'
'set rgb 120  219 204 214'
'set rgb 121  201 179 194'
'set rgb 122  183 153 173'
'set rgb 123  166 128 153'
'set rgb 124  148 102 133'
'set rgb 125  130 77 112'
'set rgb 126  112 51 92'
'set rgb 127  94 26 71'
'set rgb 128  76 0 51'

'set clevs -60 -59 -58 -57 -56 -55 -54 -53 -52 -51 -50 -49 -48 -47 -46 -45 -44 -43 -42 -41 -40 -39 -38 -37 -36 -35 -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50'

'set ccols 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128'

*Plot temperature
'set gxout shaded'
'd (TMP925mb.1-273.15)'
'set gxout contour'
'set clevs 0'
'set ccolor 2'
'set clab off'
'd (TMP925mb.1-273.15)'
'xcbar.gs -fstep 5 -line off -fwidth 0.11 -fheight 0.12 -direction v 10.4 10.6 .6 8'

*Plot 925mb wind barbs
'set gxout barb'
'set ccolor 1'
'set cthick 2'
'set digsiz .03'
if (MODEL = "GFS_0.25")
    if REGION='pacnw'
        'd skip(ugrd925mb.3*2.237,5,5);vgrd925mb.4*2.237'
    else
        'd skip(ugrd925mb.3*2.237,10,10);vgrd925mb.4*2.237'
    endif
endif
if (MODEL = "NAM_12")
    if REGION='pacnw'
        'd skip(ugrd10m.3*2.237,10,10);vgrd10m.4*2.237'
    else
        'd skip(ugrd10m.3*2.237,24,24);vgrd10m.4*2.237'
    endif
endif

*plot the SLP contours in intervals of 3 hPa
'set gxout contour'
'set cint 3'
'set ccolor 1'
'set cstyle 1'
'set cthick 2'
if REGION='pacnw'
    'set cint 1'
endif
'set clab masked'
'd prmslmsl.2/100'

***** ***** plot high and low centers via mfhilo function ***** *****
radius=1000
cint=300

'set font 11'
*   ******************************DRAW L's******************************

'mfhilo prmslmsl.2/100 CL l 'radius', 'cint

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

'mfhilo prmslmsl.2/100 CL h 'radius', 'cint

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
if MODEL = 'HRRR_Sub'
    i=2
endif
if MODEL = 'GFS_0.25'
    i=1
endif
if MODEL = 'GDPS'
    i=1
endif

**** MAXVAL (TEMP)
'd amax(tmp925mb.1-273.15, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_temp = math_format('%5.1f',maxval) 

**** MINVAL (TEMP)
'd amin(tmp925mb.1-273.15, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_temp = math_format('%5.1f',minval)

**** MAXVAL (SLP)
'd amax(prmslmsl.2/100, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_hgt = math_format('%5.1f',maxval) 

**** MINVAL (SLP)
'd amin(prmslmsl.2/100, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
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
'draw string .4 8.37 925mb Temperature (`ao`nC), Heights (dam), Winds (mph)'
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
'draw string 5.46 0.10 Min SLP: 'minval_slp' mb'
'draw string 5.46 0.30 Min Temp: 'minval_temp' `ao`nC'
*maxval
'set string 4 l'
'draw string 5.6 0.10 Max SLP: 'maxval_slp' mb'
'draw string 5.6 0.30 Max Temp: 'maxval_temp' `ao`nC'
*weathertogether.net
'set font 11'
'set strsiz .14'
'set string 11 r'
'draw string 10.37 .15 weathertogether.net'

***** ***** Save output as .png ***** *****
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%MODEL'_'%REGION'_'%FILENAME'_'%FULLH'.png x1100 y850'

'quit'


