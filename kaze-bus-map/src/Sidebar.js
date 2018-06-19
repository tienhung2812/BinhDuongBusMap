import React, { Component } from 'react';
import lang from './lang.json';
import route_color from './route_color.json';
import "./Sidebar.css";
import BusRouteList from './BusRouteList';
import BusSchedule from './BusSchedule';

function langToLangCode(langRaw){
    switch(langRaw){
        case "vi":
            return lang.vi;
        case "en":
            return lang.en;
        case "jp":
            return lang.jp;
        default:
            return lang.vi;
    }
};

class NavigationContent extends Component{
    lang = lang;

    backButton=event=>{
        this.props.backButton(event);
    }
 
    render(){
        if(this.props.route!=null){
            const style = {
                color: route_color[this.props.route]
            }
            return (<div className="sidebarNavigation">
                        <div className="backButton" style={style} onClick={this.backButton}>
                            <i className="fa fa-caret-left"></i>
                        </div>
                        <p style={style} className="content">{lang[this.props.route][this.props.langCode]}</p>
                    </div>);
        }else{
            return null;
        } 
    }
     
}



class Sidebar extends Component {
    constructor(props){
        super(props);
        this.collapseSidebar = this.collapseSidebar.bind(this);
        this.uncollapseSidebar= this.uncollapseSidebar.bind(this);
        this.state = {display:true,navigation:null,state:1,fade:0};
    }

    lang = lang;
    // 1=in and 2=out;
    collapseSidebar(){
        this.setState({display:false});
        this.props.closeSidebar(true);
    }

    uncollapseSidebar(){
        this.setState({display:true});
        this.props.closeSidebar(false);
    }

    handleBackButton = event => {
        if(event){
            this.setState({fade:2});
            setTimeout(function() {
                this.setState({fade:1});
                if(this.state.state<=2)
                    this.setState({navigation:null,state:1})
                else{
                    this.setState({state:2})
                }
                setTimeout(function() { 
                    this.setState({fade:0});
                }.bind(this), 150);
            }.bind(this), 150);
            
        }
    }

    handleChangeRoute = event =>{
        this.setState({fade:2});
        setTimeout(function() { 
            this.setState({fade:1});
            this.setState({navigation:event,state:2});
            setTimeout(function() { 
                this.setState({fade:0});
            }.bind(this), 150);
        }.bind(this), 150);
    }

    handleChangeStation = event =>{
        this.setState({fade:2});
        setTimeout(function() { 
            this.setState({fade:1});
            this.setState({state:3});
            setTimeout(function() { 
                this.setState({fade:0});
            }.bind(this), 150); 
        }.bind(this), 150);
        
    }

    render() {
        let langCode = langToLangCode(this.props.lang);     
        let height = this.props.height-80;
        let heightStyle = {height: height+"px"};
        let collapseButtonStyle = {
            top: height /2 - 15 +"px"
        }
        let collapseButton;
        if(this.state.display) {
            collapseButton = <div className="collapseButton" style={collapseButtonStyle} onClick={this.collapseSidebar}>
                                <i className="fa fa-caret-right"></i>
                             </div>
        }else{
            collapseButton = <div className="collapseButton-close" style={collapseButtonStyle} onClick={this.uncollapseSidebar}>
                                <i className="fa fa-caret-right"></i>
                             </div>
        }
       
        let SidebarClass = "";
        if(this.state.display){
            SidebarClass = "Sidebar";
        }else{
            SidebarClass = "Sidebar Sidebar-close";
        }
        
        
        return (
        <div className={SidebarClass} style={heightStyle}>
            {collapseButton}
            <div className="sidebarContent">
                <div className="sidebarName">
                    <h1>
                        {lang.buses[langCode]}
                    </h1>
                </div>
                <NavigationContent route={this.state.navigation} langCode={langCode} backButton={this.handleBackButton} fade={this.state.fade}/>
                <BusRouteList route={this.state.navigation} langCode={langCode} height={height} routeClick={this.handleChangeRoute} fade={this.state.fade}/>
                <BusSchedule route={this.state.navigation} langCode={langCode} height={height} stationClick={this.handleChangeStation} state={this.state.state} fade={this.state.fade}/>
            </div>
        </div>
        );
    }
}
export default Sidebar;