*This script plots sea-level-pressure (hPa), 6-hour precipitation (in), and 1000-500mb thicknesses (dam) over a polar *stereographic projection of the NE Pacific. It then saves the output to a .png file named SLP-Precip-NE-Pacific in the current directory. To run this script,you will need to have xcbar.gs and colormaps.gs installed. 

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html

*To do list: 

*Basic commands to clear everything, make background white, turn off timestamp, and fix window output to 1100x850.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 12 file /usr/share/fonts/type1/gsfonts/n019023l.pfb'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea 0.3 10.3 0.15 7.5'


* *** SET YOUR VARIABLES!!! :)

*Model date
run = "12z"
day = "23"
month = "03"
year = "2017"

*frame (goes from 1-81 in 3-hour intervals, hours=(frame-1)*3)
frame=54


*** End variables

*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'%year''%month''%day'/gfs_0p25_'%run


*** Begin plotting

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
'set mpt 2 1 1 1'
'set grid on 5 1 1'

*set time to plot
'set t 'frame

*Plot 6-hour precipitation with colormaps and xcbar scripts
'set gxout shaded'
'colormaps.gs -map s3pcpn -custom 0 .01 .02 .05 .1 .15 .20 .25 .30 .35 .40 .45 .50 .60 .70 .80 .90 1.00 1.20 1.50 2.00 5.00'
'd apcpsfc/25.4'
'xcbar.gs -line on -edge circle -direction v 9.8 10 .15 7.5'

*** CHANGE THICKNESS SETTINGS HERE
*plot 1000-500hPa thickness in intervals of 6 decameters
'set gxout contour'
'set cint 6'
'set cthick 3'
'set cstyle 3'
'set clab masked'
'set clevs 476 480 486 492 498 504 510 516 522 528 534 540 546 552 558 564 570 576 582 588 594 600'
'set ccols 4 4 4 4 4 4 4 4 4 4 4 4 2 2 2 2 2 2 2 2 2 2'

'd (hgtprs(lev=500)-hgtprs(lev=1000))/10'

*plot the SLP contours in intervals of 3 hPa
'set gxout contour'
'set cint 3'
'set ccolor 1'
'set cstyle 1'
'set cthick 1'
'set clab masked'
'd prmslmsl/100'

*** End plotting

*Get time of forecast
'q time'
forecastutc=substr(result, 24, 3)
forecastdate=substr(result, 27, 2)
forecastmonth=substr(result, 29, 3)
forecastyear=substr(result, 32, 4)
forecastday=substr(result, 45, 3)

*Get time of model run
'set t 1' 
'q time'
initutc=substr(result, 8, 3)
initdate=substr(result, 11, 2)
initmonth=substr(result, 13, 3)
inityear=substr(result, 16, 4)
initday=substr(result, 38, 3)

*Get hour of forecast          
hours = (frame-1)*3

*Draw shapefiles
'set line 1 1 1'
'draw shp Shapefiles/PROVINCE.shp'
'draw shp Shapefiles/mexstates.shp'

*draw titles and strings for map!
'set strsiz .18'
'draw string .85 8.26 1000-500 hPa Thickness (dotted contours, dam)'
'draw string .85 7.97 Sea-Level Pressure (contours, hPa)' 
'draw string .85 7.68 6-Hour Precipitation (shaded, inches)' 
'set string 4 br'
'set strsiz .14'
'set string 1 br'
'draw string 9.75 8.30 '"Model: "''initutc%' '%initdate''%initmonth''%inityear' '"GFS"
'set font 12'
'set string 4'
'draw string 9.75 8.05 '"Valid: "''%forecastutc' '%forecastday' '%forecastdate''%forecastmonth''%forecastyear
'draw string 9.75 7.85 '%hours' '"- hour forecast"
'set font 11'
'set strsiz .17'
'set string 11'
'draw string 9.75 7.58 weathertogether.us'    


*plot high and low centers via mfhilo function
'set t '%frame 
radius=1000
cint=300

*   ******************************DRAW L's******************************

'mfhilo prmslmsl/100 CL l 'radius', 'cint

Low_info=result
i=2         ;*Since the data starts on the 2nd line
minmax=sublin(Low_info,i)

while(subwrd(minmax,1) = 'L') 

  min_lat = subwrd(minmax, 2)
  min_lon = subwrd(minmax, 3)
  min_val = subwrd(minmax, 5)
  minval = math_nint(min_val)

  'q w2xy 'min_lon' 'min_lat      ;*Translate lat/lon to page coordinates
   x_min = subwrd(result,3)
   y_min = subwrd(result,6)


  'q gxinfo'                      ;*Get area boundaries
  xline=sublin(result,3)
  yline=sublin(result,4)
  xs=subwrd(xline,4)' 'subwrd(xline,6)
  ys=subwrd(yline,4)' 'subwrd(yline,6)

  if(y_min > subwrd(ys,1)+0.3 & y_min < subwrd(ys,2)-0.3 & x_min > subwrd(xs,1)+0.3 & x_min < subwrd(xs,2)-0.3)
    'set strsiz .3'
    'set string 2 c 6'
    'draw string 'x_min' 'y_min' L'

    'set strsiz 0.15'
    'set string 2 c 6'
    'draw string 'x_min' 'y_min-0.3' 'minval
        
  endif

  i=i+1
  minmax = sublin(Low_info,i)
endwhile


*   ******************************DRAW H's******************************

'mfhilo prmslmsl/100 CL h 'radius', 'cint

High_info=result
i=2         ;*Since the data starts on the 2nd line
minmax=sublin(High_info,i)

while(subwrd(minmax,1) = 'H') 

  min_lat = subwrd(minmax, 2)
  min_lon = subwrd(minmax, 3)
  min_val = subwrd(minmax, 5)
  minval = math_nint(min_val)

  'q w2xy 'min_lon' 'min_lat      ;*Translate lat/lon to page coordinates
   x_min = subwrd(result,3)
   y_min = subwrd(result,6)


  'q gxinfo'                      ;*Get area boundaries
  xline=sublin(result,3)
  yline=sublin(result,4)
  xs=subwrd(xline,4)' 'subwrd(xline,6)
  ys=subwrd(yline,4)' 'subwrd(yline,6)

  if(y_min > subwrd(ys,1)+0.3 & y_min < subwrd(ys,2)-0.3 & x_min > subwrd(xs,1)+0.3 & x_min < subwrd(xs,2)-0.3)
    'set strsiz .3'
    'set string 4 c 6'
    'draw string 'x_min' 'y_min' H'

    'set strsiz 0.15'
    'set string 4 c 6'
    'draw string 'x_min' 'y_min-0.3' 'minval
  endif

  i=i+1
  minmax = sublin(High_info,i)
endwhile

*Save output as .png file in current directory
'gxprint 6hourprecip.png'
