*This script plots 500 hPa heights/absolute vorticity from the GFS in decameters and inverse seconds, respectively, over a polar stereographic
*projection of the NE Pacific. It then saves the output to a .png file named 500-hPa-NE-Pacific in the current directory. To run this script,you will need to have xcbar.gs and colormaps.gs installed. 

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html



*Basic commands to clear everything, make background white, turn off timestamp, and fix window output to 1100x850.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set parea 0.3 10.3 0.15 7.5'

*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs20170312/gfs_0p25_00z'

* *** SET YOUR VARIABLES!!! :)

*Model info
run = 00Z
date = 12Mar2017
model = GFS

*frame (goes from 1-81 in 3-hour intervals, hours=(frame-1)*3)
frame=3

*Set spatial domain for Grads to retrieve data from
'set lat 18 70'
'set lon -190 -80'

*Set map projection 
'set mpvals -160 -110 23 65'
'set mproj nps'

*style map
'set mpdset mres'
'set mpt 0 1 1 6'
'set mpt 1 1 1 6'
'set mpt 2 1 3 3'
'set grid on 5 1 1'

*Plot absolute vorticity with colormaps and xcbar scripts
'set gxout shaded'
'colormaps.gs -l 0 2 .04 -map s3pcpn'
'd pwatclm/25.4'
'xcbar.gs -fstep 5 -line on -edge circle -direction v 9.8 10 .15 7.5'

            
hours = (frame-1)*3


*draw titles and strings for map!
'draw string .85 7.7 Precipitable Water (shaded, inches)'       

'set string 4 br'

'draw string 9.8 8.25 '"Model: "''run%' '%date' '%model
'draw string 9.8 8.05'"Valid: HHZ DDMonYYYY ("''%hours''"-hour forecast)"
'set string 11 br'
'draw string 9.8 7.65 weathertogether.us'



*Save output as .png file in current directory
'gxprint Precipitable-Water-NE-Pacific.png x1024 y768'
