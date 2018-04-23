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
if MODEL = 'GFS_0.25'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/BIGGRIB_surface_APCP.ctl'
endif
if MODEL = 'NAM_12'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/BIGGRIB_surface_APCP.ctl'
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
    LON2='-107.52'
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

if REGION='middleeast'
    LAT1=0
    LAT2=55
    LON1=0
    LON2=90
    MAP=latlon
endif

if REGION='colriver'
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
if MAP!='latlon'
    'set mpvals '%MPVALSLON1' '%MPVALSLON2' '%MPVALSLAT1' '%MPVALSLAT2
endif
'set mproj '%MAP

***** ***** Begin plotting ***** *****

*Plot total accumulated precipitation

'set rgb 16 255 255 255'
'set rgb 17 228 228 228'
'set rgb 18 200 200 200'
'set rgb 19 173 173 173'
'set rgb 20 145 145 145'
'set rgb 21 130 138 130'
'set rgb 22 135 164 135'
'set rgb 23 140 191 140'
'set rgb 24 145 217 145'
'set rgb 25 151 244 151'
'set rgb 26 135 233 142'
'set rgb 27 113 209 128'
'set rgb 28 90 185 114'
'set rgb 29 67 161 100'
'set rgb 30 45 136 90'
'set rgb 31 35 106 127'
'set rgb 32 25 76 163'
'set rgb 33 15 46 199'
'set rgb 34 5 16 235'
'set rgb 35 17 21 253'
'set rgb 36 54 68 247'
'set rgb 37 92 114 242'
'set rgb 38 129 161 236'
'set rgb 39 166 208 231'
'set rgb 40 181 212 228'
'set rgb 41 190 206 225'
'set rgb 42 199 201 221'
'set rgb 43 208 195 218'
'set rgb 44 213 184 213'
'set rgb 45 194 142 194'
'set rgb 46 175 101 175'
'set rgb 47 156 60 156'
'set rgb 48 137 19 137'
'set rgb 49 143 0 143'
'set rgb 50 170 0 170'
'set rgb 51 198 0 198'
'set rgb 52 225 0 225'
'set rgb 53 253 0 253'
'set rgb 54 240 7 212'
'set rgb 55 223 14 164'
'set rgb 56 207 21 116'
'set rgb 57 190 29 69'
'set rgb 58 183 42 32'
'set rgb 59 199 70 25'
'set rgb 60 216 98 17'
'set rgb 61 232 126 10'
'set rgb 62 249 155 3'
'set rgb 63 255 177 0'
'set rgb 64 255 197 0'
'set rgb 65 255 216 0'
'set rgb 66 255 236 0'
'set rgb 67 255 255 0'
'set rgb 68 255 255 175'
'set rgb 69 255 255 225'
'set rgb 70 255 255 255'

'set clevs 0 0.005 0.01 0.015 0.02 0.025 0.03 0.04 0.05 0.075 0.1 0.125 0.15 0.175 0.2 0.25 0.3 0.35 0.4 0.45 0.5 0.625 0.75 0.875 1 1.125 1.25 1.375 1.5 1.625 1.75 1.875 2 2.25 2.5 2.75 3 3.5 4 4.5 5 6.25 7.5 8.75 10 12.5 15 17.5 20 22.5 25 30 35'

'set ccols 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70'

*set color

'set gxout shaded'

if H <= 240
    'set t 1'
    'q ctlinfo'
    tdef=sublin(result,7)
    tstep=subwrd(tdef, 2)
    say tstep
    count=1
    say count
    'define totalprecip=apcpsfc.1'
    while(count<tstep)
        'set t 'count
        'define totalprecip=totalprecip + apcpsfc.1'
        count=count+1
    endwhile
    'd totalprecip*0.03937007874'
else
    'set t 1'
    'q ctlinfo'
    tdef=sublin(result,7)
    tstep=subwrd(tdef, 2)
    say tstep
    count=1
    say count
    'define totalprecip=apcpsfc.1'
    while(count<tstep)
        'set t 'count
        'define totalprecip=totalprecip + apcpsfc.1'
        count=count+1
    endwhile

    'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/BIGGRIB_EXT_surface_APCP.ctl'
    'set dfile 2'
    'set t 1'
    'set lon '%LON1' '%LON2
    'set lat '%LAT1' '%LAT2
    'q ctlinfo'
    tdef=sublin(result,7)
    tstep=subwrd(tdef, 2)
    say tstep
    count=1
    say count
*    'define totalprecipext=apcpsfc'
*'define totalprecipext= lterp(totalprecip,apcpsfc)'
   'define totalprecipext= lterp(apcpsfc,totalprecip)'
    while(count<tstep) 
        'set t 'count
        'define totalprecipext=totalprecipext + apcpsfc.2'
        count=count+1
    endwhile
    'define allprecip = totalprecip+totalprecipext'
    'd allprecip*0.03937007874'
endif

*'set gxout shaded'
*'d totalprecip*0.03937007874'

'xcbar.gs -fstep 2 -line on -fwidth 0.11 -fheight 0.12 -direction v 10.4 10.6 .6 8'

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



**** MAXVAL (Precip)
if H <= 240
    'd amax(totalprecip*0.03937, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
else
    'd amax(allprecip*0.03937, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
endif
    
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_apcp = math_format('%5.1f',maxval) 

**** MINVAL (Precip)
if H <= 240
    'd amin(totalprecip*0.03937, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
else
    'd amin(allprecip*0.03937, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
endif
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_apcp = math_format('%5.1f',minval)

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
'draw string .4 8.37 Total Precipitation from 'INITHOUR%'Z '%INIT_STRINGDATE' to '%forecastutc' '%forecastdate''%forecastmonth''%forecastyear': '%H'-Hour Forecast'
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
*minval
'set string 2 r'
'draw string 5.46 0.30 Min Precip: 'minval_apcp' inches'
*maxval
'set string 4 l'
'draw string 5.6 0.30 Max Precip: 'maxval_apcp' inches'


*weathertogether.net
'set font 11'
'set strsiz .14'
'set string 11 r'
'draw string 10.37 .15 weathertogether.net'

***** ***** Save output as .png ***** *****
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%MODEL'_'%REGION'_'%FILENAME'_'%FULLH'.png x1100 y850'

'quit'

