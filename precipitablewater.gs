*This script plots 500 hPa heights/absolute vorticity from the GFS in decameters and inverse seconds, respectively, over a polar stereographic
*projection of the NE Pacific. It then saves the output to a .png file named 500-hPa-NE-Pacific in the current directory. To run this script,you will need to have xcbar.gs and colormaps.gs installed. 

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html



*Basic commands to clear everything, make background white, turn off timestamp/grads, and set plotting area.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set parea 0.3 10.3 0.4 7.75'

*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs20170311/gfs_0p25_00z'

*Set time-step you want to plot. For this GFS, time-steps are in 3 hour intervals from t=1 to t=81, where t=1 is the initialization (0 hour forecast). 
*To find how many hours in advance you are plotting: hours=(t-1)*3
'set t 3'

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
'xcbar.gs -fstep 5 -line on -edge circle -direction v 9.8 10 .4 7.75'

*draw titles, caption, and axis label for map. Make sure to change the times so they are accurate! As coded thus far, approriate "Model: 00Z 11MAR2017 GFS                Valid: 06Z 11MAR2017 (6-hour forecast)"
'draw string .85 7.9         Precipitable Water (shaded, inches)'      
'draw string .85 0.25 Model: __Z DDMONYYYY GFS                Valid: __Z DDMONYYYY (_-hour forecast)'
'draw string 7.9 7.9 weathertogether.us'
*Save output as .png file in current directory
'gxprint Precipitable-Water-NE-Pacific.png x1024 y768'
