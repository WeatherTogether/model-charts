*Import arguments from bash script
function script(args)
CTLFILE = subwrd(args,1)
INIT_STRINGDATE = subwrd(args,2)
INIT_INTDATE = subwrd(args,3)
INITHOUR = subwrd(args,4)
FILENAME = subwrd(args,5)
H = subwrd(args,6)
MODEL = subwrd(args,7)
MODELFORTITLE = subwrd(args,8)
LEVEL = subwrd(args,9)
DAYOFYEAR = subwrd(args,10)

*Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 12 file /usr/share/fonts/type1/gsfonts/n019023l.pfb'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea 0.3 10.3 0.15 7.5'

*style map
'set mpdset hires'
'set mpt 0 1 1 6'
'set mpt 1 1 1 6'
'set mpt 2 1 1 3'
'set grid on 5 1 1'

*Open control file
'open 'CTLFILE
'sdfopen /home/mint/opengrads/Contents/datafiles/air.4Xday.1981-2010.ltm.nc'

*Convert control file 

*** Begin plotting
*Set spatial domain for Grads to retrieve data from
'set lat 16 70'
'set lon -190 -80'
'set t 1'
'set lev 'LEVEL

*Set map projection 
'set mpvals -160 -110 23 65'
'set mproj nps'
'define terp1 = tmpprs'
'set dfile 2'
'set lat 16 70'
'set lon -190 -80'
'set t 'DAYOFYEAR
'set lev 'LEVEL
'define terp2=air'
'define airtmp = lterp(terp2,terp1)'
'set gxout shaded'
'color -20 20 .5 -kind lightpink->magenta->purple->blue->dodgerblue->limegreen->white->peachpuff->orange->red->maroon->gray->mistyrose'
'set csmooth on'
'd (terp1-airtmp)'
'set csmooth off'

*style map
'xcbar.gs -fstep 5 -line off -edge circle -direction v 9.8 10 .15 7.5'

'set dfile 1'
'set lat 16 70'
'set lon -190 -80'
'set t 1'
*plot the SLP contours in intervals of 3 hPa
'set gxout contour'
'set cint 3'
'set ccolor 1'
'set cstyle 1'
'set cthick 2'
'set clab masked'
'd prmslmsl/100'

*Plot 10m wind barbs
'set gxout barb'
'set ccolor 1'
'set digsiz .05'
if (MODEL = "GFS_0.25_DEGREE")
    'd skip(ugrd10m*2.237,10,10);vgrd10m*2.237'
endif
if (MODEL = "NAM_CONUS_12KM")
    'd skip(ugrd10m*2.237,24,24);vgrd10m*2.237'
endif

*** End plotting

*Get time of forecast
'set dfile 1'
'set t 1'
'q time'
forecastutc=substr(result, 24, 3)
forecastdate=substr(result, 27, 2)
forecastmonth=substr(result, 29, 3)
forecastyear=substr(result, 32, 4)
forecastday=substr(result, 45, 3)

*Draw shapefiles
'set line 1 1 1'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Canada/PROVINCE.shp'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Mexico/mexstates.shp'

*draw titles and strings for map!
'set strsiz .15'
'draw string .85 7.97 Sea-Level Pressure (contours, hPa)'
'draw string .85 7.68 '%LEVEL' '"hPa Temp Anomalies (shaded, `ao`nC)"
'set strsiz .14'
'set font 12'
'draw string .85 8.3 Anomalies based on 1981-2010 6-hourly Climatology'
'set string 1 br'
'set font 10'
'draw string 9.75 8.30 '"Model: "''INITHOUR%'Z '%INIT_STRINGDATE' '%MODELFORTITLE
'set font 12'
'set string 4'
'draw string 9.75 8.05 '"Valid: "''%forecastutc' '%forecastday' '%forecastdate''%forecastmonth''%forecastyear
'draw string 9.75 7.85 '%H' '"- hour forecast"
'set font 11'
'set strsiz .17'
'set string 11'
'draw string 9.75 7.58 weathertogether.net'   

radius=1000
cint=300

*   ******************************DRAW L's******************************

'mfhilo prmslmsl/100 CL l 'radius', 'cint

Low_info=result
if (MODEL = "GFS_0.25_DEGREE")
    i=2         ;*Since the data starts on the 2nd line
    minmax=sublin(Low_info,i)
endif
if (MODEL = "NAM_CONUS_12KM")
    i=3         ;*Since the data starts on the 3rd line
    minmax=sublin(Low_info,i)
endif

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
    'set strsiz .30'
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
if (MODEL = "GFS_0.25_DEGREE")
    i=2         ;*Since the data starts on the 2nd line
    minmax=sublin(High_info,i)
endif
if (MODEL = "NAM_CONUS_12KM")
    i=3         ;*Since the data starts on the 3rd line
    minmax=sublin(High_info,i)
endif

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

*Save output as .png
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%FILENAME' -b /home/mint/opengrads/basemaps/nepacbasemap.png -t 1 x1200 y927'

'quit'
