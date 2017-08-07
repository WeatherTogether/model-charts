*This script generates a time series at a lat/lon point of the temperature at a specified level and the 6-hour precip from the GFS ensemble and .25 degree GFS operational.

function script(args)
BIGCTL=subwrd(args,1)
GFSBIGCTL=subwrd(args,2)
GFSBIGCTLEXT=subwrd(args,3)
INIT_INTDATE=subwrd(args,4)
INIT_STRINGDATE=subwrd(args,5)

INITHOUR=subwrd(args,6)
FILENAME=subwrd(args,7)
MODEL=subwrd(args,8)
MODELFORTITLE=subwrd(args,9)
LEVEL=subwrd(args,10)

DAYOFYEAR=subwrd(args,11)
MODELRUNLENGTH=subwrd(args,12)

ICAO=subwrd(args,13)
STATE=subwrd(args,14)
COUNTRY=subwrd(args,15)
LATITUDE=subwrd(args,16)
LONGITUDE=subwrd(args,17)

TEMPMIN=subwrd(args,18)
TEMPMAX=subwrd(args,19)
PRECIPMIN=subwrd(args,20)
PRECIPMAX=subwrd(args,21)

CITY1=subwrd(args,22)
CITY2=subwrd(args,23)
CITY3=subwrd(args,24)
CITY4=subwrd(args,25)
CITY5=subwrd(args,26)
CITY6=subwrd(args,27)

*unelegant way to import name of city from bash script - this should be fixed. Problem stems because city names are usually multiple words and I don't want to use underscores.
city=CITY1' 'CITY2' 'CITY3' 'CITY4' 'CITY5' 'CITY6

dayofyear2=DAYOFYEAR+MODELRUNLENGTH

*Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea .85 10.15 .4 7.5'

*Open control files
*GFS ensembles
'open 'BIGCTL

*GFS high resolution operational
'open 'GFSBIGCTL
'open 'GFSBIGCTLEXT

*1981-2010 climatology
'sdfopen /home/mint/opengrads/Contents/datafiles/air.day.1981-2010.ltm.nc'

*change to first file opened
'set dfile 1'

*set time
'set t 1 65'

* *** PRECIPITATION ***

*Set axis range, put labels on right side
'set ylab on'
'set vrange 'PRECIPMIN%' '%PRECIPMAX
'set ylpos 0 r'
'set grid off'

*plot ensembles
'set lat 'LATITUDE
'set lon 'LONGITUDE

ens=0;while(ens<21);ens=ens+1
 'set gxout line'
 'set cmark 0'
 'set ccolor 3'
 'set cthick 1'
 'set e 'ens
 'd apcpsfc/25.4'
 'set ylab off'
 'set xlab off'
endwhile

*plot control
'set e 1'
'set gxout line'
'set cmark 0'
'set ccolor 1' 
'set cthick 12'
'd apcpsfc/25.4'

*Plot high-resolution operational
'set dfile 2'
*file t dimension goes from 1-81, but we need to set t from 1 to 129 so that operational goes to the appropriate length with respect to the ensembles
'set t 1 129'
'set gxout line'
'set cmark 0'
'set ccolor 14' 
'set cthick 12'
'd apcpsfc/25.4'
*'set dfile 3'
*'set t 1 13'
'set gxout line'
'set cmark 0'
'set ccolor 14' 
'set cthick 12'
*'d apcpsfc/25.4'

*Plot ensemble mean
'set dfile 1'
'set t 1 65'
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave(apcpsfc/25.4,e=1,e=21)'

*END PRECIP

* *** TEMPERATURE

*set level for Temperature
'set lev 'LEVEL

*set range for y-axis, set grid off, put labels on left side
'set ylab on'
'set vrange 'TEMPMIN%' '%TEMPMAX
'set grid on'
'set ylpos 0 l'

*change to first file opened with sdfopen
'set dfile 1'
'set t 1 65'

*plot ensembles
ens=0;while(ens<21);ens=ens+1
 'set gxout line'
 'set cmark 0'
 'set ccolor 2'
 'set cthick 1'
 'set e 'ens
 'd (tmp'%LEVEL'mb-273.15)'
 'set ylab off'
 'set grid off'
endwhile

*plot control
'set e 1'
'set gxout line'
'set cmark 0'
'set ccolor 1' 
'set cthick 12'
'd (tmp'%LEVEL'mb-273.15)'

*Plot high-resolution operational
'set dfile 2'
*file t dimension goes from 1-81, but we need to set t from 1 to 129 so that operational goes to the appropriate length with respect to the ensembles 
'set t 1 129'
'set gxout line'
'set cmark 0'
'set ccolor 14' 
'set cthick 12'
'd (tmp'%LEVEL'mb-273.15)'
*'set dfile 3'
*'set t 1 13'
'set gxout line'
'set cmark 0'
'set ccolor 14' 
'set cthick 12'
*'d (tmp'%LEVEL'mb-273.15)'

*Plot ensemble mean
'set dfile 1'
'set t 1 65'
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave((tmp'%LEVEL'mb-273.15),e=1,e=21)'

*Plot climatology

*Set axis range, put labels on right side, set grid off
'set dfile 4'
'set lev 'LEVEL
'set lat 'LATITUDE
'set lon 'LONGITUDE
'set t '%DAYOFYEAR' '%dayofyear2
'set cmark 0'
'set ccolor 6' 
'set cthick 12'
'd (air-273.15)'

*END TEMP

*Draw titles and strings
'set strsiz 0.20' 
'set string 1 c 5 0'
'draw string 5.5 8.33 '%city
'set string 1 bl 5 0'

'set strsiz .14'
'draw string .9 8.08 ICAO Code: '%ICAO
'draw string .9 7.83 Coordinates: '%LATITUDE''","' '%LONGITUDE 
'draw string .9 7.58 '%STATE''","' '%COUNTRY

*draw model run
'set strsiz .14'
'set string 1 br'
'draw string 10.10 7.85 '"Model: "''INITHOUR%'Z '%INIT_STRINGDATE' '%MODELFORTITLE

*draw weathertogether.net
'set font 11'
'set strsiz .17'
'set string 11 br' 
'draw string 10.10 7.6 weathertogether.net'

*draw y-axis on left
'set font 10'
'set strsiz 0.2' 
'set string 1 c 3 -90' 
'draw string .3 3.95 'LEVEL%' hPa Temperature (red, `ao`nC)'

*draw y axis on right
'set strsiz 0.2' 
'set string 1 c 3 -90' 
'draw string 10.76 3.95 6-hour Precipitation (green, inches)'

*draw legend

'set line 1 1 2'
'draw recf 4.40 6.67 6.60 7.5'
'set line 0 1 2'
'draw recf 4.41 6.68 6.59 7.49'
'set strsiz 0.12' 
'set string 1 c 3 0'
'draw string 5.5 7.4 Control'
'set string 14'
'draw string 5.5 7.2 Operational'
'set string 4'
'draw string 5.5 7.0 Ensemble Mean'
'set string 6'
'draw string 5.5 6.8 Climatology (1981-2010)'


*print to .png
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%FILENAME' x1200 y927'

'quit'

