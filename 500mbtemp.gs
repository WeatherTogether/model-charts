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
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_TMP_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_HGT_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_VGRD_'%FULLH'.ctl'

***** ***** Define Region ***** *****

if REGION='northhemisphere'
    LAT1=20
    LAT2=90
    LON1='0'
    LON2='360'
    MAP='nps'
    MPVALSLON1='0'
    MPVALSLON2='360'
    MPVALSLAT1='40'
    MPVALSLAT2='90'
endif

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

*Plot 500mb temps shading
*set color
*'color.gs -60 -28 1 -verbose -kind (102,255,178)->(0,51,51)->(255,255,240)->(255,102,178)->(51,0,102)->(229,204,255)->(0,51,102)->(204,255,255)'
*'color.gs -27 0 1 -verbose -kind (204,255,204)->(0,51,0)->(255,255,153)->(102,0,0)->(255,255,255)->(76,0,51)'

'set rgb 16  102 255 178'
'set rgb 17  80 212 151'
'set rgb 18  59 168 124'
'set rgb 19  37 125 97'
'set rgb 20  15 82 70'
'set rgb 21  15 63 62'
'set rgb 22  70 107 103'
'set rgb 23  124 150 143'
'set rgb 24  178 193 183'
'set rgb 25  232 236 223'
'set rgb 26  255 236 232'
'set rgb 27  255 204 219'
'set rgb 28  255 172 206'
'set rgb 29  255 139 193'
'set rgb 30  255 107 180'
'set rgb 31  218 83 164'
'set rgb 32  175 62 148'
'set rgb 33  131 40 132'
'set rgb 34  88 19 116'
'set rgb 35  56 6 107'
'set rgb 36  94 49 139'
'set rgb 37  132 93 172'
'set rgb 38  170 136 204'
'set rgb 39  207 179 236'
'set rgb 40  208 190 241'
'set rgb 41  160 158 209'
'set rgb 42  111 125 176'
'set rgb 43  62 93 144'
'set rgb 44  14 60 111'
'set rgb 45  31 82 125'
'set rgb 46  74 125 158'
'set rgb 47  117 168 190'
'set rgb 48  161 212 223'
'set rgb 49  204 255 255'
*** break
'set rgb 50  204 255 204'
'set rgb 51  168 219 168'
'set rgb 52  131 182 131'
'set rgb 53  95 146 95'
'set rgb 54  58 109 58'
'set rgb 55  22 73 22'
'set rgb 56  18 66 11'
'set rgb 57  64 102 38'
'set rgb 58  109 138 66'
'set rgb 59  155 175 93'
'set rgb 60  200 211 120'
'set rgb 61  246 248 148'
'set rgb 62  233 219 131'
'set rgb 63  206 173 104'
'set rgb 64  179 128 77'
'set rgb 65  151 82 49'
'set rgb 66  124 36 22'
'set rgb 67  107 9 9'
'set rgb 68  135 55 55'
'set rgb 69  162 100 100'
'set rgb 70  189 146 146'
'set rgb 71  217 191 191'
'set rgb 72  244 237 237'
'set rgb 73  236 228 233'
'set rgb 74  204 182 197'
'set rgb 75  172 137 160'
'set rgb 76  140 91 124'
'set rgb 77  108 46 87'
'set rgb 78  76 0 51'


'set clevs -55 -54 -53 -52 -51 -50 -49 -48 -47 -46 -45 -44 -43 -42 -41 -40 -39 -38 -37 -36 -35 -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5' 

'set ccols 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78'

*Plot temperature
'set gxout shaded'
'd (TMP500mb.1-273.15)'
'set gxout contour'
'set clevs 0'
'set ccolor 2'
'set clab off'
'd (TMP500mb.1-273.15)'
'xcbar.gs -fstep 5 -line off -fwidth 0.11 -fheight 0.12 -direction v 10.4 10.6 .6 8'

*Plot 500mb wind barbs
'set gxout barb'
'set ccolor 1'
'set cthick 2'
'set digsiz .03'
if (MODEL = "GFS_0.25")
    if REGION='pacnw'
        'd skip(ugrd500mb.3*2.237,5,5);vgrd500mb.4*2.237'
    else
        'd skip(ugrd500mb.3*2.237,10,10);vgrd500mb.4*2.237'
    endif
endif
if (MODEL = "NAM_12")
    if REGION='pacnw'
        'd skip(ugrd500mb.3*2.237,10,10);vgrd500mb.4*2.237'
    else
        'd skip(ugrd500mb.3*2.237,24,24);vgrd500mb.4*2.237'
    endif
endif

*plot the height contours in intervals of 3 decameters
'set gxout contour'
'set ccolor 1'
'set cint 6'
'set cthick 5'
'set clab masked'
'd HGT500mb.2/10'

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
'd amax(tmp500mb.1-273.15, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_temp = math_format('%5.1f',maxval) 

**** MINVAL (TEMP)
'd amin(tmp500mb.1-273.15, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_temp = math_format('%5.1f',minval)

**** MAXVAL (SLP)
'd amax(hgt500mb.2/10, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_hgt = math_format('%5.1f',maxval) 

**** MINVAL (SLP)
'd amin(hgt500mb.2/10, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_hgt = math_format('%5.1f',minval)

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
'draw string .4 8.37 500mb Temperature (`ao`nC), Heights (dam), Winds (mph)'
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
'draw string 5.46 0.10 Min Height: 'minval_hgt' dam'
'draw string 5.46 0.30 Min Temp: 'minval_temp' `ao`nC'
*maxval
'set string 4 l'
'draw string 5.6 0.10 Max Height: 'maxval_hgt' dam'
'draw string 5.6 0.30 Max Temp: 'maxval_temp' `ao`nC'
*weathertogether.net
'set font 11'
'set strsiz .14'
'set string 11 r'
'draw string 10.37 .15 weathertogether.net'

***** ***** Save output as .png ***** *****
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%MODEL'_'%REGION'_'%FILENAME'_'%FULLH'.png x1100 y850'

'quit'


