import React, { Component } from 'react';
import lang from './lang.json';
import "./Sidebar.css";



class BusRouteList extends Component{

    constructor(props){
        super(props);
        this.state = {bus:null}
        
        
    }
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
        if (this.props.route_list != null)
        for(var i in this.props.route_list.routes){
           
            busRouteListArray.push(
                <div className="busRoute"  onClick={this.handleChange.bind(this)} data-id={this.props.route_list.routes[i].route_id}>
                     <div className="busNumber" style={{backgroundColor: "#"+this.props.route_list.routes[i].color}}>
                         <h2>{this.props.route_list.routes[i].route_id}</h2>
                     </div>
                     <div className="busInfo">
                     <p>{lang[this.props.route_list.routes[i].route_id+"-busInfo"][this.props.langCode]}</p>
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