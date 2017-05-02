*This script generates a time series at a lat/lon point of the temperature at a specified level and the 6-hour precip from the GFS ensemble and .25 degree GFS operational.

function script(args)
rundate = subwrd(args,1)
runhour = subwrd(args,2)
dayofyear = subwrd(args,3)

ICAO = subwrd(args,4)
state = subwrd(args,5)
country = subwrd(args,6)
latitude = subwrd(args,7)
longitude = subwrd(args,8)

level=subwrd(args,9)
tempmin = subwrd(args,10)
tempmax = subwrd(args,11)
precipmin=subwrd(args,12)
precipmax=subwrd(args,13)

*unelegant way to import name of city from bash script - this should be fixed. Problem stems because city names are usually multiple words and I don't want to use underscores.
city1=subwrd(args,14)
city2=subwrd(args,15)
city3=subwrd(args,16)
city4=subwrd(args,17)
city5=subwrd(args,18)
city6=subwrd(args,19)
city=city1' 'city2' 'city3' 'city4' 'city5' 'city6
say city

dayofyear2 = dayofyear + 15

*Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea .85 10.15 .4 7.5'

*Open netcdf file from NOMADS server
*GFS ensembles
'sdfopen  http://nomads.ncep.noaa.gov:9090/dods/gens/gens20'rundate'/gep_all_'runhour'z'

*GFS high resolution operational
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs20'rundate'/gfs_0p25_'runhour'z'

*1981-2010 climatology
'sdfopen /home/mint/opengrads/Contents/datafiles/air.day.1981-2010.ltm.nc'

*Get time of model run
'set t 1' 
'q time'
initutc=substr(result, 8, 3)
initdate=substr(result, 11, 2)
initmonth=substr(result, 13, 3)
inityear=substr(result, 16, 4)
initday=substr(result, 38, 3)

*set time
'set t 1 65'

* *** PRECIPITATION ***

*Set axis range, put labels on right side
'set ylab on'
'set vrange 'precipmin%' '%precipmax
'set ylpos 0 r'
'set grid off'

*change to first file opened with sdfopen
'set dfile 1'

*plot ensembles
'set lat 'latitude
'set lon 'longitude

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
'set gxout line'
'set cmark 0'
'set ccolor 14' 
'set cthick 12'
'd apcpsfc/25.4'

*Plot ensemble mean
'set dfile 1'
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave(apcpsfc/25.4,e=1,e=21)'

*END PRECIP

* *** TEMPERATURE

*set level for Temperature
'set lev 'level

*set range for y-axis, set grid off, put labels on left side
'set ylab on'
'set vrange 'tempmin%' '%tempmax
'set grid on'
'set ylpos 0 l'

*change to first file opened with sdfopen
'set dfile 1'

*plot ensembles
ens=0;while(ens<21);ens=ens+1
 'set gxout line'
 'set cmark 0'
 'set ccolor 2'
 'set cthick 1'
 'set e 'ens
 'd (tmpprs-273.15)'
 'set ylab off'
 'set grid off'
endwhile

*plot control
'set e 1'
'set gxout line'
'set cmark 0'
'set ccolor 1' 
'set cthick 12'
'd (tmpprs-273.15)'

*Plot high-resolution operational
'set dfile 2'
'set gxout line'
'set cmark 0'
'set ccolor 14' 
'set cthick 12'
'd (tmpprs-273.15)'

*Plot ensemble mean
'set dfile 1'
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave((tmpprs-273.15),e=1,e=21)'

*Plot climatology

*Set axis range, put labels on right side, set grid off
'set dfile 3'
'set lev 'level
'set lat 'latitude
'set lon 'longitude
'set t '%dayofyear' '%dayofyear2
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
'draw string .9 7.83 Coordinates: '%latitude''","' '%longitude 
'draw string .9 7.58 '%state''","' '%country

*draw model run
'set strsiz .14'
'set string 1 br'
'draw string 10.10 7.85 Model: 'initutc%' '%initdate''%initmonth''%inityear' '"GEFS"

*draw weathertogether.us
'set font 11'
'set strsiz .17'
'set string 11 br' 
'draw string 10.10 7.6 weathertogether.us'

*draw y-axis on left
'set font 10'
'set strsiz 0.2' 
'set string 1 c 3 -90' 
'draw string .3 3.95 'level%' hPa Temperature (red, `ao`nC)'

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
'gxprint grads_pics/spaghetti_plots/gefs/'%ICAO'/'%ICAO'_'%level'temp_'%runhour'zGEFS.png x1200 y927'

'quit'
