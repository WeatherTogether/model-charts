import urllib
import json
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import math
import datetime

# Specify request parameters (as strings)



def defineArgs(recent, obtimezone, vars, stids, units):
    """This method takes the needed parameters and makes a dictionary"""  
    tempDict={}
    tempDict['recent']=recent
    tempDict['obtimezone']=obtimezone
    tempDict['vars']=vars
    tempDict['stids']=stids
    tempDict['units']=units
    tempDict['token']='085f99d8ff55488f8424827545f3740d' 
    return tempDict

def makeUrl(tempDict):
    """This method takes a dictionary and constructs a URL to download the JSON from"""
    apiString=urllib.parse.urlencode(tempDict)
    url = "http://api.mesowest.net/v2/stations/timeseries"
    fullUrl = '{}?{}'.format(url,apiString)
    print(fullUrl)
    return fullUrl

def jsonToDict(fullUrl):
    """Open the URL and convert the returned JSON into a dictionary"""
    response = urllib.request.urlopen(fullUrl)
    responseDict = json.loads(response.read().decode('utf-8'))
    return responseDict

def makeSeries(responseDict):
    """Isolate the time and pressure from each dictionary"""
    dateTime = responseDict['STATION'][0]['OBSERVATIONS']['date_time']
    slpDict = responseDict['STATION'][0]['OBSERVATIONS']['sea_level_pressure_set_1']
    slp = pd.Series(slpDict,index=pd.to_datetime(dateTime))
    print(slp)
    print("boo")
    return slp

def formatSeries(slp1, slp2, stid1, stid2):
    #print(slp2)
    #if stid1 or stid2 == 'CYWL':
    #slp1 = slp1.where(slp1.index.minute == 00).dropna()
    #slp2 = slp2.where(slp2.index.minute == 00).dropna()
    #else:
    slp1 = slp1.where(slp1.index.minute == 53).dropna()
    slp2 = slp2.where(slp2.index.minute == 53).dropna()
    presgrad=slp2.subtract(slp1, fill_value=0)
    print("slp1")
    print(slp1)
    print("slp2")
    print(slp2)
    print("done")
    print(presgrad)
    #presgrad=slp2.subtract(slp1, fill_value=0)
    return presgrad

def formatPG(presgrad):
    pgList=presgrad.tolist()
    pgList=[round(x, 1) for x in pgList]
    return pgList

def dateList(presgrad):
    times=presgrad.index.tolist()
    return times

def plot(presgrad):
    fig,ax = plt.subplots()
    presgrad.plot(ax=ax, color='black')
    return ax

def formatPlot(ax, presgrad):
    maxi=math.ceil(presgrad.max())
    mini=math.floor(presgrad.min())
    #print(maxi)
    #print(mini)
    if maxi<=2:
        maxi=3
    if mini>=-2:
        mini=-3
    ymin, ymax = ax.get_ylim()
    if ymin>=-3:
        ymin=-3
    if ymax<=3:
        ymax=3
    ax.set_ylim(ymin, ymax)     # set the ylim to bottom, top
    
    SMALL_SIZE = 8
    MEDIUM_SIZE = 10
    BIGGER_SIZE = 30
    
    plt.rc('font', size=SMALL_SIZE)          # controls default text sizes
    plt.rc('axes', titlesize=SMALL_SIZE)     # fontsize of the axes title
    plt.rc('axes', labelsize=MEDIUM_SIZE)    # fontsize of the x and y labels
    plt.rc('xtick', labelsize=SMALL_SIZE)    # fontsize of the tick labels
    plt.rc('ytick', labelsize=SMALL_SIZE)    # fontsize of the tick labels
    plt.rc('legend', fontsize=SMALL_SIZE)    # legend fontsize
    plt.rc('figure', titlesize=BIGGER_SIZE)  # fontsize of the figure title

# Clean up the plot a bit
    from matplotlib.dates import DayLocator, DateFormatter, HourLocator, MinuteLocator
    ax.xaxis.set_major_locator(DayLocator())
    ax.xaxis.set_minor_locator(HourLocator())
    ax.xaxis.set_major_formatter(DateFormatter('%d-%b-%Y'))
    ax.xaxis.set_minor_formatter(DateFormatter('%H'))
    ax.set_ylabel('Millibars')
    ax.xaxis.set_label_position('top') 
    ax.set_xlabel('Time (UTC)')
    ax.grid()
    ax.xaxis.set_tick_params(rotation=0)
    ax.axhspan(ymin, 0, facecolor='red', alpha=0.5)
    ax.axhspan(0, ymax, facecolor='blue', alpha=0.5)
    y=np.array(presgrad.tolist())
    #print(y)
    x=np.arange(len(presgrad.tolist()))
    #print(x)
    #print('blah')
    #print(presgrad)
    d = np.zeros(len(presgrad.tolist()))
    ax.fill_between(x,y,where=y<=0, interpolate=True, color='blue')   

    plt.gca().tick_params(axis="x", which="minor", direction="out", top=1, bottom=0, labelbottom=0, labeltop=1)

    ax.grid(b=True, which='major', color='k', linestyle='-')
    ax.grid(b=True, which='minor', color='k', linestyle='--')

    for i,j in presgrad.items():
        k=round(j,1)
        #print(i)
        #print(j)
        i=i-datetime.timedelta(minutes=0)
        ax.annotate(str(k), xy=(i, j-.5), rotation = 0, size = 7)

    plt.title('KHQM-KPDX Pressure Gradients (mb)', y=-.2, fontsize=12)
    #plt.text(presgrad.index[9], -4.5, 'weathertogether.net', size = 8, color = "blue")

    plt.savefig('temp2.png', dpi=1000)


########### MAIN ##############

#timelength=sys.argv[1] # initialization hour
#obtimezone=sys.argv[2] # mode
#variable=sys.argv[3]
stid1='KPDX'
stid2='KHQM'
#units=sys.argv[6]

kpdxSlp = defineArgs('1440', 'UTC', 'sea_level_pressure', stid1, 'pres|mb')
kbliSlp = defineArgs('1440', 'UTC', 'sea_level_pressure', stid2, 'pres|mb')
kpdxUrl = makeUrl(kpdxSlp)
kbliUrl = makeUrl(kbliSlp)
kpdxDict = jsonToDict(kpdxUrl)
kbliDict = jsonToDict(kbliUrl)
kpdxSeries = makeSeries(kpdxDict)
kbliSeries = makeSeries(kbliDict)
presgrad=formatSeries(kpdxSeries, kbliSeries, stid1, stid2)
pgList=formatPG(presgrad)
times=dateList(presgrad)
ax=plot(presgrad)
formatPlot(ax, presgrad)