*This script generates a time series at a lat/lon point of the temperature at a specified level and the 6-hour precip from the GFS ensemble.


*Basic commands to clear everything, set background white, turn off timestamp/grads.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set parea 1 10 1 7.5'


*open file (be sure to change it to the model you want to open!)
*GFS ensembles
'sdfopen  http://nomads.ncep.noaa.gov:9090/dods/gens/gens20170318/gep_all_12z'
*GFS high resolution operational
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs20170318/gfs_0p25_12z'

* *** SET YOUR VARIABLES!!! :)

*Model info
run = 12z
date = 18Mar2017
model = GFS

*location - NOTE: if any one of these is not applicable, simply use an empty string, i.e. ""
city = "Portland (KPDX)"
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




*change to first file opened with sdfopen
'set dfile 1'

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

*Draw titles and strings

'set strsiz 0.12' 
'set string 1 bl 5 0'
'draw string 1.05 8.1 '%city''","' '%state' '%country' '"("''%latitude''","' '%longitude''")"
'draw string 1.05  7.85 '%level' '"hPa Temperature (red, `ao`nC)" 
'draw string 1.05 7.6 6-hour Precipitation (green, inches)' 

*draw model run
'set strsiz .11'
'set string 1 br'
'draw string 9.95 7.9 '"Model: "''run%' '%date' '%model
 
*draw weathertogether.us
'set strsiz .12'
'set string 11 br' 
'draw string 9.95 7.6 weathertogether.us'

*draw y-axis on left
'set strsiz 0.15' 
'set string 1 c 3 -90' 
'draw string .5 4.25 'level%' hPa Temperature (`ao`nC)'

*draw y axis on right
'set strsiz 0.15' 
'set string 1 c 3 -90' 
'draw string 10.5 4.25 6-hour Precipitation (inches)'

*draw legend

'set line 1 1 2'
'draw recf 4.75 6.88 6.25 7.5'
'set line 0 1 2'
'draw recf 4.76 6.9 6.24 7.49'
'set strsiz 0.1' 
'set string 1 c 3 0'
'draw string 5.5 7.4 Control'
'set string 14'
'draw string 5.5 7.2 Operational'
'set string 4'
'draw string 5.5 7.0 Ensemble Mean'


*print to leveltemp.png in current directory

'gxprint leveltemp.png x1024 y768'
