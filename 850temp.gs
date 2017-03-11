*This plot generates the 850 hPa temperature over a certain area from the GFS ensemble (in this case, KPDX)


*Basic commands to clear everything, set background white, turn off timestamp/grads.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set parea 1 10 1 7.5'

*open file
'sdfopen  http://nomads.ncep.noaa.gov:9090/dods/gens/gens20170310/gep_all_18z'


*define latitude and longitude you want to make your time series at. The lat/lon below is for Portland, OR
'set lat 45.52'
'set lon 237.32'

*set time
'set t 1 65'

* TEMPERATURE

*set level for Temperature
'set lev 850'

*set range for y-axis
'set vrange -30 30'


*plot ensembles
ens=0;while(ens<21);ens=ens+1
 'set gxout line'
 'set cmark 0'
 'set ccolor 2'
 'set cthick 1'
 'set csmooth on'
 'set e 'ens
 'd (tmpprs-273.15)'
endwhile


*plot control
'set e 1'
'set gxout line'
'set cmark 0'
'set ccolor 1' 
'set cthick 10'
'd (tmpprs-273.15)'

*Plot ensemble mean
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave((tmpprs-273.15),e=1,e=21)'

'set strsiz 0.15' 
'set string 1 c 3 -90' 
'draw string .5 4.25 850 hPa Temperature (`ao`nC)'

*PRECIPITATION

*Set axis range, put labels on right side, set grid off
'set vrange 0 2'
'set ylpos 0 r'
'set grid off'

*plot ensembles
'define precip=0'
ens=0;while(ens<21);ens=ens+1
 'set gxout line'
 'set cmark 0'
 'set ccolor 3'
 'set cthick 1'
 'set csmooth on'
 'set e 'ens
 'd apcpsfc/25.4'
endwhile

*plot control
'set e 1'
'set gxout line'
'set cmark 0'
'set ccolor 1' 
'set cthick 10'
'd apcpsfc/25.4'

*Plot ensemble mean
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave(apcpsfc/25.4,e=1,e=21)'


*END PRECIP

*Draw titles and strings

'set strsiz 0.1' 
'set string 1 bl 5 0'
'draw string 1.05 7.9 Portland, OR 850 hPa Temperature (`ao`nC)'
'draw string 1.05 7.6 6-hour Precip (inches)' 
'draw string 5 7.9 Control = black'
'set string 4'
'draw string 5 7.6 Ens. mean = blue' 
'set string 1'
'draw string 8 7.9 18Z 10Mar2017 GEFS'     
'draw string 8 7.6 weathertogether.us'

'set strsiz 0.15' 
'set string 1 c 4 -90' 
'draw string 10.5 4.25 6-hour Precipitation (inches)'

*draw box (not quite working right now)

'set strsiz 0.1' 
'set string 0 '
'draw recf 8 6.9 10 7.5'
'set string 0 bl 3 0'
'draw string 8.1 7.3 Control = Black'
'set string 4'
'draw string 8.1 7.1 Ensemble Mean = Blue'


*print to 850temp.png in current directory

'gxprint 850temp.png x1024 y768'
