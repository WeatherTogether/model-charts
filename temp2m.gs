*This plot generates the 2 m temperature over a certain area from the GFS ensemble (in this case, KPDX)

*To do: format lines so that things are easier to read, add labels for the control and ensemble mean lines.


*Basic commands to clear everything, set background white, turn off timestamp, and fix window output to 1024x768.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set xsize 1024 768'

*open file
'sdfopen  http://nomads.ncep.noaa.gov:9090/dods/gens/gens20170309/gep_all_06z'


*define latitude and longitude you want to make your time series at. The lat/lon below is for Portland, OR
'set lat 45.52'
'set lon 237.32'

*set time
'set t 1 65'

*plot ensembles
ens=0;while(ens<21);ens=ens+1
 'set cmark 0'
 'set line 1 2 1' 
 'set e 'ens
 'd (tmpsfc-273.15)*9/5 +32)'
endwhile

*plot control
'set e 1'
'set cmark 0'
'set line 1 1 10'
'd (tmpsfc-273.15)*9/5 +32)'

'draw title GEFS 2-meter temperature at Portland, OR'      
'draw string 2 0.2 Model: 00Z 09Mar2017 GEFS'
'draw string 8.3 0.2 weathertogether.us'

*Plot ensemble mean
'set cmark 0'
'set line 1 4 25'
'd ave(((tmpsfc-273.15)*9/5 +32),e=1,e=21)'


'gxprint tempsfc.png x1024 y768'



