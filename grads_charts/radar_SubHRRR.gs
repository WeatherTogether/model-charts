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

if MODEL = 'GFS_0.25'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/80_m_above_ground_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/80_m_above_ground_VGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/mean_sea_level_PRMSL_'%FULLH'.ctl'
endif
if MODEL = 'NAM_12'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/80_m_above_ground_UGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/80_m_above_ground_VGRD_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/mean_sea_level_PRMSL_'%FULLH'.ctl'
endif
if MODEL = 'HRRR_Sub'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/entire_atmosphere_REFC_'%FULLH'.ctl'
endif



***** ***** FIND INFO FOR LOOP ***** *****
'q ctlinfo'
tdef=sublin(result,7)
tstep=subwrd(tdef, 2)
say tstep
count=1
say count
while(count<=tstep)
    minute=15*count
    'set t '%count

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

***** ***** BEGIN PLOTTING ***** *****
*set color

'set gxout grfill'


'color 5 75 2.5 -kind white-(0)->aqua->blue->lime->green->darkgreen->yellow->goldenrod->orange->firebrick->red->darkred->fuchsia->indigo'

*'d smth9(maskout(REFCl10.1, REFCl10.1-5))'
'd REFCl10.1'

'xcbar.gs -fstep 4 -line off -fwidth 0.11 -fheight 0.12 -direction v 10.4 10.6 .6 8 -line on'

*Min and Mav Values
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

**** MAXVAL (Dbz)
'd amax(REFCl10.1, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
say result
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
say result
maxval_dbz = math_format('%5.1f',maxval)


*** End plotting

*Get time of forecast

'q time'
if MODEL='HRRR_Sub'
    forecastutc=substr(result, 27, 6)
    forecastdate=substr(result, 33, 2)
    forecastmonth=substr(result, 35, 3)
    forecastyear=substr(result, 38, 4)
    forecastday=substr(result, 51, 3)
    if count=4
        forecastutc=substr(result, 24, 3)
        forecastdate=substr(result, 27, 2)
        forecastmonth=substr(result, 29, 3)
        forecastyear=substr(result, 32, 4)
        forecastday=substr(result, 45, 3)    
    endif
    if tstep=1
        forecastutc=substr(result, 24, 3)
        forecastdate=substr(result, 27, 2)
        forecastmonth=substr(result, 29, 3)
        forecastyear=substr(result, 32, 4)
        forecastday=substr(result, 45, 3)    
    endif
endif
    
*Draw shapefiles
'set line 1 1 1'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Canada/PROVINCE.shp'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Mexico/mexstates.shp' 

*draw titles and strings for map!
*title
'set strsiz .13'
'set font 11'
'draw string .4 8.35 Composite Reflectivity (dBZ)'
*hour
'set strsiz .14'
'set string 1 r'
if MODEL='HRRR_Sub'
    if FULLH = 00
        'draw string 10.37 8.1 Hour: '%H':00'
    else 
        if minute=60
            'draw string 10.37 8.1 Hour: '%H':00'
        else
            realh=H-1
            'draw string 10.37 8.1 Hour: '%realh':'%minute
        endif
    endif
endif
*'draw string 10.37 8.1 Hour: '%H
*valid
'set strsiz .13'
'set string 1 l'
'set font 10'
'draw string .4 8.1 Valid: '%forecastutc' '%forecastday' '%forecastdate''%forecastmonth''%forecastyear
*Init
'set string 1 l'
'draw string .4 .15 'INITHOUR%'Z '%INIT_STRINGDATE' '%MODELFORTITLE
*maxval
'set strsiz .11'
'set string 1 c'
'draw string 5.5 0.30 Max Reflectivity: 'maxval_dbz' dBZ'
*weathertogether.net
'set font 11'
'set strsiz .14'
'set string 11 r'
'draw string 10.37 .15 weathertogether.net'


*Save output as .png
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%MODEL'_'%REGION'_'%FILENAME'_'%FULLH'.'%count'.png x1100 y850'
count=count+1
say count
'set display color white'
'clear graphics'
'set grads off'
endwhile
'quit'
