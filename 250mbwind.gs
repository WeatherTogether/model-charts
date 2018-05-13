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

if MODEL = 'GFS_0.25'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/250_mb_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/250_mb_VGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/250_mb_HGT_'%FULLH'.ctl'
endif
if MODEL = 'NAM_12'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/250_mb_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/250_mb_VGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/250_mb_HGT_'%FULLH'.ctl'
endif
if MODEL = 'HRRR_Sub'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/250_mb_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/250_mb_'%FULLH'.ctl'
endif

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

*Plot 250mb wind shading
*set color
'color.gs 20 200 2 -kind (255,255,255,0)-(0)->(255,255,255,0)-(1)->aquamarine->green->yellow->crimson->plum->bisque->palevioletred->maroon'
'd mag(UGRD250mb.1*2.237,VGRD250mb.2*2.237)'
'xcbar.gs -fstep 5 -line on -fwidth 0.11 -fheight 0.12 -direction v 10.4 10.6 .6 8'

*Plot 250mb wind barbs
'set gxout barb'
'set ccolor 1'
'set digsiz .04'
if (MODEL = "GFS_0.25")
    if REGION='pacnw'
        'd skip(UGRD250mb.1*2.237,5,5);VGRD250mb.2*2.237'
    else
        'd skip(UGRD250mb.1*2.237,10,10);VGRD250mb.2*2.237'
    endif
endif
if (MODEL = "NAM_12")
    if REGION='pacnw'
        'd skip(UGRD250mb.1*2.237,10,10);VGRD250mb.2*2.237'
    else
        'd skip(UGRD250mb.1*2.237,24,24);VGRD250mb.2*2.237'
    endif
endif

*plot the height contours in intervals of 3 decameters
'set gxout contour'
'set ccolor 1'
'set cint 6'
'set cthick 5'
'set clab masked'
'd HGT250mb.3/10'

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

**** MAXVAL (Wind)
'd amax(mag(UGRD250mb.1*2.237,VGRD250mb.2*2.237), lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
say result
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
say result
maxval_wind = math_format('%5.1f',maxval)

**** MINVAL (Wind)
'd amin(mag(UGRD250mb.1*2.237,VGRD250mb.2*2.237), lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_wind = math_format('%5.1f',minval)

**** MAXVAL (Height)
'd amax(HGT250mb.3/10, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_height = math_format('%5.1f',maxval) 

**** MINVAL (Height)
'd amin(HGT250mb.3/10, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_height = math_format('%5.1f',minval)

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
'draw string .4 8.37 250mb Wind (mph), Heights (dam)'
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
'draw string 5.46 0.10 Min Height: 'minval_height' dam'
'draw string 5.46 0.30 Min Wind: 'minval_wind' mph'
*maxval
'set string 2 l'
'draw string 5.6 0.10 Max Height: 'maxval_height' dam'
'draw string 5.6 0.30 Max Wind: 'maxval_wind' mph'
*weathertogether.net
'set font 11'
'set strsiz .14'
'set string 11 r'
'draw string 10.37 .15 weathertogether.net'

***** ***** Save output as .png ***** *****
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%MODEL'_'%REGION'_'%FILENAME'_'%FULLH'.png x1100 y850'

'quit'


