
*This script generates a time series at a lat/lon point of the temperature at a specified level and the 6-hour precip from the GFS ensemble.


*Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea 1 10 1 7.5'

* *** SET YOUR VARIABLES!!! :)

*Model date
run = "12z"
day = "23"
month = "03"
year = "2017"

*location - NOTE: if any one of these is not applicable, simply use an empty string, i.e. ""
city = "Portland Int'l Airport (KPDX)"
state = "OR"
country = "USA"

*lat and lon 
latitude = 45.59
longitude = 237.41

*KSEA is 47.45, 237.69
*KPDX is 45.59, 237.41
*KTTD is 45.55, 237.60
*KHIO is 45.54, 237.05

*level (hPa)
level = 850

*Precipitation y-axis range (inches)
precipmin=0
precipmax=2

*Temperature y-axis range (Celsius)
tempmin=-20
tempmax=20

*ensemble time range (each step is 6 hours, model has 65 steps)
tmin = 1
tmax= 65

* Done with variable setting, begin script commands

*Open netcdf file from NOMADS server
*GFS ensembles
'sdfopen  http://nomads.ncep.noaa.gov:9090/dods/gens/gens'%year''%month''%day'/gep_all_'%run

*GFS high resolution operational
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'%year''%month''%day'/gfs_0p25_'%run


'set lat 'latitude
'set lon 'longitude

*set time
'set t 'tmin%' '%tmax


* *** TEMPERATURE

*set level for Temperature
'set lev 'level

*set range for y-axis
'set vrange 'tempmin%' '%tempmax

*change to first file opened with sdfopen
'set dfile 1'

*plot ensembles
ens=0;while(ens<21);ens=ens+1
 'set gxout line'
 'set cmark 0'
 'set ccolor 2'
 'set cthick 1'
 'set csmooth on'
 'set e 'ens
 'd (tmpprs-273.15)'
 'set xlab off'
 'set ylab off'
endwhile


*plot control
'set e 1'
'set gxout line'
'set cmark 0'
'set ccolor 1' 
'set cthick 10'
'd (tmpprs-273.15)'

*Plot high-resolution operational
'set dfile 2'
'set gxout line'
'set cmark 0'
'set ccolor 14' 
'set cthick 10'
'd (tmpprs-273.15)'

*Plot ensemble mean
'set dfile 1'
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave((tmpprs-273.15),e=1,e=21)'
*END TEMP


* *** PRECIPITATION ***


*Set axis range, put labels on right side, set grid off
'set ylab on'
'set vrange 'precipmin%' '%precipmax
'set ylpos 0 r'
'set grid off'

*plot ensembles
*'define precip=0' (would like to sum precip eventually)
ens=0;while(ens<21);ens=ens+1
 'set gxout line'
 'set cmark 0'
 'set ccolor 3'
 'set cthick 1'
 'set csmooth on'
 'set e 'ens
 'd apcpsfc/25.4'
 'set ylab off'
endwhile

*plot control
'set e 1'
'set gxout line'
'set cmark 0'
'set ccolor 1' 
'set cthick 10'
'd apcpsfc/25.4'

*Plot high-resolution operational
'set dfile 2'
'set gxout line'
'set cmark 0'
'set ccolor 14' 
'set cthick 10'
'd apcpsfc/25.4'

*Plot ensemble mean
'set dfile 1'
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave(apcpsfc/25.4,e=1,e=21)'


*END PRECIP

*Get time of model run
'set t 1' 
'q time'
initutc=substr(result, 8, 3)
initdate=substr(result, 11, 2)
initmonth=substr(result, 13, 3)
inityear=substr(result, 16, 4)
initday=substr(result, 38, 3)


*Draw titles and strings

'set strsiz 0.16' 
'set string 1 c 5 0'
'draw string 5.5 8.3 '%city''","' '%state' '%country' '"("''%latitude''","' '%longitude''")"
'set string 1 bl 5 0'
'draw string 1.05  7.85 '%level' '"hPa Temperature (red, `ao`nC)" 
'draw string 1.05 7.6 6-hour Precipitation (green, inches)' 

*draw model run
'set strsiz .14'
'set string 1 br'
'draw string 9.95 7.9 '"Model: "''initutc%' '%initdate''%initmonth''%inityear' '"GFS"

*draw weathertogether.us
'set font 11'
'set strsiz .15'
'set string 11 br' 
'draw string 9.95 7.6 weathertogether.us'

*draw y-axis on left
'set font 10'
'set strsiz 0.2' 
'set string 1 c 3 -90' 
'draw string .5 4.25 'level%' hPa Temperature (`ao`nC)'

*draw y axis on right
'set strsiz 0.2' 
'set string 1 c 3 -90' 
'draw string 10.5 4.25 6-hour Precipitation (inches)'

*draw legend

'set line 1 1 2'
'draw recf 4.75 6.88 6.25 7.5'
'set line 0 1 2'
'draw recf 4.76 6.9 6.24 7.49'
'set strsiz 0.12' 
'set string 1 c 3 0'
'draw string 5.5 7.4 Control'
'set string 14'
'draw string 5.5 7.2 Operational'
'set string 4'
'draw string 5.5 7.0 Ensemble Mean'


*print to leveltemp.png in current directory

'gxprint leveltemp.png'
