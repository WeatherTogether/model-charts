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

'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/surface_CAPE_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/10_m_above_ground_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/10_m_above_ground_VGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/850_mb_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/850_mb_VGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_VGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/mean_sea_level_PRMSL_'%FULLH'.ctl'

***** ***** Define Variables ***** *****

*'define u10m=UGRD10m.2'
*'define v10m=VGRD10m.3'
*'define u850=UGRD850mb.4'
*'define v850=VGRD850mb.5'
*'define u500=UGRD500mb.6'
*'define v500=VGRD500mb.7'

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
    MPVALSLAT1='-60'
    MPVALSLAT2='-90'
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

*set colors
'color 0 6500 100 -kind (255,255,255,0)-(0)->lightaquamarine->green->yellow->orange->red->darkviolet->palevioletred->lightpink->peachpuff->burlywood->firebrick'

'set gxout shaded'
'd CAPEsfc.1'
'xcbar.gs -fstep 10 -line off -fwidth 0.09 -fheight 0.10 -direction v 10.4 10.6 .6 8'

*plot 1000-500hPa thickness in intervals of 6 decameters
*** CHANGE THICKNESS SETTINGS HERE
*'set clevs 476 480 486 492 498 504 510 516 522 528 534 540 546 552 558 564 570 576 582 588 594 600'
*'set ccols 4 4 4 4 4 4 4 4 4 4 4 4 2 2 2 2 2 2 2 2 2 2'
*'set gxout contour'
*'set cint 6'
*'set cthick 3'
*'set cstyle 3'
*'set clab masked'
*'d (hgt500mb.4-hgt1000mb.5)/10'

*plot the SLP contours in intervals of 3 hPa
'set gxout contour'
'set cint 3'
'set ccolor 1'
'set cstyle 1'
'set cthick 2'
if REGION='pacnw'
    'set cint 1'
    'set cthick 2'
endif
'set clab masked'
'd prmslmsl.8/100'

*Plot 10m, 850mb, and 500mb wind barbs
'set gxout barb'
'set digsiz .03'
if (MODEL = "GFS_0.25")
    if REGION='pacnw'
        'set ccolor 1'
        'd skip(UGRD10m.2*2.237,5,5);VGRD10m.3*2.237'
        'set ccolor 2'
        'd skip(UGRD850mb.4*2.237,5,5);VGRD850mb.5*2.237'
        'set ccolor 4'
        'd skip(UGRD500mb.6*2.237,5,5);VGRD500mb.7*2.237'
    else
        'set ccolor 1'
        'd skip(UGRD10m.2*2.237,10,10);VGRD10m.3*2.237'
        'set ccolor 2'
        'd skip(UGRD850mb.4*2.237,10,10);VGRD850mb.5*2.237'
        'set ccolor 4'
        'd skip(UGRD500mb.6*2.237,10,10);VGRD500mb.7*2.237'
    endif
endif
if (MODEL = "NAM_12")
    if REGION='pacnw'
        'set ccolor 1'
        'd skip(UGRD10m.2*2.237,10,10);VGRD10m.3*2.237'
        'set ccolor 2'
        'd skip(UGRD850mb.4*2.237,10,10);VGRD850mb.5*2.237'
        'set ccolor 4'
        'd skip(UGRD500mb.6*2.237,10,10);VGRD500mb.7*2.237'
    else
        'set ccolor 1'
        'd skip(UGRD10m.2*2.237,24,24);VGRD10m.3*2.237'
        'set ccolor 2'
        'd skip(UGRD850mb.4*2.237,24,24);VGRD850mb.5*2.237'
        'set ccolor 4'
        'd skip(UGRD500mb.6*2.237,24,24);VGRD500mb.7*2.237'
     endif
endif


***** ***** plot high and low centers via mfhilo function ***** *****
radius=1000
cint=300

'set font 11'

*   ******************************DRAW L's******************************

'mfhilo prmslmsl.8/100 CL l 'radius', 'cint

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

'mfhilo prmslmsl.8/100 CL h 'radius', 'cint

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

**** MAXVAL (CAPE)
'd amax(CAPEsfc.1, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
say result
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
say result
maxval_cape = math_format('%5.1f',maxval)

**** MINVAL (CAPE)
'd amin(CAPEsfc.1, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_cape = math_format('%5.1f',minval)


**** MAXVAL (SLP)
'd amax(prmslmsl.8/100, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_slp = math_format('%5.1f',maxval) 

**** MINVAL (SLP)
'd amin(prmslmsl.8/100, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
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
'draw string .4 8.37 Surface-Based CAPE (J/kg), 10m/850mb/500mb Wind Vectors (black/red/blue; mph), SLP (mb)'
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
*'draw string 5.5 .3 |'
'set string 1 c'
'draw string 5.5 0.30 Max CAPE: 'maxval_cape' J/kg'
'draw string 5.5 .10 |'
*minval
'set string 2 r'
'draw string 5.42 0.10 Min Pressure: 'minval_slp' mb'
*'draw string 5.42 0.30 Min CAPE: 'minval_cape' J/kg'
*maxval
'set string 4 l'
'draw string 5.6 0.10 Max Pressure: 'maxval_slp' mb'
*'draw string 5.6 0.30 Max CAPE: 'maxval_cape' J/kg'
*weathertogether.net
'set font 11'
'set strsiz .14'
'set string 11 r'
'draw string 10.37 .15 weathertogether.net'

*Save output as .png
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%MODEL'_'%REGION'_'%FILENAME'_'%FULLH'.png x1100 y850'

'quit'
