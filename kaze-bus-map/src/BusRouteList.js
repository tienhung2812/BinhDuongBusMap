import React, { Component } from 'react';
import lang from './lang.json';
import route_color from './route_color.json';
import "./Sidebar.css";

class BusRouteList extends Component{
    constructor(props){
        super(props);
        this.state = {bus:null}
    }
    route_color = route_color;
    lang = lang;

    handleChange= event=>{
        this.props.routeClick(event.currentTarget.dataset.id);
    }

    render(){ 
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
        const busRouteListArray = [];
        for(var i in route_color){
            busRouteListArray.push(
                <div className="busRoute"  onClick={this.handleChange.bind(this)} data-id={i}>
                     <div className="busNumber" style={{backgroundColor: route_color[i]}}>
                         <h2>{i}</h2>
                     </div>
                     <div className="busInfo">
                     <p>{lang[i+"-busInfo"][this.props.langCode]}</p>
                     </div>    
                 </div>
            );
        }
        let h = (Number(this.props.height)-58);
        
        let style = {
            height: h
        }
        if(this.props.route==null){
            return (<div className="busRouteListContainer" style={fadestyle}>
                        <div className="busRouteList" style={style}>
                            {busRouteListArray}
                        </div>
                    </div>
                    );
        }else{
            return null;
        }
        
    }
}

export default BusRouteList;