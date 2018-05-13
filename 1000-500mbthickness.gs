*Import arguments from bash script
function script(args)

INIT_STRINGDATE = subwrd(args,1)
INIT_INTDATE = subwrd(args,2)
INITHOUR = subwrd(args,3)
REGION = subwrd(args,4)
FULLH = subwrd(args,5)
H=subwrd(args,6)
MODEL = subwrd(args,7)
MODELFORTITLE = subwrd(args,8)
FILENAME = subwrd(args,9)

originalH=H

*Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 12 file /usr/share/fonts/type1/gsfonts/n019023l.pfb'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea 0.37 10.4 0.6 8'

*Open control file
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/500_mb_HGT_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/1000_mb_HGT_'%FULLH'.ctl'
'open /home/mint/controlfiles/'%MODEL'/'%INIT_INTDATE''%INITHOUR'/mean_sea_level_PRMSL_'%FULLH'.ctl'

***** ***** Define Region ***** *****

if REGION='northamerica'
    LAT1=20
    LAT2=75
    LON1='-150'
    LON2='-60.5'
    MAP='latlon'
endif

if REGION='nepacific'
    LAT1=18
    LAT2=70
    LON1='-190'
    LON2='-80'
    MAP='nps'
    MPVALSLON1='-166'
    MPVALSLON2='-115'
    MPVALSLAT1='23'
    MPVALSLAT2='60'
endif

if REGION='antarctica'
    LAT1=-90
    LAT2=-60
    LON1='0'
    LON2='359.99'
    MAP='sps'
    MPVALSLON1='0'
    MPVALSLON2='359.99'
    MPVALSLAT1='-90'
    MPVALSLAT2='-60'
endif

if REGION='pacnw'
    LAT1=40
    LAT2=55
    LON1='-132'
    LON2='-107.6'
    MAP='latlon'
endif

if REGION='conus'
    LAT1=15
    LAT2=55
    LON1='-128.05'
    LON2='-63'
    'set xlevs -120 -110 -100 -90 -80 -70'
    'set ylevs 20 30 40 50'
    MAP='latlon'
endif

if REGION='namconus'
    LAT1=18.3
    LAT2=58.2
    LON1='-129.5'
    LON2='-64.5'
    'set xlevs -120 -110 -100 -90 -80 -70'
    'set ylevs 20 30 40 50'
    MAP='latlon'
endif

if REGION='pacnwzoom'
    LAT1=43.07
    LAT2=49.15
    LON1='-126'
    LON2='-116.1'
    'set xlevs -126 -124 -122 -120 -118 -116'
    'set ylevs 44 45 46 47 48 49 50'
    MAP=latlon
endif

if REGION='middleeast'
    LAT1=0
    LAT2=55.3
    LON1=0
    LON2=90
    MAP=latlon
endif

if REGION='colriver'
    LAT1=44.68
    LAT2=46.71
    LON1='-122.2'
    LON2='-118.9'
    'set xlevs -122 -121 -120 -119 -118'
    'set ylevs 45 46'
    MAP=latlon
endif

if REGION='hrrrconus'
    LAT1=15
    LAT2=65
    LON1=-150
    LON2=-50
    MAP='nps'
    MPVALSLAT1='23'
    MPVALSLAT2='53.5'
    MPVALSLON1='-118.7'
    MPVALSLON2='-76.1'
endif

if REGION='world'
    LAT1=-90
    LAT2=90
    LON1=0
    LON2=359.99
    MAP=latlon
endif

***** ***** set map parameters ***** ***** 

'set mpdset hires'
'set mpt 0 1 1 6'
'set mpt 1 1 1 6'
'set mpt 2 1 1 3'
'set grid off'
'set lon '%LON1' '%LON2
'set lat '%LAT1' '%LAT2
if MAP!='latlon'
    'set mpvals '%MPVALSLON1' '%MPVALSLON2' '%MPVALSLAT1' '%MPVALSLAT2
endif
'set mproj '%MAP

***** ***** Begin plotting ***** *****

*Plot 500mb temps shading
*set color
*'color.gs 460 540 1 -verbose -kind (102,255,178)->(0,51,51)->(255,255,240)->(255,102,178)->(51,0,102)->(229,204,255)->(0,51,102)->(204,255,255)'
*'color.gs 541 600 1 -verbose -kind (204,255,204)->(0,51,0)->(255,255,153)->(102,0,0)->(255,255,255)->(76,0,51)'

'set rgb 16  102 255 178'
'set rgb 17  93 237 167'
'set rgb 18  84 220 156'
'set rgb 19  76 202 145'
'set rgb 20  67 184 134'
'set rgb 21  58 167 123'
'set rgb 22  49 149 112'
'set rgb 23  40 132 101'
'set rgb 24  31 114 90'
'set rgb 25  23 96 79'
'set rgb 26  14 79 68'
'set rgb 27  5 61 57'
'set rgb 28  9 59 58'
'set rgb 29  31 76 74'
'set rgb 30  54 94 91'
'set rgb 31  76 111 107'
'set rgb 32  98 129 123'
'set rgb 33  120 147 140'
'set rgb 34  142 164 156'
'set rgb 35  164 182 172'
'set rgb 36  186 200 189'
'set rgb 37  208 217 205'
'set rgb 38  230 235 221'
'set rgb 39  252 252 238'
'set rgb 40  255 244 235'
'set rgb 41  255 230 230'
'set rgb 42  255 217 225'
'set rgb 43  255 204 219'
'set rgb 44  255 191 214'
'set rgb 45  255 178 209'
'set rgb 46  255 164 203'
'set rgb 47  255 151 198'
'set rgb 48  255 138 193'
'set rgb 49  255 125 187'
'set rgb 50  255 111 182'
'set rgb 51  250 99 176'
'set rgb 52  232 91 170'
'set rgb 53  215 82 163'
'set rgb 54  197 73 156'
'set rgb 55  179 64 150'
'set rgb 56  162 55 143'
'set rgb 57  144 47 137'
'set rgb 58  127 38 130'
'set rgb 59  109 29 124'
'set rgb 60  91 20 117'
'set rgb 61  74 11 110'
'set rgb 62  56 3 104'
'set rgb 63  62 13 111'
'set rgb 64  77 30 125'
'set rgb 65  93 48 138'
'set rgb 66  108 65 151'
'set rgb 67  124 83 164'
'set rgb 68  139 101 178'
'set rgb 69  154 118 191'
'set rgb 70  170 136 204'
'set rgb 71  185 154 217'
'set rgb 72  200 171 230'
'set rgb 73  216 189 244'
'set rgb 74  226 202 253'
'set rgb 75  206 189 240'
'set rgb 76  187 176 227'
'set rgb 77  167 162 213'
'set rgb 78  147 149 200'
'set rgb 79  127 136 187'
'set rgb 80  107 123 174'
'set rgb 81  88 110 161'
'set rgb 82  68 96 147'
'set rgb 83  48 83 134'
'set rgb 84  28 70 121'
'set rgb 85  8 57 108'
'set rgb 86  10 61 110'
'set rgb 87  28 79 123'
'set rgb 88  45 96 136'
'set rgb 89  63 114 149'
'set rgb 90  81 132 162'
'set rgb 91  98 149 176'
'set rgb 92  116 167 189'
'set rgb 93  133 184 202'
'set rgb 94  151 202 215'
'set rgb 95  169 220 229'
'set rgb 96  186 237 242'
'set rgb 97  204 255 255'

*** 540 line

'set rgb 98  204 255 204'
'set rgb 99  187 238 187'
'set rgb 100  170 221 170'
'set rgb 101  153 204 153'
'set rgb 102  136 187 136'
'set rgb 103  119 170 119'
'set rgb 104  102 153 102'
'set rgb 105  85 136 85'
'set rgb 106  68 119 68'
'set rgb 107  51 102 51'
'set rgb 108  34 85 34'
'set rgb 109  17 68 17'
'set rgb 110  0 51 0'
'set rgb 111  21 68 13'
'set rgb 112  43 85 26'
'set rgb 113  64 102 38'
'set rgb 114  85 119 51'
'set rgb 115  106 136 64'
'set rgb 116  128 153 77'
'set rgb 117  149 170 89'
'set rgb 118  170 187 102'
'set rgb 119  191 204 115'
'set rgb 120  213 221 128'
'set rgb 121  234 238 140'
'set rgb 122  255 255 153'
'set rgb 123  242 234 140'
'set rgb 124  230 213 128'
'set rgb 125  217 191 115'
'set rgb 126  204 170 102'
'set rgb 127  191 149 89'
'set rgb 128  179 128 77'
'set rgb 129  166 106 64'
'set rgb 130  153 85 51'
'set rgb 131  140 64 38'
'set rgb 132  128 43 26'
'set rgb 133  115 21 13'
'set rgb 134  102 0 0'
'set rgb 135  115 21 21'
'set rgb 136  128 43 43'
'set rgb 137  140 64 64'
'set rgb 138  153 85 85'
'set rgb 139  166 106 106'
'set rgb 140  179 128 128'
'set rgb 141  191 149 149'
'set rgb 142  204 170 170'
'set rgb 143  217 191 191'
'set rgb 144  230 213 213'
'set rgb 145  242 234 234'
'set rgb 146  255 255 255'
'set rgb 147  240 234 238'
'set rgb 148  225 213 221'
'set rgb 149  210 191 204'
'set rgb 150  195 170 187'
'set rgb 151  180 149 170'
'set rgb 152  166 128 153'
'set rgb 153  151 106 136'
'set rgb 154  136 85 119'
'set rgb 155  121 64 102'
'set rgb 156  106 43 85'
'set rgb 157  91 21 68'
'set rgb 158  76 0 51'

'set clevs 460 461 462 463 464 465 466 467 468 469 470 471 472 473 474 475 476 477 478 479 480 481 482 483 484 485 486 487 488 489 490 491 492 493 494 495 496 497 498 499 500 501 502 503 504 505 506 507 508 509 510 511 512 513 514 515 516 517 518 519 520 521 522 523 524 525 526 527 528 529 530 531 532 533 534 535 536 537 538 539 540 541 542 543 544 545 546 547 548 549 550 551 552 553 554 555 556 557 558 559 560 561 562 563 564 565 566 567 568 569 570 571 572 573 574 575 576 577 578 579 580 581 582 583 584 585 586 587 588 589 590 591 592 593 594 595 596 597 598 599 600'

'set ccols 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158'


*plot 1000-500hPa thickness
*** SHADED
'set gxout shaded'
'd (hgt500mb.1-hgt1000mb.2)/10'
*** 540 LINE
'set gxout contour'
'set clevs 540'
'set ccolor 2'
'set clab off'
'd (hgt500mb.1-hgt1000mb.2)/10'

'xcbar.gs -fstep 5 -line off -fwidth 0.11 -fheight 0.12 -direction v 10.4 10.6 .6 8'

*plot the SLP contours in intervals of 3 hPa
'set gxout contour'
'set cint 3'
'set ccolor 1'
'set cstyle 1'
'set cthick 2'
if REGION='pacnw'
    'set cint 1'
endif
'set clab masked'
'd prmslmsl.3/100'


***** ***** plot high and low centers via mfhilo function ***** *****
radius=1000
cint=300

'set font 11'
*   ******************************DRAW L's******************************

'mfhilo prmslmsl.3/100 CL l 'radius', 'cint

Low_info=result
if (MODEL = "GFS_0.25")
    i=2         ;*Since the data starts on the 2nd line
    minmax=sublin(Low_info,i)
endif
if (MODEL = "NAM_12")
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
    'set strsiz .15'
    'set string 2 c 8'
    'draw string 'x_min' 'y_min' L'

    'set strsiz 0.1'
    'set string 2 c 10'
    'draw string 'x_min' 'y_min+0.15' 'minval
        
  endif

  i=i+1
  minmax = sublin(Low_info,i)
endwhile


*   ******************************DRAW H's******************************

'mfhilo prmslmsl.3/100 CL h 'radius', 'cint

High_info=result
if (MODEL = "GFS_0.25")
    i=2         ;*Since the data starts on the 2nd line
    minmax=sublin(High_info,i)
endif
if (MODEL = "NAM_12")
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
    'set strsiz .15'
    'set string 4 c 8'
    'draw string 'x_min' 'y_min' H'

    'set strsiz 0.1'
    'set string 4 c 10'
    'draw string 'x_min' 'y_min+0.15' 'minval
  endif

  i=i+1
  minmax = sublin(High_info,i)
endwhile

***** ***** end mfhilo ***** *****

***** ***** End plotting ***** *****

***** ***** Get max and min ***** *****

if MODEL = 'NAM_12'
    i=2
endif
if MODEL = 'HRRR_Sub'
    i=2
endif
if MODEL = 'GFS_0.25'
    i=1
endif
if MODEL = 'GDPS'
    i=1
endif

**** MAXVAL (THICKNESS)
'define thickness = (hgt500mb.1-hgt1000mb.2)/10'
'd amax(thickness, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_thickness = math_format('%5.1f',maxval) 

**** MINVAL (THICKNESS)
'd amin(thickness, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_thickness = math_format('%5.1f',minval)

**** MAXVAL (SLP)
'd amax(prmslmsl.3/100, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
maxlin=sublin(result,i)
maxval=subwrd(maxlin,4)
'q gxinfo'
maxxlims=sublin(result,3)
maxylims=sublin(result,4)
maxxpos=subwrd(maxxlims,4)
maxypos=subwrd(maxylims,6)
maxval_slp = math_format('%5.1f',maxval) 

**** MINVAL (SLP)
'd amin(prmslmsl.3/100, lon='%LON1', lon='%LON2', lat='%LAT1', lat='%LAT2')'
minlin=sublin(result,i)
minval=subwrd(minlin,4)
'q gxinfo'
minxlims=sublin(result,3)
minylims=sublin(result,4)
minxpos=subwrd(minxlims,4)
minypos=subwrd(minylims,6)
minval_slp = math_format('%5.1f',minval)

***** ***** End max and min ***** *****

***** ***** Get time of forecast ***** *****
'q time'
forecastutc=substr(result, 24, 3)
forecastdate=substr(result, 27, 2)
forecastmonth=substr(result, 29, 3)
forecastyear=substr(result, 32, 4)
forecastday=substr(result, 45, 3)

***** ***** Draw shapefiles ***** ***** 

'set line 1 1 1'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Canada/PROVINCE.shp'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Mexico/mexstates.shp' 

***** ***** draw titles and strings for map! ***** *****
*title
'set string 1 l'
'set strsiz .13'
'set font 11'
'draw string .4 8.37 1000-500mb Thickness (dam), Sea-Level Pressure (mb)'
*hour
'set strsiz .14'
'set string 1 r'
'draw string 10.37 8.12 Hour: '%H
*valid
'set strsiz .13'
'set string 1 l'
'set font 10'
'draw string .4 8.12 Valid: '%forecastutc' '%forecastday' '%forecastdate''%forecastmonth''%forecastyear
*Init
'set string 1 l'
'draw string .4 .15 'INITHOUR%'Z '%INIT_STRINGDATE' '%MODELFORTITLE
*separator
'set strsiz .11'
'draw string 5.5 .3 |'
'draw string 5.5 .10 |'
*minval
'set string 2 r'
'draw string 5.46 0.10 Min Thickness: 'minval_thickness' dam'
'draw string 5.46 0.30 Min SLP: 'minval_slp' mb'
*maxval
'set string 4 l'
'draw string 5.6 0.10 Max Thickness: 'maxval_thickness' dam'
'draw string 5.6 0.30 Max SLP: 'maxval_slp' mb'
*weathertogether.net
'set font 11'
'set strsiz .14'
'set string 11 r'
'draw string 10.37 .15 weathertogether.net'

***** ***** Save output as .png ***** *****
'gxprint /home/mint/grads_pics/'%MODEL'/'%INIT_INTDATE'/'%INITHOUR'z/'%MODEL'_'%REGION'_'%FILENAME'_'%FULLH'.png x1100 y850'

'quit'


