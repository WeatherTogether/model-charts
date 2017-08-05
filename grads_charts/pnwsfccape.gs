*This script plots Surface CAPE, SLP, and 1000-500 hPa thickness over a polar stereographic plot of the Pacific Northwest.

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en

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

*Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 12 file /usr/share/fonts/type1/gsfonts/n019023l.pfb'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea 0.25 10.3 0.15 7.5'

*Open control file
'open 'CTLFILE

*** Begin plotting

*Set spatial domain for Grads to retrieve data from
'set lat 36 54'
'set lon -139 -101'

*Set map projection 
'set mpvals -133 -108 37 53'
'set mproj nps'

*style map
'set mpdset hires'
'set mpt 0 1 1 6'
'set mpt 1 1 1 6'
'set mpt 2 1 1 3'
'set grid on 5 1 1'

*set colors

'set gxout shaded'
*'color 100 4000 100 -v -kind lightblue->green->yellow->orange->red->black'

'set rgb 16 255 255 255 -100'
'set rgb 17 173 216 230'
'set rgb 18 151 205 201'
'set rgb 19 130 194 173'
'set rgb 20 108 183 144'
'set rgb 21 87 172 115'
'set rgb 22 65 161 86'
'set rgb 23 43 150 58'
'set rgb 24 22 139 29'
'set rgb 25 0 128 0'
'set rgb 26 32 144 0'
'set rgb 27 64 160 0'
'set rgb 28 96 176 0'
'set rgb 29 128 192 0'
'set rgb 30 159 207 0'
'set rgb 31 191 223 0'
'set rgb 32 223 239 0'
'set rgb 33 255 255 0'
'set rgb 34 255 244 0'
'set rgb 35 255 233 0'
'set rgb 36 255 221 0'
'set rgb 37 255 210 0'
'set rgb 38 255 199 0'
'set rgb 39 255 188 0'
'set rgb 40 255 176 0'
'set rgb 41 255 165 0'
'set rgb 42 255 144 0'
'set rgb 43 255 124 0'
'set rgb 44 255 103 0'
'set rgb 45 255 83 0'
'set rgb 46 255 62 0'
'set rgb 47 255 41 0'
'set rgb 48 255 21 0'
'set rgb 49 255 0 0'
'set rgb 50 223 0 0'
'set rgb 51 191 0 0'
'set rgb 52 159 0 0'
'set rgb 53 128 0 0'
'set rgb 54 96 0 0'
'set rgb 55 64 0 0'
'set rgb 56 32 0 0'
'set rgb 57 0 0 0'

'set clevs 0 75 150 225 300 375 450 525 600 675 750 825 900 975 1050 1125 1200 1275 1350 1425 1500 1575 1650 1725 1800 1875 1950 2025 2100 2175 2250 2325 2400 2475 2550 2625 2700 2775 2850 2925 3000'
'set ccols 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57'

*Plot CAPE
'd capesfc'
'xcbar.gs -fstep 2 -line on -edge circle -direction v 9.93 10.13 .18 7.47'

*plot 1000-500hPa thickness in intervals of 6 decameters
*** CHANGE THICKNESS SETTINGS HERE
'set clevs 476 480 486 492 498 504 510 516 522 528 534 540 546 552 558 564 570 576 582 588 594 600'
'set ccols 4 4 4 4 4 4 4 4 4 4 4 4 2 2 2 2 2 2 2 2 2 2'
'set gxout contour'
'set cint 6'
'set cthick 3'
'set cstyle 3'
'set clab masked'
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

*Draw shapefiles
'set line 1 1 1'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Canada/PROVINCE.shp'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Mexico/mexstates.shp'

*draw titles and strings for map!
'set strsiz .15'
'draw string .70 8.26 1000-500 hPa Thickness (dotted contours, dam)'
'draw string .70 7.97 Sea-Level Pressure (contours, hPa)' 
'draw string .70 7.68 Surface-Based CAPE (shading, J/kg)' 
'set strsiz .14'
'set string 1 br'
'draw string 9.9 8.30 '"Model: "''INITHOUR%'Z '%INIT_STRINGDATE' '%MODELFORTITLE
'set font 12'
'set string 4'
'draw string 9.9 8.05 '"Valid: "''%forecastutc' '%forecastday' '%forecastdate''%forecastmonth''%forecastyear
'draw string 9.9 7.85 '%H' '"- hour forecast"
'set font 11'
'set strsiz .17'
'set string 11'
'draw string 9.9 7.58 weathertogether.us'

*plot high and low centers via mfhilo function
radius=1000
cint=300

*   ******************************DRAW L's******************************

'mfhilo prmslmsl/100 CL l 'radius', 'cint

Low_info=result
i=2         ;*Since the data starts on the 2nd line
minmax=sublin(Low_info,i)
while(subwrd(minmax,1) != 'L') 
i=i+1
minmax=sublin(Low_info,i)
endwhile

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
i=2         ;*Since the data starts on the 2nd line
minmax=sublin(High_info,i)
while(subwrd(minmax,1) != 'H') 
i=i+1
minmax=sublin(High_info,i)
endwhile

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
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%FILENAME' -b /home/mint/opengrads/basemaps/pnwbasemap.png -t 1 x1200 y927'

'quit'

