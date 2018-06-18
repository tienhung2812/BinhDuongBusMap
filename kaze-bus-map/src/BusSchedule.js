import React, { Component } from 'react';
import lang from './lang.json';
import "./BusSchedule.css";

class StationList extends Component{

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
        for(var i=0;i<100;i++){
            stationArray.push(<li onClick={this.handleChange.bind(this)} data-id={i}><i className="far fa-circle"></i><p>ffffffffffffffffffffffffffffffffffffffffffffff</p></li>);
        }

        if(this.props.display==2){
            return (<div className="stationContainer" style={style}>
                        <div className="station" style={styleStation}>
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

class Schedule extends Component{
    render(){
        if(this.props.display==3){
            return (<p>a</p>);
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
        this.state={display:"station", station:null, direction:"forward"}
    }
    lang = lang;
    
    forwardClick(){
        this.setState({direction:"forward"})
    }
    backwardClick(){
        this.setState({direction:"backward"});
    }

    handleStation = event =>{
        this.setState({station:event})
        this.props.stationClick(event);
    }

    render(){ 
        let fadestyle=null;
        if(this.props.fade!=0){
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
                        <StationList display={this.props.state} direction={this.state.direction} route={this.props.route} height={this.props.height} stationClick={this.handleStation}/>
                        <Schedule display={this.props.state} direction={this.state.direction} route={this.props.route} height={this.props.height} station={this.state.station}/>
                    </div>);
        }
        else{
            return null;
        }
    }
}

export default BusSchedule;