*This script makes a basemap of CONUS. To run this script,you will need to have colormaps.gs installed. 


*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html

*Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set parea 0.4 10.0 0.3 7.5'

'sdfopen  http://monsoondata.org:9090/dods/topo/rose/etopo05'


'set grid off'
'set mpt 0 1 1 6'
'set mpt 1 1 1 6'
'set mpt 2 1 1 3'


*** Begin plotting
*Set spatial domain for Grads to retrieve data from
'set lat 19 55'
'set lon -130 -65'

*style map
'set mpdset hires'
'set mpt 0 1 1 6'
'set mpt 1 1 1 6'
'set mpt 2 1 1 3'
'set xlab off'
'set ylab off'

*plot data
'set gxout shaded' 
int=(4100-200)/50 
*'colormaps -map ncl_topo -levels -200 4100 100'
'color 200 4100 'int' -kind white->dimgray'
'd rose'

*'basemap O 4 1 H'

'gxprint basemaps/usbasemap.png x1200 y927 png'

**
