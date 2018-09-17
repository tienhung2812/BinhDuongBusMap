import React, { Component } from 'react';
import lang from './lang.json';
import "./BusSchedule.css";

//Use this path after fix allow CORS on heroku server
//var path = 'https://kazebusmap.herokuapp.com';

//Now we use this path for local request
var path = 'https://kazebusmap.herokuapp.com'
class TimeContent extends Component{
    constructor(props){
        super(props);
        this.state={fade:2,processDone:true, time: null, offdate : null}
    }
    componentDidMount(){
        setTimeout(function() { 
            this.setState({fade:0})
        }.bind(this), 300); 
        var now = new Date();
        this.setState({time: now})
    }

    checkIsDayOff(day){
        var days =["CN","T2","T3","T4","T5","T6","T7"]
        var dayoff = this.props.offdate.split(",");
        console.log(dayoff + days[day])
        var isTodayOff = false;
        for (var i =0 ; i< dayoff.length;i++){
            if (days[day]==dayoff[i]){
                isTodayOff = true;
                break;
            }
        }
        return isTodayOff;
    }

    render(){
        let style;
        if(this.state.fade===2){
            style={
                opacity:0,
                height:"0%"
            }
        }
        else{
            style={
                opacity:1,
                height:"100%"
            }
        }
        var display = null
        //Is Off date today
        
        if (this.state.time!=null){
            
            if(this.checkIsDayOff(this.state.time.getDay())){
                display = "Tuyến xe "+this.props.route+" tại trạm này không hoạt động tại khung giờ "+this.props.time+" ngày hôm nay"
            }else{
                //Compare Time
                var hourLeft = 0;
                var minuteLeft =0;
                //Compare Hour
                hourLeft = parseInt(this.props.time.split(':')[0])- this.state.time.getHours();
                if (hourLeft>=0){
                    //Compare Minute
                    minuteLeft = parseInt(this.props.time.split(':')[1]) - this.state.time.getMinutes();
                }

                var timeleft = null
                //Check is it over?
                if(hourLeft>0){
                    if (minuteLeft>0){
                        timeleft = hourLeft +" giờ "+minuteLeft + " phút"
                    }else{
                        hourLeft - 1;
                        minuteLeft = 60 + minuteLeft;
                        if (hourLeft>0){
                            timeleft = hourLeft +" giờ "+minuteLeft+ " phút"
                        }else{
                            timeleft = minuteLeft.toString();
                        }
                    }
                }else if (hourLeft == 0){
                    if(minuteLeft>=0){
                        timeleft = minuteLeft.toString();
                    }else{
                        timeleft = "over"
                    }
                }
                if (hourLeft<0 || timeleft=="over"){
                    //Check chuyen gan nhat ngay mai
                    //Check nmgay mai co chuyen khong
                    var tomorrow = this.state.time.getDay();
                    if (tomorrow==6){
                        tomorrow=0
                    }else{
                        tomorrow+=1;
                    }
                    if(this.checkIsDayOff(tomorrow)){
                        display = "Tuyến xe "+this.props.route+" tại trạm này không hoạt động tại khung giờ "+this.props.time+" ngày hôm nay và ngày mai"
                    }else{
                        hourLeft = 23 - this.state.time.getHours() + parseInt(this.props.time.split(":")[0])
                        minuteLeft = 60-this.state.time.getMinutes() + parseInt(this.props.time.split(":")[1])
                        timeleft = hourLeft +" giờ "+minuteLeft + " phút";
                    }
                }
                if (timeleft!=null){
                    display = "Còn " +timeleft + " xe sẽ đến trạm"
                }
                
                //console.log("Hour left:" +hourLeft)
                // display = "Đang tính toán"
            }
            
        }
        
        return <div className="timeContent" style={style}>
                    
                    <hr/><p>{display}</p><hr/>
                </div>;
    }
}

class StationList extends Component{
    constructor(props){
        super(props);
        this.state={checkTimeout:false}
    }
    lang = lang;
    handleChange= event=>{
        this.props.stationClick(this.props.data.stops[event.currentTarget.dataset.id].stop_id);
    }

    componentDidMount(){

    }
    render(){
        let style={
            height:(this.props.height-142)
        }
        let styleStation={
            height:(this.props.height-142-10)
        }
        let stationArray=[]
        let preload=null
        if(this.props.data!=null)
            if(this.props.data==="error")
                stationArray.push(<div className="error" ><i className="far fa-times-circle"></i><h2>Error when loading content</h2></div>);
            else
            for(var i=0;i<this.props.data.stops.length;i++){
                stationArray.push(<li onClick={this.handleChange.bind(this)} data-id={i}><i className="far fa-circle"></i><p>{this.props.data.stops[i].stop_name}</p></li>);
            }
        else
            preload=<div className="preload spinner"></div>
            // preload=<img src={this.props.preloader} alt="preloader" className="preload"/>
        if(this.props.display===2){
            return (<div className="stationContainer" style={style}>
                        <div className="station" style={styleStation}>
                            {preload}
                            <ul>
                                {stationArray}
                            </ul>
                        </div>
                    </div>);
        }else{
            return null;
        }

    }
}

class StationName extends Component{
    stationNameHeight=0
    calcHeight(node) {
        if(node!=null)
            if(this.stationNameHeight!==node.clientHeight){
                this.stationNameHeight=node.clientHeight;
                this.props.height(node);
            }

    }
    render(){
        return <div className="stationName" ref={(node) => this.calcHeight(node)} >
                    <h1>{this.props.name}</h1>
                </div>;
    }
}

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state={stationNameHeight:0, timeIndex:null, timedata : null ,alreadyfetch : null}
    }
    handleChange = event =>{
        this.setState({stationNameHeight:event.clientHeight})
    }

    handleTimeClick = event=>{
        if(this.state.timeIndex!==event.currentTarget.dataset.id)
            this.setState({timeIndex:(event.currentTarget.dataset.id)})
        else
        this.setState({timeIndex:null})
    }
    componentDidUpdate(){
        if (this.props.station!=null){
            var request = null;
            if (this.props.direction == "forward")
                request = this.props.route +'-0-' + this.props.station
            else
                request = this.props.route +'-1-' + this.props.station
            if (request!=this.state.alreadyfetch){
                console.log("Fetch stoptime..." + request)
                fetch(path+'/stoptime/'+request)
                .then((res) => {
                    return res.json()
                }).then((data)=>{
                    this.setState({timedata: data})
                    this.setState({alreadyfetch:request})
                })
            }
        }
    }
    render(){
        if(this.props.display===3){
            let timeArray=[];
            let stationName=null;
            if(this.state.timedata!=null){
                stationName = this.state.timedata.stop_times[0].stop_name;
                for (var i=0;i<this.state.timedata.stop_times.length;i++){
                    let timeraw = this.state.timedata.stop_times[i].time;
                    if(i==this.state.timeIndex)
                        timeArray.push(<li><div className="timeHeader active" onClick={this.handleTimeClick} data-id={i}><p>{timeraw}</p></div><TimeContent offdate={this.state.timedata.stop_times[i].off_dates} route={this.props.route} station={this.props.station} time={timeraw}/></li>);
                    else
                        timeArray.push(<li><div className="timeHeader" onClick={this.handleTimeClick} data-id={i}><p>{timeraw}</p></div></li>);
                }
            }
            
            let timetablestyle={
                height:(this.props.height-160-this.state.stationNameHeight)
            }
            return (<div className="Schedule">
                        <StationName height={this.handleChange} name={stationName}/>
                        <div className="timeTable" style={timetablestyle}>
                            <ul>
                            {timeArray}
                            </ul>
                        </div>
                    </div>
            );
            

            
        }
        else{
             return null;
        }
        
    }
}
class BusSchedule extends Component{
    constructor(props){
        super(props);
        this.forwardClick = this.forwardClick.bind(this);
        this.backwardClick = this.backwardClick.bind(this);
        this.changeRoute = this.changeRoute.bind(this);
        this.handleError = this.handleError.bind(this);
        this.state={station:null, direction:"forward",route:null,data:null,type:null}
    }
    lang = lang;

    forwardClick=event=>{
        if(this.state.direction!=="forward"){
            this.setState({direction:"forward"});
            // if(this.state.station!=null){
            //     let reverseStation = this.state.data.station.length-Number(this.state.station)-1;
            //     console.log("Current station: "+this.state.station
            //         +"\nTotal station: "+this.state.data.station.length
            //         +"\nNew station: "+reverseStation
            //     )
            //     this.setState({station:reverseStation});
            // }
            if (this.props.state==3)
                this.props.backButton(event);
            this.updateData(this.props.route,"forward");
        }else{
            console.log("Already in forward section");
        }
    }
    backwardClick =event=>{
        if(this.state.direction!=="backward"){
            this.setState({direction:"backward"});
            // if(this.state.station!=null){
            //     let reverseStation = this.state.data.station.length-Number(this.state.station)-1;
            //     console.log("Current station: "+this.state.station
            //         +"\nTotal station: "+this.state.data.station.length
            //         +"\nNew station: "+reverseStation
            //     )
            //     this.setState({station:reverseStation});
            // }
            if (this.props.state==3)
                this.props.backButton(event);
            this.updateData(this.props.route,"backward");
        }else{
            console.log("Already in backward section");
        }
    }

    handleStation = event =>{
        this.setState({station:event})
        this.props.stationClick(event);
    }

    changeRoute(newRoute){
        this.setState({route:newRoute});
        if (newRoute!=null){
            this.updateData(newRoute,this.state.direction);
            this.fetchRouteInfo()
        }

            
    }

    handleError(){
        this.setState({data:("error")})
    }
    fetchRouteInfo(){
        console.log("Fetch route type..." + path+'/route/'+this.props.route)
        fetch(path+'/route/'+this.props.route)
        .then((res) => {
            return res.json()
        }).then((data)=>{
            this.setState({type: data.route_type})
        })
    }
    updateData(route,direction){
        this.setState({data:null});
        var directionCode = null
        if (direction == "forward"){
            directionCode = 0
        }else{
            directionCode = 1
        }
        let url = path+'/stops/'+route+'-'+directionCode
        fetch(url).then((result) => {
            if(result.ok){
                return result.json();
            }
            else
                return "error"; 
        }).then((data)=>{
            this.setState({data:data});
            console.log("Fecht new data from route: "+this.props.route+" direction: "+this.state.direction);
        })
        
        
    
    }

    render(){ 
        if(this.state.route!==this.props.route){
            this.changeRoute(this.props.route);
        }
        let fadestyle=null;
        if(this.props.fade!==0){
            fadestyle={
                opacity:0
            }
        }else {
            fadestyle={
                opacity:1
            }
        }
        if(this.props.route!=null){

            let forwardClass = "tab ";
            let backwardClass = "tab ";
            let onewayClass = "tab active";
            let onewayStyle = {
                width : "90%",
                borderRadius:"8px 8px 8px 8px"
            }
            if(this.state.direction==="forward"){
                forwardClass+="active";
            }else{
                backwardClass+="active";
            }
            var directionHTML = null;
            if(this.state.type==2){
                directionHTML = <div className="tabContainer">
                                    <button className={forwardClass} onClick={this.forwardClick}>{lang.forward[this.props.langCode]}</button>
                                    <button className={backwardClass} onClick={this.backwardClick}>{lang.backward[this.props.langCode]}</button>
                                </div>
                    
            }else{
                directionHTML = <div className="tabContainer">
                                    <button style={onewayStyle} className={onewayClass} onClick={this.forwardClick}>{lang.oneway[this.props.langCode]}</button>
                                </div>
            }
            var display = null;
            if(this.props.state==2){
                display = <StationList display={this.props.state} direction={this.state.direction} route={this.props.route} height={this.props.height} stationClick={this.handleStation} data={this.state.data} preloader={this.props.preloader} langCode={this.props.langCode}/>
            }else if (this.props.state==3){
                display = <Schedule display={this.props.state} direction={this.state.direction} route={this.props.route} height={this.props.height} station={this.state.station} data={this.state.data}/>
            }
            return (<div className="busSchedule" style={fadestyle}>
                        {directionHTML}

                        {display}
                        
                    </div>);
        }
        else{
            return null;
        }
    }
}

export default BusSchedule;