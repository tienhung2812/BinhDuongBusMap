import React, { Component } from 'react';
import lang from './lang.json';
import "./BusSchedule.css";


class TimeContent extends Component{
    constructor(props){
        super(props);
        this.state={fade:2,processDone:true}
    }
    componentDidMount(){
        setTimeout(function() { 
            this.setState({fade:0})
        }.bind(this), 300); 
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
        return <div className="timeContent" style={style}>
                    
                    <hr/><p>This is time content very long very long very long very long very long very long very long very long very long very long </p><hr/>
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
        this.props.stationClick(event.currentTarget.dataset.id);
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
            for(var i=0;i<this.props.data.station.length;i++){
                stationArray.push(<li onClick={this.handleChange.bind(this)} data-id={i}><i className="far fa-circle"></i><p>{this.props.data.station[i].stop_name}</p></li>);
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
        this.state={stationNameHeight:0, timeIndex:null}
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

    render(){
        if(this.props.display===3){
            let timeArray=[];
            let stationName=null;
            if(this.props.data!=null){
                stationName = this.props.data.station[this.props.station].stop_name;
                for (var i=0;i<this.props.data.station[this.props.station].time.length;i++){
                    let timeraw = this.props.data.station[this.props.station].time[i].stop_time;
                    if(i==this.state.timeIndex)
                        timeArray.push(<li><div className="timeHeader active" onClick={this.handleTimeClick} data-id={i}><p>{timeraw.substring(0, timeraw.length - 3)}</p></div><TimeContent data={this.props.data} route={this.props.route} station={this.props.station}/></li>);
                    else
                        timeArray.push(<li><div className="timeHeader" onClick={this.handleTimeClick} data-id={i}><p>{timeraw.substring(0, timeraw.length - 3)}</p></div></li>);
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
        this.state={station:null, direction:"forward",route:null,data:null}
    }
    lang = lang;
    forwardClick(){
        if(this.state.direction!=="forward"){
            this.setState({direction:"forward"});
            if(this.state.station!=null){
                let reverseStation = this.state.data.station.length-Number(this.state.station)-1;
                console.log("Current station: "+this.state.station
                    +"\nTotal station: "+this.state.data.station.length
                    +"\nNew station: "+reverseStation
                )
                this.setState({station:reverseStation});
            }
            this.updateData(this.props.route,"forward");
        }else{
            console.log("Already in forward section");
        }
    }
    backwardClick(){
        if(this.state.direction!=="backward"){
            this.setState({direction:"backward"});
            if(this.state.station!=null){
                let reverseStation = this.state.data.station.length-Number(this.state.station)-1;
                console.log("Current station: "+this.state.station
                    +"\nTotal station: "+this.state.data.station.length
                    +"\nNew station: "+reverseStation
                )
                this.setState({station:reverseStation});
            }
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
        this.updateData(newRoute,this.state.direction);
    }

    handleError(){
        this.setState({data:("error")})
    }

    updateData(route,direction){
        this.setState({data:null});
        let url = 'https://raw.githubusercontent.com/tienhung2812/BinhDuongBusMap/master/TimeScheduleData/'+route+'-'+direction+'.json'
        fetch(url).then((result) => {
            if(result.ok)
                return result.json();
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
            if(this.state.direction==="forward"){
                forwardClass+="active";
            }else{
                backwardClass+="active";
            }
            return (<div className="busSchedule" style={fadestyle}>
                        <div className="tabContainer">
                            <button className={forwardClass} onClick={this.forwardClick}>{lang.forward[this.props.langCode]}</button>
                            <button className={backwardClass} onClick={this.backwardClick}>{lang.backward[this.props.langCode]}</button>
                        </div>
                        <StationList display={this.props.state} direction={this.state.direction} route={this.props.route} height={this.props.height} stationClick={this.handleStation} data={this.state.data} preloader={this.props.preloader} langCode={this.props.langCode}/>
                        <Schedule display={this.props.state} direction={this.state.direction} route={this.props.route} height={this.props.height} station={this.state.station} data={this.state.data}/>
                    </div>);
        }
        else{
            return null;
        }
    }
}

export default BusSchedule;